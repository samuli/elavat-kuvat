const SearchHeading = ({title, value}) => (
  <h2 className="text-xl font-bold">
    {title}: <span className="ml-1 font-normal text-gray-200">{value}</span>
  </h2>
);

export { SearchHeading };
