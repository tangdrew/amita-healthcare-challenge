$( document ).ready(function() {
    $.material.init()

    console.log(data);

    //Initialize intro module
    renderModule(data.modules.intro);
});

var modules = [];
var questions = [];

var renderModule = function(mod) {
    var wraper = document.getElementById('wrapper');
    //wrapper.innerHTML += `
    $("#wrapper").append(`
        <div class="form-horizontal well">
            <fieldset>
                <legend>` + mod.title + `</legend>
                <div id="` + mod.id + `"></div>
            </fieldset>
        </div>
        <br/>
    `);
    var question = mod.questions[mod.first];
    modules.push(mod);
    renderQuestion(question);
};

var renderQuestion = function(question) {
    questions.push(question);
    var wrapper = document.getElementById(modules[modules.length - 1].id);
    $("#" + modules[modules.length - 1].id).append("<div id='" + question.id + "-wrapper'></div>");
    switch (question.type) {
        case "text":
            var text = question.text;
            if(question.id == 'name' && data.answers['returning'] == 'Been here before'){
                text = 'Welcome back!';
            }
            var placeholder = data.answers[question.id] == undefined ? '' : data.answers[question.id];
            $("#" + question.id + "-wrapper").append(`
                <div class="form-group">
                    <label class="label-padding control-label">` + text + `</label>
                    <div class="col-lg-12">
                        <input type="text" class="form-control" id="` + question.id + `" onkeypress="textInput('` + question.id + `', event)" placeholder="` + placeholder + `">
                    </div>
                </div>
            `);
            break;
        case "number":
            var placeholder = data.answers[question.id] == undefined ? '' : data.answers[question.id];
            $("#" + question.id + "-wrapper").append(`
                <div class="form-group">
                    <label  class="label-padding control-label">` + question.text + `</label>
                    <div class="col-md-12">
                        <input type="number" class="form-control" id="` + question.id + `" onkeypress="textInput('` + question.id + `', event)" placeholder="` + placeholder + `">
                    </div>
                </div>
            `);
            break;
        case "date":
            var placeholder = data.answers[question.id] == undefined ? '' : data.answers[question.id];
            $("#" + question.id + "-wrapper").append(`
                <div class="form-group">
                    <label  class="label-padding control-label">` + question.text + `</label>
                    <div class="col-md-12">
                        <input type="date" class="form-control" id="` + question.id + `" onkeypress="textInput('` + question.id + `', event)" placeholder="` + placeholder + `">
                    </div>
                </div>
            `);
            break;
        case "boolean":
            $("#" + question.id + "-wrapper").append(`
            <div class="form-group">
            <label class="label-padding control-label">` + question.text + `</label>

            <div class="col-md-12">
                <a href="javascript:void(0)" class="btn btn-raised btn-default" onclick="next('` + question.id + `',true)">` + question.answers.true + `</a>
                <a href="javascript:void(0)" class="btn btn-raised btn-default" onclick="next('` + question.id + `', false)">` + question.answers.false + `</a>
            </div>
            </div>
            `)
            break;
        case "intro":
            $("#" + question.id + "-wrapper").append(`
            <div class="form-group">
            <label class="label-padding control-label">` + question.text + `</label>

            <div class="col-md-12" style="text-align: center">
                <a href="javascript:void(0)" class="btn btn-raised btn-primary" onclick="next('` + question.id + `',true)">` + question.answers.true + `</a>
                <a href="javascript:void(0)" class="btn btn-raised btn-primary" onclick="next('` + question.id + `', false)">` + question.answers.false + `</a>
            </div>
            </div>
            `)
            break;
        case "recommendation":
            $("#" + question.id + "-wrapper").append(`
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="well">
                            Humana Plan C
                        </div>
                    </div>
                    <div class="row">
                        <div class="well">
                            Aetna Plan D
                        </div>
                    </div>
                    <div class="row">
                        <div class="well">
                            Cigna Plan N
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-raised btn-success" style="text-align: center; width: 100%" onclick="next('` + question.id + `',true)">See Data</a>

                </div>
                <div class="col-sm-2"></div>
            </div>
            `)
            break;
        case "data":
            $("#" + question.id + "-wrapper").append(`
            <div class="row">
                <pre style="width: 100%">` + JSON.stringify(data.answers) + `</pre>
            </div>
            `);
            break;
    }
};

var textInput = function(id, event) {
    if (event.keyCode == 13) {
        next(id);
    }
};

