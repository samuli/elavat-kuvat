import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { FaSearch, FaPlayCircle } from 'react-icons/fa';

const Autocomplete = dynamic(() => import('@/components/Autocomplete'));


const Header = () => {

  const router = useRouter();
  const [ showSearch, setShowSearch ] = useState(false);
  const [ animateOn, setAnimateOn ] = useState(false);
  const inputRef = useRef(null);
  const animateRef = useRef(null);

  const clearAnimateRef = () => {
      if (animateRef.current) {
        clearInterval(animateRef.current);
      }
  };

  useEffect(() => {
    return () => {
      clearAnimateRef();
    };
  }, []);

  const toggleAutocomplete = (mode) => {
    setShowSearch(mode);
    if (mode) {
      setAnimateOn(true);
      clearAnimateRef();
      animateRef.current = setInterval(() => setAnimateOn(false), 500);
    }
  };

  return (
    <div className="z-10 flex flex-col sticky top-0 px-5 pt-2 pb-1 shadow-xl bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-wrap items-end align-center text-pink-500 stroke-current text-white">
            <div onClick={() => { toggleAutocomplete(false); router.push("/"); } } className="text-3xl bg-gradient-to-t from-red-500 to-pink-500 text-transparent bg-clip-text sm:text-5xl mr-2 overflow-hidden whitespace-nowrap font-bold active:from-pink-500 cursor-pointer">Elävät kuvat.</div>
            <div className="flex items-end text-md sm:text-lg font-serif text-gray-100 italic whitespace-nowrap -mt-1">suomalaisia lyhytelokuvia</div>
          </div>
        </div>
        { !showSearch && <div role="button" title="Hae..." className="cursor-pointer ml-2" onClick={() => toggleAutocomplete(true)}>
          <FaSearch className="animate-spin" style={{ width: '20px', height: '20px'}} className="hover:text-pink-500 text-gray-100" />
        </div> }
      </div>
      <div className={clsx("mt-1", animateOn && "overflow-hidden")}>
        <div className={clsx("transform transition-all ease-out", !showSearch && "-mt-20", showSearch && "duration-500")}>
          { showSearch && <Autocomplete ref={inputRef} onSearch={() => toggleAutocomplete(false)} onRecordSelect={() => toggleAutocomplete(false)} /> }
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => (

  <div style={{ }} className="flex flex-col bg-gray-900 text-white align-center items-center min-h-screen">
    <div className="w-full max-w-6xl mb-10 flex flex-col flex-start flex-inline" style={{ }}>
      <Header />
      <main className="mx-5">{children}</main>
    </div>
  </div>
);

export const FullscreenLayout = ({ children }) => (
  <div className="h-screen flex items-center bg-black text-white">
    {children}
  </div>
);

export default Layout;
