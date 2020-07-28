var url = "http://192.168.137.235/api/casehistory/";

function createNodeHistory(element) {
    return document.createElement(element);
}

function appendHistory(parent, el) {
    return parent.appendChild(el);
}

function SetUrl()
{
    url = "http://192.168.137.235/api/casehistory/";
    var temp = document.getElementById('choseHistoryStand');
    url += temp.value;
    console.log(url);
}


function CaseTest()
{
    console.log("We are in");

    var boddyToClear = document.getElementById('CaseBody');
    boddyToClear.innerHTML = '';

    SetUrl();
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            var cases = data;
            return cases.map(function (caseEL) {
                var collapsible = createNodeHistory('button'),
                    content = createNodeHistory('div'),
                    caseName = createNodeHistory('div'),
                    shortDesc = createNodeHistory('p'),
                    standName = createNodeHistory('p'),
                    fixedPetersProblem = createNodeHistory('p'),
                    timer = createNodeHistory('div'),
                    contactPerson = createNodeHistory('p'),
                    description = createNodeHistory('textarea'),
                    lastStatus = createNodeHistory('p'),
                    colorBox = createNodeHistory('div'),
                    personOnCase = createNodeHistory('p');

                caseName.className = 'collapseableCaseName';
                shortDesc.innerHTML = `${ShortenDesc(caseEL.caseDescription)}`;
                shortDesc.className = 'StandName';
                shortDesc.id = 'shortDesc';
                standName.className = 'StandName';
                standName.innerHTML = `${caseEL.standName}`;
                timer.className = 'collapseableTimer';
                timer.innerHTML = `${caseEL.timeCreated}`;
                description.className = 'collapseableCommentArea';
                description.innerHTML = `${caseEL.caseDescription}`
                description.readOnly = true;
                lastStatus.className = 'lastStatus';
                lastStatus.innerHTML = `${caseEL.timeCreated}`;
                fixedPetersProblem.innerHTML = 'På sagen: ';
                fixedPetersProblem.className = 'workerOnCase';


                personOnCase.innerHTML = `${caseEL.username}`;
                personOnCase.className = 'workerOnCase';

                var tempSplit = SplitStringWithNoNumbers(standName.innerHTML);
                colorBox.className = 'ColorBox';
                colorBox.id = `${caseEL.colorCode}`;
                content.className = 'content ' + colorBox.id + ' colorSort ' + ' ' + tempSplit + ' ' + standName.innerHTML;
                collapsible.className = 'collapsible ' + colorBox.id + ' colorSort ' + ' ' + tempSplit + ' ' + standName.innerHTML;
                collapsible.id = `${caseEL.caseId}`;


                if (!sortingLetters.includes(tempSplit, 0)) {
                    sortingLetters.push(tempSplit);
                }

                //Create Input for Sorting


                //Create Button
                appendHistory(document.getElementById('CaseBody'), collapsible);
                appendHistory(collapsible, colorBox);
                appendHistory(collapsible, caseName);
                appendHistory(caseName, standName);
                appendHistory(caseName, shortDesc);
                appendHistory(collapsible, timer);

                //Create Content
                appendHistory(document.getElementById('CaseBody'), content);
                appendHistory(content, contactPerson);
                appendHistory(content, lastStatus);
                appendHistory(content, description);
                appendHistory(content, fixedPetersProblem);
                appendHistory(content, personOnCase);

                CaseClick(collapsible);
            })
        })
        .then(function () {
        })
        .catch(function (error) {
            console.log(error);
        })
}