var next = function(id, answer) {
    // Save answer
    var question = questions[questions.length - 1];
    if (typeof answer === 'undefined') { answer = document.getElementById(id).value; }
    if(data.answers[id] == undefined) {
        if(question.next) {
            var nextQuestion = modules[modules.length - 1].questions[question.next];
            renderQuestion(nextQuestion);
        }
        else {
            var nextModuleName = modules[modules.length - 1].next;
            renderModule(data.modules[nextModuleName]);
        }
    }
    data.answers[id] = answer;
    window.scrollTo(0,document.body.scrollHeight);
}

var data = {
    "modules": {
        "intro": {
            "id": "intro",
            "title": "Have you used Sara before?",
            "first": "returning",
            "questions": {
                "returning": {
                    "id": "returning",
                    "text": "",
                    "type": "intro",
                    "answers": {
                        "true": "Been here before",
                        "false": "It's my first time"
                    },
                    "next": null
                }
            },
            "next": "basicInfo"
        },
        "basicInfo": {
            "id": "basicInfo",
            "title": "Basic Information",
            "first": "name",
            "questions": {
                "name": {
                    "id": "name",
                    "text": "I see you're new, who am I talking to?",
                    "type": "text",
                    "answers": {},
                    "next": "address"
                },
                "address": {
                    "id": "address",
                    "text": "Where do you live?",
                    "type": "text",
                    "answers": {},
                    "next": "gender"
                },
                "gender": {
                    "id": "gender",
                    "text": "Male or female?",
                    "type": "boolean",
                    "answers": {
                        "true": "Male",
                        "false": "Female"
                    },
                    "next": "dob"
                },
                "dob": {
                    "id": "dob",
                    "text": "When's your Birthday?",
                    "type": "date",
                    "answers": {},
                    "next": null
                }
            },
            "next": "insuranceKnowledge"
        },
        "insuranceKnowledge": {
            "id": "insuranceKnowledge",
            "title": "How comfortable are you with the Medicare Insurance System?",
            "first": "comfort",
            "questions": {
                "comfort": {
                    "id": "comfort",
                    "text": "On a scale from 1 to 5.",
                    "type": "number",
                    "answers": {},
                    "next": null
                },
            },
            "next": "previousInsurance"
        },
        "previousInsurance": {
            "id": "previousInsurance",
            "title": "Previous Insurance",
            "first": "medicare",
            "questions": {
                "medicare": {
                    "id": "medicare",
                    "text": "Are you already on Medicare?",
                    "type": "boolean",
                    "answers": {
                        "true": "Yes",
                        "false": "No"
                    },
                    "next": "pastProvider"
                },
                "pastProvider": {
                    "id": "pastProvider",
                    "text": "Who was your previous health insurance provider?",
                    "type": "text",
                    "answers": {},
                    "next": null
                }
            },
            "next": "coverageNeeds"
        },
        "coverageNeeds": {
            "id": "coverageNeeds",
            "title": "Coverage Needs",
            "first": "needs",
            "questions": {
                "needs": {
                    "id": "needs",
                    "text": "What is most important to you that your insurance provides?",
                    "type": "text",
                    "answers": {},
                    "next": null
                }
            },
            "next": "medicalHistory"
        },
        "medicalHistory": {
            "id": "medicalHistory",
            "title": "Medical History",
            "first": "medication",
            "questions": {
                "medication": {
                    "id": "medication",
                    "text": "What medications do you take?",
                    "type": "text",
                    "answers": {},
                    "next": null
                }
            },
            "next": "medicareNumber"
        },
        "medicareNumber": {
            "id": "medicareNumber",
            "title": "Medicare Idenification Number",
            "first": "medicareID",
            "questions": {
                "medicareID": {
                    "id": "medicareID",
                    "text": "What is your Medicare Identification Number?",
                    "type": "number",
                    "answers": {},
                    "next": null
                }
            },
            "next": "finances"
        },
        "finances": {
            "id": "finances",
            "title": "Financial Situation",
            "first": "income",
            "questions": {
                "income": {
                    "id": "income",
                    "text": "How much $$$ you got?",
                    "type": "text",
                    "answers": {},
                    "next": null
                }
            },
            "next": "results"
        },
        "results": {
            "id": "results",
            "title": "Medicare Plan Recommendations",
            "first": "recommendations",
            "questions": {
                "recommendations": {
                    "id": "recommendations",
                    "text": "#1 Recommendation",
                    "type": "recommendation",
                    "answers": {},
                    "next": "data"
                },
                "data": {
                    "id": "data",
                    "text": "Data Collected",
                    "type": "data",
                    "answers": {},
                    "next": null
                },
            },
            "next": null
        }
    },
    "answers": {}
}