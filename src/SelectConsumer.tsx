import React from 'react';
import Select, { Option } from './select/Select';

const books = [
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

function SelectConsumer() {
  const [selected, setSelected] = React.useState<Option | null>(null);
  const selectRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <Select
        value={selected}
        setValue={setSelected}
        options={books}
        ref={selectRef}
      />
      <button type="button" onClick={() => selectRef.current?.focus()}>
        focus on select
      </button>
    </div>
  );
}

export default SelectConsumer;
