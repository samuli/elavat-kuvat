import Link from 'next/link';
import Router from 'next/router';
import Autocomplete from '@/components/Autocomplete';
import { FaPlayCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <>
      <div className="bg-gray-900 px-5 pt-2 flex flex-col md:flex-row justify-betweeyn bg-gray-900 ">
        <div className="flex flex-wrap items-end align-center text-pink-500 stroke-current text-white">
          <Link href="/">
            <div className="text-4xl bg-gradient-to-t from-red-500 to-pink-500 text-transparent bg-clip-text sm:text-5xl mr-2 font-bold hover:to-pink-500 cursor-pointer">Elävät kuvat.</div>
          </Link>
          <div className="flex items-end text-md font-serif text-gray-100 italic whitespace-nowrap -mt-1">suomalaisia lyhytelokuvia</div>
        </div>
      </div>
      <div className="z-10 sticky top-0 shadow-lg">
        <Autocomplete />
      </div>
    </>
  );
};

const Layout = ({ children }) => (

  <div style={{ }} className="flex flex-col bg-gray-900 text-white align-center items-center min-h-screen">
    <div className="w-full max-w-6xl mb-10 flex flex-col flex-start flex-inline" style={{ }}>
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export const FullscreenLayout = ({ children }) => (
  <div className="h-screen flex items-center bg-black text-white">
    {children}
  </div>
);

export default Layout;
