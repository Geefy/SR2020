var modal = document.getElementById("myModal");
//var div = document.getElementsByClassName("SpecialColorBox");
var span = document.getElementsByClassName("close")[0];

//click on div to open modal
function OpenModal() {
    modal.style.display = "block";
}

//Click the X to close modal
span.onclick = function() {
    modal.style.display = "none";
}

//When click out side of modal close modal.
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}