import * as React from "react";
import ReactDOM from "react-dom";
import { cx } from "@emotion/css";
import { innerCellCss, cellAlignmentCss, textCapitalize } from "../style";

export type TextAlign = "left" | "right" | "center";
export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  textAlign?: TextAlign;
  capitalize?: boolean;
  children: React.ReactElement<HTMLElement> | string;
  className?: string;
}

interface CellState {
  renderedTextContent?: string | null;
}

class Cell extends React.PureComponent<CellProps, CellState> {
  state = {
    renderedTextContent: null
  };

  getTextContent() {
    return ReactDOM.findDOMNode(this)?.textContent;
  }

  componentDidMount() {
    this.setState({ renderedTextContent: this.getTextContent() });
  }

  componentDidUpdate() {
    if (this.getTextContent() !== this.state.renderedTextContent) {
      this.setState({ renderedTextContent: this.getTextContent() });
    }
  }

  render() {
    const { children, className, textAlign, capitalize, ...other } = this.props;

    return (
      <div
        title={this.state.renderedTextContent || undefined}
        className={cx(
          innerCellCss,
          cellAlignmentCss(textAlign || "left"),
          { [textCapitalize]: capitalize },
          className
        )}
        {...other}
      >
        {children}
      </div>
    );
  }
}

export default Cell;
