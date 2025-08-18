const INITIAL_RATING = 1350.0;
const MINIMUM_RATING = 1000.0;
const CALIBRATION_TOURNAMENTS = 2;
const INACTIVITY_PERIOD_DAYS = 60;
const INACTIVITY_PENALTY = 25;
const K_FACTOR_NEWBIE = 40.0;
const K_FACTOR_REGULAR = 20.0;
const K_FACTOR_PRO = 10.0;
const PRO_RATING_THRESHOLD = 1800.0;
const MAX_RATING_DIFFERENCE_BONUS = 200.0;

class PadelRatingCalculatorJS {
    constructor(tournamentsData) {
        this.tournaments = tournamentsData;
        this.players = {};
    }

    _getOrCreatePlayer(playerId, tournamentDate) {
        if (!this.players[playerId]) {
            this.players[playerId] = {
                rating: INITIAL_RATING,
                tournaments_played: 0,
                matches_played: 0,
                wins: 0,
                losses: 0,
                participated_in_tournaments: new Set(),
                last_activity_date: tournamentDate,
                detailed_history: []
            };
        }
        return this.players[playerId];
    }

    _getParticipants(tournament) {
        const participants = new Set();
        tournament.rounds.forEach(round => {
            round.matches.forEach(match => {
                participants.add(match.team_A_player_id_1);
                participants.add(match.team_A_player_id_2);
                participants.add(match.team_B_player_id_1);
                participants.add(match.team_B_player_id_2);
            });
        });
        return participants;
    }
    
    _calculateKFactor(playerData) {
        if (playerData.tournaments_played < CALIBRATION_TOURNAMENTS) return K_FACTOR_NEWBIE;
        if (playerData.rating >= PRO_RATING_THRESHOLD) return K_FACTOR_PRO;
        return K_FACTOR_REGULAR;
    }
    
    _updateRatingsForMatch(match, tournamentDate) {
        const { team_A_points = 0, team_B_points = 0 } = match;
        const teamAPointsSq = team_A_points ** 2;
        const teamBPointsSq = team_B_points ** 2;
        const totalPointsSq = teamAPointsSq + teamBPointsSq;
        if (totalPointsSq === 0) return {};

        const sA = teamAPointsSq / totalPointsSq;
        const sB = teamBPointsSq / totalPointsSq;

        const teamAIds = [match.team_A_player_id_1, match.team_A_player_id_2];
        const teamBIds = [match.team_B_player_id_1, match.team_B_player_id_2];
        const allPlayersInMatch = [...teamAIds, ...teamBIds];

        const preMatchData = {};
        allPlayersInMatch.forEach(pId => {
            preMatchData[pId] = { ...this._getOrCreatePlayer(pId, tournamentDate) };
            this.players[pId].matches_played++;
        });
        
        const teamAWon = team_A_points > team_B_points;
        teamAIds.forEach(pId => this.players[pId][teamAWon ? 'wins' : 'losses']++);
        teamBIds.forEach(pId => this.players[pId][!teamAWon ? 'wins' : 'losses']++);

        const pairAStrength = (preMatchData[teamAIds[0]].rating + preMatchData[teamAIds[1]].rating) / 2;
        const pairBStrength = (preMatchData[teamBIds[0]].rating + preMatchData[teamBIds[1]].rating) / 2;
        
        const eA = 1 / (1 + 10 ** ((pairBStrength - pairAStrength) / 400));
        const eB = 1 - eA;

        const deltaA = sA - eA;
        const deltaB = sB - eB;

        const calculateChanges = (teamIds, delta, preMatch) => {
            const [p1, p2] = teamIds;
            const [strongerId, weakerId] = preMatch[p1].rating > preMatch[p2].rating ? [p1, p2] : [p2, p1];

            const changeS = this._calculateKFactor(preMatch[strongerId]) * delta;
            const changeW = this._calculateKFactor(preMatch[weakerId]) * delta;

            const ratingDiff = Math.abs(preMatch[strongerId].rating - preMatch[weakerId].rating);
            let bonus = 0;
            if (ratingDiff > 0) {
                const diffCoeff = Math.min(1.0, ratingDiff / MAX_RATING_DIFFERENCE_BONUS);
                const avgChange = (Math.abs(changeS) + Math.abs(changeW)) / 2;
                bonus = avgChange * 0.1 * diffCoeff;
            }
            
            const finalChangeS = changeS - bonus;
            const finalChangeW = changeW + bonus;

            this.players[strongerId].rating += finalChangeS;
            this.players[weakerId].rating += finalChangeW;

            return {
                [strongerId]: { base: changeS, bonus: -bonus, final: finalChangeS },
                [weakerId]: { base: changeW, bonus: bonus, final: finalChangeW }
            };
        };

        const changesA = calculateChanges(teamAIds, deltaA, preMatchData);
        const changesB = calculateChanges(teamBIds, deltaB, preMatchData);
        const allChanges = { ...changesA, ...changesB };

        const matchLogs = {};
        allPlayersInMatch.forEach(pId => {
            this.players[pId].rating = Math.max(MINIMUM_RATING, this.players[pId].rating);
            const isInTeamA = teamAIds.includes(pId);
            const myTeamIds = isInTeamA ? teamAIds : teamBIds;
            const oppTeamIds = isInTeamA ? teamBIds : teamAIds;
            const partnerId = myTeamIds.find(id => id !== pId);
            
            matchLogs[pId] = {
                match_id: match.id,
                score: isInTeamA ? `${team_A_points} - ${team_B_points}` : `${team_B_points} - ${team_A_points}`,
                rating_before_match: preMatchData[pId].rating,
                partner: { id: partnerId, rating: preMatchData[partnerId].rating },
                opponents: [
                    { id: oppTeamIds[0], rating: preMatchData[oppTeamIds[0]].rating },
                    { id: oppTeamIds[1], rating: preMatchData[oppTeamIds[1]].rating }
                ],
                my_pair_strength: isInTeamA ? pairAStrength : pairBStrength,
                opponent_pair_strength: isInTeamA ? pairBStrength : pairAStrength,
                expected_score: isInTeamA ? eA : eB,
                actual_score: isInTeamA ? sA : sB,
                k_factor: this._calculateKFactor(preMatchData[pId]),
                base_change: allChanges[pId].base,
                bonus: allChanges[pId].bonus,
                final_change: allChanges[pId].final,
                rating_after_match: this.players[pId].rating
            };
        });
        return matchLogs;
    }

