let currentScrolledSection;

window.addEventListener("load", () => {
  const dimensions = document.body.getBoundingClientRect();
  const screenWidth = dimensions.height;
  const screenHeight = dimensions.width;

  console.log("Window dimensions:", screenWidth, screenHeight);

  // const squareColumns = Math.floor(screenWidth / (62));
  // const squareRows = Math.round(screenHeight / (62));
  // const numberOfSquares = squareColumns * squareRows;

  // console.log("Square Columns / Square Rows:", squareColumns, "/", squareRows);

  // const squareContainer = document.querySelector(".square-container");

  // for (let i = 0; i < numberOfSquares; i++) {
  //   const squareDiv = document.createElement("div");
  //   squareDiv.classList.add("square");

  //   squareContainer.appendChild(squareDiv);
  // }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  const sidebarLinkEls = {
    hero: document.querySelector(".sidebar__nav > ul > li > .nav__link.hero"),
    aboutMe: document.querySelector(
      ".sidebar__nav > ul > li > .nav__link.about"
    ),
    projects: document.querySelector(
      ".sidebar__nav > ul > li > .nav__link.projects"
    ),
    contact: document.querySelector(
      ".sidebar__nav > ul > li > .nav__link.contact"
    ),
  };

  const sections = {
    hero: document.getElementsByClassName("hero")?.[0],
    contact: document.getElementById("contact"),
    projects: document.getElementById("projects"),
    aboutMe: document.getElementById("about-me"),
  };

  const resetHighlightedLinks = () => {
    for (linkKey in sidebarLinkEls) {
      const el = sidebarLinkEls?.[linkKey];
      if (sidebarLinkEls.hasOwnProperty(linkKey)) {
        el.classList.remove("highlighted__text");
      }
    }
  };

  document.addEventListener("scroll", () => {
    const keysInOrder = ["contact", "projects", "aboutMe", "hero"];
    for (let i = 0; i < keysInOrder?.length; i++) {
      const sectionKey = keysInOrder?.[i];
      const el = sections?.[sectionKey];
      console.log("Current section:", el, sections, sectionKey);

      if (isScrolledIntoView(el) && currentScrolledSection !== sectionKey) {
        resetHighlightedLinks();

        const link = sidebarLinkEls?.[sectionKey];
        console.log("Link to be highlighted:", link);
        link.classList.add("highlighted__text");

        currentScrolledSection = sectionKey;
      }
    }
  });

  const anglesDown = document.getElementsByClassName("angles-down")?.[0];

  anglesDown.addEventListener("click", () => {
    console.log("Main Body");
    anglesDown.scrollIntoView({
      behavior: "smooth",
    });
  });

  const homeLinks = document.querySelectorAll(".nav__link.hero");
  homeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
