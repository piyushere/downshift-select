import { useCombobox } from 'downshift';
import React from 'react';
import { ClearButton, ToggleButton } from './SelectButtons';

function getFilter(inputValue: any) {
  const inputValueNoCase = inputValue ? inputValue.toLowerCase() : '';
  return function filterOptions(option: Option) {
    return (
      !inputValueNoCase ||
      option.label.toLowerCase().includes(inputValueNoCase) ||
      option.value.toLowerCase().includes(inputValueNoCase)
    );
  };
}

export interface Option {
  label: string;
  value: any;
}

export interface ISelect {
  value: Option | null;
  options: Option[];
  setValue: (value: Option | null) => void;
}

const Select = React.forwardRef(function Select(
  { value, options = [], setValue }: ISelect,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [items, setItems] = React.useState(options);
  const [isFocused, setIsFocused] = React.useState(false);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    setInputValue,
  } = useCombobox<Option | null>({
    selectedItem: value,
    onSelectedItemChange(changes) {
      setValue(changes.selectedItem || null);
    },
    onInputValueChange({ inputValue }) {
      setItems(options.filter(getFilter(inputValue)));
    },
    onIsOpenChange({ isOpen, selectedItem }) {
      setItems(options);
      // reset input field value to the one selected, if the user doesn't select anything
      if (!isOpen && selectedItem) setInputValue(selectedItem.label);
    },
    items,
    itemToString(item) {
      return item ? item.label : '';
    },
  });

  //     box-shadow: rgb(17, 18, 23) 0px 0px 0px 2px, rgb(61, 113, 217) 0px 0px 0px 4px;
  //     transition-property: outline, outline-offset, box-shadow;
  //     transition-duration: 0.2s;
  //     transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  return (
    <div className="w-full">
      <div className="w-72 flex flex-col gap-1">
        {/* eslint-disable-next-line */}
        <label className="w-fit" {...getLabelProps()}>
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
            className="w-full py-1.5 pl-1.5 outline-none m-0 border-none rounded placeholder:font-medium select-none"
            placeholder="Select..."
            {...getInputProps({
              ref,
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            })}
            onClick={openMenu}
          />
          <div className="flex items-center">
            {value && <ClearButton onClick={() => setValue(null)} />}
            <span className="w-px my-2 bg-neutral-400 self-stretch" />
            <ToggleButton {...getToggleButtonProps()} />
          </div>
        </div>
      </div>

      <ul
        {...getMenuProps()}
        className={`absolute w-72 shadow shadow-neutral-500 max-h-80 overflow-y-auto my-2 py-1 rounded border border-neutral-300 ${
          !isOpen && 'hidden'
        }`}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`py-2 px-3 shadow-sm flex flex-col items-start ${
                highlightedIndex === index && 'bg-blue-300'
              } ${value === item && 'bg-blue-500 text-gray-50'}`}
              key={`${item.value}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.label}</span>
              <span className="text-sm text-gray-700">{item.value}</span>
            </li>
          ))}

        {!items.length && (
          <li className="py-2 px-3 shadow-sm flex items-start justify-center">
            <span>No matches</span>
          </li>
        )}
      </ul>
    </div>
  );
});

export default Select;
