import { FaPlay as Icon } from 'react-icons/fa';

const base = "bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100 fill-current stroke-current rounded-full items-center justify-center flex";

const PlayIcon = () => (
  <div className={`base w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-2xl sm:text-4xl`}><div className="ml-2"><Icon/></div></div>
);

export const PlayButton = () => (
  <div role="button" className="bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100 fill-current stroke-current rounded-full items-center justify-center flex w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-2xl sm:text-4xl"><div className="ml-2"><PlayIcon /></div></div>
);

export const SmallPlayButton = () => (
  <div role="button" className="text-gray-100 group-hover:text-pink-500 fill-current stroke-current items-center justify-center flex text-sm">
    <div className="ml-1"><PlayIcon /></div>
  </div>
);

export { PlayIcon };
