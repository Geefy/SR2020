var tokenUName;
//var GetUname = 'https://localhost:44350/api/auth/getlastlogin';
//var GetFirstToken = 'https://localhost:44350/api/auth/gettoken?username=' + tokenUName;
var UpdateToken = '';
var currentToken;
var currentExpiration;

//fetch(GetUname) //set the url of the api
//    .then((resp) => resp.text()) // Makes the data we get from API to Json
//    .then(function (data) {
//        var tokenUName = data;
//        console.log(tokenUName);
//    })

//fetch(GetFirstToken) //set the url of the api
//    .then((resp) => resp.json()) // Makes the data we get from API to Json
//    .then(function (data) {
//        currentExpiration = `${data.expiration}`
//        currentToken = `${data.token}`
//    })
//    .catch(function (error) {
//        console.log(error);
//    })


var TokenTimer = setInterval(function () {
    var TimeLeft = new Date(currentExpiration).getTime();
    var now = new Date().getTime();
    var timeleft = TimeLeft - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

    // If the count down is over, write some text 
    if (timeleft < 0) {
        clearInterval(TokenTimer);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);
