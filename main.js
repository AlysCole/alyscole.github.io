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

});