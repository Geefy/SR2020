var colorModal = document.getElementById("colorModal");
var upadteCaseModal = document.getElementById("upadteCaseModal");
var closeCaseModal = document.getElementById("closeCaseModal");
//var div = document.getElementsByClassName("SpecialColorBox");
var span = document.getElementsByClassName("close")[0];
var updateSpan = document.getElementsByClassName("close")[1];
var closeSpan = document.getElementsByClassName("close")[2];
//click on div to open modal


function OpenColorModal() {
    colorModal.style.display = "block";
}

function OpenUpadteCaseModal(caseId, standName) {
    GetTempVar(caseId, standName);
    upadteCaseModal.style.display = "block";
}

function OpenCloseCaseModal(caseId) {
    GetTempVar(caseId, '');
    closeCaseModal.style.display = "block";
}
//Click the X to close modal
span.onclick = function() {
    colorModal.style.display = "none";
}

updateSpan.onclick = function () {
    upadteCaseModal.style.display = "none";
}

closeSpan.onclick = function () {
    closeCaseModal.style.display = "none";
}


//When click out side of modal close modal.
window.onclick = function (event) {
    if (event.target == colorModal) {
        colorModal.style.display = "none";
    }
    if (event.target == upadteCaseModal) {
        upadteCaseModal.style.display = "none";
    }
    if (event.target == closeCaseModal) {
        closeCaseModal.style.display = "none";
    }

}