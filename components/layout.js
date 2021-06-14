import Link from 'next/link';
import Router from 'next/router';
import Autocomplete from '@/components/Autocomplete';
import { FaPlayCircle } from 'react-icons/fa';



const Header = () => {

  return (
    <div className="bg-gray-900 px-5 pt-5 flex flex-col md:flex-row overflow-auto items-center justify-between">
      <Link href="/">
        <div className="flex flex-col md:flex-row items-center md:items-end mb-2 text-pink-500 stroke-current text-white hover:text-pink-600 cursor-pointer">
          <div className="text-4xl md:text-2xl font-bold whitespace-nowrap">Elävät kuvat.</div>
          <div className="flex items-end ml-2 text-md fonts-serif text-gray-100 italic whitespace-nowrap">suomalaisia lyhytelokuvia</div>
        </div>
      </Link>
      <div className="ml-6">
        <Autocomplete />
      </div>
    </div>
  );
};

const Layout = ({ children }) => (

  <div style={{ minHeight: "120vh"}} className="flex flex-col bg-gray-900 text-white align-center items-center">
    <div className="w-full max-w-6xl mb-10 flex flex-col flex-start flex-inline" style={{ minHeight: "120vh"}}>
      <Header />
      {children}
    </div>
  </div>
);

export const FullscreenLayout = ({ children }) => (
  <div className="h-screen flex items-center bg-black text-white">
    {children}
  </div>
);

export default Layout;
