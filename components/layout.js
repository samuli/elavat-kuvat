import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Autocomplete from '@/components/Autocomplete';
import { FaPlayCircle } from 'react-icons/fa';


Router.events.on("routeChangeStart", function () {
  NProgress.start();
});
Router.events.on("routeChangeComplete", function () {
  return NProgress.done();
});
Router.events.on("routeChangeError", function () {
  return NProgress.done();
});


const Header = () => {

  return (
    <div className="sticky w-full z-50 top-0 bg-gray-900 px-5 py-5 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <div className="flex align-center mb-2 items-center fill-current text-pink-500 stroke-current text-white hover:text-pink-300 cursor-pointer">
          <div className="text-2xl font-bold">Elävät kuvat</div>
          <FaPlayCircle className="pl-2" style={{ width: '40px', height: '40px' }} />
        </div>
      </Link>
      <div className=""><Autocomplete /></div>
    </div>
  );
};

const Layout = ({ children }) => (

  <div style={{ minHeight: "120vh"}} className="flex flex-col bg-gray-900 text-white align-center items-center">

    <div className="w-full max-w-6xl mb-10" style={{ minHeight: "120vh"}}>
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
