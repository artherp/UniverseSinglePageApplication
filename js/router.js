export class Router {
    routes = {};
    backgrounds = {
        "/home": '../assets/bg2.png',
        "/universe": '../assets/mountains-universe-1%201.png',
        "/explore": '../assets/bg3.png'
    };

    add(routeName, page) {
        this.routes[routeName] = page;
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();

        const path = event.target.href || '/home'; 
        window.history.pushState({}, "", path);

        this.handle();
    }

    handle() {
        const { pathname } = window.location;
        const route = this.routes[pathname] || this.routes['/home']; 
        this.bgChange(pathname);

        const appElement = document.querySelector('#app');
        appElement.classList.add('slide-out');

        setTimeout(() => {
            fetch(route)
            .then(data => data.text())
            .then(html => {
                appElement.innerHTML = html;
                appElement.classList.remove('slide-out');
                appElement.classList.add('slide-in');
            });
        }, 500); 

        setTimeout(() => {
            appElement.classList.remove('slide-in');
        }, 1000); 
    }

    bgChange(pathname) {
        const bg = this.backgrounds[pathname] || this.backgrounds["/home"]; 
        document.body.style.backgroundImage = `url(${bg})`;
    }
}
