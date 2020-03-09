import React from "react";
import { cx } from "emotion";
import { LinkProps } from "../types";
import { linkReset } from "../../shared/styles/styleUtils/resets/linkReset";

const TestComponent: React.StatelessComponent<{
  testProp: string;
  href: string;
  target: string;
  children: React.ReactNode;
}> = props => <div {...props} />;
type ResetLinkProps = {
  href: string | undefined;
  target: string | undefined;
  children?: React.ReactNode;
};
function ResetLink<P extends ResetLinkProps>({
  children,
  className,
  href,
  openInNewTab,
  target,
  url,
  src,
  component: NewComponent,
  ...other
}: LinkProps & {
  component: React.SFC<P>;
} & P) {
  return React.createElement(
    NewComponent,
    { href: href || url, target: !target && openInNewTab ? "_blank" : target },
    children
  );

  return (
    <NewComponent
      href={href || url}
      target={!target && openInNewTab ? "_blank" : target}
      // className={cx(linkReset, className)}
      // https://web.dev/external-anchors-use-rel-noopener/
      // rel={target === "_blank" || openInNewTab ? "noopener" : undefined}
      // {...other}
    >
      {children}
    </NewComponent>
  );
}
// const ResetLink = ({
//   children,
//   className,
//   href,
//   openInNewTab,
//   target,
//   url,
//   testProp,
//   component,
//   ...other
// }) => (
//   <a
//     href={href || url}
//     target={!target && openInNewTab ? "_blank" : target}
//     className={cx(linkReset, className)}
//     // https://web.dev/external-anchors-use-rel-noopener/
//     rel={target === "_blank" || openInNewTab ? "noopener" : undefined}
//     {...other}
//   >
//     {children}
//   </a>
// );

const Foo = () => (
  <ResetLink
    href="foo"
    target="_blank"
    testProp="fio"
    component={TestComponent}
  >
    Foo
  </ResetLink>
);

export default ResetLink;
