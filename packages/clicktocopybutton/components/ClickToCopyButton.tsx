import * as React from "react";
import ClickToCopy, { ClickToCopyBaseProps } from "./ClickToCopy";
import { Box } from "../../styleUtils/modifiers";
import Clickable from "../../clickable/components/clickable";
import Icon, { IconSizes } from "../../icon/components/Icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import { tintContent } from "../../shared/styles/styleUtils";

interface ClickToCopyButtonProps extends ClickToCopyBaseProps {
  /**
   * Color of the clipboard icon or button content
   */
  color?: React.CSSProperties["color"];
  /**
   * Color of the clipboard icon or button content
   */
  iconSize?: IconSizes;
  /**
   * Content to show
   */

  tooltipContent?: React.ReactNode;
  /**
   * Custom ID used for tooltip's id and aria attributes
   */
  tooltipId?: string;
}

const ClickToCopyButton: React.FC<ClickToCopyButtonProps> = ({
  children,
  color,
  iconSize,
  ...other
}) => {
  return (
    <ClickToCopy {...other}>
      {({ onClick }) => (
        <Clickable action={onClick} tabIndex={0}>
          {children ? (
            <div className={tintContent(color)}>{children}</div>
          ) : (
            <Box display="inline-block" tag="span">
              <Icon
                shape={SystemIcons.Clipboard}
                color={color}
                size={iconSize}
              />
            </Box>
          )}
        </Clickable>
      )}
    </ClickToCopy>
  );
};

ClickToCopyButton.defaultProps = {
  tooltipContent: "Copied to clipboard"
};

export default ClickToCopyButton;
