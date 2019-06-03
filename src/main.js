import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "owl.carousel";

import "./styles.scss";

// Import images:
import armtimeconverter from "./assets/armtimeconverter.png";
import tictactoe from "./assets/tictactoe.png";
import gameoflife from "./assets/gameoflife.png";
import simongame from "./assets/simongame.png";

require("./index.html");

$(document).ready(function() {
  const works = $("#works");
  const owl = $(".owl-carousel");

  // Initiate carousel
  owl.owlCarousel({
    center: true,
    items: 1,
    nav: false,
    dots: true
  });

  // Listen for carousel events:
  owl.on("changed.owl.carousel", function(event) {
    if (event.page.index === 0) {
      works.css("background-image", `url(${tictactoe})`);
    } else if (event.page.index === 1) {
      works.css("background-image", `url(${armtimeconverter})`);
    } else if (event.page.index === 2) {
      works.css("background-image", `url(${simongame})`);
    } else if (event.page.index === 3) {
      works.css("background-image", `url(${gameoflife})`);
    }
  });
});

$(window).on("load", function() {
  var $typeElements = $(".to-type");
  var $window = $(window);

  $window.on("scroll resize", checkElInView);

  function checkElInView() {
    var winHeight = $window.height();
    var winTopPos = $window.scrollTop();
    var winBotPos = winTopPos + winHeight;

    $.each($typeElements, function() {
      var $el = $(this);
      var elHeight = $el.outerHeight();
      var elTopPos = $el.offset().top;
      var elBotPos = elTopPos + elHeight;

      if (elBotPos >= winTopPos && elTopPos <= winBotPos) {
        $el.addClass("type");
        $el.removeClass("to-type");
        $typeElements = $(".to-type");

        var txt = $el.data("text"),
          ind = txt.length;

        typeIt($el, txt, ind, function($el) {
          let $bodyEl = $el
            .parent()
            .parent()
            .children(".section-body-text");
          $bodyEl
            .slideDown(1000)
            .fadeIn(1000)
            .css("display", "block");
        });

        // if the current element is Projects, fade to armtimeconverter background
        if ($el.attr("id") === "works-header") {
          $("#works").css("background-image", `url(${tictactoe})`);
        }
      }
    });
  }

  $window.trigger("scroll");

  // Typing animation for header text
  function typeIt($el, txt, ind, func) {
    if (ind < 0) {
      if (typeof func !== "undefined" && func !== null) func($el);
      else console.log("No existing function.");
      return;
    }

    $el.text(txt.substring(0, txt.length - ind));
    window.setTimeout(function() {
      typeIt($el, txt, ind - 1, func !== null ? func : null);
    }, Math.random() * (80 - 60 + 1) + 80);
  }

  // Smooth scroll
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000
          );
          return false;
        }
      }
    });
  });
});
