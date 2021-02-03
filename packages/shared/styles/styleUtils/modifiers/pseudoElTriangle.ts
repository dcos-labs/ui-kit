import { css } from "@emotion/css";

export const pseudoElTriangle = (
  pointDir: "top" | "bottom",
  triangleSize: number,
  color: string
) => {
  const triangleBaseStyles = `
      content: "";
      height: 0;
      width: 0;
    `;

  switch (pointDir) {
    case "top":
      return css`
          ${triangleBaseStyles}
          border-top: ${triangleSize}px solid ${color};
          border-left: ${triangleSize}px solid transparent;
          border-right: ${triangleSize}px solid transparent;
          border-bottom: none;
        `;
    case "bottom":
      return css`
          ${triangleBaseStyles}
          border-bottom: ${triangleSize}px solid ${color};
          border-left: ${triangleSize}px solid transparent;
          border-right: ${triangleSize}px solid transparent;
          border-top: none;
        `;
  }
};
