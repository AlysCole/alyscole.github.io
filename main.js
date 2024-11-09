window.addEventListener("load", () => {
    const dimensions = document.body.getBoundingClientRect();
    const screenWidth = dimensions.height;
    const screenHeight = dimensions.width;

    console.log("Window dimensions:", screenWidth, screenHeight);

    const squareColumns = Math.floor(screenWidth / (62));
    const squareRows = Math.round(screenHeight / (62));
    const numberOfSquares = squareColumns * squareRows;

    console.log("Square Columns / Square Rows:", squareColumns, "/", squareRows);

    const squareContainer = document.querySelector(".square-container");

    for (let i = 0; i < numberOfSquares; i++) {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
    
      squareContainer.appendChild(squareDiv);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function isScrolledIntoView(el) {
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        // Partially visible elements return true:
        //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
    }

    const sidebarLinks = document.querySelectorAll(".sidebar__nav > ul > li > a");
    const sidebarLinkEls = {
        aboutMe: document.querySelector(".sidebar__nav > ul > li > .nav__link.about"),
        projects: document.querySelector(".sidebar__nav > ul > li > .nav__link.projects"),
        contact: document.querySelector(".sidebar__nav > ul > li > .nav__link.contact")
    }

    document.addEventListener("scroll", () => {
        // Check which section is scrolled into view
        const aboutMeSection = document.getElementById("#about-me");
        const projectsSection = document.getElementById("#projects");
        // const contactMeSection = document.getElementById("#contact-me");

    })
});