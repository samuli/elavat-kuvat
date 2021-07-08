import clsx from 'clsx';

const SearchHeading = ({title, value, resultCount, pageNum, pageCount, placeholder = false}) => {
  if (placeholder) {
    title = value = '';
  } else {
    title = `${title}:`;
  }
  return (
    <div className="flex items-center justify-between h-8">
      <h2 className={clsx("text-lg leading-tight", title && "mr-2")}>
        {title} <span className="font-normal text-gray-200">{value}</span>
      </h2>
      {resultCount && (<div>
        <div className="mr-2 text-sm text-gray-200 leading-tight">({resultCount}<span className="sm:inline hidden"> klippiä</span>)</div>
      </div>) }
    </div>
  );
};

export { SearchHeading };
