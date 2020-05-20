const url = 'https://randomuser.me/api/?results=1';


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
            var ul = document.getElementById('WeAreTesting');
            append(li, img);
            console.log(img);
            append(li, span);
            console.log(span);
            console.log(ul);
            append(ul, li);
        })
    })
    .catch(function (error) {
        console.log(error);
    })

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}