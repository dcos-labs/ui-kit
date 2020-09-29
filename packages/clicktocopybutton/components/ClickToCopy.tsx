import * as React from "react";
import copy from "copy-to-clipboard";
import { useId } from "react-id-generator";
import { Tooltip } from "../../tooltip";
import { Box } from "../../styleUtils/modifiers";

interface ChildProps {
  onClick: () => void;
}

export interface ClickToCopyBaseProps {
  /**
   * This is what will end up on the user's clipboard
   */
  textToCopy: string;

  /**
   * Function to execute after text has been copied
   */
  onCopy?: () => void;

  /**
   * Content to show
   */

  tooltipContent?: React.ReactNode;
  /**
   * Custom ID used for tooltip's id and aria attributes
   */
  tooltipId?: string;
}

interface ClickToCopyProps extends ClickToCopyBaseProps {
  /**
   * Render props to display content and trigger copy using onClick prop
   */
  children: (props: ChildProps) => JSX.Element;
}

/**
 * Consumers of this component should provide a child render prop function
 * that takes a function parameter and returns a component that executes that function using
 * a trigger element such as a button with an onClick handler.
 */
const ClickToCopy: React.FC<ClickToCopyProps> = ({
  textToCopy,
  onCopy,
  children,
  tooltipId,
  tooltipContent
}) => {
  const [generatedTooltipId] = useId(1, "copyTooltip");
  const [isTooltipShown, setIsTooltipShown] = React.useState<boolean>(false);
  const onClick = () => {
    copy(textToCopy);
    console.log("onClick is firing");
    if (onCopy && typeof onCopy === "function") {
      console.log("onCopy is a thing");
      onCopy();
    }
    setIsTooltipShown(true);
    setTimeout(() => {
      setIsTooltipShown(false);
    }, 2000);
  };

  return (
    <Box display="inline-block">
      <Tooltip
        id={tooltipId || generatedTooltipId}
        trigger={children({ onClick })}
        suppress={true}
        open={isTooltipShown}
      >
        {tooltipContent}
      </Tooltip>
    </Box>
  );
};

ClickToCopy.defaultProps = {
  tooltipContent: "Copied to clipboard"
};

export default ClickToCopy;
