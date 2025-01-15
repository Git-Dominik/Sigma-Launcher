import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import { followCursor, animateFill } from "tippy.js";

tippy("#Import-from-PC-TT", {
  content: "Give me the tip",

  followCursor: "horizontal",
  plugins: [followCursor, animateFill],
  placement: "top",
  arrow: true,
  animation: "shift-away",
  theme: "custom",
});


tippy("#refresh-page", {
    content: "Refresh UI",

    followCursor: "horizontal",
    plugins: [followCursor, animateFill],
    placement: "top",   
    arrow: true,
    animation: "shift-away",
    theme: "custom",
});

tippy("#favorites-button", {
    content: "Sort games by favorites",

    followCursor: "horizontal",
    plugins: [followCursor, animateFill],
    placement: "top",   
    arrow: true,
    animation: "shift-away",
    theme: "custom",
});

tippy("#all-button", {
    content: "Sort games by all",

    followCursor: "horizontal",
    plugins: [followCursor, animateFill],
    placement: "top",   
    arrow: true,
    animation: "shift-away",
    theme: "custom",
});

tippy("#sort-library-by", {
    content: "Sort games by all",

    followCursor: "horizontal",
    plugins: [followCursor, animateFill],
    placement: "top",   
    arrow: true,
    animation: "shift-away",
    theme: "custom",
});