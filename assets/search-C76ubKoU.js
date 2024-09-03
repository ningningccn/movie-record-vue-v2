import{M as T,N as M,r as o,w,a as i,c as d,O as R,P as N,b as e,Q as P,n as B,h as k,B as S,t as f,R as j,S as I,o as V,q as U,F as z,d as F,v as K,i as O,T as E}from"./index-BjXT1xGw.js";const G={class:"flex items-center"},L=e("i",{class:"icon-search text-[48px]"},null,-1),Q={class:"overflow-hidden"},W=e("i",{class:"icon-close text-[32px]"},null,-1),A=[W],H={__name:"search",props:{search:{},searchModifiers:{}},emits:T(["searchClick"],["update:search"]),setup(p,{emit:y}){const t=y,l=M(p,"search"),a=o(!1);w(()=>l.value,c=>{(c==null?void 0:c.length)>0?a.value=!0:a.value=!1});const _=()=>l.value="";return(c,n)=>(i(),d("div",G,[L,R(e("input",{type:"text",class:"text-body-xxl-medium ml-4 w-full bg-transparent text-white placeholder:text-enable focus:outline-none",placeholder:"輸入關鍵字","onUpdate:modelValue":n[0]||(n[0]=r=>l.value=r),onKeyup:n[1]||(n[1]=P(r=>t("searchClick"),["enter"]))},null,544),[[N,l.value]]),e("div",Q,[e("button",{class:B(["mr-4 flex items-center transition-transform duration-300",[{"translate-x-10":!a.value}]]),onClick:n[2]||(n[2]=r=>_())},A,2)]),e("button",{type:"button",onClick:n[3]||(n[3]=r=>t("searchClick")),class:"rounded-[8px] border px-4 py-2"}," Search ")]))}},J={class:"overflow-hidden rounded-[8px]"},X=["src"],Y=e("div",{class:"absolute left-0 top-0"},null,-1),Z={class:"mt-2 flex justify-between"},ee={class:"text-body-m-medium"},te=e("i",{class:"icon-heart pt-1"},null,-1),se={class:"text-body-s-medium mt-1 flex justify-between text-enable"},ae={class:"flex space-x-2"},le={__name:"search-card",props:{id:{type:Number},title:{type:String,default:""},year:{type:String},poster:{type:String},date:{type:String},mediaType:{type:String}},emits:["getDataId"],setup(p,{emit:y}){const t=p,l=k(()=>t.poster?`https://image.tmdb.org/t/p/w500${t.poster}`:""),a=k(()=>t.mediaType=="tv"?"電視劇":"電影"),_=S(),c=()=>{_.push({name:"searched",params:{mediaType:t.mediaType,mediaID:t.id}})};return(n,r)=>(i(),d("div",{class:"relative rounded-[8px]",onClick:r[0]||(r[0]=u=>c())},[e("div",J,[e("img",{src:l.value,alt:"",class:"aspect-[3/4.3] cursor-pointer object-cover transition-transform duration-500 hover:scale-110"},null,8,X)]),Y,e("div",null,[e("div",Z,[e("div",ee,f(p.title),1),te]),e("div",se,[e("div",ae,f(a.value),1),e("div",null,f(p.date),1)])])]))}},ne={key:0,class:"flex-center h-full"},oe=e("p",{class:"text-body-xxl-medium flex items-center justify-center text-center text-enable"}," 暫未搜尋到任何結果 ",-1),re=[oe],ce={key:1,class:"text-body-l mt-[60px] font-medium"},ie={key:2,class:"mt-10 grid grid-cols-12 gap-5"},de={__name:"search",setup(p){const y=S(),t=j(),l=o(""),a=o([]),_=o(1),c=o(0),n=o(0),r=o(!1),u=o({include_adult:"false",language:"zh-TW",query:"",page:1}),q=async()=>{u.value.query=l.value,u.value.page=1,y.push({query:{q:l.value}}),a.value=[]};w(()=>u.value,async(v,h)=>{const s=await E({params:u.value}),{page:m,results:b,total_pages:$,total_results:D}=s.data;_.value=m,m>1?a.value=[...a.value,...b]:a.value=b,c.value=$,n.value=D,m===$?r.value=!1:r.value=!0},{deep:!0});const x=o(null),g=o(null);o(!1),I(g,([{isIntersecting:v}])=>{v&&u.value.page++},{pageViewRef:x});const C=()=>{};return V(async()=>{var v,h;u.value.query=(v=t==null?void 0:t.query)==null?void 0:v.q,l.value=(h=t==null?void 0:t.query)==null?void 0:h.q}),(v,h)=>(i(),d("div",{class:"container h-full pt-[60px]",ref_key:"pageViewRef",ref:x},[U(H,{search:l.value,"onUpdate:search":h[0]||(h[0]=s=>l.value=s),onSearchClick:q},null,8,["search"]),a.value.length==0?(i(),d("div",ne,re)):(i(),d("div",ce," 結果顯示:1-"+f(a.value.length)+" (總共"+f(n.value)+"個) ",1)),a.value.length>0?(i(),d("div",ie,[(i(!0),d(z,null,F(a.value,(s,m)=>(i(),O(le,{key:m,id:s.id,title:(s==null?void 0:s.name)??s.title,poster:s.poster_path,date:(s==null?void 0:s.first_air_date)??s.release_date,mediaType:s.media_type,onGetDataId:C,class:"col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2"},null,8,["id","title","poster","date","mediaType"]))),128))])):K("",!0),e("div",{ref_key:"infiniteRef",ref:g},null,512)],512))}};export{de as default};
