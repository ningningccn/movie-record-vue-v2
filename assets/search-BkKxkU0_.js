import{T as N,U as P,r as n,w as T,o as q,a as c,c as u,E as x,V,b as e,W as L,n as U,i as S,B as R,D as W,t as _,X as E,Y as F,g as G,J as K,v as C,H,y as D,F as J,d as O,j as X,Z as Y}from"./index-BBvL1sa9.js";import{L as Z}from"./loading-CcDCi8fD.js";const A={class:"flex items-center"},Q=e("i",{class:"icon-search text-[48px]"},null,-1),ee={class:"overflow-hidden"},te=e("i",{class:"icon-close text-[32px]"},null,-1),se=[te],ae={__name:"search-input",props:{search:{},searchModifiers:{}},emits:N(["searchClick"],["update:search"]),setup(v,{emit:g}){const t=g,o=P(v,"search"),r=n(!1),a=n(null);T(()=>o.value,d=>{(d==null?void 0:d.length)>0?r.value=!0:r.value=!1});const m=()=>o.value="";return q(()=>{a.value.focus()}),(d,l)=>(c(),u("div",A,[Q,x(e("input",{type:"text",class:"text-body-xxl-medium ml-4 w-full bg-transparent text-white placeholder:text-enable focus:outline-none",placeholder:"輸入關鍵字","onUpdate:modelValue":l[0]||(l[0]=i=>o.value=i),ref_key:"searchInputRef",ref:a,onKeyup:l[1]||(l[1]=L(i=>t("searchClick"),["enter"]))},null,544),[[V,o.value]]),e("div",ee,[e("button",{class:U(["mr-4 flex items-center transition-transform duration-300",[{"translate-x-10":!r.value}]]),onClick:l[2]||(l[2]=i=>m())},se,2)]),e("button",{type:"button",onClick:l[3]||(l[3]=i=>t("searchClick")),class:"rounded-[8px] border px-4 py-2"}," Search ")]))}},le={class:"skeleton-card relative aspect-[3/4.3] overflow-hidden rounded-[8px]"},ne={alt:"",class:"absolute aspect-[3/4.3] size-full cursor-pointer object-cover"},oe={class:"mt-2 flex justify-between"},re={class:"text-body-m-medium"},ie=e("i",{class:"icon-heart pt-1"},null,-1),ce={class:"text-body-s-medium mt-1 flex justify-between text-enable"},ue={class:"flex space-x-2"},de={__name:"search-card",props:{id:{type:Number},title:{type:String,default:""},year:{type:String},poster:{type:String},date:{type:String},mediaType:{type:String}},emits:["getDataId"],setup(v,{emit:g}){const t=v,o=S(()=>t.poster?`https://image.tmdb.org/t/p/w500${t.poster}`:""),r=S(()=>t.mediaType=="tv"?"電視劇":"電影"),a=R(),m=()=>{a.push({name:"searched",params:{mediaType:t.mediaType,mediaID:t.id}})};return(d,l)=>{const i=W("lazy");return c(),u("div",{class:"relative overflow-hidden",onClick:l[0]||(l[0]=p=>m())},[e("div",le,[x(e("img",ne,null,512),[[i,o.value]])]),e("div",null,[e("div",oe,[e("div",re,_(v.title),1),ie]),e("div",ce,[e("div",ue,_(r.value),1),e("div",null,_(v.date),1)])])])}}},pe={key:0,class:"flex-center h-full"},ve={key:0,class:"text-body-xxl-medium flex items-center justify-center text-center text-enable",id:"no-result"},he={key:1,class:"text-body-l mt-[60px] font-medium"},fe={key:2,class:"mt-10 grid grid-cols-12 gap-5"},_e={__name:"search",setup(v){const g=R(),t=E(),o=n(!1),r=n(""),a=n([]),m=n(1),d=n(0),l=n(0),i=n(!1),p=n({include_adult:"false",language:"zh-TW",query:"",page:1}),M=async()=>{p.value.query=r.value,p.value.page=1,g.push({query:{q:r.value}}),a.value=[]};T(()=>p.value,async(h,f)=>{o.value=!0;const s=await Y({params:p.value}),{page:y,results:w,total_pages:$,total_results:B}=s.data;m.value=y,y>1?a.value=[...a.value,...w]:a.value=w,d.value=$,l.value=B,o.value=!1,y===$?i.value=!1:i.value=!0},{deep:!0});const b=n(null),k=n(null);n(!1),F(k,([{isIntersecting:h}])=>{h&&p.value.page++},{pageViewRef:b});const I=()=>{};let j=G.timeline();const z=async()=>{j.fromTo("#search-bar, #no-result",{opacity:0},{duration:1,delay:0,opacity:1,stagger:.2})};return q(async()=>{var h,f;p.value.query=(h=t==null?void 0:t.query)==null?void 0:h.q,r.value=(f=t==null?void 0:t.query)==null?void 0:f.q,await K(),await z()}),(h,f)=>(c(),u("div",{class:"container h-full pt-[60px]",ref_key:"pageViewRef",ref:b},[C(ae,{search:r.value,"onUpdate:search":f[0]||(f[0]=s=>r.value=s),onSearchClick:M,id:"search-bar"},null,8,["search"]),a.value.length==0||o.value?(c(),u("div",pe,[x(C(Z,null,null,512),[[H,o.value]]),a.value.length==0&&!o.value?(c(),u("p",ve," 暫未搜尋到任何結果 ")):D("",!0)])):(c(),u("div",he," 結果顯示:1-"+_(a.value.length)+" (總共"+_(l.value)+"個) ",1)),a.value.length>0?(c(),u("div",fe,[(c(!0),u(J,null,O(a.value,(s,y)=>(c(),X(de,{key:y,id:s.id,title:(s==null?void 0:s.name)??s.title,poster:s.poster_path,date:(s==null?void 0:s.first_air_date)??s.release_date,mediaType:s.media_type,onGetDataId:I,class:"search-card col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2"},null,8,["id","title","poster","date","mediaType"]))),128))])):D("",!0),e("div",{ref_key:"infiniteRef",ref:k},null,512)],512))}};export{_e as default};
