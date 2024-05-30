import $ from "jquery";
import { gsap } from "gsap";
import { EaselPlugin } from "gsap/EaselPlugin";

gsap.registerPlugin(EaselPlugin);

gsap.to(".flash-message", {
  delay: 0.3,
  duration: 1,
  ease: "elastic.out(1,0.9)",
  y: 250,
});
const goAway = gsap
  .to(".flash-message", {
    duration: 1,
    ease: "back.in(1)",
    y: -250,
  })
  .pause();
$(function () {
  const id = setTimeout(() => {
    goAway.play();
  }, 3000);
  $(".flash-message").on({
    click: () => {
      clearTimeout(id);
      goAway.play();
    },
  });
});
