import * as React from "react";
import { MonospaceText } from "../../styleUtils/typography";
import { SpacingBox } from "../../styleUtils/modifiers";
import { Flex, FlexItem } from "../../styleUtils/layout";
import {
  greyDark,
  themeTextColorPrimaryInverted
} from "../../design-tokens/build/js/designTokens";
import { ClickToCopyButton } from "../../clicktocopybutton";
import { codeSnippet } from "../style";

export interface CodeSnippetProps {
  children?: string;

  /**
   * This is what will end up on the user's clipboard
   */
  textToCopy?: string;

  /**
   * Function to execute after text has been copied
   */
  onCopy?: () => void;

  /**
   *
   */
  copyTooltipContent?: React.ReactNode;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  children,
  copyTooltipContent,
  textToCopy,
  onCopy
}) => (
  <SpacingBox bgColor={greyDark} className={codeSnippet}>
    <Flex>
      <FlexItem>
        <MonospaceText color={themeTextColorPrimaryInverted}>
          {children}
        </MonospaceText>
      </FlexItem>
      {textToCopy ? (
        <FlexItem flex="shrink">
          <ClickToCopyButton
            textToCopy={textToCopy}
            onCopy={onCopy}
            color={themeTextColorPrimaryInverted}
            tooltipContent={copyTooltipContent}
          />
        </FlexItem>
      ) : null}
    </Flex>
  </SpacingBox>
);

export default CodeSnippet;
