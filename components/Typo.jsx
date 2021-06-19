const SearchHeading = ({title, value}) => (
  <h2 className="text-lg font-bold">
    {value && `${title}:`} <span className="ml-1 font-normal text-gray-200">{value}</span>
  </h2>
);

export { SearchHeading };
