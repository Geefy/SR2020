function CreateContainer() {
    var div = document.createElement('div');
    div.className = 'container';
    div.id = 'ContainerEdit';
    document.getElementById("MainBody").appendChild(div);

}

function CreateCase() {
    var caseContainer = document.createElement('div');
    caseContainer.className = 'CaseContainer';
    caseContainer.id = '1';
    var colorBox = document.createElement('div');
    colorBox.className = 'ColorBox';
    colorBox.id = 'Green';
    var infoBox = document.createElement('div');
    infoBox.className = 'InfoBox';
    infoBox.id = 'infoBoxTest'
    var InfoText = document.createElement('p');
    InfoText.innerHTML = "Text";
    InfoText.className = 'InfoBoxText';
    InfoText.id = 'test';
    document.getElementById('ContainerEdit').appendChild(caseContainer);
    document.getElementById('1').appendChild(colorBox);
    document.getElementById('1').appendChild(infoBox);
    document.getElementById('infoBoxTest').appendChild(InfoText);
}

var x = "hello world";