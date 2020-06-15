var url = "https://192.168.137.235/api/auth/login";
//var TokenTimer = setInterval(function () {
//    var now = new Date().getTime();
//    var timeleft = TokenTimer - now;


//    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
//    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
//    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);



//}, 1000)


//fetch(url) //set the url of the api
//    .then((resp) => resp.json()) // Makes the data we get from API to Json
//    .then(function (data) {
//        console.log(data);


//})

function PostData() {
    (async () => {
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: "Easy2Write",
                password: "LongAndEasy2!"
            })
        });
        const content = await rawResponse.json();
        console.log(content);
    })();



}




