(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3419:function(t,e,n){"use strict";n.d(e,{E:function(){return o},O:function(){return u}});var a=n(7146),c=n(6010),i=n(5796),r=n(5969),o=function(t){var e=t.src,n=t.width,c=void 0===n?300:n,i=(t.height,t.style),r=void 0===i?{}:i;return(0,a.tZ)("img",{src:"https://api.finna.fi".concat(e,"&w=").concat(c),className:"w-auto rouded-xl overflow-hidden",alt:"Esikatselukuva",style:r})},l=function(t,e){return t?(0,a.tZ)(i.ZP,{offset:100,once:!0,children:e}):e},u=function(t){var e=t.records,n=t.lazy,i=void 0===n||n;return(0,a.tZ)("div",{children:(0,a.tZ)("ul",{className:"flex flex-row flex-wrap justify-between. overflow-hidden.",children:null===e||void 0===e?void 0:e.map((function(t,e){return(0,a.tZ)("li",{role:"button",className:(0,c.Z)("px-1 mb-3 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group",(null===t||void 0===t?void 0:t.id)&&"cursor-pointer"),children:(n=(null===t||void 0===t?void 0:t.id)||null,o=(0,a.BX)("div",{className:"flex flex-col",children:[(0,a.tZ)("div",{className:"overflow-hidden aspect-w-5 aspect-h-4",children:(null===t||void 0===t?void 0:t.images.length)>0&&l(i&&e>=8,(0,a.tZ)("img",{className:"object-cover object-center",src:"https://api.finna.fi".concat(t.images[0],"&w=300"),alt:"Esikatselukuva"}))}),(0,a.tZ)("div",{className:"w-full bg-gray-900 pt-2 px-3 text-center text-gray-200 overflow-hidden text-sm md:text-md line-clamp-2 h-10 group-hover:text-white leading-tight",children:(null===t||void 0===t?void 0:t.title)||""})]}),n?(0,a.tZ)(r.Z,{href:"/view?id=".concat(encodeURIComponent(n)),children:(0,a.tZ)("a",{children:o})},n):o)},"record-".concat(e));var n,o}))})})}},5969:function(t,e,n){"use strict";var a=n(6156),c=n(7146),i=n(1664);function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){(0,a.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e.Z=function(t){return(0,c.tZ)(i.default,o(o({},t),{},{prefetch:!1}))}},7406:function(t,e,n){"use strict";n.d(e,{N:function(){return r}});var a=n(7146),c=(n(9748),n(6010)),i=n(5969),r=function(t){var e=t.facet,n=t.facets,r=t.facetUrl,o=t.truncate,l=void 0!==o&&o;return(0,a.tZ)("div",{className:(0,c.Z)("mt-1 items-center w-full",l&&"line-clamp-3 overflow-clip"),children:(0,a.tZ)("ul",{className:"",children:n.map((function(t){return(0,a.tZ)(i.Z,{prefetch:!0,href:r(e,t.value),children:(0,a.tZ)("a",{children:(0,a.tZ)("li",{role:"button",className:"inline-flex flex-auto mr-2 mb-1 px-2 py-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-medium subpixel-antialiased text-gray-800 uppercase. cursor-pointer ripple-bg-white whitespace-nowrap",children:t.translated},"facet-".concat(t.value))})},"facet-map-".concat(t.value))}))})})}},4807:function(t,e,n){"use strict";n.d(e,{d:function(){return i}});var a=n(7146),c=n(6010),i=function(t){var e=t.title,n=t.value,i=t.resultCount,r=(t.pageNum,t.pageCount,t.placeholder);return e=void 0!==r&&r?n="":"".concat(e,":"),(0,a.BX)("div",{className:"flex items-baseline justify-between h-8",children:[(0,a.BX)("h2",{className:(0,c.Z)("leading-tight",e&&"mr-2"),children:[e," ",(0,a.tZ)("span",{className:"font-normal text-gray-200",children:n})]}),i&&(0,a.tZ)("div",{children:(0,a.BX)("div",{className:"mr-2 text-sm text-gray-200 leading-tight",children:["(",i,(0,a.tZ)("span",{className:"sm:inline hidden",children:" elokuvaa"}),")"]})})]})}},883:function(t,e,n){"use strict";n.d(e,{rr:function(){return l},Yw:function(){return h},J0:function(){return o},zp:function(){return u},jY:function(){return f},Gg:function(){return s},yQ:function(){return c}});var a=n(267).sk?"http://localhost:3001":"https://api.finna.fi",c=20,i=function(t,e){return"filter[]=".concat("".concat(t,':"').concat(encodeURIComponent(e),'"'))},r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=["free_online_boolean:1","datasource_str_mv:kavi","~format_ext_str_mv:1/Video/Video/","~format_ext_str_mv:1/Video/Short/","-id:kavi.elonet_elokuva_1611548","-genre_facet:katsaus"];return"undefined"!==typeof t&&!1!==t&&(t=t||[1900,"*"],e.push('search_daterange_mv:"['.concat(t[0]," TO ").concat(t[1],']"'))),e.map((function(t){return"filter[]=".concat(encodeURIComponent(t))})).join("&")},o=function(t,e){var n=["title","id","images"].map((function(t){return"field[]=".concat(t)})).join("&");return"".concat(a,"/api/v1/search?lookfor=").concat(encodeURIComponent(t),"&").concat(r(),"&").concat(n,"&limit=").concat(e)},l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:c,u=arguments.length>6&&void 0!==arguments[6]?arguments[6]:["title","id","images"],d=r(o)+(n?'&filter[]=topic_facet:"'.concat(encodeURIComponent(n),'"'):"")+(i?'&filter[]=genre_facet:"'.concat(encodeURIComponent(i),'"'):""),s=u.map((function(t){return"field[]=".concat(t)})).join("&");return"".concat(a,"/api/v1/search?lookfor=").concat(encodeURIComponent(t),"&").concat(d,"&").concat(s,"&limit=").concat(l,"&page=").concat(e)},u=function(){var t=[["genre_facet","mainos"],["genre_facet","animaatio"],["genre_facet","tv-tuotanto"],["genre_facet","opetuselokuva"],["genre_facet","henkil\xf6dokumentti"],["genre_facet","ammatinkuvaus"],["genre_facet","draamadokumentti"],["genre_facet","teollisuusdokumentti"],["topic_facet","henkil\xf6autot"],["topic_facet","tehtaat"],["topic_facet","matkailu"],["topic_facet","pankit"],["topic_facet","maisema"],["topic_facet","muoti"],["topic_facet","kahvi"],["topic_facet","kaupungit"],["topic_facet","virvoitusjuomat"],["topic_facet","hygienia"],["topic_facet","elintarvikkeet"],["topic_facet","ruoanvalmistus"],["topic_facet","maatalous"],["topic_facet","myym\xe4l\xe4t"],["topic_facet","rakennukset"],["search_daterange_mv","[1950 TO 1959]"],["search_daterange_mv","[1960 TO 1969]"],["search_daterange_mv","[1970 TO 1979]"],["search_daterange_mv","[1980 TO 2000]"]],e=t[Math.floor(Math.random()*t.length)],n=r(!1)+"&"+i(e[0],e[1]),c=["title","id","images"].map((function(t){return"field[]=".concat(t)})).join("&");return"".concat(a,"/api/v1/search?").concat(n,"&").concat(c,"&limit=20&sort=first_indexed desc,id asc}")},d=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=r(c)+(e?"&".concat(i("topic_facet",e)):"")+(n?"&".concat(i("genre_facet",n)):""),u="facet[]=".concat(t);return"".concat(a,"/api/v1/search?lookfor=").concat(o?encodeURIComponent(o):"","&").concat(l,"&").concat(u,"&limit=0")},s=function(t,e,n,a){return d("topic_facet",e,n,a,t)},f=d("genre_facet"),m=(d("main_date_str"),["title","id","images","urls","recordPage","imageRights","rawData","buildings"]),h=function(t){var e=m.map((function(t){return"field[]=".concat(t)})).join("&");return"".concat(a,"/api/v1/record?id=").concat(t,"&").concat(e)}},6124:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return v}});var a=n(7146),c=(n(2962),n(9748)),i=n(8767),r=n(6206),o=n(5969),l=n(883),u=n(3419),d=n(4807),s=n(7406),f=n(267),m=n(1871),h=function(t){var e=t.title,n=t.startYear,c=n<2e3?n+9:"*";return(0,a.tZ)(o.Z,{href:"/browse/date/".concat(n,"-").concat(c),children:(0,a.tZ)("a",{children:(0,a.tZ)("div",{role:"button",className:"text-md subpixel-antialiased text-gray-800  uppercase tracking-tight bg-gradient-to-b from-gray-100 to-gray-300 py-1 px-2 rounded-lg cursor-pointer ripple-bg-white",children:e})})})},p=function(t){var e=t.items;return(0,a.tZ)("ul",{className:"flex flex-wrap mt-2",children:e.map((function(t){return(0,a.tZ)("li",{className:"mr-2 mb-2",children:(0,a.tZ)(h,{startYear:t,title:(0,f.cm)(t)})},"decade-".concat(t))}))})},v=!0;e.default=function(t){var e=t.randomClips,n=t.topics,h=t.genres,v=t.decades,g=(0,r.lP)().updateScroll,_=(0,c.useState)(),x=_[0],Z=_[1],w=(0,c.useState)((0,l.zp)()),b=w[0],y=w[1],N=(0,i.useQuery)(b,{initialData:e}),k=N.data,O=N.isFetching,j=(0,i.useQuery)((0,l.Gg)(),{initialData:n,refetchOnMount:!1}).data,P=(0,i.useQuery)(l.jY,{initialData:h,refetchOnMount:!1}).data;return(0,f.SE)(O),(0,c.useEffect)((function(){g()}),[]),(0,c.useEffect)((function(){k&&k.records&&Z(function(t,e){if(t.length<=e)return t;for(var n=new Set,a=t.length-1;n.size<e;)n.add(Math.floor(Math.random()*a));return Array.from(n),t.filter((function(t,e){return n.has(e)}))}(k.records,8))}),[k]),(0,a.tZ)("div",{children:(0,a.tZ)(a.HY,{children:(0,a.BX)("div",{children:[(0,a.tZ)("div",{className:"pt-2 w-full",children:(0,a.BX)("div",{className:"flex flex-col flex-wrap md:flex-nowrap",children:[(0,a.tZ)(d.d,{title:"Yleisimm\xe4t aiheet"}),(0,a.tZ)("div",{className:"h-16 min-h-32 w-full mt-1 mb-3",children:j&&(0,a.tZ)(s.N,{title:"Aiheet",facet:"topic_facet",facets:j.facets.topic_facet,facetUrl:f.Pv,truncate:!0})})]})}),(0,a.tZ)("div",{className:"mt-6",children:(0,a.BX)("div",{className:"flex flex-col text-center",children:[(0,a.BX)("div",{className:"flex items-center",children:[(0,a.tZ)(d.d,{title:"Poimintoja"}),(0,a.tZ)("div",{className:"cursor-pointer active:text-pink-500",title:"N\xe4yt\xe4 lis\xe4\xe4",onClick:function(t){return y((0,l.zp)())},children:(0,a.tZ)(m.GVn,{})})]}),(0,a.tZ)(u.O,{lazy:!1,records:x||Array.from(Array(8))}),(0,a.tZ)(o.Z,{href:"/browse/clips",children:(0,a.tZ)("a",{children:(0,a.tZ)("div",{role:"button",className:"inline-flex mt-6 mb-4 py-3 px-4 text-md subpixel-antialiased font-medium tracking-tight rounded-xl bg-gray-200 text-gray-900 hover:text-black hover:bg-white cursor-pointer bg-gradient-to-b from-gray-100 to-gray-300 ripple-bg-white",children:(0,a.tZ)("div",{className:"flex justify-center items-center",children:(0,a.tZ)("div",{className:"inline-flex",children:"Selaa elokuvia"})})})})})]})}),(0,a.tZ)("div",{className:"w-full",children:(0,a.BX)("div",{className:"flex flex-col flex-wrap md:flex-nowrap",children:[(0,a.BX)("div",{children:[(0,a.tZ)(d.d,{title:"Aikakausi"}),(0,a.tZ)(p,{items:v})]}),(0,a.BX)("div",{className:"mt-2",children:[(0,a.tZ)(d.d,{title:"Genret"}),P&&(0,a.tZ)(s.N,{title:"Genret",facet:"genre_facet",facets:(0,f.cC)(P.facets.genre_facet),facetUrl:f.Pv})]})]})})]})})})}},8581:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(6124)}])}},function(t){t.O(0,[216,774,888,179],(function(){return e=8581,t(t.s=e);var e}));var e=t.O();_N_E=e}]);