const caseUrl = 'http://192.168.137.235/api/cases';
const formGetUrl = 'http://192.168.137.235/api/stand';
const userUrl = '';

var startSort = [];
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
                timer = createNode('div'),
                contactPerson = createNode('p'),
                description = createNode('textarea'),
                lastStatus = createNode('p'),
                submit = createNode('button'),
                update = createNode('button'),
                colorBox = createNode('div');

            content.className = 'content';
            caseName.className = 'collapseableCaseName';
            standNameholder.className = 'StandName';
            standNameholder.innerHTML = 'Stander navn:';
            standName.className = 'StandName';
            standName.innerHTML = `${caseEL.standName}`;
            timer.className = 'collapseableTimer';
            description.className = 'collapseableCommentArea';
            description.placeholder = 'Opgave beskrivelse';
            description.readOnly = true;
            lastStatus.className = 'lastStatus';
            lastStatus.innerHTML = `${caseEL.lastUpdate}`;
            submit.className = 'btn btn-success caseButton';
            //submit.onclick = function () { OpenCloseCaseModal(`${caseEL.caseId}`); };
            update.className = 'btn btn-primary caseButton';
            //update.addEventListener("click", OpenUpadteCaseModal) = function () { OpenUpadteCaseModal(`${caseEL.caseId}`, `${caseEL.standName}`); };
            var tempSpluit = SplitStringWithNoNumbers(standName.innerHTML);
            colorBox.className = 'ColorBox';
            colorBox.id = `${caseEL.colorCode}`;
            collapsible.className = 'collapsible ' + colorBox.id + ' ' + standName.innerHTML + ' ' + tempSpluit;;
            collapsible.id = `${caseEL.caseId}`;

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
            append(content, description);
            append(content, lastStatus);
            append(content, submit);
            append(content, update);



            LoadCases();
            CaseClick();
        })
    })
    .catch(function (error) {
        console.log(error);
    })

//fetch(caseUrl)
//    .then((resp) => resp.json())
//    .then(function (data) {
//        var cases = data;
//        return cases.map(function (caseEL) {
//            var caseContainer = createNode('div');
//            colorBox = createNode('div'),
//                infoBox = createNode('div'),
//                infoText = createNode('p'),
//                standText = createNode('p');



//            colorBox.className = 'ColorBox';
//            colorBox.id = `${caseEL.colorCode}`;
//            infoBox.className = 'InfoBox';
//            infoBox.id = 'infoBoxTest';
//            infoText.className = 'InfoBoxText';
//            infoText.id = 'test';
//            infoText.innerHTML = `${caseEL.caseDescription}`;
//            standText.className = 'StandText';
//            standText.innerHTML = `${caseEL.standName}`;
//            var tempSpluit = SplitStringWithNoNumbers(standText.innerHTML);
//            caseContainer.className = 'CaseContainer ' + colorBox.id + ' ' + standText.innerHTML + ' ' + tempSpluit;
//            caseContainer.id = `${caseEL.caseId}`;
//            append(document.getElementById('ContainerEdit'), caseContainer);
//            append(document.getElementById(caseContainer.id), colorBox);
//            append(document.getElementById(caseContainer.id), infoBox);
//            append(infoBox, infoText);
//            append(document.getElementById(caseContainer.id), standText);
//            LoadCases();
//        })
//    })
//    .catch(function (error) {
//        console.log(error);
//    })

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
    allCases = Array.from(document.querySelectorAll('.CaseContainer'));
    startSort = allCases;
    getChecked('ColorId');
    getChecked('alphabeticalOrder');
    getChecked('alphabetical');

    Array.prototype.forEach.call(allCheckboxes, function (el) {
        el.addEventListener('change', toggleCheckbox);
    });
}

var allCheckboxes;
var allCases;
var checked = {};



function toggleCheckbox(e) {


    getChecked(e.target.name);
    setVisibility();
}

function doalert(checkboxElem) {
    const boddy = document.getElementById('ContainerEdit');
    boddy.innerHTML = '';

    if (checkboxElem.checked) {

        var temp = [];
        for (var i = 0; i < allCases.length; i++) {
            var tempObj = { case: allCases[i], string: SplitString(allCases[i].className) };
            temp.push(tempObj);
        }

        temp.sort(compare);

        for (var i = 0; i < temp.length; i++) {
            append(boddy, temp[i].case);
        }

    } else {
        for (var i = 0; i < allCases.length; i++) {
            append(boddy, startSort[i]);
        }
    }
}

function getChecked(name) {
    checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
        if (name == 'alphabeticalOrder') {

            const boddy = document.getElementById('ContainerEdit');
            boddy.innerHTML = '';

            var temp = [];
            for (var i = 0; i < allCases.length; i++) {
                var tempObj = { case: allCases[i], string: SplitString(allCases[i].className) };


                temp.push(tempObj);
            }

            temp.sort(compare);

            for (var i = 0; i < temp.length; i++) {
                append(boddy, temp[i].case);
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
    allCases.map(function (el) {
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
    .then(function (data)
    {
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