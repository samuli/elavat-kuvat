type SelectProps = {
  items: string[];
  activeItem: string;
  placeholder: boolean;
  label: string;
  onSelect: (a: string) => unknown;
};
const Select = ({
  items,
  activeItem,
  onSelect,
  placeholder,
  label,
}: SelectProps): React.ReactNode => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      value={activeItem}
      className="appearance-none w-auto pl-4 pr-10 py-3 border bg-gray-100 border-gray-400 rounded-md text-xl text-gray-900 cursor-pointer">
      {placeholder && (
        <option key={`select-${placeholder}`} selected={!activeItem}>
          {placeholder}
        </option>
      )}
      {items.map((item, idx) => {
        const active = activeItem === item;
        return (
          <option key={idx} disabled={active} value={item}>
            {label} {item}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
