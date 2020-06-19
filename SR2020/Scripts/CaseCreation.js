const caseUrl = 'http://192.168.137.235/api/cases';
const formGetUrl = 'http://192.168.137.235/api/stand';
const userUrl = '';

var startSort = [];
var startDiv = [];
var moveDiv = [];
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function CreateContainer() {
    var div = document.createElement('div');
    div.className = 'CasesContainer';
    div.id = 'CaseContainterTest';
    document.getElementById("MainPage").appendChild(div);
}
//CreateContainer();

fetch(caseUrl)
    .then((resp) => resp.json())
    .then(function (data) {
        var cases = data;
        return cases.map(function (caseEL) {
            var collapsible = createNode('button'),
                caseholder = createNode('div'),
                content = createNode('div'),
                caseName = createNode('div'),
                standNameholder = createNode('p'),
                standName = createNode('p'),
                fixedPetersProblem = createNode('p'),
                timer = createNode('div'),
                contactPerson = createNode('p'),
                description = createNode('textarea'),
                lastStatus = createNode('p'),
                submit = createNode('button'),
                update = createNode('button'),
                colorBox = createNode('div'),
                takeCaseBtn = createNode('button'),
                personOnCase = createNode('p');

            caseName.className = 'collapseableCaseName';
            standNameholder.className = 'StandName';
            standNameholder.innerHTML = 'Stander navn:';
            standName.className = 'StandName';
            standName.innerHTML = `${caseEL.standName}`;
            timer.className = 'collapseableTimer';
            description.className = 'collapseableCommentArea';
            description.innerHTML = `${caseEL.caseDescription}`
            description.readOnly = true;
            lastStatus.className = 'lastStatus';
            lastStatus.innerHTML = `${caseEL.lastUpdate}`;
            submit.className = 'btn btn-success caseButton';
            submit.innerHTML = 'Afslut';
            submit.setAttribute("caseId", `${caseEL.caseId}`);
            fixedPetersProblem.innerHTML = 'På sagen: ';
            fixedPetersProblem.className = 'workerOnCase';
            submit.addEventListener("click", function () {
                OpenCloseCaseModal(submit.getAttribute('caseId'));
            });

            update.className = 'btn btn-primary caseButton';
            update.setAttribute("caseStandName", `${caseEL.standName}`);
            update.setAttribute("caseId", `${caseEL.caseId}`);
            update.innerHTML = 'Opdater';
            update.addEventListener("click", function () {
                OpenUpadteCaseModal(update.getAttribute('caseId'), update.getAttribute('caseStandName'))
            });
            personOnCase.innerHTML = UserOnCase(caseEL.userName);
            personOnCase.className = 'workerOnCase';
            takeCaseBtn.innerHTML = 'Tag opgave';
            takeCaseBtn.className = 'btn btn-primary caseButton';

            var tempSpluit = SplitStringWithNoNumbers(standName.innerHTML);
            colorBox.className = 'ColorBox';
            colorBox.id = `${caseEL.colorCode}`;
            content.className = 'content ' + colorBox.id + ' colorSort ' + ' ' + tempSpluit + ' ' + standName.innerHTML;
            collapsible.className = 'collapsible ' + colorBox.id + ' colorSort ' + ' ' + tempSpluit + ' ' + standName.innerHTML;
            collapsible.id = `${caseEL.caseId}`;

            isUserOnCase(personOnCase.innerHTML, takeCaseBtn);

            takeCaseBtn.addEventListener("click", function () {
                AddUserToCase(update.getAttribute('caseId'), update.getAttribute('caseStandName'), lastStatus.innerHTML, description.innerHTML, isOnCase(personOnCase.innerHTML), caseEL.colorCode, takeCaseBtn)
            });

            //Create Caseholder
            append(document.getElementById('CaseContainterTest'), caseholder);

            //Create Button
            append(document.getElementById('CaseContainterTest'), collapsible);
            append(collapsible, colorBox);
            append(collapsible, caseName);
            append(caseName, standNameholder);
            append(caseName, standName);
            append(collapsible, timer);

            //Create Content
            append(document.getElementById('CaseContainterTest'), content);
            append(content, contactPerson);
            append(content, lastStatus);
            append(content, description);
            append(content, fixedPetersProblem);
            append(content, personOnCase);
            append(content, takeCaseBtn);
            append(content, submit);
            append(content, update);


            LoadCases();
            CaseClick(collapsible);
        })
    })
    .catch(function (error) {
        console.log(error);
    })




function UserOnCase(_onCase) {
    if (_onCase == null || _onCase == '')
        return 'Ingen på sagen';
    return _onCase;
}

function isUserOnCase(_oncase, _button) {
    if (_oncase.includes(document.getElementById('hUser').value)) {
        _button.style.display = 'none';
    }
}

function isOnCase(_onCase) {
    if (_onCase.includes(document.getElementById('hUser').value))
        return _onCase;

    if (_onCase.includes('Ingen på sagen'))
        return document.getElementById('hUser').value;
    return _onCase + " og " + document.getElementById('hUser').value;
}

function UpdateTimer() {
    var timers = Array.from(document.querySelectorAll('.lastStatus'));
    var lastupdate = timers[0].innerHTML;
    console.log(lastupdate);
}
var timers;
var startTimer;

