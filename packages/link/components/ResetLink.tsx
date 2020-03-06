import React from "react";
import { cx } from "emotion";
import { LinkProps } from "../types";
import { linkReset } from "../../shared/styles/styleUtils/resets/linkReset";

const TestComponent: React.StatelessComponent<{testProp: string;}> = (props) => (<div {...props} />);
// type Foo<C extends React.ElementType> = React.ComponentProps<C>;

{/*  */}

function ResetLink<P extends {href: string | undefined; target: string | undefined; children: React.ReactNode;}>({
  children,
  className,
  href,
  openInNewTab,
  target,
  url,
  src,
  testProp,
  component: NewComponent,
  testinggg,
  ...other
}: LinkProps
  & {
      component: React.SFC<P>;
      componentProps: P
    }
): React.ReactElement {
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
)};
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

export default ResetLink;
