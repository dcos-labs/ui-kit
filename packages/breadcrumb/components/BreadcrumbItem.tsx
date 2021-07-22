import * as React from "react";
import { IconShapes } from "../../icon/components/Icon";
import ResetLink from "../../link/components/ResetLink";
import IconPropAdapter from "../../icon/components/IconPropAdapter";
import { Flex, FlexItem } from "../../styleUtils/layout";

interface BreadcrumbItemProps {
  url?: string;
  onClick?: () => void;
  icon?: IconShapes | React.ReactElement<HTMLElement>;
  children: React.ReactNode;
}
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  icon,
  url,
  onClick,
  children
}) => {
  const content =
    url || onClick ? (
      <ResetLink url={url} onClick={onClick}>
        {children}
      </ResetLink>
    ) : (
      <span>{children}</span>
    );

  return icon ? (
    <Flex align="center" gutterSize="m">
      <FlexItem flex="shrink">
        <IconPropAdapter icon={icon} size="s" color="inherit" />
      </FlexItem>
      <FlexItem>{content}</FlexItem>
    </Flex>
  ) : (
    content
  );
};

export default BreadcrumbItem;
