webpackJsonp([1], {
    "/JEC": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "textbox-block",
                    class: {
                        changed: e.wasChanged,
                        submittable: e.isSubmittable,
                        focused: e.focused
                    }
                }, [i("span", {
                    staticClass: "textbox-title"
                }, [e._v(e._s(e.field.title))]), i("br"), e._v(" "), i("div", {
                    staticClass: "textbox-input-wrap"
                }, [i("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.inputValue,
                        expression: "inputValue"
                    }],
                    staticClass: "textbox-input",
                    attrs: {
                        placeholder: e.field.answer_title,
                        type: "email"
                    },
                    domProps: {
                        value: e.inputValue
                    },
                    on: {
                        focus: function(t) {
                            e.focused = !0
                        },
                        blur: function(t) {
                            e.focused = !1
                        },
                        input: function(t) {
                            t.target.composing || (e.inputValue = t.target.value)
                        }
                    }
                })])])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    0: function(e, t, i) {
        i("j1ja"),
        e.exports = i("NHnr")
    },
    "0jdW": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this.$createElement;
                return (this._self._c || e)("div")
            },
            staticRenderFns: []
        };
        t.a = a
    },
    "5mQy": function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = n(i("WnGa"));
        n(i("wYMm"));
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            name: "checkboxBlock",
            extends: a.default,
            data: function() {
                return {
                    checkboxesValue: {},
                    otherOptionValue: {}
                }
            },
            computed: {
                getSelected: function() {
                    var e = this;
                    return this.field.checkboxes.filter(function(t, i) {
                        return e.checkboxesValue[i] && (!t.other_option || t.other_option && e.otherOptionValue[t.other_option_label])
                    })
                },
                isValid: function() {
                    var e = this
                      , t = this.field.checkboxes.every(function(t, i) {
                        return !e.checkboxesValue[i] || e.checkboxesValue[i] && (!t.other_option || t.other_option && e.otherOptionValue[t.other_option_label])
                    });
                    return this.field.require_at_least_one ? t && this.getSelected.length : t
                },
                tagArray: function() {
                    return this.field.assign_tags && this.isValid ? this.cleanedPositiveValues : []
                },
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        for (var t in this.field.result_variable && (e[this.field.result_variable] = this.cleanedPositiveValues.join(", ")),
                        this.otherOptionValue)
                            e[t] = this.otherOptionValue[t];
                        return e
                    }
                    return {}
                },
                cleanedPositiveValues: function() {
                    var e = [];
                    if (0 === Object.keys(this.checkboxesValue).length && this.checkboxesValue.constructor === Object)
                        return e;
                    for (var t in this.checkboxesValue)
                        this.checkboxesValue[t] && e.push(this.checkboxesValue[t]);
                    return e
                }
            },
            methods: {
                onSelect: function(e) {
                    e.other_option_label && (this.otherOptionValue[e.other_option_label] = "")
                }
            },
            mounted: function() {
                var e = this;
                this.field.checkboxes.forEach(function(t, i) {
                    e.$set(e.checkboxesValue, i, void 0),
                    t.other_option && t.other_option_label && e.$set(e.otherOptionValue, t.other_option_label, void 0)
                })
            }
        }
    },
    "5nG9": function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
            }
            return e
        }
          , n = i("NYxO");
        t.default = {
            name: "successMessage",
            computed: a({}, (0,
            n.mapGetters)(["successConfig"]))
        }
    },
    "8Pu4": function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i("WnGa"))
          , n = i("hlPV");
        t.default = {
            name: "phoneBlock",
            extends: a.default,
            directives: {
                mask: n.mask
            },
            data: function() {
                return {
                    inputValue: "",
                    wasChanged: !1,
                    focused: !1
                }
            },
            watch: {
                inputValue: function(e) {
                    this.wasChanged = !0
                }
            },
            computed: {
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        return e[this.field.result_variable] = this.inputValue,
                        e
                    }
                    return {}
                },
                isValid: function() {
                    for (var e = this.field.mask, t = !0, i = 0; i < e.length; i++)
                        if (!this.inputValue.charAt(i) || "#" === e.charAt(i) && isNaN(this.inputValue.charAt(i))) {
                            t = !1;
                            break
                        }
                    return t
                }
            }
        }
    },
    "9DkJ": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "radio-block"
                }, [i("span", {
                    staticClass: "radio-title"
                }, [e._v(" " + e._s(e.field.title) + " ")]), e._v(" "), e._l(e.field.radiobuttons, function(t, a) {
                    return i("label", {
                        key: a,
                        staticClass: "radio-button-block"
                    }, [i("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.radiobuttonValue,
                            expression: "radiobuttonValue"
                        }],
                        staticClass: "radio-radio",
                        attrs: {
                            type: "radio",
                            name: e.id
                        },
                        domProps: {
                            value: t.value,
                            checked: e._q(e.radiobuttonValue, t.value)
                        },
                        on: {
                            change: [function(i) {
                                e.radiobuttonValue = t.value
                            }
                            , function(t) {
                                e.otherOptionValue = ""
                            }
                            ]
                        }
                    }), e._v(" "), i("span", {
                        staticClass: "radio-text"
                    }, [e._v(e._s(t.title))])])
                }), e._v(" "), e.getSelected && e.getSelected.other_option ? i("div", {
                    staticClass: "textbox-input-wrap py-120"
                }, [i("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.otherOptionValue,
                        expression: "otherOptionValue"
                    }],
                    staticClass: "textbox-input",
                    attrs: {
                        type: "text"
                    },
                    domProps: {
                        value: e.otherOptionValue
                    },
                    on: {
                        input: function(t) {
                            t.target.composing || (e.otherOptionValue = t.target.value)
                        }
                    }
                })]) : e._e()], 2)
            },
            staticRenderFns: []
        };
        t.a = a
    },
    "9f5d": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "textbox-block"
                }, [i("span", {
                    staticClass: "textbox-title"
                }, [e._v(e._s(e.field.title))]), i("br"), e._v(" "), i("div", {
                    staticClass: "textbox-input-wrap"
                }, [i("datepicker", {
                    staticClass: "datepicker-input",
                    model: {
                        value: e.inputValue,
                        callback: function(t) {
                            e.inputValue = t
                        },
                        expression: "inputValue"
                    }
                })], 1)])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    "BG+K": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", ["registration_block" !== e.field.type || e.user_email ? e._e() : i("div", {
                    staticClass: "survey-block registration-block"
                }, [i("RegistrationBlock", {
                    attrs: {
                        field: e.field,
                        id: e.id
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                })], 1), e._v(" "), "registration_block" !== e.field.type ? i("div", {
                    staticClass: "survey-block"
                }, ["checkbox_block" === e.field.type ? i("CheckboxBlock", {
                    attrs: {
                        id: e.id,
                        field: e.field
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                }) : e._e(), e._v(" "), "radiobutton_block" === e.field.type ? i("RadioButtonBlock", {
                    attrs: {
                        id: e.id,
                        field: e.field
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                }) : e._e(), e._v(" "), "textfield_block" === e.field.type ? i("TextBlock", {
                    attrs: {
                        field: e.field,
                        id: e.id
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                }) : e._e(), e._v(" "), "phone_number" === e.field.type ? i("PhoneBlock", {
                    attrs: {
                        field: e.field,
                        id: e.id
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                }) : e._e(), e._v(" "), "datepicker_block" === e.field.type ? i("DatePickerBlock", {
                    attrs: {
                        field: e.field,
                        id: e.id
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                }) : e._e(), e._v(" "), "dropdown_block" === e.field.type ? i("DropDownBlock", {
                    attrs: {
                        field: e.field,
                        id: e.id
                    },
                    on: {
                        "field-valid": function(t) {
                            e.emitValidity(!0)
                        },
                        "field-invalid": function(t) {
                            e.emitValidity(!1)
                        }
                    }
                }) : e._e()], 1) : e._e()])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    Bh5q: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("aMJE")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("SIP/")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    DIJW: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("Fiob")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("FTc3")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    "F/oD": function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
            }
            return e
        }
          , n = i("NYxO");
        t.default = {
            name: "errorMessage",
            computed: a({}, (0,
            n.mapGetters)(["errorConfig"]))
        }
    },
    FTc3: function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "survey"
                }, [i("transition", {
                    attrs: {
                        name: "fade-in"
                    }
                }, [e.surveyFinished || e.errors || !e.fields ? e._e() : i("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.fieldsValid.length > 0,
                        expression: "fieldsValid.length > 0"
                    }],
                    staticClass: "main-form"
                }, [i("img", {
                    staticClass: "form-img",
                    attrs: {
                        src: e.style
                    }
                }), e._v(" "), i("span", {
                    staticClass: "form-title"
                }, [e._v(e._s(e.title))]), e._v(" "), e.subtitle ? i("span", {
                    staticClass: "form-subtitle"
                }, [e._v(e._s(e.subtitle))]) : e._e(), e._v(" "), e._l(e.fields, function(t, a) {
                    return i("SurveyBlock", {
                        key: a,
                        attrs: {
                            field: t,
                            id: a
                        },
                        on: {
                            "field-valid": function(t) {
                                e.setValidity(a, !0)
                            },
                            "field-invalid": function(t) {
                                e.setValidity(a, !1)
                            }
                        }
                    })
                }), e._v(" "), i("button", {
                    staticClass: "submit-button",
                    class: {
                        active: e.isFormValid
                    },
                    attrs: {
                        disabled: !e.isFormValid || e.surveySubmitted
                    },
                    on: {
                        click: e.submitSurvey
                    }
                }, [e._v(e._s(e.buttonText))])], 2)]), e._v(" "), i("transition", {
                    attrs: {
                        name: "fade-in"
                    }
                }, [e.surveyFinished && !e.errors ? i("SuccessMessage") : e._e()], 1), e._v(" "), i("transition", {
                    attrs: {
                        name: "fade-in"
                    }
                }, [e.errors ? i("ErrorMessage") : e._e()], 1)], 1)
            },
            staticRenderFns: []
        };
        t.a = a
    },
    Fiob: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
            }
            return e
        }
          , n = i("NYxO")
          , r = o(i("ZaTN"))
          , s = o(i("Vv13"))
          , u = o(i("hedg"))
          , l = o(i("7+uW"));
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            name: "SurveyForm",
            components: {
                SurveyBlock: r.default,
                SuccessMessage: s.default,
                ErrorMessage: u.default
            },
            data: function() {
                return {
                    fieldsValid: [],
                    surveySubmitted: !1,
                    surveyFinished: !1
                }
            },
            computed: a({
                isFormValid: function() {
                    return console.log(this.fieldsValid),
                    this.fieldsValid.every(function(e, t, i) {
                        return e
                    })
                }
            }, (0,
            n.mapGetters)(["fields", "errors", "buttonText", "title", "subtitle", "style"])),
            methods: {
                setValidity: function(e, t) {
                    l.default.set(this.fieldsValid, e, t)
                },
                submitSurvey: function() {
                    var e = this;
                    this.surveySubmitted = !0,
                    this.$store.dispatch("finishSurvey").then(function() {
                        e.surveyFinished = !0
                    })
                }
            }
        }
    },
    HpO2: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
            }
            return e
        }
          , n = i("NYxO")
          , r = f(i("ra7x"))
          , s = f(i("whwf"))
          , u = f(i("X1rh"))
          , l = f(i("vX62"))
          , o = f(i("WR13"))
          , c = f(i("XPzs"))
          , d = f(i("Bh5q"));
        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            name: "surveyBlock",
            props: {
                field: {
                    type: Object,
                    required: !0
                },
                id: {
                    required: !0
                }
            },
            components: {
                CheckboxBlock: r.default,
                RadioButtonBlock: s.default,
                TextBlock: u.default,
                DatePickerBlock: c.default,
                PhoneBlock: l.default,
                RegistrationBlock: o.default,
                DropDownBlock: d.default
            },
            computed: a({}, (0,
            n.mapGetters)([])),
            data: function() {
                return {
                    isValid: !1,
                    user_email: this.$store.state.sailplay.email
                }
            },
            methods: {
                emitValidity: function(e) {
                    e ? (this.$emit("field-valid"),
                    this.isValid = !0) : (this.$emit("field-invalid"),
                    this.isValid = !1)
                }
            }
        }
    },
    IcnI: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = u(i("7+uW"))
          , n = u(i("NYxO"))
          , r = u(i("fIEj"))
          , s = u(i("bkGr"));
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        a.default.use(n.default),
        t.default = new n.default.Store({
            modules: {
                sailplay: r.default,
                survey: s.default
            }
        })
    },
    KdL2: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = r(i("WnGa"))
          , n = r(i("IC97"));
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            name: "datePickerBlock",
            extends: a.default,
            data: function() {
                return {
                    inputValue: void 0
                }
            },
            components: {
                Datepicker: n.default
            },
            computed: {
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        return e[this.field.result_variable] = this.inputValue.toString(),
                        e
                    }
                    return {}
                },
                isValid: function() {
                    return this.inputValue
                }
            }
        }
    },
    LguZ: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = u(i("7+uW"))
          , n = u(i("mtWM"))
          , r = u(i("Rf8U"))
          , s = i("wYMm");
        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var l = {
            init: function() {
                a.default.use(r.default, n.default),
                a.default.axios.defaults.baseURL = s.API_URL
            },
            query: function(e, t) {
                return a.default.axios.get(e, t).catch(function(e) {
                    throw new Error("[sailplay] ApiService " + e)
                })
            },
            get: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                return a.default.axios.get(e + "/" + t).catch(function(e) {
                    throw new Error("[sailplay] ApiService " + e)
                })
            },
            post: function(e, t) {
                return a.default.axios.post("" + e, t)
            },
            update: function(e, t, i) {
                return a.default.axios.put(e + "/" + t, i)
            },
            put: function(e, t) {
                return a.default.axios.put("" + e, t)
            },
            delete: function(e) {
                return a.default.axios.delete(e).catch(function(e) {
                    throw new Error("[sailplay] ApiService " + e)
                })
            }
        };
        t.default = l
    },
    M0d7: function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "textbox-block",
                    class: {
                        changed: e.wasChanged,
                        submittable: e.isSubmittable,
                        focused: e.focused
                    }
                }, [i("span", {
                    staticClass: "textbox-title"
                }, [e._v(e._s(e.field.title))]), i("br"), e._v(" "), i("div", {
                    staticClass: "textbox-input-wrap"
                }, [i("input", {
                    directives: [{
                        name: "mask",
                        rawName: "v-mask",
                        value: e.field.mask,
                        expression: "field.mask"
                    }, {
                        name: "model",
                        rawName: "v-model",
                        value: e.inputValue,
                        expression: "inputValue"
                    }],
                    staticClass: "textbox-input",
                    attrs: {
                        placeholder: e.field.answer_title,
                        type: "tel"
                    },
                    domProps: {
                        value: e.inputValue
                    },
                    on: {
                        focus: function(t) {
                            e.focused = !0
                        },
                        blur: function(t) {
                            e.focused = !1
                        },
                        input: function(t) {
                            t.target.composing || (e.inputValue = t.target.value)
                        }
                    }
                })])])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    M93x: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("xJD8")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("x4gc")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    MEms: function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "popup-fullscreen"
                }, [i("h4", {
                    staticClass: "error-title"
                }, [e._v(e._s(e.errorConfig ? e.errorConfig.title : "There has been an error"))]), e._v(" "), i("p", {
                    staticClass: "error-subtitle"
                }, [e._v(e._s(e.errorConfig ? e.errorConfig.subtitle : "Please contact support"))]), e._v(" "), e.errorConfig ? i("a", {
                    staticClass: "error-button",
                    attrs: {
                        href: e.errorConfig.link
                    }
                }, [e._v(e._s(e.errorConfig.button_text))]) : e._e()])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    NHnr: function(e, t, i) {
        "use strict";
        var a = l(i("7+uW"))
          , n = l(i("M93x"))
          , r = l(i("IcnI"))
          , s = l(i("qJdI"))
          , u = l(i("LguZ"));
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        a.default.use(s.default),
        a.default.config.productionTip = !1,
        u.default.init(),
        new a.default({
            el: "#app",
            store: r.default,
            template: "<App/>",
            components: {
                App: n.default
            }
        })
    },
    PASD: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i("WnGa"));
        t.default = {
            name: "registartionBlock",
            extends: a.default,
            data: function() {
                return {
                    inputValue: "",
                    wasChanged: !1,
                    focused: !1
                }
            },
            watch: {
                inputValue: function(e) {
                    this.wasChanged = !0
                }
            },
            computed: {
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        return e[this.field.result_variable] = this.inputValue,
                        e
                    }
                    return {}
                },
                isValid: function() {
                    return function(e) {
                        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())
                    }(this.inputValue)
                }
            }
        }
    },
    "SIP/": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "selectbox-block"
                }, [i("span", {
                    staticClass: "selectbox-title"
                }, [e._v(e._s(e.field.title))]), i("br"), e._v(" "), i("select", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.inputValue,
                        expression: "inputValue"
                    }],
                    on: {
                        change: function(t) {
                            var i = Array.prototype.filter.call(t.target.options, function(e) {
                                return e.selected
                            }).map(function(e) {
                                return "_value"in e ? e._value : e.value
                            });
                            e.inputValue = t.target.multiple ? i : i[0]
                        }
                    }
                }, [i("option", {
                    attrs: {
                        value: "",
                        disabled: !0
                    },
                    domProps: {
                        selected: !0
                    }
                }, [e._v(e._s(e.field.answer_title))]), e._v(" "), e._l(e.field.options, function(t) {
                    return i("option", {
                        domProps: {
                            value: t.value || t
                        }
                    }, [e._v("\n      " + e._s(t.text || t) + "\n    ")])
                })], 2)])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    Vv13: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("5nG9")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("XJjo")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    WR13: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("PASD")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("/JEC")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    WnGa: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("zZI9")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("0jdW")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    X1rh: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("c9JF")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("uwia")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    XJjo: function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "popup-fullscreen"
                }, [i("img", {
                    staticClass: "success-image",
                    attrs: {
                        src: e.successConfig.img
                    }
                }), e._v(" "), i("h4", {
                    staticClass: "success-title"
                }, [e._v(e._s(e.successConfig.title))]), e._v(" "), i("p", {
                    staticClass: "success-subtitle"
                }, [e._v(e._s(e.successConfig.subtitle))]), e._v(" "), i("a", {
                    staticClass: "success-button",
                    attrs: {
                        href: e.successConfig.link
                    }
                }, [e._v(e._s(e.successConfig.button_text))])])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    XPzs: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("KdL2")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("9f5d")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    ZaTN: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("HpO2")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("BG+K")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    aMJE: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i("WnGa"));
        t.default = {
            name: "dropdownBlock",
            extends: a.default,
            data: function() {
                return {
                    inputValue: ""
                }
            },
            computed: {
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        return e[this.field.result_variable] = this.inputValue,
                        e
                    }
                    return {}
                },
                tagArray: function() {
                    return this.field.assign_tags && this.isValid ? [this.inputValue] : []
                },
                isValid: function() {
                    return this.inputValue
                }
            }
        }
    },
    bkGr: function(e, t, i) {
        "use strict";
        var a, n;
        function r(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = (r(a = {}, "constructSurvey", function(e, t) {
            var i = e.commit
              , a = e.dispatch
              , n = e.rootState
              , r = t.config_name
              , s = t.partner_id
              , u = t.email
              , l = t.url_params
              , o = t.survey_unique_id
              , c = t.manager_email;
            a("init", {
                partnerId: s,
                name: r
            }, {
                root: !0
            }).then(function() {
                return a("authenticateUser", {
                    email: u
                }, {
                    root: !0
                })
            }).then(function() {
                i("setTitle", n.sailplay.config.title),
                i("setSubtitle", n.sailplay.config.subtitle),
                i("setStyle", n.sailplay.config.style),
                i("setSuccessConfig", n.sailplay.config.success),
                i("setErrorConfig", n.sailplay.config.error),
                i("setCompletionTags", n.sailplay.config.tags_after_completed),
                i("setButtonText", n.sailplay.config.button_text),
                i("setSurveyUniqueId", o),
                i("setManagerEmail", c);
                var e = [];
                for (var t in n.sailplay.config.surveys)
                    e = n.sailplay.config.surveys[t].require_tags ? e.concat(n.sailplay.config.surveys[t].require_tags) : e,
                    e = n.sailplay.config.surveys[t].exclude_tags ? e.concat(n.sailplay.config.surveys[t].exclude_tags) : e;
                o && e.push(o);
                for (t = 0; t < e.length; ++t)
                    for (var r = t + 1; r < e.length; ++r)
                        e[t] === e[r] && e.splice(r--, 1);
                return a("checkTags", {
                    tags: JSON.stringify(e)
                })
            }).then(function() {
                var e = void 0;
                for (var t in n.sailplay.config.surveys) {
                    var a = n.sailplay.config.surveys[t]
                      , r = !0;
                    for (var s in a.require_tags)
                        n.sailplay.tags[a.require_tags[s]] || (r = !1);
                    var u = !0;
                    for (var s in a.exclude_tags)
                        n.sailplay.tags[a.exclude_tags[s]] && (u = !1);
                    var c = !a.require_param || l === a.require_param
                      , d = !o || !n.sailplay.tags[o];
                    c && r && u && d && (e = a)
                }
                e && e.fields ? (i("setFields", e.fields),
                e.title && i("setTitle", e.title),
                e.subtitle && i("setSubtitle", e.subtitle),
                e.tags_after_completed && i("addCompletionTags", e.tags_after_completed)) : i("setErrors", !0, {
                    root: !0
                })
            })
        }),
        r(a, "assignTags", function(e, t) {
            (0,
            e.commit)("setResultTagsForId", {
                id: t.id,
                tags: t.tags
            })
        }),
        r(a, "assignVariables", function(e, t) {
            (0,
            e.commit)("setResultVarsForId", {
                id: t.id,
                vars: t.vars
            })
        }),
        r(a, "finishSurvey", function(e) {
            e.commit;
            var t = e.state
              , i = e.dispatch
              , a = [];
            for (var n in t.resultTags)
                a = a.concat(t.resultTags[n]);
            for (n = 0; n < a.length; ++n)
                for (var r = n + 1; r < a.length; ++r)
                    a[n] === a[r] && a.splice(r--, 1);
            var s = !1
              , u = {};
            for (var n in t.resultVariables)
                t.resultVariables[n].email ? s = t.resultVariables[n].email : u = Object.assign({}, u, t.resultVariables[n]);
            if (t.manager_email && t.survey_unique_id) {
                var l = t.manager_email ? "Manager email: " + t.manager_email + "|" : "";
                for (var n in l += a.length > 0 ? "Single choice: " + a.join(",") + "|" : "",
                u)
                    l += n.toString() + ": " + u[n].toString() + "|";
                u[t.survey_unique_id] = l
            }
            t.manager_email && (u.manager_email = t.manager_email),
            t.survey_unique_id && a.push(t.survey_unique_id);
            var o = function() {
                i("assignTagsSP", {
                    tags: a.join(",")
                }, {
                    root: !0
                }).then(function() {
                    i("assignVarsSP", {
                        vars: u
                    }, {
                        root: !0
                    })
                }).then(function() {
                    i("assignTagsSP", {
                        tags: t.completionTags.join(",")
                    }, {
                        root: !0
                    })
                })
            };
            s ? i("updateUserSP", {
                email: s
            }, {
                root: !0
            }).then(function() {
                o()
            }) : o()
        }),
        a)
          , u = (r(n = {}, "setTitle", function(e, t) {
            e.title = t
        }),
        r(n, "setSubtitle", function(e, t) {
            e.subtitle = t
        }),
        r(n, "setStyle", function(e, t) {
            e.style = t
        }),
        r(n, "setCompletionTags", function(e, t) {
            e.completionTags = t
        }),
        r(n, "addCompletionTags", function(e, t) {
            e.completionTags = e.completionTags.concat(t)
        }),
        r(n, "setFields", function(e, t) {
            e.fields = t
        }),
        r(n, "setResultTagsForId", function(e, t) {
            var i = t.id
              , a = t.tags;
            e.resultTags[i] = a
        }),
        r(n, "setResultVarsForId", function(e, t) {
            var i = t.id
              , a = t.vars;
            e.resultVariables[i] = a
        }),
        r(n, "setSuccessConfig", function(e, t) {
            e.successConfig = t
        }),
        r(n, "setErrorConfig", function(e, t) {
            e.errorConfig = t
        }),
        r(n, "setButtonText", function(e, t) {
            e.buttonText = t
        }),
        r(n, "setManagerEmail", function(e, t) {
            e.manager_email = t
        }),
        r(n, "setSurveyUniqueId", function(e, t) {
            e.survey_unique_id = t
        }),
        n);
        t.default = {
            state: {
                style: "",
                title: "",
                subtitle: "",
                completionTags: "",
                fields: {},
                resultTags: {},
                resultVariables: {},
                successConfig: {},
                errorConfig: {},
                buttonText: "",
                survey_unique_id: "",
                partner_email: ""
            },
            getters: {
                title: function(e) {
                    return e.title
                },
                subtitle: function(e) {
                    return e.subtitle
                },
                fields: function(e) {
                    return e.fields
                },
                style: function(e) {
                    return e.style
                },
                successConfig: function(e) {
                    return e.successConfig
                },
                errorConfig: function(e) {
                    return e.errorConfig
                },
                buttonText: function(e) {
                    return e.buttonText
                }
            },
            actions: s,
            mutations: u
        }
    },
    c9JF: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i("WnGa"));
        t.default = {
            name: "textBlock",
            extends: a.default,
            data: function() {
                return {
                    inputValue: "",
                    wasChanged: !1,
                    focused: !1
                }
            },
            watch: {
                inputValue: function(e) {
                    this.wasChanged = !0
                }
            },
            computed: {
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        return e[this.field.result_variable] = this.inputValue,
                        e
                    }
                    return {}
                },
                isValid: function() {
                    return this.inputValue.length > 0
                }
            }
        }
    },
    fIEj: function(e, t, i) {
        "use strict";
        var a, n;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i("7+uW"))
          , s = i("wYMm");
        function u(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        var l = (u(a = {}, "setLang", function(e, t) {
            (0,
            e.commit)("setLanguage", t.lang)
        }),
        u(a, "init", function(e, t) {
            var i = e.commit
              , a = e.state
              , n = t.partnerId
              , u = t.name;
            return r.default.jsonp(s.API_URL + "/js-api/" + n + "/loyalty-page/config/by-name/", {
                name: u,
                lang: a.lang
            }).then(function(e) {
                e && e.config ? (i("setPartnerId", n),
                i("setConfig", e.config.config)) : i("setErrors", !0)
            }).catch(function(e) {
                i("setErrors", !0)
            })
        }),
        u(a, "authenticateUser", function(e, t) {
            var i = e.commit;
            e.state;
            return i("setemail", t.email)
        }),
        u(a, "checkTags", function(e, t) {
            var i = e.commit
              , a = e.state
              , n = t.tags;
            if (a.email)
                return r.default.jsonp(s.API_URL + "/js-api/" + a.partnerId + "/tags/exist", {
                    email: a.email,
                    tags: n,
                    lang: a.lang
                }).then(function(e) {
                    e && e.tags ? i("setTags", e.tags) : i("setErrors", !0)
                }).catch(function(e) {
                    i("setErrors", !0)
                });
            i("setTags", [])
        }),
        u(a, "assignTagsSP", function(e, t) {
            var i = e.commit
              , a = e.state
              , n = t.tags;
            return r.default.jsonp(s.API_URL + "/js-api/" + a.partnerId + "/tags/add", {
                email: a.email,
                tags: n,
                lang: a.lang
            }).then(function(e) {
                e && "error" !== !e.status || i("setErrors", !0)
            }).catch(function(e) {
                i("setErrors", !0)
            })
        }),
        u(a, "assignVarsSP", function(e, t) {
            var i = e.commit
              , a = e.state
              , n = t.vars;
            return n.email = a.email,
            n.lang = a.lang,
            r.default.jsonp(s.API_URL + "/js-api/" + a.partnerId + "/users/custom-variables/add", n).then(function(e) {
                e && "error" !== !e.status || i("setErrors", !0)
            }).catch(function(e) {
                i("setErrors", !0)
            })
        }),
        u(a, "updateUserSP", function(e, t) {
            var i = e.commit
              , a = e.state;
            return r.default.jsonp(s.API_URL + "/js-api/" + a.partnerId + "/users/update/", t).then(function(e) {
                return e && "error" !== e.status ? i("setemail", t.email) : i("setErrors", !0),
                e
            }).catch(function(e) {
                i("setErrors", !0)
            })
        }),
        u(a, "setError", function(e, t) {
            var i = e.commit;
            e.state;
            i("setErrors", t.errorValue)
        }),
        a)
          , o = (u(n = {}, "setPartnerId", function(e, t) {
            e.partnerId = t
        }),
        u(n, "setConfig", function(e, t) {
            e.config = t
        }),
        u(n, "setErrors", function(e, t) {
            e.errors = t
        }),
        u(n, "setemail", function(e, t) {
            e.email = t
        }),
        u(n, "setTags", function(e, t) {
            for (var i in t)
                e.tags[t[i].name] = t[i].exist
        }),
        u(n, "setLanguage", function(e, t) {
            e.lang = t
        }),
        n);
        t.default = {
            state: {
                partnerId: "",
                config: {},
                email: "",
                errors: !1,
                tags: {},
                lang: "ru"
            },
            getters: {
                errors: function(e) {
                    return e.errors
                }
            },
            actions: l,
            mutations: o
        }
    },
    hGoL: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("NYxO");
        var a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i("WnGa"));
        t.default = {
            name: "radiobuttonBlock",
            extends: a.default,
            data: function() {
                return {
                    radiobuttonValue: "",
                    otherOptionValue: ""
                }
            },
            computed: {
                getSelected: function() {
                    var e = this;
                    return "" !== this.radiobuttonValue && this.field.radiobuttons.filter(function(t) {
                        return t.value === e.radiobuttonValue
                    })[0]
                },
                isValid: function() {
                    return this.getSelected && (!this.getSelected.other_option || this.getSelected.other_option && this.otherOptionValue)
                },
                tagArray: function() {
                    return this.field.assign_tags && this.isValid ? [this.radiobuttonValue] : []
                },
                variableArray: function() {
                    if (this.isValid) {
                        var e = {};
                        return this.field.result_variable && (e[this.field.result_variable] = this.radiobuttonValue),
                        this.getSelected && this.getSelected.other_option && (e[this.getSelected.other_option_label] = this.otherOptionValue),
                        e
                    }
                    return {}
                }
            }
        }
    },
    hedg: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("F/oD")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("MEms")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    ra7x: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("5mQy")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("sn+H")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    "sn+H": function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "checkbox-block"
                }, [i("span", {
                    staticClass: "checkbox-title"
                }, [e._v(" " + e._s(e.field.title) + " ")]), e._v(" "), e._l(e.field.checkboxes, function(t, a) {
                    return i("label", {
                        key: a,
                        staticClass: "checkbox-item"
                    }, [i("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.checkboxesValue[a],
                            expression: "checkboxesValue[key]"
                        }],
                        staticClass: "checkbox-input",
                        attrs: {
                            type: "checkbox",
                            "true-value": t.value
                        },
                        domProps: {
                            checked: Array.isArray(e.checkboxesValue[a]) ? e._i(e.checkboxesValue[a], null) > -1 : e._q(e.checkboxesValue[a], t.value)
                        },
                        on: {
                            change: [function(i) {
                                var n = e.checkboxesValue[a]
                                  , r = i.target
                                  , s = !!r.checked && t.value;
                                if (Array.isArray(n)) {
                                    var u = e._i(n, null);
                                    r.checked ? u < 0 && e.$set(e.checkboxesValue, a, n.concat([null])) : u > -1 && e.$set(e.checkboxesValue, a, n.slice(0, u).concat(n.slice(u + 1)))
                                } else
                                    e.$set(e.checkboxesValue, a, s)
                            }
                            , function(i) {
                                e.onSelect(t)
                            }
                            ]
                        }
                    }), e._v(" "), i("span", {
                        staticClass: "checkbox-text"
                    }, [e._v(e._s(t.title))]), e._v(" "), e.checkboxesValue[a] && t.other_option ? i("div", {
                        staticClass: "textbox-input-wrap py-40"
                    }, [i("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.otherOptionValue[t.other_option_label],
                            expression: "otherOptionValue[checkbox.other_option_label]"
                        }],
                        staticClass: "textbox-input",
                        attrs: {
                            type: "text"
                        },
                        domProps: {
                            value: e.otherOptionValue[t.other_option_label]
                        },
                        on: {
                            input: function(i) {
                                i.target.composing || e.$set(e.otherOptionValue, t.other_option_label, i.target.value)
                            }
                        }
                    })]) : e._e()])
                })], 2)
            },
            staticRenderFns: []
        };
        t.a = a
    },
    uwia: function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "textbox-block",
                    class: {
                        changed: e.wasChanged,
                        submittable: e.isSubmittable,
                        focused: e.focused
                    }
                }, [i("span", {
                    staticClass: "textbox-title"
                }, [e._v(e._s(e.field.title))]), i("br"), e._v(" "), i("div", {
                    staticClass: "textbox-input-wrap"
                }, [i("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: e.inputValue,
                        expression: "inputValue"
                    }],
                    staticClass: "textbox-input",
                    attrs: {
                        placeholder: e.field.answer_title,
                        type: "text"
                    },
                    domProps: {
                        value: e.inputValue
                    },
                    on: {
                        focus: function(t) {
                            e.focused = !0
                        },
                        blur: function(t) {
                            e.focused = !1
                        },
                        input: function(t) {
                            t.target.composing || (e.inputValue = t.target.value)
                        }
                    }
                })])])
            },
            staticRenderFns: []
        };
        t.a = a
    },
    vX62: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("8Pu4")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("M0d7")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    wYMm: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = {};
        t.API_URL = "https://sailplay.net",
        t.UNCHECKED_CHECKBOX_HASH = "f24e84445c27fdd906c828ce26a69222329235c4"
    },
    whwf: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("hGoL")
          , n = i.n(a);
        for (var r in a)
            ["default", "default"].indexOf(r) < 0 && function(e) {
                i.d(t, e, function() {
                    return a[e]
                })
            }(r);
        var s = i("9DkJ")
          , u = i("VU/8")(n.a, s.a, !1, null, null, null);
        t.default = u.exports
    },
    x4gc: function(e, t, i) {
        "use strict";
        var a = {
            render: function() {
                var e = this.$createElement
                  , t = this._self._c || e;
                return t("div", {
                    staticClass: "main-page",
                    attrs: {
                        id: "#app"
                    }
                }, [t("SurveyForm")], 1)
            },
            staticRenderFns: []
        };
        t.a = a
    },
    xJD8: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(i("DIJW"));
        n(i("fIEj"));
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = {
            name: "App",
            components: {
                SurveyForm: a.default
            },
            mounted: function() {
                var e = document.getElementById("sailplay-survey-config");
                try {
                    var t = JSON.parse(e.innerHTML);
                    t.params = t.params || {};
                    var i = window.location.search.substring(1).split("&")
                      , a = {}
                      , n = !0
                      , r = !1
                      , s = void 0;
                    try {
                        for (var u, l = i[Symbol.iterator](); !(n = (u = l.next()).done); n = !0) {
                            var o = u.value;
                            a[o.split("=")[0]] = o.split("=")[1]
                        }
                    } catch (e) {
                        r = !0,
                        s = e
                    } finally {
                        try {
                            !n && l.return && l.return()
                        } finally {
                            if (r)
                                throw s
                        }
                    }
                    var c = {
                        email: t.params.email || a.email || "",
                        survey_type: t.params.survey_type || a.survey_type || "",
                        survey_unique_id: t.params.survey_unique_id || a.survey_unique_id || "",
                        manager_email: t.params.manager_email || a.manager_email || ""
                    };
                    this.$store.dispatch("constructSurvey", {
                        partner_id: t.partner_id,
                        config_name: t.config,
                        email: c.email,
                        url_params: c.survey_type,
                        manager_email: c.manager_email,
                        survey_unique_id: c.survey_unique_id
                    })
                } catch (e) {
                    this.$store.dispatch("setErrors", {
                        errorValue: !0
                    })
                }
            }
        }
    },
    zZI9: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        !function(e) {
            e && e.__esModule
        }(i("bkGr"));
        t.default = {
            props: {
                id: {
                    required: !0
                },
                field: {
                    type: Object,
                    required: !0
                }
            },
            computed: {
                isValid: function() {
                    return !0
                },
                isSubmittable: function() {
                    return this.isValid || this.field.optional
                },
                tagArray: function() {
                    return []
                },
                variableArray: function() {
                    return {}
                }
            },
            watch: {
                tagArray: function(e) {
                    this.$store.dispatch("assignTags", {
                        id: this.id,
                        tags: e
                    })
                },
                variableArray: function(e) {
                    this.$store.dispatch("assignVariables", {
                        id: this.id,
                        vars: e
                    })
                },
                isSubmittable: function(e) {
                    this.emitValidity(e)
                }
            },
            mounted: function() {
                this.emitValidity(this.isSubmittable)
            },
            methods: {
                emitValidity: function(e) {
                    e ? this.$emit("field-valid") : this.$emit("field-invalid")
                }
            }
        }
    }
}, [0]);
