const app = {
    pages: [],
    show: new Event('show'),
    init: function () {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'MainPage', '?page=MainPage');
        window.addEventListener('hashchange', app.poppin); //Looks for change in url
    },

    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        history.pushState({}, currentPage, "?page=" + currentPage);
    },

    pageShown: function (ev) {
    },

    poppin: function (ev) {
        console.log(location.hash, 'helloworld')
    }
}

//function myfunc() {
//    console.log(location.hash, 'Hello world');
//}

document.addEventListener('DOMContentLoaded', app.init);