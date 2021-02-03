import * as React from "react";
import { cx } from "@emotion/css";
import {
  FieldListColumnProps,
  FieldListColumnSeparator,
  FieldListColumnWidthProps
} from "./FieldListColumn";
import ResetButton from "../../button/components/ResetButton";
import { Icon } from "../../icon";
import { SystemIcons } from "../../icons/dist/system-icons-enum";
import {
  themeTextColorDisabled,
  themeTextColorPrimary
} from "../../design-tokens/build/js/designTokens";
import { SpacingBox } from "../../styleUtils/modifiers";
import { Text } from "../../styleUtils/typography";
import { FieldListAddButton, FieldListColumn } from "..";
import { ButtonProps } from "../../button/components/ButtonBase";
import { findNestedPropertyInObject } from "../../utilities";
import {
  getFieldRowGrid,
  fieldListStack,
  invisibleColHeader,
  fieldWrapper
} from "../style";
import {
  FieldListProvider,
  Context as FieldListContext
} from "./FieldListContext";
import { iconSizes } from "../../shared/styles/styleUtils/layout/iconSizes";

const REMOVE_ICON_SIZE = "xs";

export interface FieldListProps {
  /** The data to populate the field values with */
  data: Array<Record<string, any>>;
  /** An array of the indexes of disabled rows */
  disabledRows?: number[];
  /** The callback for when the remove button is clicked */
  onRemoveItem?: (affectedRowIndex: number) => () => void;
  /** The callback for when a row is added */
  onAddItem?: (addedRow: Record<string, any>) => void;
  /**
   * The path to an object property who's value will be unique.
   * Typically, this will be some kind of ID. The value of this property
   * is used to set the key for each row in the field list.
   *
   * This key's value cannot be the field value because it will cause
   * problems when the field value is changed
   */
  pathToUniqueKey?: string;
}

type FieldListColumn = React.ReactElement<
  FieldListColumnProps & FieldListColumnWidthProps
>;

interface FieldListHeaderProps {
  columns: FieldListColumn[];
}

interface FieldListRowProps
  extends Omit<FieldListProps, "onAddItem" | "onRemoveItem" | "data"> {
  data: Record<string, any>;
  columns: FieldListColumn[];
  isLastRow?: boolean;
  rowId: number | string;
  rowIndex: number;
}

const isRowDisabled = (rowIndex, disabledRows) =>
  Boolean(disabledRows && disabledRows.includes(rowIndex));

const FieldListRow: React.FC<FieldListRowProps> = React.memo(
  ({
    columns,
    data,
    rowIndex,
    disabledRows,
    isLastRow,
    pathToUniqueKey,
    rowId
  }) => {
    const fieldListContext = React.useContext(FieldListContext);
    const addEmptyRow = (e: React.KeyboardEvent) => {
      const rowHasData = Object.keys(data || {}).filter(
        dataKey => Boolean(data[dataKey]) && dataKey !== pathToUniqueKey
      ).length;
      if (e.key === "Tab" && isLastRow && rowHasData) {
        fieldListContext?.addListItem(rowId);
      }
    };

    return (
      <div className={getFieldRowGrid(columns, iconSizes[REMOVE_ICON_SIZE])}>
        {columns.map((col, i) => {
          return (
            <div data-cy="fieldList-cell" key={i} className={fieldWrapper}>
              {col.type === FieldListColumn &&
                col.props.children({
                  ...(col.props.onChange && col.props.pathToValue
                    ? {
                        onChange: col.props.onChange(
                          rowIndex,
                          col.props.pathToValue
                        )
                      }
                    : {}),
                  fieldData: data,
                  rowIndex,
                  value: findNestedPropertyInObject(
                    data,
                    col.props.pathToValue
                  ),
                  disabled: isRowDisabled(rowIndex, disabledRows),
                  defaultProps: {
                    key: `${col.props.pathToValue}-${rowIndex}`,
                    id: `${col.props.pathToValue}-${rowIndex}`,
                    inputLabel: `${col.props.header} ${rowIndex}`
                  }
                })}
              {col.type === FieldListColumnSeparator && col.props.children}
            </div>
          );
        })}
        {/* this wrapper div is needed to fix a vertical centering bug in Firefox with <button> elements that are children of display: grid */}
        <div>
          <ResetButton
            onClick={fieldListContext?.removeListItem(rowIndex)}
            disabled={isRowDisabled(rowIndex, disabledRows)}
            onKeyUp={addEmptyRow}
            data-cy="fieldList-removeButton"
          >
            <Icon
              shape={SystemIcons.Close}
              size={REMOVE_ICON_SIZE}
              color={
                isRowDisabled(rowIndex, disabledRows)
                  ? themeTextColorDisabled
                  : themeTextColorPrimary
              }
            />
          </ResetButton>
        </div>
      </div>
    );
  }
);

