(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[891],{8389:function(e,t,r){"use strict";r.d(t,{Yw:function(){return n},LP:function(){return i},Xv:function(){return l}});var n=function(e){return"/view?id=".concat(encodeURIComponent(e))},i=function(e){if("undefined"===typeof(null===e||void 0===e?void 0:e.urls))return[];var t="application/x-mpegURL";return e.urls.filter((function(e){return"undefined"!==typeof e.videoSources&&e.videoSources.find((function(e){return e.type===t}))})).map((function(e){return{src:e.videoSources.find((function(e){return e.type==t})).src,title:e.text}}))},l=function(e){return"https://finna.fi".concat(e)}},8967:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var n=r(7146),i=r(9748),l=r(4002),a=r(1163),c=(r(5152),r(8767)),s=r(5457),d=r.n(s),o=r(1871),u=r(8782),f=r(883),m=(r(5969),r(8389)),h=(r(3419),r(7406)),v=r(4807),g=(r(3125),r(9973)),p=function(e){var t,r,i=e.record,l=null===(t=i.imageRights)||void 0===t?void 0:t.copyright,a=null===(r=i.imageRights)||void 0===r?void 0:r.link,c=l;return l&&a&&(c=(0,n.tZ)("a",{href:a,target:"_blank",children:c})),(0,n.BX)("div",{className:"flex flex-col",children:[(0,n.tZ)("span",{className:"uppercase text-xs font-bold",children:"Aineiston k\xe4ytt\xf6oikeudet: "}),(0,n.tZ)("a",{target:"_blank",href:(0,m.Xv)(i.recordPage),className:"hover:text-gray-800",title:"Katso lis\xe4tiedot Finnassa",children:(0,n.BX)("div",{className:"text-sm flex flex-row items-center",children:[(0,n.tZ)("div",{className:"underline",children:c}),(0,n.tZ)("div",{className:"text-gray-600 ml-1 flex jusitfy-center items-center text-xl",children:(0,n.tZ)("span",{className:"text-xs ml-2 ",children:(0,n.tZ)(o.CkN,{})})})]})})]})},x=function(e){var t=e.record;return(0,n.BX)("div",{children:[(0,n.tZ)("h1",{className:"text-xl md:text-3xl font-bold",children:t.title}),(0,n.BX)("p",{className:"text-md text-gray-100",children:[t.corporateAuthors&&"".concat(t.corporateAuthors," "),t.year&&t.year]})]})},N=function(){return(0,n.tZ)("div",{className:"shadow-lg bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100 fill-current stroke-current rounded-full items-center justify-center flex w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-2xl sm:text-4xl",children:(0,n.tZ)("div",{className:"ml-2",children:(0,n.tZ)(o.gmG,{})})})},Z=function(){return(0,n.tZ)("div",{className:"text-gray-100 group-hover:text-white fill-current stroke-current items-center justify-center flex text-sm",children:(0,n.tZ)("div",{className:"ml-1",children:(0,n.tZ)(o.gmG,{})})})},y=function(e){var t=e.imageUrl;return(0,n.BX)("div",{className:"flex relative items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl group cursor-pointer min-h-64",children:[(0,n.tZ)("div",{className:"w-full h-full",children:(0,n.tZ)("div",{className:"aspect-w-5 aspect-h-4",children:t&&(0,n.tZ)("img",{alt:"",src:t,className:"w-auto rouded-xl overflow-hidden object-cover object-center"})})}),(0,n.tZ)("div",{className:"absolute align-middle p-10 self-center align-center justify-center flex cursor-pointer",children:(0,n.BX)("div",{className:"flex items-center justify-center text-2xl p-4 rounded-md bg-white text-gray-900 group-hover:bg-pink-500 group-hover:text-gray-100",children:["Katso finna.fi:ss\xe4",(0,n.tZ)("span",{className:"text-lg ml-4",children:(0,n.tZ)(o.CkN,{})})]})})]})},w=function(e){var t=e.topics,r=e.genres;return(0,n.BX)("div",{children:[t.length>0&&(0,n.BX)("div",{className:"mb-2",children:[(0,n.tZ)(v.d,{title:"Aiheet"}),(0,n.tZ)(h.N,{facet:"topic_facet",facets:t.map((function(e){return{value:e,translated:e}})),facetUrl:g.lI})]}),r.length>0&&(0,n.BX)("div",{children:[(0,n.tZ)(v.d,{title:"Genret"}),(0,n.tZ)(h.N,{facet:"genre_facet",facets:r.map((function(e){return{value:e,translated:e}})),facetUrl:g.lI})]})]})},X=function(e){var t=e.text.replace(/<br( )?\/>/g,"\n").split("\n"),r=t.length>1;return(0,n.BX)("div",{className:"mt-4 leading-snug text-md",children:[r&&(0,n.BX)("details",{children:[(0,n.tZ)("summary",{className:"cursor-pointer whitespace-pre-line outline-none",children:t[0]}),t.length>1&&(0,n.tZ)("div",{children:t.slice(1).map((function(e,t){return(0,n.tZ)("p",{className:"pt-2",children:e},"detail-".concat(t))}))})]}),!r&&(0,n.tZ)("p",{children:t[0]})]})};function b(e){var t,r=e.id,s=void 0===r?null:r,h=e.recordData,v=void 0===h?null:h,b=(0,u.TL)(),k=(0,a.useRouter)(),B=(0,i.useState)(null),_=B[0],j=B[1],C=(0,i.useState)(!0),E=C[0],P=C[1],R=(0,i.useRef)(null);s=s||k.query.id,(0,i.useEffect)((function(){b({type:u.G8})}),[]);var S=(0,c.useQuery)((0,f.Yw)(s),{enabled:!!s,initialData:v,refetchOnMount:null===v}),U=S.data,A=(S.status,S.error),G=S.isFetching;(0,g.SE)(G);var I=U&&!A&&U.resultCount>0&&U.records[0];if(A)return(0,n.tZ)("p",{children:"error..."});var L=I?(0,m.LP)(I):[];(0,i.useEffect)((function(){return j(L[0])}),[I]);var T=L.length>0,O=I&&I.images?"https://api.finna.fi".concat(I.images[0]):null,Y=I&&"undefined"!==typeof I.summary&&I.summary.length>0?I.summary[0]:null;return(0,n.BX)("div",{className:"w-auto font-sans",children:[(0,n.tZ)(l.Z,{title:I&&I.title,description:Y||""}),(0,n.tZ)("div",{className:"mt-3",children:(0,n.tZ)("article",{children:!G&&I&&(0,n.BX)(n.HY,{children:[(0,n.BX)("div",{className:"flex flex-col w-full max-w-2xl",children:[(0,n.BX)("div",{className:"aspect-w-4 aspect-h-3",children:[_&&(0,n.tZ)(d(),{ref:R,className:"react-player -mt-2",url:_.src,width:"100%",height:"100%",playing:!0,controls:!0,muted:!0,pip:!1,playIcon:(0,n.tZ)(N,{}),light:!!E&&"https://api.finna.fi".concat(I.images[0])}),!T&&(0,n.tZ)("a",{href:(0,m.Xv)(I.recordPage),target:"_blank",children:(0,n.tZ)(y,{imageUrl:O||null})})]}),(0,n.BX)("div",{className:"flex flex-col justify-center mt-2",children:[(0,n.tZ)(x,{record:I}),L.length>1&&(0,n.tZ)("ul",{className:"mt-5",children:L.map((function(e,t){return(0,n.BX)("li",{onClick:function(t){j(e),P(!1),R.current.seekTo(0)},className:"flex my-2 items-center group text-md text-gray-200 hover:text-white cursor-pointer",children:[(0,n.tZ)(Z,{big:!1}),(0,n.tZ)("div",{className:"ml-3",children:e.title})]},e.src)}))})]})]}),(0,n.BX)("div",{className:"max-w-2xl",children:[Y&&(0,n.tZ)(X,{text:Y}),(0,n.BX)("div",{className:"my-5 inline-flex flex-col sm:flex-row bg-yellow-50 text-gray-900 p-3 rounded-md",children:[I.buildings&&(0,n.BX)("div",{className:"flex flex-col",children:[(0,n.tZ)("div",{className:"mr-2 uppercase text-xs font-bold",children:"Aineiston tarjoaa: "}),(0,n.tZ)("div",{className:"flex text-sm",children:(0,n.BX)("a",{href:"https://kavi.finna.fi",target:"_blank",className:"flex items-center justify-center underline hover:text-gray-700",children:[I.buildings[0].translated," ",(0,n.tZ)("span",{className:"ml-2 mr-5 text-gray-700 text-xs",children:(0,n.tZ)(o.CkN,{})})]})})]}),(0,n.tZ)("div",{className:"sm:mt-0 mt-2",children:(0,n.tZ)(p,{record:I})})]}),(0,n.tZ)(w,{topics:[],genres:null!==(t=I.genres)&&void 0!==t?t:[]})]})]})})})]})}},2866:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/view",function(){return r(8967)}])}},function(e){e.O(0,[625,693,756,774,888,179],(function(){return t=2866,e(e.s=t);var t}));var t=e.O();_N_E=t}]);