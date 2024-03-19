import {
  computePosition,
  shift,
  offset,
  arrow,
  autoPlacement,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.3/+esm";

const button = document.querySelector("#button");
const tooltip = document.querySelector("#tooltip");
const arrowElement = document.querySelector("#arrow");

function updateTooltipPosition(params) {
  computePosition(button, tooltip, {
    middleware: [
      offset(8),
      shift({ padding: 8 }),
      arrow({ element: arrowElement }),
      autoPlacement({
        alignment: "bottom",
        autoAlignment: true,
        allowedPlacements: ["top-start", "bottom-end"],
        crossAxis: true,
      }),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = middlewareData.arrow;

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : "",
      top: arrowY != null ? `${arrowY}px` : "",
      right: "",
      bottom: "",
      [staticSide]: "-4px",
    });
  });
}

// Update tooltip position initially and on scroll
updateTooltipPosition();
window.addEventListener("scroll", updateTooltipPosition);
