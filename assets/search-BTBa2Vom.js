import{I as b,J as $,r as v,w as y,a as u,c as p,K as f,L as S,b as e,M as k,n as q,h as x,x as g,t as m,N as w,o as C,q as D,O as M,F as T,d as N,v as j,i as B,P as I}from"./index-C5S37JQg.js";const K={class:"flex items-center"},P=e("i",{class:"icon-search text-[48px]"},null,-1),U={class:"overflow-hidden"},z=e("i",{class:"icon-close text-[32px]"},null,-1),F=[z],L={__name:"search",props:{search:{},searchModifiers:{}},emits:b(["searchClick"],["update:search"]),setup(d,{emit:h}){const t=h,o=$(d,"search"),n=v(!1);y(()=>o.value,c=>{(c==null?void 0:c.length)>0?n.value=!0:n.value=!1});const r=()=>o.value="";return(c,l)=>(u(),p("div",K,[P,f(e("input",{type:"text",class:"text-body-xxl-medium ml-4 w-full bg-transparent text-white placeholder:text-enable focus:outline-none",placeholder:"輸入關鍵字","onUpdate:modelValue":l[0]||(l[0]=a=>o.value=a),onKeyup:l[1]||(l[1]=k(a=>t("searchClick"),["enter"]))},null,544),[[S,o.value]]),e("div",U,[e("button",{class:q(["mr-4 flex items-center transition-transform duration-300",[{"translate-x-10":!n.value}]]),onClick:l[2]||(l[2]=a=>r())},F,2)]),e("button",{type:"button",onClick:l[3]||(l[3]=a=>t("searchClick")),class:"rounded-[8px] border px-4 py-2"}," Search ")]))}},R={class:"overflow-hidden rounded-[8px]"},E=["src"],G=e("div",{class:"absolute left-0 top-0"},null,-1),J={class:"mt-2 flex justify-between"},O={class:"text-body-m-medium"},V=e("i",{class:"icon-heart pt-1"},null,-1),W={class:"text-body-s-medium mt-1 flex justify-between text-enable"},A={class:"flex space-x-2"},H={__name:"search-card",props:{id:{type:Number},title:{type:String,default:""},year:{type:String},poster:{type:String},date:{type:String},mediaType:{type:String}},emits:["getDataId"],setup(d,{emit:h}){const t=d,o=x(()=>t.poster?`https://image.tmdb.org/t/p/w500${t.poster}`:""),n=x(()=>t.mediaType=="tv"?"電視劇":"電影"),r=g(),c=()=>{r.push({name:"searched",params:{mediaType:t.mediaType,mediaID:t.id}})};return(l,a)=>(u(),p("div",{class:"relative rounded-[8px]",onClick:a[0]||(a[0]=i=>c())},[e("div",R,[e("img",{src:o.value,alt:"",class:"aspect-[3/4.3] cursor-pointer object-cover transition-transform duration-500 hover:scale-110"},null,8,E)]),G,e("div",null,[e("div",J,[e("div",O,m(d.title),1),V]),e("div",W,[e("div",A,m(n.value),1),e("div",null,m(d.date),1)])])]))}},Q={class:"container h-full pt-[60px]"},X={class:"flex-center h-full"},Y=e("p",{class:"text-body-xxl-medium flex items-center justify-center text-center text-enable"}," 暫未搜尋到任何結果 ",-1),Z=[Y],ee={key:0,class:"mt-10 grid grid-cols-12 gap-5"},se={__name:"search",setup(d){const h=g(),t=w(),o=v(""),n=v([]),r=v({include_adult:"false",language:"zh-TW",query:"",page:"1"}),c=async()=>{r.value.query=o.value,h.push({query:{q:o.value}})};y(()=>r.value,async(a,i)=>{console.log(a);const s=await I({params:r.value}),{results:_}=s.data;n.value=_},{deep:!0});const l=()=>{};return C(async()=>{var a,i;r.value.query=(a=t==null?void 0:t.query)==null?void 0:a.q,o.value=(i=t==null?void 0:t.query)==null?void 0:i.q}),(a,i)=>(u(),p("div",Q,[D(L,{search:o.value,"onUpdate:search":i[0]||(i[0]=s=>o.value=s),onSearchClick:c},null,8,["search"]),f(e("div",X,Z,512),[[M,n.value.length==0]]),n.value.length>0?(u(),p("div",ee,[(u(!0),p(T,null,N(n.value,(s,_)=>(u(),B(H,{key:_,id:s.id,title:(s==null?void 0:s.name)??s.title,poster:s.poster_path,date:(s==null?void 0:s.first_air_date)??s.release_date,mediaType:s.media_type,onGetDataId:l,class:"col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2"},null,8,["id","title","poster","date","mediaType"]))),128))])):j("",!0)]))}};export{se as default};
