const ul = document.getElementById('authors');
const url = 'https://randomuser.me/api/?results=1';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}


fetch(url) //set the url of the api
    .then((resp) => resp.json()) // Makes the data we get from API to Json
    .then(function (data) {
        var authors = data.results;
        return authors.map(function (author) {
            var li = createNode('li'),
                img = createNode('img'),
                span = createNode('span');
            img.src = author.picture.medium;
            span.innerHTML = `${author.name.first} ${author.name.last}`;
            append(li, img);
            append(li, span);
            append(ul, li);
        })
    })
    .catch(function (error) {
        console.log(error);
    })