    processTournaments() {
        if (!this.tournaments || this.tournaments.length === 0) return;
        const sortedTournaments = [...this.tournaments].sort((a, b) => new Date(a.time_start) - new Date(b.time_start));

        sortedTournaments.forEach(tournament => {
            const currentDate = new Date(tournament.time_start);
            const tournamentId = tournament.tournament_id;
            const participants = this._getParticipants(tournament);
            
            Object.keys(this.players).forEach(playerId => {
                const pId = parseInt(playerId);
                if (participants.has(pId)) return;
                
                const playerData = this.players[pId];
                const timeDiff = currentDate - playerData.last_activity_date;
                const daysDiff = timeDiff / (1000 * 3600 * 24);

                if (daysDiff > INACTIVITY_PERIOD_DAYS) {
                    const periods = Math.floor(daysDiff / INACTIVITY_PERIOD_DAYS);
                    const deduction = INACTIVITY_PENALTY * periods;
                    const ratingBefore = playerData.rating;
                    const newRating = Math.max(MINIMUM_RATING, ratingBefore - deduction);

                    if (newRating < ratingBefore) {
                        playerData.rating = newRating;
                        playerData.detailed_history.push({
                            type: 'inactivity',
                            date: currentDate.toISOString().split('T')[0],
                            rating_before: ratingBefore,
                            deduction: deduction,
                            rating_after: newRating
                        });
                    }
                    playerData.last_activity_date = new Date(playerData.last_activity_date.getTime() + periods * INACTIVITY_PERIOD_DAYS * 24 * 60 * 60 * 1000);
                }
            });

            const tournamentHistoryRecords = {};
            participants.forEach(pId => {
                const playerData = this._getOrCreatePlayer(pId, currentDate);
                tournamentHistoryRecords[pId] = {
                    type: 'tournament',
                    id: tournamentId,
                    date: currentDate.toISOString().split('T')[0],
                    rating_before: playerData.rating,
                    matches: [],
                    rating_after: 0
                };
            });

            tournament.rounds.forEach(round => {
                round.matches.forEach(match => {
                    const matchLogs = this._updateRatingsForMatch(match, currentDate);
                    Object.entries(matchLogs).forEach(([pId, log]) => {
                        if (tournamentHistoryRecords[pId]) {
                            tournamentHistoryRecords[pId].matches.push(log);
                        }
                    });
                });
            });

            participants.forEach(pId => {
                const playerData = this.players[pId];
                playerData.last_activity_date = currentDate;
                const record = tournamentHistoryRecords[pId];
                record.rating_after = playerData.rating;
                playerData.detailed_history.push(record);
                
                if (!playerData.participated_in_tournaments.has(tournamentId)) {
                    playerData.participated_in_tournaments.add(tournamentId);
                    playerData.tournaments_played = playerData.participated_in_tournaments.size;
                }
            });
        });
    }

    getLeaderboard() {
        return Object.entries(this.players)
            .map(([playerId, data]) => ({
                player_id: parseInt(playerId),
                rating: Math.round(data.rating),
                tournaments_played: data.tournaments_played,
                matches_played: data.matches_played,
                wins: data.wins,
                losses: data.losses
            }))
            .sort((a, b) => b.rating - a.rating);
    }
    
    getPlayer(playerId) {
        return this.players[playerId];
    }
}