var x = setInterval(function () {
    if (timers == null) {

        timers = Array.from(document.querySelectorAll('.lastStatus'));
        startTimer = Array.from(document.querySelectorAll('.collapseableTimer'));
    }

    for (var i = 0; i < timers.length; i++) {

        // Get today's date and time
        var now = new Date().getTime();

        var countDownDate = new Date(timers[i].innerHTML).getTime();
        countDownDate += 2 * 3600 * 1000;
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        //2020-6-16 15:32:45
        startTimer[i].innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
        //timers[i].innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    }
}, 1000);


fetch(formGetUrl)
    .then((resp) => resp.json())
    .then(function (data) {
        var cases = data;
        return cases.map(function (formEl) {
            var option = createNode('option');
            option.innerHTML = `${formEl.standName}`;
            option.value = `${formEl.standName}`;
            append(document.getElementById('choseStands'), option);
        })
    })
    .catch(function (error) {
        console.log(error);
    })

function LoadCases() {
    allCheckboxes = document.querySelectorAll('input[type=checkbox]');
    allCases = Array.from(document.querySelectorAll('.collapsible'));
    colorSort = Array.from(document.querySelectorAll('.colorSort'));
    startSort = allCases;
    startDiv = Array.from(document.querySelectorAll('.content'));
    moveDiv = startDiv;
    getChecked('ColorId');
    getChecked('alphabeticalOrder');
    getChecked('alphabetical');

    Array.prototype.forEach.call(allCheckboxes, function (el) {
        el.addEventListener('change', toggleCheckbox);
    });
}

var allCheckboxes;
var allCases;
var colorSort;
var checked = {};



function toggleCheckbox(e) {


    getChecked(e.target.name);
    setVisibility();
}

function doalert(checkboxElem) {
    const boddy = document.getElementById('CaseContainterTest');
    boddy.innerHTML = '';

    if (checkboxElem.checked) {

        var temp = [];
        for (var i = 0; i < allCases.length; i++) {
            var tempObj = { case: allCases[i], string: SplitString(allCases[i].className), divStart: moveDiv[i] };
            temp.push(tempObj);
        }

        temp.sort(compare);

        for (var i = 0; i < temp.length; i++) {
            append(boddy, temp[i].case);
            append(boddy, temp[i].divStart);
            CaseClick(temp[i].case);
        }

    } else {
        for (var i = 0; i < startSort.length; i++) {
            append(boddy, startSort[i]);
            append(boddy, startDiv[i]);
        }

        var x = document.querySelectorAll('.collapsible');


        for (var i = 0; i < x.length; i++) {
            CaseClick(x[i].case);
        }

    }
}

function getChecked(name) {
    checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
        if (name == 'alphabeticalOrder') {

            const boddy = document.getElementById('CaseContainterTest');
            boddy.innerHTML = '';

            var temp = [];
            for (var i = 0; i < allCases.length; i++) {
                var tempObj = { case: allCases[i], string: SplitString(allCases[i].className), divStart: moveDiv[i] };


                temp.push(tempObj);
            }

            temp.sort(compare);

            for (var i = 0; i < temp.length; i++) {
                append(boddy, temp[i].case);
                append(boddy, temp[i].divStart);
                CaseClick(temp[i].case);
            }



            //append(document.getElementById('ContainerEdit'), allCases[allCases.length - 1])
            //$('#9').insertBefore('#8');

        }
        return el.value;
    });

}
function compare(a, b) {
    const stringA = a.string.toUpperCase();
    const stringB = b.string.toUpperCase();

    let comparison = 0;
    if (stringA > stringB)
        comparison = 1;
    else if (stringA < stringB)
        comparison = -1;

    return comparison;
}

function SplitString(toSplit) {
    var splittedString = toSplit.split(" ");

    return splittedString[splittedString.length - 1];
}

function SplitStringWithNoNumbers(toSplit) {
    var a = SplitString(toSplit);

    for (var i = 0; i < a.length; i++) {
        if (Number.isInteger(a.charAt(i)));
        return a[i];
    }
    return 'a';
}

function setVisibility() {
    colorSort.map(function (el) {
        var ColorId = checked.ColorId.length ? _.intersection(Array.from(el.classList), checked.ColorId).length : true;
        var alphabetical = checked.alphabetical.length ? _.intersection(Array.from(el.classList), checked.alphabetical).length : true;
        if (ColorId && alphabetical) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}
function GetTimeNow() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}

var SubmitColor = document.getElementById('NoColor');
var stander = document.getElementById('choseStands');
var description = document.getElementById('description');

function CreateCase() {
    var time = GetTimeNow();
    (async () => {
        const rawResponse = await fetch(caseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                standName: stander.value,
                colorCode: SubmitColor.id,
                lastUpdate: time,
                caseDescription: description.value
            })
        });
        console.log(time);
        const content = await rawResponse.json();
    })();

}
var ult = 'https://localhost:44350/api/auth/GetUser?userName=' + document.getElementById('hUser').value;
fetch(ult)
    .then((resp) => resp.text())
    .then(function (data) {
        var tings = data.split(',');


        if (tings[tings.length - 1] == "False") {


            var x = document.querySelectorAll('.adminAccess');

            for (var i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
        }

    })
    .catch(function (error) {
        console.log(error);
    })




function CreateUser() {
    var time = GetTimeNow();
    (async () => {
        const rawResponse = await fetch(userUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                standName: stander.value,
                colorCode: SubmitColor.id,
                lastUpdate: time,
                caseDescription: description.value
            })
        });
        console.log(time);
        const content = await rawResponse.json();
    })();

}
