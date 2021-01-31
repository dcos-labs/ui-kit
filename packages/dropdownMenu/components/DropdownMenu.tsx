import * as React from "react";
import { cx } from "@emotion/css";
import Downshift, { ControllerStateAndHelpers } from "downshift";
import { Dropdownable } from "../../dropdownable";
import { border, buttonReset, display } from "../../shared/styles/styleUtils";
import PopoverBox from "../../popover/components/PopoverBox";
import PopoverListItem from "../../popover/components/PopoverListItem";
import { DropdownSectionProps } from "./DropdownSection";
import { DropdownMenuItemProps } from "./DropdownMenuItem";
import { Direction } from "../../dropdownable/components/Dropdownable";

export interface DropdownMenuProps {
  /**
   * Groups of dropdown menu items
   */
  children:
    | React.ReactElement<DropdownSectionProps>
    | Array<React.ReactElement<DropdownSectionProps>>;
  /**
   * Whether the dropdown starts open
   */
  initialIsOpen?: boolean;
  /**
   * Maximum height the menu can grow to
   */
  menuMaxHeight?: number;
  /**
   * Maximum width the menu can grow to
   */
  menuMaxWidth?: number;
  /**
   * callback for when a menu item is clicked
   */
  onSelect?: (
    selectedItem: string,
    stateAndHelpers?: ControllerStateAndHelpers<
      React.ReactElement<DropdownMenuItemProps>
    >
  ) => void;
  /**
   * which DOM node the dropdown menu will attach to
   */
  overlayRoot?: HTMLElement;
  /**
   * The preferred direction to open the menu in relation to the trigger
   */
  preferredDirections?: Direction[];
  /**
   * The node that opens the menu when clicked
   */
  trigger: React.ReactNode;
  /**
   * Whether the dropdown node should be portalled to document.body, or open in it's parent DOM node
   */
  disablePortal?: boolean;
}

const DropdownMenu: React.SFC<DropdownMenuProps> = props => {
  const {
    children,
    disablePortal,
    initialIsOpen,
    menuMaxHeight,
    menuMaxWidth,
    onSelect,
    overlayRoot,
    preferredDirections,
    trigger
  } = props;
  const defaultItemToString = (
    item: React.ReactElement<DropdownMenuItemProps>
  ) => (item ? item.props.value : "");
  const handleSelection = (
    selectedItem: React.ReactElement<DropdownMenuItemProps>,
    stateAndHelpers?: ControllerStateAndHelpers<
      React.ReactElement<DropdownMenuItemProps>
    >
  ) => {
    if (onSelect) {
      onSelect(defaultItemToString(selectedItem), stateAndHelpers);
    }
  };

  const getDropdownContents = (highlightedIndex, getItemProps) =>
    (React.Children.toArray(children) as Array<
      React.ReactElement<DropdownSectionProps>
    >).reduce<{
      sections: React.ReactNodeArray;
      menuItemIndex: number;
    }>(
      (acc, item, sectionIndex) => {
        const { sections = [] } = acc;
        const { children } = item.props;
        const menuItems = React.Children.toArray(children);
        const childrenWithKeys = menuItems.map((child, i) => {
          acc.menuItemIndex++;

          return (
            <PopoverListItem
              listLength={menuItems.length}
              isActive={highlightedIndex === acc.menuItemIndex}
              appearance={child.props.appearance}
              index={i}
              key={child.key || `${sectionIndex}-${i}`}
              {...getItemProps({
                item: child,
                disabled: child.props.disabled
              })}
            >
              {child}
            </PopoverListItem>
          );
        });

        return {
          sections: [...sections, childrenWithKeys],
          menuItemIndex: acc.menuItemIndex
        };
      },
      { sections: [], menuItemIndex: -1 }
    );

  return (
    <Downshift
      itemToString={defaultItemToString}
      onSelect={handleSelection}
      initialIsOpen={initialIsOpen}
    >
      {({
        getToggleButtonProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        isOpen
      }) => (
        <div className={display("inline-block")}>
          <Dropdownable
            isOpen={isOpen}
            overlayRoot={overlayRoot}
            preferredDirections={preferredDirections}
            dropdown={
              <PopoverBox
                maxHeight={menuMaxHeight}
                maxWidth={menuMaxWidth}
                {...getMenuProps(
                  { refKey: "menuRef" },
                  // The menu is not mounted when `isOpen` is false, so Downshift's ref check fails incorrectly
                  // The menu behaves as expected, and has all the correct attributes
                  { suppressRefError: true }
                )}
              >
                {getDropdownContents(
                  highlightedIndex,
                  getItemProps
                ).sections.map((sectionContent, i) => (
                  <div
                    key={`dropdown-${i}`}
                    className={cx({ [border("top")]: i !== 0 })}
                  >
                    {sectionContent}
                  </div>
                ))}
              </PopoverBox>
            }
            disablePortal={disablePortal}
          >
            {React.isValidElement(trigger) ? (
              React.cloneElement(trigger, {
                ...getToggleButtonProps({
                  tabIndex: 0
                })
              })
            ) : (
              <button {...getToggleButtonProps()} className={buttonReset}>
                {trigger}
              </button>
            )}
          </Dropdownable>
        </div>
      )}
    </Downshift>
  );
};

DropdownMenu.defaultProps = {
  preferredDirections: [
    Direction.BottomRight,
    Direction.BottomLeft,
    Direction.BottomCenter,
    Direction.TopRight,
    Direction.TopCenter,
    Direction.TopLeft
  ]
};

export default DropdownMenu;