const leaderboardView = document.getElementById('leaderboard-view');
const playerView = document.getElementById('player-view');
let chartInstance = null; // Переменная для хранения экземпляра графика

function displayLeaderboard(leaderboardData) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    leaderboardData.forEach((player, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><a href="#player/${player.player_id}" class="player-link">${player.player_id}</a></td>
                <td>${player.rating}</td>
                <td>${player.tournaments_played}</td>
                <td>${player.matches_played}</td>
                <td>${player.wins}</td>
                <td>${player.losses}</td>
            </tr>
        `;
    });
}

function displayPlayerDetails(playerData) {
    document.getElementById('player-header').innerText = `Детальная история рейтинга для игрока ID ${playerData.player_id}`;
    document.getElementById('player-initial-rating').innerHTML = `Начальный рейтинг: <strong>${Math.round(INITIAL_RATING)}</strong>`;
    
    const historyContainer = document.getElementById('player-history-container');
    historyContainer.innerHTML = '';

    const sortedHistory = [...playerData.detailed_history].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedHistory.forEach(event => {
        let eventHTML = '';
        if (event.type === 'tournament') {
            let matchesHTML = event.matches.map(match => `
                <div class="match-block">
                    <h3>Матч ID: ${match.match_id}</h3>
                    <p><strong>Счет: ${match.score}</strong></p>
                    <div class="details">
                        <p>
                            <strong>Рейтинг до матча: ${Math.round(match.rating_before_match)}</strong><br>
                            <strong>Партнер:</strong> ID ${match.partner.id} (Рейтинг: ${Math.round(match.partner.rating)})<br>
                            <strong>Соперники:</strong> ID ${match.opponents[0].id} (${Math.round(match.opponents[0].rating)}) & ID ${match.opponents[1].id} (${Math.round(match.opponents[1].rating)})
                        </p>
                        <p><strong>Итоговое изменение:</strong> <span class="summary ${match.final_change >= 0 ? 'win' : 'loss'}">${match.final_change.toFixed(2)}</span></p>
                        <p><strong>Рейтинг после матча: ${Math.round(match.rating_after_match)}</strong></p>
                    </div>
                </div>
            `).join('');
            
            const finalChange = event.rating_after - event.rating_before;
            eventHTML = `
                <div class="tournament-block">
                    <h2>Турнир ID: ${event.id} (Дата: ${event.date})</h2>
                    <p class="summary">Рейтинг до турнира: ${Math.round(event.rating_before)}</p>
                    <hr>${matchesHTML}<hr>
                    <p class="summary">
                        Рейтинг после турнира: ${Math.round(event.rating_after)} 
                        <span class="${finalChange >= 0 ? 'win' : 'loss'}">(Изменение за турнир: ${finalChange >= 0 ? '+' : ''}${Math.round(finalChange)})</span>
                    </p>
                </div>`;
        } else if (event.type === 'inactivity') {
            eventHTML = `
                <div class="inactivity-block">
                    <h2>Списание за неактивность (Дата: ${event.date})</h2>
                    <p>Рейтинг до списания: ${Math.round(event.rating_before)}</p>
                    <p class="summary">Списано очков: <span class="loss">-${Math.round(event.deduction)}</span></p>
                    <p class="summary">Рейтинг после списания: ${Math.round(event.rating_after)}</p>
                </div>`;
        }
        historyContainer.innerHTML += eventHTML;
    });


    const chartLabels = ['Начало'];
    const chartData = [INITIAL_RATING];
    sortedHistory.forEach(event => {
        const label = event.type === 'tournament' ? `Турнир ${event.id}` : 'Списание';
        chartLabels.push(`${event.date} (${label})`);
        chartData.push(Math.round(event.rating_after));
    });

    const ctx = document.getElementById('ratingChart');
    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Рейтинг',
                data: chartData,
                borderColor: '#009879',
                tension: 0.1,
                pointRadius: 5,
                pointBackgroundColor: '#009879'
            }]
        },
        options: { scales: { y: { beginAtZero: false } }, plugins: { legend: { display: false } } }
    });
}



async function main() {
    const tournaments = await (await fetch('data.json')).json();
    const calculator = new PadelRatingCalculatorJS(tournaments);
    calculator.processTournaments();

    function handleRouteChange() {
        const hash = window.location.hash;
        if (hash.startsWith('#player/')) {
            const playerId = parseInt(hash.split('/')[1]);
            const playerData = calculator.getPlayer(playerId);
            if (playerData) {
                playerData.player_id = playerId;
                leaderboardView.style.display = 'none';
                playerView.style.display = 'block';
                displayPlayerDetails(playerData);
            } else {
                window.location.hash = '';
            }
        } else {
            leaderboardView.style.display = 'block';
            playerView.style.display = 'none';
            displayLeaderboard(calculator.getLeaderboard());
        }
    }
    
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
}

document.addEventListener('DOMContentLoaded', main);
