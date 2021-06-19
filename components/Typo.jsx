import clsx from 'clsx';

const SearchHeading = ({title, value, resultCount, pageNum, pageCount, placeholder = false}) => {
  if (placeholder) {
    title = value = '';
  } else {
    title = `${title}:`;
  }
  return (
    <div className="flex items-center justify-between">
      <h2 className={clsx("text-lg font-bold", title && "mr-2")}>
        {title} <span className="ml-1 font-normal text-gray-200">{value}</span>
      </h2>
      {resultCount && (<span>
        <span className="text-sm text-gray-200">({resultCount} klippiä)</span>
      </span>) }
    </div>
  );
};

export { SearchHeading };
