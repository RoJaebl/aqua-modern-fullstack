import $ from "jquery";
import { gsap } from "gsap";
import { EaselPlugin } from "gsap/EaselPlugin";

gsap.registerPlugin(EaselPlugin);

const goAwayTl = gsap
  .timeline({ defaults: { duration: 1 } })
  .to(".flash-message", {
    delay: 0.3,
    ease: "elastic.out(1,0.9)",
    y: 250,
  })
  .to(
    ".flash-message",
    {
      ease: "back.in(1)",
      y: -250,
    },
    "goAway"
  );
$(".flash-message").on({
  click: async () => {
    $(".flash-message").off("click");
    goAwayTl.play("goAway");
  },
});
