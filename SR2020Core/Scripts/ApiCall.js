﻿//const url = 'https://randomuser.me/api/?results=25';
const postUrl = 'http://192.168.137.235/api/stand';

//fetch(url) //set the url of the api
//    .then((resp) => resp.json()) // Makes the data we get from API to Json
//    .then(function (data) {
//        var authors = data.results;
//        return authors.map(function (author) {
//            var li = createNode('li'),
//                img = createNode('img'),
//                span = createNode('span');
//            img.src = author.picture.medium;
//            span.innerHTML = `${author.name.first} ${author.name.last}`;
//            const ul = document.getElementById('authors');
//            append(li, img);
//            console.log(img);
//            append(li, span);
//            console.log(span);
//            console.log(ul);
//            append(ul, li);
//        })
//    })
//    .catch(function (error) {
//        console.log(error);
//    })

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function PostStand() {
var stand = document.getElementById('stand');
var owner = document.getElementById('owner');
var phone = document.getElementById('phone');
    (async () => {
        const rawResponse = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                StandName: stand.value,
                RentingOwner: owner.value,
                PhoneNumber: phone.value
            })
        });
        const content = await rawResponse.json();
        console.log(content);
    })();

}
