var tokenUName;
function Test() {
    var uname = document.getElementById('Uname');
    tokenUName = uname;
    console.log(tokenUName.value);
}

var uname;

fetch('https://localhost:44350/api/auth/getuname') //set the url of the api
    .then((resp) => resp.json()) // Makes the data we get from API to Json
    .then(json => console.log(json))
