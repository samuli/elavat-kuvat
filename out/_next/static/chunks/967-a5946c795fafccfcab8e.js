(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[967],{2743:function(e,t,n){"use strict";var r=n(7146),i=n(5969);t.Z=function(){return(0,r.BX)("div",{className:"mt-2",children:[(0,r.tZ)("h1",{children:"Kr\xf6h\xf6m.... jokin meni vikaan. "}),(0,r.BX)("p",{children:["Kokeile ladata sivu uudelleen tai ",(0,r.tZ)(i.Z,{href:"/",children:(0,r.tZ)("a",{className:"underline",children:"palaa etusivulle"})})]})]})}},4002:function(e,t,n){"use strict";var r=n(7146),i=n(9008);t.Z=function(e){var t=e.title,n=void 0===t?null:t,c=e.description,a=void 0===c?null:c;return(0,r.BX)(i.default,{children:[(0,r.BX)("title",{children:[n&&"".concat(n," : "),"El\xe4v\xe4t kuvat",n?"":" - suomalaisia lyhytelokuvia"]}),(0,r.tZ)("link",{rel:"icon",href:"/favicon.ico"}),(0,r.tZ)("meta",{name:"viewport",content:"width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"}),a&&(0,r.tZ)("meta",{name:"description",content:a.substring(0,200)})]})}},3419:function(e,t,n){"use strict";n.d(t,{E:function(){return o},O:function(){return s}});var r=n(7146),i=n(6010),c=n(5796),a=n(5969),o=function(e){var t=e.src,n=e.width,i=void 0===n?300:n,c=(e.height,e.style),a=void 0===c?{}:c;return(0,r.tZ)("img",{src:"https://api.finna.fi".concat(t,"&w=").concat(i),className:"w-auto rouded-xl overflow-hidden",alt:"",style:a})},l=function(e,t){return e?(0,r.tZ)(c.ZP,{offset:100,once:!0,children:t}):t},s=function(e){var t=e.records,n=e.lazy,c=void 0===n||n;return(0,r.tZ)("div",{children:(0,r.tZ)("ul",{className:"flex flex-row flex-wrap justify-between. overflow-hidden.",children:null===t||void 0===t?void 0:t.map((function(e,t){return(0,r.tZ)("li",{role:"button",className:(0,i.Z)("px-1 mb-3 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group",(null===e||void 0===e?void 0:e.id)&&"cursor-pointer"),children:(n=(null===e||void 0===e?void 0:e.id)||null,o=(0,r.BX)("div",{className:"flex flex-col",children:[(0,r.tZ)("div",{className:"overflow-hidden aspect-w-5 aspect-h-4",children:(null===e||void 0===e?void 0:e.images.length)>0&&l(c&&t>=8,(0,r.tZ)("img",{className:"object-cover object-center",src:"https://api.finna.fi".concat(e.images[0],"&w=300"),alt:""}))}),(0,r.tZ)("div",{className:"w-full bg-gray-900 pt-2 px-3 text-center text-gray-200 overflow-hidden text-sm md:text-md line-clamp-2 h-10 group-hover:text-white leading-tight",children:(null===e||void 0===e?void 0:e.title)||""})]}),n?(0,r.tZ)(a.Z,{href:"/view?id=".concat(encodeURIComponent(n)),children:(0,r.tZ)("a",{children:o})},n):o)},"record-".concat(t));var n,o}))})})}},5969:function(e,t,n){"use strict";var r=n(6156),i=n(7146),c=n(1664);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.Z=function(e){return(0,i.tZ)(c.default,o(o({},e),{},{prefetch:!1}))}},7406:function(e,t,n){"use strict";n.d(t,{N:function(){return a}});var r=n(7146),i=(n(9748),n(6010)),c=n(5969),a=function(e){var t=e.facet,n=e.facets,a=e.facetUrl,o=e.truncate,l=void 0!==o&&o;return(0,r.tZ)("div",{className:(0,i.Z)("mt-1 items-center w-full",l&&"line-clamp-3 overflow-clip"),children:(0,r.tZ)("ul",{className:"",children:n.map((function(e){return(0,r.tZ)(c.Z,{prefetch:!0,href:a(t,e.value),children:(0,r.tZ)("a",{children:(0,r.tZ)("li",{role:"button",className:"inline-flex flex-auto mr-2 mb-1 px-2 py-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md text-xs font-medium subpixel-antialiased text-gray-800 uppercase. cursor-pointer ripple-bg-white whitespace-nowrap",children:e.translated},"facet-".concat(e.value))})},"facet-map-".concat(e.value))}))})})}},4807:function(e,t,n){"use strict";n.d(t,{d:function(){return c}});var r=n(7146),i=n(6010),c=function(e){var t=e.title,n=e.value,c=e.resultCount,a=(e.pageNum,e.pageCount,e.placeholder);return t=void 0!==a&&a?n="":"".concat(t,":"),(0,r.BX)("div",{className:"flex items-center justify-between h-8",children:[(0,r.BX)("h2",{className:(0,i.Z)("leading-tight",t&&"mr-2"),children:[t," ",(0,r.tZ)("span",{className:"font-normal text-gray-200",children:n})]}),c&&(0,r.tZ)("div",{children:(0,r.BX)("div",{className:"mr-2 text-sm text-gray-200 leading-tight",children:["(",c,(0,r.tZ)("span",{className:"sm:inline hidden",children:" klippi\xe4"}),")"]})})]})}},883:function(e,t,n){"use strict";n.d(t,{rr:function(){return l},Yw:function(){return h},J0:function(){return o},zp:function(){return s},jY:function(){return f},Gg:function(){return d},yQ:function(){return i}});var r=n(9973).sk?"http://localhost:3001":"https://api.finna.fi",i=20,c=function(e,t){return"filter[]=".concat("".concat(e,':"').concat(encodeURIComponent(t),'"'))},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=["free_online_boolean:1","datasource_str_mv:kavi","~format_ext_str_mv:1/Video/Video/","~format_ext_str_mv:1/Video/Short/","-id:kavi.elonet_elokuva_1611548","-genre_facet:katsaus"];return"undefined"!==typeof e&&!1!==e&&(e=e||[1900,"*"],t.push('search_daterange_mv:"['.concat(e[0]," TO ").concat(e[1],']"'))),t.map((function(e){return"filter[]=".concat(encodeURIComponent(e))})).join("&")},o=function(e,t){var n=["title","id","images"].map((function(e){return"field[]=".concat(e)})).join("&");return"".concat(r,"/api/v1/search?lookfor=").concat(encodeURIComponent(e),"&").concat(a(),"&").concat(n,"&limit=").concat(t)},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2?arguments[2]:void 0,c=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:i,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:["title","id","images"],u=a(o)+(n?'&filter[]=topic_facet:"'.concat(encodeURIComponent(n),'"'):"")+(c?'&filter[]=genre_facet:"'.concat(encodeURIComponent(c),'"'):""),d=s.map((function(e){return"field[]=".concat(e)})).join("&");return"".concat(r,"/api/v1/search?lookfor=").concat(encodeURIComponent(e),"&").concat(u,"&").concat(d,"&limit=").concat(l,"&page=").concat(t)},s=function(){var e=[["genre_facet","mainos"],["genre_facet","animaatio"],["genre_facet","tv-tuotanto"],["genre_facet","opetuselokuva"],["genre_facet","henkil\xf6dokumentti"],["genre_facet","ammatinkuvaus"],["genre_facet","draamadokumentti"],["genre_facet","teollisuusdokumentti"],["topic_facet","henkil\xf6autot"],["topic_facet","tehtaat"],["topic_facet","matkailu"],["topic_facet","pankit"],["topic_facet","maisema"],["topic_facet","muoti"],["topic_facet","kahvi"],["topic_facet","kaupungit"],["topic_facet","virvoitusjuomat"],["topic_facet","hygienia"],["topic_facet","elintarvikkeet"],["topic_facet","ruoanvalmistus"],["topic_facet","maatalous"],["topic_facet","myym\xe4l\xe4t"],["topic_facet","rakennukset"],["search_daterange_mv","[1950 TO 1959]"],["search_daterange_mv","[1960 TO 1969]"],["search_daterange_mv","[1970 TO 1979]"],["search_daterange_mv","[1980 TO 2000]"]],t=e[Math.floor(Math.random()*e.length)],n=a(!1)+"&"+c(t[0],t[1]),i=["title","id","images"].map((function(e){return"field[]=".concat(e)})).join("&");return"".concat(r,"/api/v1/search?").concat(n,"&").concat(i,"&limit=10&sort=first_indexed desc,id asc}")},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=a(i)+(t?"&".concat(c("topic_facet",t)):"")+(n?"&".concat(c("genre_facet",n)):""),s="facet[]=".concat(e);return"".concat(r,"/api/v1/search?lookfor=").concat(o?encodeURIComponent(o):"","&").concat(l,"&").concat(s,"&limit=0")},d=function(e,t,n,r){return u("topic_facet",t,n,r,e)},f=u("genre_facet"),m=(u("main_date_str"),["title","id","images","urls","recordPage","imageRights","rawData","buildings"]),h=function(e){var t=m.map((function(e){return"field[]=".concat(e)})).join("&");return"".concat(r,"/api/v1/record?id=").concat(e,"&").concat(t)}},3125:function(e,t,n){"use strict";n(7757)},8389:function(e,t,n){"use strict";n.d(t,{Yw:function(){return r},LP:function(){return i},Xv:function(){return c}});var r=function(e){return"/view?id=".concat(encodeURIComponent(e))},i=function(e){if("undefined"===typeof(null===e||void 0===e?void 0:e.urls))return[];var t="application/x-mpegURL";return e.urls.filter((function(e){return"undefined"!==typeof e.videoSources&&e.videoSources.find((function(e){return e.type===t}))})).map((function(e){return{src:e.videoSources.find((function(e){return e.type==t})).src,title:e.text}}))},c=function(e){return"https://finna.fi".concat(e)}},9973:function(e,t,n){"use strict";n.d(t,{cm:function(){return s},lI:function(){return u},Pv:function(){return d},cC:function(){return f},SE:function(){return m},sk:function(){return h}});n(7757);var r=n(9302),i=n(9748),c=(n(883),n(3125),n(8593)),a=n.n(c),o={1900:"1900-",1910:"1910-",1920:"1920-",1930:"1930-",1940:"1940-",1950:"1950-",1960:"1960-",1970:"1970-",1980:"1980-",1990:"1990-",2e3:"2000-"},l={topic_facet:"topic",genre_facet:"genre"},s=function(e){return o[e]},u=function(e,t){return"/search?".concat(l[e],"=").concat(encodeURIComponent(t))},d=function(e,t){return"/browse/".concat(l[e],"/").concat(encodeURIComponent(t))},f=function(e){return e.map((function(e){return{value:e.value,translated:e.translated}}))},m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=(0,r.Z)((function(){a().start()}),t);(0,i.useEffect)((function(){n.cancel(),e?n():a().done()}),[e])},h=!1},8967:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(7146),i=n(9748),c=n(4002),a=n(1163),o=(n(5152),n(8767)),l=n(5457),s=n.n(l),u=n(1871),d=n(8782),f=n(883),m=(n(5969),n(2743)),h=n(8389),v=(n(3419),n(7406)),p=n(4807),g=(n(3125),n(9973)),x=function(e){var t,n,i=e.record,c=(i.rawData,null===(t=i.imageRights)||void 0===t?void 0:t.copyright),a=null===(n=i.imageRights)||void 0===n?void 0:n.link,o=c;return c&&a&&(o=(0,r.tZ)("a",{href:a,target:"_blank",children:o})),(0,r.BX)("div",{className:"flex flex-col",children:[(0,r.tZ)("span",{className:"uppercase text-xs font-bold",children:"Aineiston k\xe4ytt\xf6oikeudet: "}),(0,r.tZ)("a",{target:"_blank",href:(0,h.Xv)(i.recordPage),className:"hover:text-gray-800",title:"Katso lis\xe4tiedot Finnassa",children:(0,r.BX)("div",{className:"text-sm flex flex-row items-center",children:[(0,r.tZ)("div",{className:"underline",children:o}),(0,r.tZ)("div",{className:"text-gray-600 ml-1 flex jusitfy-center items-center text-xl",children:(0,r.tZ)("span",{className:"text-xs ml-2 ",children:(0,r.tZ)(u.CkN,{})})})]})})]})},Z=function(e){var t=e.record,n=t.rawData;return(0,r.BX)("div",{children:[(0,r.tZ)("h1",{className:"text-xl md:text-3xl font-bold",children:t.title}),(0,r.BX)("p",{className:"text-md text-gray-100",children:[n.author_corporate&&"".concat(n.author_corporate," "),n.main_date_str&&n.main_date_str]})]})},_=function(e){var t=e.children;return(0,r.tZ)("div",{className:"flex items-center justify-center font-semibold text-lg px-4 py-3 rounded-xl bg-gradient-to-b from-pink-500 to-red-500 text-gray-100 border-2 border-red-500",children:t})},N=function(){return(0,r.tZ)(_,{children:(0,r.BX)("div",{className:"ml-2 flex items-center uppercase text-sm",children:["Katso ",(0,r.tZ)("span",{className:"ml-2 text-xs",children:(0,r.tZ)(u.gmG,{})})]})})},y=function(){return(0,r.tZ)("div",{className:"text-gray-100 group-hover:text-white fill-current stroke-current items-center justify-center flex text-sm",children:(0,r.tZ)("div",{className:"ml-1",children:(0,r.tZ)(u.gmG,{})})})},w=function(e){var t=e.imageUrl;return(0,r.BX)("div",{className:"flex relative items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64",children:[(0,r.tZ)("div",{className:"w-full h-full",children:(0,r.tZ)("div",{className:"aspect-w-5 aspect-h-4",children:t&&(0,r.tZ)("img",{alt:"",src:t,className:"w-auto rouded-xl overflow-hidden object-cover object-center"})})}),(0,r.tZ)("div",{className:"absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer",children:(0,r.BX)(_,{children:["Katso Finnassa",(0,r.tZ)("span",{className:"text-lg ml-4",children:(0,r.tZ)(u.CkN,{})})]})})]})},b=function(e){var t=e.topics,n=e.genres;return(0,r.BX)("div",{children:[t.length>0&&(0,r.BX)("div",{className:"mb-2",children:[(0,r.tZ)(p.d,{title:"Aiheet"}),(0,r.tZ)(v.N,{facet:"topic_facet",facets:t.map((function(e){return{value:e,translated:e}})),facetUrl:g.lI})]}),n.length>0&&(0,r.BX)("div",{children:[(0,r.tZ)(p.d,{title:"Genret"}),(0,r.tZ)(v.N,{facet:"genre_facet",facets:n.map((function(e){return{value:e,translated:e}})),facetUrl:g.lI})]})]})},k=function(e){var t=e.text.replace(/<br( )?\/>/g,"\n").split("\n"),n=t.length>1;return(0,r.BX)("div",{className:"mt-4 leading-snug text-md",children:[n&&(0,r.BX)("details",{children:[(0,r.tZ)("summary",{className:"cursor-pointer whitespace-pre-line outline-none",children:t[0]}),t.length>1&&(0,r.tZ)("div",{children:t.slice(1).map((function(e,t){return(0,r.tZ)("p",{className:"pt-2",children:e},"detail-".concat(t))}))})]}),!n&&(0,r.tZ)("p",{children:t[0]})]})};function j(e){var t,n,l,v=e.id,p=void 0===v?null:v,_=e.recordData,j=void 0===_?null:_,X=(0,d.TL)(),B=(0,a.useRouter)(),O=(0,i.useState)(null),C=O[0],R=O[1],U=(0,i.useState)(!0),I=U[0],P=U[1],D=(0,i.useRef)(null);p=p||B.query.id,(0,i.useEffect)((function(){X({type:d.G8})}),[]);var E=(0,o.useQuery)((0,f.Yw)(p),{enabled:!!p,initialData:j,refetchOnMount:null===j}),S=E.data,T=(E.status,E.error),G=E.isFetching;(0,g.SE)(G);var K=S&&!T&&S.resultCount>0&&S.records[0];if(T||!G&&S&&"ERROR"===S.status)return(0,r.tZ)(m.Z,{});var Y=K?(0,h.LP)(K):[];(0,i.useEffect)((function(){return R(Y[0])}),[K]);var L=Y.length>0,A=K&&K.images?"https://api.finna.fi".concat(K.images[0]):null;return(0,r.BX)("div",{className:"w-auto font-sans",children:[(0,r.tZ)(c.Z,{title:K&&K.title,description:K&&(null===(t=K.rawData)||void 0===t?void 0:t.description)}),(0,r.tZ)("div",{className:"mt-3",children:(0,r.tZ)("article",{children:!G&&K&&(0,r.BX)(r.HY,{children:[(0,r.BX)("div",{className:"flex flex-col w-full max-w-2xl",children:[(0,r.BX)("div",{className:"aspect-w-4 aspect-h-3 overflow-hidden",children:[C&&(0,r.tZ)(s(),{ref:D,className:"react-player -mt-2",url:C.src,width:"100%",height:"100%",playing:!0,controls:!0,muted:!0,pip:!1,playIcon:(0,r.tZ)(N,{}),light:!!I&&"https://api.finna.fi".concat(K.images[0])}),!L&&(0,r.tZ)("a",{href:(0,h.Xv)(K.recordPage),target:"_blank",children:(0,r.tZ)(w,{imageUrl:A||null})})]}),(0,r.BX)("div",{className:"flex flex-col justify-center mt-2",children:[(0,r.tZ)(Z,{record:K}),Y.length>1&&(0,r.tZ)("ul",{className:"mt-5",children:Y.map((function(e,t){return(0,r.BX)("li",{onClick:function(t){R(e),P(!1),D.current.seekTo(0)},className:"flex my-2 items-center group text-md text-gray-200 hover:text-white cursor-pointer",children:[(0,r.tZ)(y,{big:!1}),(0,r.tZ)("div",{className:"ml-3",children:e.title})]},e.src)}))})]})]}),(0,r.BX)("div",{className:"max-w-2xl",children:[K.rawData.description&&(0,r.tZ)(k,{text:K.rawData.description}),(0,r.BX)("div",{className:"my-5 inline-flex flex-col sm:flex-row bg-yellow-50 text-gray-900 p-3 rounded-md",children:[K.buildings&&(0,r.BX)("div",{className:"flex flex-col",children:[(0,r.tZ)("div",{className:"mr-2 uppercase text-xs font-bold",children:"Aineiston tarjoaa: "}),(0,r.tZ)("div",{className:"flex text-sm",children:(0,r.BX)("a",{href:"https://kavi.finna.fi",target:"_blank",className:"flex items-center justify-center underline hover:text-gray-700",children:[K.buildings[0].translated," ",(0,r.tZ)("span",{className:"ml-2 mr-5 text-gray-700 text-xs",children:(0,r.tZ)(u.CkN,{})})]})})]}),(0,r.tZ)("div",{className:"sm:mt-0 mt-2",children:(0,r.tZ)(x,{record:K})})]}),(0,r.tZ)(b,{topics:null!==(n=K.rawData.topic_facet)&&void 0!==n?n:[],genres:null!==(l=K.rawData.genre_facet)&&void 0!==l?l:[]})]})]})})})]})}}}]);