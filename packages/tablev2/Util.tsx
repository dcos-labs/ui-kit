import * as React from "react";
import { css } from "@emotion/css";
import { Icon } from "../icon";
import { SystemIcons } from "../icons/dist/system-icons-enum";
import * as dt from "../design-tokens/build/js/designTokens";
import { RESIZE_ICON_SIZE } from "./style";

///////////////////////////////////////////////////////////////////////////////
//                                 DRAGGABLE                                 //
///////////////////////////////////////////////////////////////////////////////

let initialX: number = 0;
export const className = css`
  padding: 0 0.25em;
  cursor: col-resize;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${dt.themeBgPrimary};
  opacity: var(--draggable-opacity);
  &:hover {
    background-color: ${dt.themeBgHover};
  }
`;

type E = React.MouseEvent;
/**
 * The draggable small handler used to size table columns.
 */
export const Draggable = (props: {
  onRelativeXChange: (i: number) => void;
}) => {
  const [x, setX] = React.useState(0);

  const updateMousePosition = (e: MouseEvent) => {
    setX(e.clientX - initialX);
  };

  const onMouseUp = (e: MouseEvent) => {
    props.onRelativeXChange(e.clientX - initialX);
    setX(0);
    document.removeEventListener("mousemove", updateMousePosition);
    document.removeEventListener("mouseup", onMouseUp);
  };
  const onMouseDown = (e: E) => {
    initialX = e.clientX;
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={className}
      style={{ transform: `translate(${x}px, 0)` }}
      role="button"
    >
      <div>
        <Icon
          shape={SystemIcons.ResizeHorizontal}
          size={RESIZE_ICON_SIZE}
          color={dt.textColorSecondary}
        />
      </div>
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////
//                                  SORTERS                                  //
///////////////////////////////////////////////////////////////////////////////

export type SorterFactory<T> = <B extends string, A extends Record<B, T>>(
  prop: B
) => Sorter<A>;

const string: SorterFactory<string | null | undefined> = prop => (_, dir) => (
  a,
  b
) => {
  // null/undefined sort after anything else
  if (a[prop] == null) {
    return 1;
  }
  if (b[prop] == null) {
    return -1;
  }
  return dir * (a[prop] || "")!.localeCompare((b[prop] || "")!);
};

const number: SorterFactory<number | null | undefined> = prop => (_, dir) => (
  a,
  b
) => {
  // null/undefined sort after anything else
  if (a[prop] == null) {
    return 1;
  }
  if (b[prop] == null) {
    return -1;
  }
  return dir * ((a[prop] || 0)! - (b[prop] || 0)!);
};

export type Sorter<A> = (
  dir: "asc" | "desc",
  /**
   * convenience-argument to directly multiply in sort operations without having to translate "asc" and "desc"
   * asc => 1
   * desc => -1
   */
  mult: -1 | 1
) => (a: A, b: A) => number;
export const Sorter = {
  /**
   * A helper that returns a function comparing two objects by a given property
   * via localeCompare - if those are present. `null`s and `undefined`s will
   * always be sorted to be at the bottom - indenpendent of the sorting order.
   * If you want those undefined values to be sorted as well, you might want to
   * try something like this:
   * ```typescript
   *   sorter: (_, dir) => (a, b) => dir * (a.MYPROP ?? "").localeCompare(b.MYPROP ?? "")
   * ```
   */
  string,
  /**
   * A helper that returns a function comparing two objects by a given property
   * by number - if those are present. `null`s and `undefined`s will
   * always be sorted to be at the bottom - indenpendent of the sorting order.
   * If you want those undefined values to be sorted as well, you might want to
   * try something like this:
   * ```typescript
   *   sorter: (_, dir) => (a, b) => dir * ((a.MYPROP ?? -Infinity) - (a.MYPROP ?? -Infinity))
   * ```
   */
  number
};
