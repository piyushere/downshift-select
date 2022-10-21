import React from 'react';
import Select, { Option, OptionRenderProps } from './Select';

const books: Option<string>[] = [
  { label: 'Harper Lee', value: 'To Kill a Mockingbird' },
  { label: 'Lev Tolstoy', value: 'War and Peace' },
  { label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
  { label: 'Oscar Wilde', value: 'A Picture of Dorian Gray' },
  { label: 'George Orwell', value: '1984' },
  { label: 'Jane Austen', value: 'Pride and Prejudice' },
  { label: 'Marcus Aurelius', value: 'Meditations' },
  { label: 'Fyodor Dostoevsky', value: 'The Brothers Karamazov' },
  { label: 'Lev Tolstoy', value: 'Anna Karenina' },
  { label: 'Fyodor Dostoevsky', value: 'Crime and Punishment' },
];

const SelectOptionRenderer = ({
  item,
  key,
  isSelected,
  isHighlighted,
  ...restProps
}: OptionRenderProps<Option<string>>) => {
  return (
    <li
      className={`py-2 px-3 shadow-sm flex flex-col items-start ${
        isHighlighted && 'bg-blue-300'
      } ${isSelected && 'bg-blue-500 text-gray-50'}`}
      key={key}
      {...restProps}
    >
      <span>{item.value}</span>
    </li>
  );
};

function SelectConsumer() {
  const [selected, setSelected] = React.useState<Option<string> | null>(null);

  return (
    <div className="p-5">
      <Select
        value={selected}
        onChange={setSelected}
        options={books}
        labeler={(x) => x?.value || ''}
        renderOption={SelectOptionRenderer}
      />
    </div>
  );
}

export default SelectConsumer;
