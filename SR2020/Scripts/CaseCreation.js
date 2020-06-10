const caseUrl = 'http://192.168.137.235/api/cases';
const postUrl = 'http://192.168.137.235/api/cases';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function CreateContainer() {
    var div = document.createElement('div');
    div.className = 'container';
    div.id = 'ContainerEdit';
    document.getElementById("MainPage").appendChild(div);
}
CreateContainer();

fetch(caseUrl)
    .then((resp) => resp.json())
    .then(function (data) {
        var cases = data;
        return cases.map(function (caseEL) {
            var caseContainer = createNode('div');
                colorBox = createNode('div'),
                infoBox = createNode('div'),
                infoText = createNode('p');
            caseContainer.className = 'CaseContainer';
            caseContainer.id = `${caseEL.caseId}`;
            colorBox.className = 'ColorBox';
            colorBox.id = `${caseEL.colorId}`;
            infoBox.className = 'InfoBox';
            infoBox.id = 'infoBoxTest';
            infoText.className = 'InfoBoxText';
            infoText.id = 'test';
            infoText.innerHTML = `${caseEL.caseDescription}`;
            append(document.getElementById('ContainerEdit'), caseContainer);
            append(document.getElementById(caseContainer.id), colorBox);
            append(document.getElementById(caseContainer.id), infoBox);
            append(infoBox, infoText);

            //append(div, button);

        })
    })
    .catch(function (error) {
        console.log(error);
    })


//function PostData() {
//    const data = {
//        standName: $('#standName').val(),
//        colorId: SubmitColor.id,
//        caseDescription: $('#caseDescription').val()
//    }
//    console.log(data);
//    //$.post(postUrl, data, function (data, status) {
//    //    console.log(`${data} and status is ${status}`)
//    //});
//}


    var SubmitColor = document.getElementById('NoColor');
    var stander = document.getElementById('standName');
    var description = document.getElementById('caseDescription');
function PostData()
{
    (async () => {
        const rawResponse = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                standName: stander.value,
                colorId: SubmitColor.id,
                caseDescription: description.value
            })
        });
        const content = await rawResponse.json();
    })();

}
