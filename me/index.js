/* Some javascript to control the adding of animation classes to the first step svg */
(() => {
  var planetClicked = false,
    currentId = "",
    ignoreHistory = true;

  // When the sun is clicked - reveal the planets
  document.getElementById("sun").addEventListener("click", function () {
    reveal(100);
  }, false);

  function reveal(timeout) {
    // Animate all the planets out
    function revealPlanets(planetIndex) {
      setTimeout(function () {
        document.getElementById("planet" + (planetIndex + 1)).classList.add('sneak-out');
      }, (planetIndex) * timeout);

      if (planetIndex > 0) {
        revealPlanets(planetIndex - 1);
      }
    }

    revealPlanets(10);

    // Animate sun and shadow to move after everything else has finished
    setTimeout(() => {
      document.getElementById("sun-shadow").classList.add('sneak-out');
      document.getElementById("sun").classList.add('sneak-out');
    }, timeout * 10);
  }

  // If location ends with -article - we are coming back to this page and want a planet activated
  if (window.location.hash.indexOf("-article", window.location.hash.length - 8) !== -1) {
    document.querySelectorAll(".planet").forEach(planet => { planet.classList.add('sneak-out') })
    let initialPlanetId = window.location.hash.substring(1, window.location.hash.length - 8);
    let initialPlanet = document.getElementById(initialPlanetId);
    if (initialPlanet) {
      activatePlanet.apply(initialPlanet);
    }
  }

  // When a planet is clicked - show the article
  document.querySelectorAll(".planet, .close").forEach(element => element.addEventListener("click", function () {
    activatePlanet.apply(element);
  }));

  function activatePlanet() {
    if (!planetClicked) {
      currentId = this.getAttribute("id");
      // Hide stuff
      document.querySelectorAll(".planet, #sun, #sun-shadow").forEach(element => element.style.display = 'none');
      // Show the right planet + info
      this.style.display = '';
      document.getElementById(currentId + "-article").style.display = 'block';
      // Animate it in
      document.getElementById(currentId).classList.remove('sneak-out');
      document.getElementById(currentId).classList.add('header');

      document.querySelector("svg").setAttribute('height', '130px');
      planetClicked = true;
      // Make sure we are at the top
      window.scrollTo(0, 0);
    } else {
      hideCurrentArticle();
    }
  }

  // Hide the current article
  function hideCurrentArticle() {
    if (planetClicked) {
      // Show all planets and the sun
      document.querySelectorAll(".planet, #sun, #sun-shadow").forEach(element => element.style.display = '');
      // Hide the article
      document.getElementById(currentId + "-article").style.display = 'none';
      document.querySelector("svg").setAttribute('height', '1800px');
      document.getElementById(currentId).classList.remove('header');
      document.getElementById(currentId).classList.add('sneak-out');
      reveal(0);
      ignoreHistory = true;
      window.location = "#";
      ignoreHistory = false;      
      planetClicked = false;
    }
  }

  // Respond to browser history (back button) - All we have to do is work out if we are hidding an article
  window.onpopstate = function (event) {
    if (!ignoreHistory && (window.location.hash === "#" || window.location.hash === "")) {
      hideCurrentArticle();
    }
  };

  // Hovering animations
  document.getElementById("sun").addEventListener("mouseover", () => {
    document.getElementById("sun").classList.add("enlarge");
  });
  document.getElementById("sun").addEventListener("mouseout", () => {
    document.getElementById("sun").classList.remove("enlarge")
  });


  // Sneak out the shadow	
  document.getElementById("sun-shadow").classList.add("initial");

  // Allow triggering of history
  ignoreHistory = false;

  // Get the planets out
  setTimeout(()=>reveal(100),100);
  
})();