let myName = $('.my-name');
let headline = $('.headline');
let stickyPosition = myName.offset().top - parseInt(myName.css('marginTop')); //accounting for the upper margin
let headlineOffset = headline.offset().top - myName.offset().top;
let projects = [
    {name: 'onBelay', description: `onBelay is a partner finder app for Rock Climbers. I created it because I and many other climbers in the community have trouble connecting quickly and easily with climbing partners especially when travelling. It let's climbers connect with other potential climbing partners that climb similar styles and within the same range of grades.`, technologies: 'Front End: Javascript, React Back End: NodeJS, Express, Postgresql, PostGIS', screenshot: {desktop: 'images/screenshots/onbelay-desktop.png', mobile: 'images/screenshots/onbelay-mobile.png', alt: 'a screenshot of onBelay'}, live: 'www.onbelayapp.com/', repo: 'https://github.com/keenanmcdonald/onbelay-app', color: '#5BD393'},
    {name: 'Terra', description: 'Terra is a mapping app geared towards hikers, climbers, mountaineers. It is intended to make planning for mountain ascents easier as it gives a detailed, 3D view of terrain rather than a flat topo map. It allows users to drop waypoints and draw routes on a 3D terrain map of the world. Users can share their routes with the community and access routes left by others.', technologies: 'Front End: Javascript, React, CesiumJS library used for 3D mapping, Resium used to help integrate Cesium with React. \nBack End: NodeJS, Express.', screenshot: {desktop: 'images/screenshots/terra-desktop.png', mobile: 'images/screenshots/terra-mobile.png', alt: 'a screenshot of Terra'}, live: 'https://terra-app.keenanmcdonald.now.sh/', repo: 'https://github.com/keenanmcdonald/terra-app', color: '#74C042'},
    {name: 'Roadside Classics', description: `An Application that allows users to enter a driving route, then search Mountain Project for climbs that are close by. Users can specify the type of climbs they're looking for (sport, trad, ice, etc.) as well as a range of grades they're interested in, and a number of pitches. Climbs are then displayed on the map next to the driving route with some information about the climb and the ability to follow a link to the Mountain Project page or add the climb to the driving route.`, technologies: `Technologies: HTML, CSS, JavaScript with JQuery. LeafletJS library was used to generate maps, Leaflet Routing Machine for routing, Mapbox API for map data, Mountain Project API for climbing data`, screenshot: {desktop: 'images/screenshots/roadside-classics-screenshot-desktop.png', mobile: 'images/screenshots/roadside-classics-screenshot-mobile.png', alt: 'a screenshot of the roadside classics application'}, live: 'https://keenanmcdonald.github.io/roadside-classics', repo: 'https://github.com/keenanmcdonald/roadside-classics', color: 'rgb(70, 155, 252)'},
    {name: 'Lost Art Records', description: `Website commissioned by record label Lost Art Records. This is a static site consisting of only a landing page and a page for each of the albums.`, technologies: 'Javascript, React', screenshot: {desktop: 'images/screenshots/lostart-desktop.png', mobile: 'images/screenshots/lostart-mobile.png', alt: `a screenshot of Lost Art Records' site`}, live: 'www.lostartrecords.com/', repo: 'https://github.com/keenanmcdonald/lost-art-records', color: '#121212'}
];
let sections = [$('#projects'), $('#bio'), $('#contact')];

//makes my-name heading stick to the nav bar on scroll
function stickToTop(){
    if (window.pageYOffset > stickyPosition) {
        myName.addClass("sticky");
        headline.css('top', `${headlineOffset}px`);
    } 
    else {
        myName.removeClass("sticky");
        headline.css('top', '');
    }
}

//highlights jump elements in Nav when window scrolls to their corresponding sections on the page
function highlightJump(){
    for (let i = 0; i < sections.length; i++){
        if (window.pageYOffset >= sections[i].offset().top - $('nav').outerHeight(true) && window.pageYOffset < sections[i].offset().top + sections[i].outerHeight(true) - $('nav').outerHeight(true)){
            $(`.${sections[i].attr('id')}`).addClass('highlight');
        }
        else{
            $(`.${sections[i].attr('id')}`).removeClass('highlight');
        }
    }
}

//takes the projects array and displays all projects contained within it
function generateProjects(){
    for (let i = 0; i < projects.length; i++){
        $('.project-list').append(`
            <li class="project">
                <h3>${projects[i].name}</h3>
                <div class="project-flex-container">
                    <div class = "screenshot-box">
                        <img class="screenshot desktop" src='${projects[i].screenshot.desktop}' alt='${projects[i].screenshot.alt}'>
                        <img class="screenshot mobile" src='${projects[i].screenshot.mobile}' alt='${projects[i].screenshot.alt}'>
                    </div>
                    <div class="description-box">
                        <p class="description">${projects[i].description}</p>
                        <p class="description">${projects[i].technologies}</p>
                        <p class="project-links">
                            <a href=${projects[i].live} target="_blank">live</a><a href=${projects[i].repo} target="_blank">repo</a>
                        </p>
                    </div>
                </div>
            </li>
        `)
    }
    
}

//nav functionality, scrolls to position of the corresponding section when a nav button is clicked
function jumpToPosition(object){
    $("body, html").animate({ 
        scrollTop: $($(object).attr('href')).offset().top - $('nav').outerHeight(true)
    }, 200);
}

function handelListeners(){
    $('.jump').click(function(e) {
        e.preventDefault();
        jumpToPosition(this);
    })
    window.addEventListener('scroll', stickToTop);
    window.addEventListener('scroll', highlightJump);
}

function handlePortfolio(){
    generateProjects();
    highlightJump();
    handelListeners();
}

$(handlePortfolio);