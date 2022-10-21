import { useCombobox } from 'downshift';
import React from 'react';
import { ClearButton, ToggleButton } from './SelectButtons';

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectOptionRenderer = ({
  item,
  key,
  isSelected,
  isHighlighted,
  ...restProps
}: OptionRenderProps<string>) => {
  return (
    <li
      className={`py-2 px-3 shadow-sm flex flex-col items-start text-neutral-800 ${
        isHighlighted && 'bg-blue-300'
      } ${isSelected && 'bg-blue-500 text-gray-50'}`}
      key={key}
      {...restProps}
    >
      <span>{item}</span>
    </li>
  );
};

export interface Option<T> {
  label: string;
  value: T;
}

export interface OptionRenderProps<T> {
  item: T;
  key: any;
  isSelected: boolean;
  isHighlighted: boolean;
  restProps?: any;
}

export interface ISelect<T>
  extends Pick<React.ComponentProps<'input'>, 'onBlur' | 'name'> {
  value: T | null;
  options: T[];
  onChange: (value: T | null) => void;
  renderOption?: (props: OptionRenderProps<T>) => React.ReactNode;
  labeler?: (item: T | null) => string;
  creatable?: boolean;
  optionCreater?: (input: string) => T;
}

const Select = React.forwardRef(function Select<T>(
  {
    value: selectedItem,
    options = [],
    onChange,
    renderOption = SelectOptionRenderer as any,
    labeler = (item) => String(item),
    creatable = false,
    name,
    onBlur,
    optionCreater,
    ...restInputParams
  }: ISelect<T>,
  ref?: React.ForwardedRef<HTMLInputElement>
) {
  const [items, setItems] = React.useState(options);
  const [isFocused, setIsFocused] = React.useState(false);

  const {
    isOpen,
    inputValue,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu,
    setInputValue,
  } = useCombobox<T | null>({
    selectedItem,
    onSelectedItemChange(changes) {
      onChange(changes.selectedItem || null);
    },
    onInputValueChange({ inputValue }) {
      setItems(
        options.filter((option) => {
          if (inputValue)
            return labeler(option)
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          return false;
        })
      );
    },
    onIsOpenChange({ isOpen, selectedItem }) {
      setItems(options);
      // reset input field value to the one selected, if the user doesn't select anything
      if (!isOpen && selectedItem) setInputValue(labeler(selectedItem));
    },
    items,
    itemToString: labeler,
  });

  //     box-shadow: rgb(17, 18, 23) 0px 0px 0px 2px, rgb(61, 113, 217) 0px 0px 0px 4px;
  //     transition-property: outline, outline-offset, box-shadow;
  //     transition-duration: 0.2s;
  //     transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  return (
    <div className="w-full">
      <div className="w-72 flex flex-col gap-1">
        {/* eslint-disable-next-line */}
        <label className="w-fit text-gray-300" {...getLabelProps()}>
          Mocking up a dropdown select:
        </label>
        <div
          className={`flex bg-white gap-0.5 rounded border border-neutral-400
          ${
            isFocused &&
            'shadow-control-focus-light transition-shadow duration-200 ease-[cubic-bezier(0.19, 1, 0.22, 1)]'
          }`}
          {...getComboboxProps()}
        >
          <input
            className="w-full py-1.5 pl-1.5 outline-none m-0 border-none rounded placeholder:font-medium select-none text-neutral-800"
            placeholder="Select..."
            {...getInputProps({
              ref,
              name,
              onFocus: () => setIsFocused(true),
              onBlur: (event) => {
                setIsFocused(false);
                if (onBlur) onBlur(event);
              },
            })}
            onClick={openMenu}
            {...restInputParams}
          />
          <div className="flex items-center">
            {selectedItem && <ClearButton onClick={() => onChange(null)} />}
            <span className="w-px my-2 bg-neutral-400 self-stretch" />
            <ToggleButton {...getToggleButtonProps()} />
          </div>
        </div>
      </div>

      <ul
        {...getMenuProps()}
        className={`bg-white absolute w-72 shadow shadow-neutral-500 max-h-80 overflow-y-auto my-2 py-1 rounded border border-neutral-300 z-10 ${
          !isOpen && 'hidden'
        }`}
      >
        {isOpen &&
          items.map((item, index) =>
            renderOption({
              item,
              key: index,
              isHighlighted: index === highlightedIndex,
              isSelected: selectedItem === item,
              ...getItemProps({ item, index }),
            })
          )}
        {!creatable && !items.length && (
          <li className="py-2 px-3 shadow-sm flex items-start justify-center text-gray-800">
            <span>No matches</span>
          </li>
        )}

        {isOpen &&
          creatable &&
          optionCreater &&
          inputValue &&
          !items.find((item) => labeler(item) === inputValue) && (
            <li
              className="py-2 px-3 shadow-sm flex items-start justify-center text-gray-800"
              onClick={() => {
                onChange(optionCreater(inputValue));
                setIsFocused(false);
                closeMenu();
              }}
            >
              <span>create &quot;{inputValue}&quot;</span>
            </li>
          )}
      </ul>
    </div>
  );
});

export default Select;