const FieldListHeader: React.FC<FieldListHeaderProps> = ({ columns }) => (
  <SpacingBox
    side="bottom"
    spacingSize="xxs"
    className={getFieldRowGrid(columns, iconSizes[REMOVE_ICON_SIZE])}
  >
    {columns.map((col, i) => (
      <Text
        tag="div"
        weight="medium"
        className={cx({
          [invisibleColHeader]: col.type === FieldListColumnSeparator
        })}
        data-cy="fieldList-columnHeader"
        key={col.key || `columnHeader.${i}`}
      >
        {col.type === FieldListColumn && col.props.header}
        {col.type === FieldListColumnSeparator && col.props.children}
      </Text>
    ))}
  </SpacingBox>
);

const FieldList: React.FC<FieldListProps> = ({
  children,
  data,
  disabledRows,
  onAddItem,
  onRemoveItem,
  pathToUniqueKey
}) => {
  const columns = (React.Children.toArray(children) as Array<
    React.ReactElement<FieldListColumnProps & FieldListColumnWidthProps>
  >).filter(
    item =>
      item.type === FieldListColumn || item.type === FieldListColumnSeparator
  );
  const addButton = (React.Children.toArray(children) as Array<
    React.ReactElement<ButtonProps>
  >).find(child => child.type === FieldListAddButton);
  const [fieldListData, setFieldListData] = React.useState<
    Array<Record<string, any>>
  >(data);

  React.useEffect(() => {
    setFieldListData(data);
  }, [data]);

  const getAddHandler = () => {
    if (!onAddItem && !addButton?.props.onClick) {
      return;
    }

    return (addedItem: Record<string, any>) => {
      if (onAddItem && addedItem) {
        onAddItem(addedItem);
      }

      if (addButton?.props.onClick) {
        addButton?.props.onClick();
      }
    };
  };

  return (
    <FieldListProvider
      setData={setFieldListData}
      data={fieldListData}
      pathToUniqueKey={pathToUniqueKey || ""}
      onAddItem={getAddHandler()}
      onRemoveItem={onRemoveItem}
    >
      <div>
        {fieldListData && fieldListData.length ? (
          <FieldListHeader columns={columns} />
        ) : null}
        <div className={fieldListStack}>
          {fieldListData.map((_, i) => {
            const rowId = findNestedPropertyInObject(
              fieldListData[i],
              pathToUniqueKey
            );
            const rowKey = `fieldList.row-${
              Boolean((pathToUniqueKey && rowId) || rowId === 0) ? rowId : i
            }`;
            return (
              <FieldListRow
                columns={columns}
                data={fieldListData[i]}
                disabledRows={disabledRows}
                isLastRow={i === fieldListData.length - 1}
                key={rowKey}
                pathToUniqueKey={pathToUniqueKey}
                rowId={rowKey}
                rowIndex={i}
              />
            );
          })}
          {addButton}
        </div>
      </div>
    </FieldListProvider>
  );
};

FieldList.defaultProps = {
  pathToUniqueKey: "id"
};

export default FieldList;
