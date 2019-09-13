let myName = $('.my-name');
let headline = $('.headline');
let stickyPosition = myName.offset().top - parseInt(myName.css('marginTop')); //accounting for the upper margin
let headlineOffset = headline.offset().top - myName.offset().top;
let projects = [
    {name: 'Climbing Quiz', description: 'This is a brief quiz to test technical knowledge of anchors and knots used in climbing. It includes some of my favorite tidbits of climbing trivia and is geared toward serious climbers and guides.', technologies: 'This app was made using HTML, CSS, and Javascript.', screenshot: {desktop: 'images/screenshots/climbing-quiz-screenshot.png', mobile: 'images/screenshots/climbing-quiz-screenshot-mobile.png', alt: 'a screenshot of the climbing quiz app'}, live: 'https://keenanmcdonald.github.io/climbing-quiz-app', repo: 'https://github.com/keenanmcdonald/climbing-quiz-app', color: '#6B839E'},
    {name: 'Roadside Classics', description: `An Application that allows users to enter a driving route, then search Mountain Project for climbs that are close by. Users can specify the type of climbs they're looking for (sport, trad, ice, etc.) as well as a range of grades they're interested in, and a number of pitches. Climbs are then displayed on the map next to the driving route with some information about the climb and the ability to follow a link to the Mountain Project page or add the climb to the driving route.`, technologies: `This app was made using HTML, CSS, JavaScript with JQuery. LeafletJS library was used to generate maps, Leaflet Routing Machine for routing, Mapbox API for map data, Mountain Project API for climbing data`, screenshot: {desktop: 'images/screenshots/roadside-classics-screenshot-desktop.png', mobile: 'images/screenshots/roadside-classics-screenshot-mobile.png', alt: 'a screenshot of the roadside classics application'}, live: 'https://keenanmcdonald.github.io/roadside-classics', repo: 'https://github.com/keenanmcdonald/roadside-classics', color: 'rgb(70, 155, 252)'}
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