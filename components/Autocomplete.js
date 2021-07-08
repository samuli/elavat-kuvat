import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useCombobox } from 'downshift';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from 'react-query';
import clsx from 'clsx';

import AppLink from '@/components/Link';
import { autocompleteUrl } from '@/lib/api';
import Fetcher from '@/lib/fetcher';
import { recordUrl } from '@/lib/record';
import { Image } from '@/components/ImageGrid';
import Spinner from '@/components/Spinner';
import { useProgress } from '@/lib/util';

const Autocomplete = ({ ref, onSearch, onRecordSelect }) => {
  const [ inputItems, setInputItems ] = useState([]);
  const [ resultCount, setResultCount ] = useState(0);
  const [ lookfor, setLookfor ] = useState();
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();
  const debounced = useDebouncedCallback((l) => {
    setLookfor(l);
  }, 500);
  const limit = 20;

  const noResultsItem = () => {
    return { type: 'NO_RESULTS', data: lookfor };
  };


  const listRef = useRef(null);

  const onSuccess = (data) => {
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
  };

  const onError = (_e) => {
    setResultCount(0);
    setInputItems([ noResultsItem() ]);
    setLoading(false);
  };

  const { isFetching } = useQuery(
    autocompleteUrl(lookfor, limit),
    { onSuccess, onError, enabled: !!lookfor }
  );

  useProgress(isFetching);

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

  const menuItemClasses = active => clsx('p-1 hover:text-gray-100', active && 'bg-gradient-to-r from-pink-500 to-pink-400');

  return (
    <div className="w-full md:justify-end">
      <div className="w-full flex max-w-xl justify-center items-center">

        <div className="w-full" {...getComboboxProps()}>
          <input
            {...getInputProps({
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
                    onSearch();
                  } else if (typeof inputItems[highlightedIndex] !== 'undefined') {
                    const item = inputItems[highlightedIndex];
                    if (item.type === 'RECORD') {
                      router.push(recordUrl(inputItems[highlightedIndex].data.id));
                    } else {
                      router.push(searchResultsUrl(lookfor));
                    }
                    onRecordSelect();
                  }
                  debounced.cancel();
                  setLoading(false);
                  closeMenu();
                  reset();
                }
              },
              ref,
              type: "search",
              placeholder: "Hae..."
            })}
            style={{ }}
            className="w-full px-4 py-1 rounded-lg text-lg text-gray-900 placeholder-gray-500 focus:outline-none ring-inset focus:ring-2 focus:ring-pink-500"
          />
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
                <AppLink href={recordUrl(item.data.id)} prefetch={false}>
                  <a>
                    <div className="flex items-center">
                      <div className="w-10 h-8 overflow-hidden rounded-md">{ item.data.images.length > 0 && <div className="mr-1"><Image src={item.data.images[0]} width="40" height="50" /></div> }</div>
                      <div className="pl-1">
                        <div className="text-md overflow-clip line-clamp-1">{item.data.title}</div>
                        <div className="text-sm">{ item.data.corporateAuthors && item.data.corporateAuthors.join(", ") }{ item.data.year && ` ${item.data.year}` }</div>
                      </div>
                    </div>
                  </a>
                </AppLink>
              }
              { item.type === 'RESULTS' &&
                <AppLink href={searchResultsUrl(lookfor)} prefetch={false}>
                  <a>
                    <div className="pl-2 my-2">
                      <div className="text-md">Näytä kaikki haulla <span className="font-bold">{lookfor}</span> <span className="ml-1">({item.data})</span></div>
                    </div>
                  </a>
                </AppLink>
              }
              { item.type === 'NO_RESULTS' &&
                <div className="pl-2">
                  <div className="text-md">Ei tuloksia haulla <span className="font-bold">{item.data}</span></div>
                </div>
              }
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
