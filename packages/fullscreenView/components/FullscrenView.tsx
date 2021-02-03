import * as React from "react";
import { cx } from "@emotion/css";
import Delegate from "react-delegate-component";
import { ButtonProps } from "../../button/components/ButtonBase";
import { flex, padding, flexItem } from "../../shared/styles/styleUtils";
import { modalContent, fullscreenModalHeader } from "../style";
import FullscreenViewHeader from "./FullscreenViewHeader";

interface FullscreenViewProps {
  /** The primary button */
  ctaButton?: React.ReactElement<ButtonProps>;
  /** The text for the secondary button that closes the view */
  closeText: React.ReactNode;
  /** The title that appears in the header */
  title: React.ReactNode;
  /** The subtitle that appears in the header */
  subtitle?: React.ReactNode;
  /** Whether we automatically add padding to the body of the modal. */
  isContentFlush?: boolean;
  /** Custom header content component. ⚠️Use rarely and with caution⚠️ */
  headerComponent?: React.ReactNode;
  /** Function that gets called when the modal is closed */
  onClose: (event?: React.SyntheticEvent<HTMLElement>) => void;
  /** The base of the `data-cy` value. This is used for writing selectors in Cypress. */
  cypressSelectorBase?: string;
}

class FullscreenView extends React.PureComponent<FullscreenViewProps, {}> {
  public render() {
    const {
      children,
      ctaButton,
      closeText,
      isContentFlush,
      onClose,
      title,
      subtitle,
      headerComponent,
      cypressSelectorBase = "fullscreenView"
    } = this.props;

    return (
      <div className={flex({ direction: "column" })}>
        <div
          className={cx(fullscreenModalHeader, padding("all", "xl"))}
          data-cy={`${cypressSelectorBase}-header`}
        >
          <Delegate
            to={headerComponent}
            default={FullscreenViewHeader}
            props={{ title, subtitle, ctaButton, closeText, onClose }}
          />
        </div>
        <div
          className={cx(modalContent, flexItem("grow"), {
            [padding("all", "xl")]: !isContentFlush
          })}
          data-cy={`${cypressSelectorBase}-content`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default FullscreenView;
