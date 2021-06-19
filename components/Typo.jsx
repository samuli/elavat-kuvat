const SearchHeading = ({title, value, placeholder = false}) => {
  if (placeholder) {
    title = value = '';
  } else {
    title = `${title}:`;
  }
  return (
    <h2 className="text-lg font-bold">
      {title} <span className="ml-1 font-normal text-gray-200">{value}</span>
    </h2>
  );
};

export { SearchHeading };
