const app = {
    pages: [],
    show: new Event('show'),
    init: function () {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Home', '#home');
        //window.addEventListener('popstate', app.poppin)
        document.getElementById('btnsure').addEventListener('popstate', app.poppin);
    },

    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
    },

    pageShown: function (ev) {
    },

    poppin: function (ev) {
        console.log(location.hash, 'helloworld')
    }
}

document.addEventListener('DOMContentLoaded', app.init);