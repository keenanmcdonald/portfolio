let myName = $('.my-name');
let headline = $('.headline');
let stickyPosition = myName.offset().top - parseInt(myName.css('marginTop')); //accounting for the upper margin
let headlineOffset = headline.offset().top - myName.offset().top;
let projects = [
    {name: 'CLIMBING QUIZ', description: 'This is a brief quiz to test technical knowledge of anchors and knots used in climbing. It includes some of my favorite tidbits of climbing trivia and is geared toward serious climbers and guides.', screenshot: {src: 'screenshots/climbing-quiz-screenshot.png', alt: 'a screenshot of the climbing quiz app'}, live: '', repo: '', color: '#6B839E'}
];
let sections = [$('#projects'), $('#bio'), $('#contact')];

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
/*function highlightJump(){
    if (window.pageYOffset >= $('#projects').offset().top && window.pageYOffset < $('#bio').offset().top){
        $('.jump.projects').addClass('highlight');
        $('.jump.bio').removeClass('highlight');
        $('.jump.contact').removeClass('highlight');
    }
    else if (window.pageYOffset >= $('#bio').offset().top && window.pageYOffset < $('#contact').offset().top){
        $('.jump.bio').addClass('highlight');
        $('.jump.projects').removeClass('highlight');
        $('.jump.contact').removeClass('highlight');
    }
    else if (window.pageYOffset >= $('#contact').offset().top){
        $('.jump.contact').addClass('highlight');
        $('.jump.projects').removeClass('highlight');
        $('.jump.bio').removeClass('highlight');
    }
    else{
        $('.jump.contact').removeClass('highlight');
        $('.jump.projects').removeClass('highlight');
        $('.jump.bio').removeClass('highlight');
    }
}*/

function highlightJump(){
    for (let i = 0; i < sections.length; i++){
        if (window.pageYOffset >= sections[i].offset().top && window.pageYOffset < sections[i].offset().top + sections[i].outerHeight(true)){
            $(`.${sections[i].attr('id')}`).addClass('highlight');
        }
        else{
            $(`.${sections[i].attr('id')}`).removeClass('highlight');
        }
    }
}

function generateProjects(){
    for (let i = 0; i < projects.length; i++){
        $('.project-list').append(`
            <li class="project">
                <h3>${projects[i].name}</h5>
                <div class="project-flex-container">
                    <div class = "screenshot-box">
                        <img class="screenshot" src='${projects[i].screenshot.src}' alt='${projects[i].screenshot.alt}'>
                    </div>
                    <div class="description-box">
                        <p class="description">${projects[i].description}</p>
                    </div>
                </div>
            </li>
        `)
    }
    
}

function handelListeners(){
    $('.jump').click(function(e) {
        e.preventDefault();
        jumpToPosition(this);
    })
    window.addEventListener('scroll', stickToTop);
    window.addEventListener('scroll', highlightJump);
}

function jumpToPosition(object){
    $("body, html").animate({ 
        scrollTop: $($(object).attr('href')).offset().top + 1
    }, 200);
}




function handlePortfolio(){
    generateProjects();
    highlightJump();
    handelListeners();
}

$(handlePortfolio);