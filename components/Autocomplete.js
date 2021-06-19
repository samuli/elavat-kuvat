import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCombobox } from 'downshift';
import { useDebouncedCallback } from 'use-debounce';
//import { useHotkeys } from 'react-hotkeys-hook';
import useSWR from 'swr';
import clsx from 'clsx';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { autocompleteUrl } from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import { recordUrl } from '@/lib/record';
import { Image } from '@/components/ImageGrid';
import Spinner from '@/components/Spinner';

const Autocomplete = () => {
  const [ inputItems, setInputItems ] = useState([]);
  const [ resultCount, setResultCount ] = useState(0);
  const [ lookfor, setLookfor ] = useState();
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();
  const debounced = useDebouncedCallback((l) => {
    setLookfor(l);
  }, 1000);
  const limit = 20;

  const noResultsItem = () => {
    return { type: 'NO_RESULTS', data: lookfor };
  };


  const inputRef = useRef(null);
  const listRef = useRef(null);

  const opt = {
    loadingTimeout: 10,
    onLoadingSlow: (_key, _config) => {
      setLoading(true);
    },
    onSuccess: (data, _key, _config) => {
      setLoading(false);
      const cnt = data.resultCount;
      setResultCount(cnt);

      let items = cnt > 0 ? data.records.map(rec => {
        return { type: 'RECORD', data: {...rec} };
      }) : [ noResultsItem() ];
      if (cnt > limit) {
        items = [ { type: 'RESULTS', data: cnt }, ...items ];
      }
      setInputItems(items);
      listRef.current.scrollTop = 0;
    },
    onError: () => {
      setResultCount(0);
      setInputItems([ noResultsItem() ]);
      setLoading(false);
    }
  };
  const {} = useSWR(
    lookfor ? autocompleteUrl(lookfor, limit) : null, Fetcher, opt)
  ;


  // useHotkeys('ctrl+k', (e) => {
  //   e.preventDefault();
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  //   return false;
  // });

  const onSearchResultsPage = false;

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu,
    reset,
  } = useCombobox({
    id: 'search',
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue.trim() != "") {
        debounced.cancel();
        debounced(inputValue.trim());
      }
    }
  });

  const searchResultsUrl = term => `/search?lookfor=${encodeURIComponent(term)}`;

  const icon = loading
    ?  <div><Spinner style={{ width: '20px', height: '20px'}} /></div>
    :  <FaSearch className="animate-spin" style={{ width: '20px', height: '20px'}} className="text-gray-100" />;

  const menuItemClasses = active => clsx(' p-1 hover:text-gray-100', active && 'bg-gradient-to-l from-pink-500 to-red-500');

  return (
    <div className="w-full md:justify-end px-5 bg-gray-900">
      <div className="w-full flex max-w-xl justify-center items-center">

        <div className="w-full" {...getComboboxProps()}>
          <input
            {...getInputProps({
              ref: inputRef,
              onFocus: () => {
                if (!isOpen && resultCount > 0) {
                  openMenu();
                }
              },
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  const term = e.target.value.trim();
                  if (highlightedIndex === -1) {
                    e.nativeEvent.preventDownshiftDefault = true;
                    router.push(searchResultsUrl(term));
                    setLookfor("");
                  } else if (typeof inputItems[highlightedIndex] !== 'undefined') {
                    const item = inputItems[highlightedIndex];
                    if (item.type === 'RECORD') {
                      router.push(recordUrl(inputItems[highlightedIndex].data.id));
                    } else {
                      router.push(searchResultsUrl(lookfor));
                    }
                  }
                  debounced.cancel();
                  setLoading(false);
                  closeMenu();
                  reset();
                }
              },
              placeholder: "Etsi katsottavaa..."
            })}
            style={{ }}
            className="w-full px-4 my-2 py-1 rounded-lg text-lg text-gray-900 focus:outline-none ring-inset focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="overflow-hidden ml-2">
          { icon } <label {...getLabelProps()} className="hidden">Etsi:</label>
        </div>
      </div>

      <ul className={clsx(
            "absolute overflow-y-auto w-full bg-gray-900 text-gray-100 border border-pink-500",
            (!isOpen || loading || inputItems.length === 0 || onSearchResultsPage) && "hidden")}
          {...getMenuProps({ ref: listRef })}
          style={{ maxWidth: '90%', height: 'auto', maxHeight: '85vh' }}
      >
          {inputItems.map((item, index) => (
            <li className={ menuItemClasses(highlightedIndex === index)}
              {...getItemProps({
                item,
                index,
              })}
              key={`hit-${item}${index}`}
              onClick={() => closeMenu()}
              >
              { item.type === 'RECORD' &&
                <Link href={recordUrl(item.data.id)} prefetch={false}>
                  <a>
                    <div className="flex items-center">
                      <div className="max-h-16 overflow-hidden rounded-lg">{ item.data.images && <Image src={item.data.images[0]} width="40" height="50" /> }</div>
                      <div className="pl-2">
                        <div className="text-md">{item.data.title}</div>
                        <div className="text-sm">{ item.data.corporateAuthors && item.data.corporateAuthors.join(", ") }{ item.data.year && ` ${item.data.year}` }</div>
                      </div>
                    </div>
                  </a>
                </Link>
              }
              { item.type === 'RESULTS' &&
                <Link href={searchResultsUrl(lookfor)} prefetch={false}>
                  <a>
                    <div className="pl-2">
                      <div className="text-md">Näytä kaikki tulokset hakusanalla <span className="italic text-pink-500">{lookfor}</span> <span className="ml-2">({item.data})</span></div>
                    </div>
                  </a>
                </Link>
              }
              { item.type === 'NO_RESULTS' &&
                <div className="pl-2">
                  <div className="text-md">Ei tuloksia hakusanalla <span className="italic">{item.data}</span></div>
                </div>
              }
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
