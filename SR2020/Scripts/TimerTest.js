const url = 'http://192.168.137.235:44350/api/auth/login';

var countDownDate = new Date("Jun 11, 2020 14:45:00").getTime();
var tokenCountDown = new Date("Jun 11, 2020 14:45:00").getTime();
//var token;



var myfunc = setInterval(function () {

    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    //console.log(minutes + "m ");
    //console.log(seconds + "s ");
    //console.log(hours + "h ");

}, 1000)

//fetch(url) //set the url of the api
//    .then((resp) => resp.json()) // Makes the data we get from API to Json
//    .then(json => console.log(json))
