import clsx from 'clsx';

interface IHeadingProps {
  title?: string;
  value?: string;
  resultCount?: number;
  placeholder?: boolean;
}

const SearchHeading = ({
  title,
  value,
  resultCount,
  placeholder,
}: IHeadingProps): React.ReactElement => {
  if (placeholder) {
    title = value = '';
  } else {
    title = `${title}:`;
  }
  return (
    <div className="flex items-center justify-between h-8">
      <h1 className={clsx('unstyled leading-tight', title && 'mr-2')}>
        {title} <span className="font-normal text-gray-200">{value}</span>
      </h1>
      {resultCount && (
        <div>
          <div className="mr-2 text-sm text-gray-200 leading-tight">
            ({resultCount}
            <span className="sm:inline hidden"> elokuvaa</span>)
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchHeading };
