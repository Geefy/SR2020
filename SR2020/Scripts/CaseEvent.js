var caseId;
var standName;
var baseUrl = 'http://192.168.137.235/api/cases/'


var user = document.getElementById('hUser').value;
var updateColor = document.getElementById('NoColorModal');
var updateDescription = document.getElementById('updateDescription');
function UpdateCase() {
    var time = GetTimeNow();
    (async () => {
        const rawResponse = await fetch(baseUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                caseId: caseId,
                standName: standName,
                colorCode: updateColor.id,
                lastUpdate: time,
                caseDescription: updateDescription.value,
                userName: user
            })
        });
    })();

}
function CloseCase() {
    var closeurl = baseUrl + caseId;
    (async () => {
        const rawResponse = await fetch(closeurl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    })();



    console.log('close' + caseId);
}
function GetTempVar(temp, _standName) {
    if (_standName != '')
        standName = _standName;
    caseId = temp;
}