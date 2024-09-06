import{_ as A,Y as at,V as H,y as ot,a as s,j as st,k as it,b as a,u as p,a0 as nt,I as w,a1 as lt,a3 as J,a4 as ct,J as rt,v as K,a5 as dt,Z as ut,aa as P,L as Q,M as X,r as Z,i as pt,a8 as mt,g as _t,o as vt,ab as I,ac as yt,c as i,x as m,t as v,z as gt,F as L,d as q,ad as ft}from"./index-J2Dyeqh_.js";const tt=r=>(Q("data-v-9cb93a5c"),r=r(),X(),r),ht={class:"absolute inset-0 h-full overflow-auto"},xt={class:"main-gradient relative mx-auto my-[128px] w-[489px] rounded-[50px] border border-[#FFFFFF33] bg-black p-20"},bt=tt(()=>a("p",{class:"text-heading-s"},"修改記錄",-1)),kt={class:"mt-8 space-y-6"},wt={class:"mt-8 space-y-3"},St=tt(()=>a("i",{class:"icon-close text-[32px]"},null,-1)),$t=[St],Mt={__name:"edit-movie-modal",props:{updatedMovie:{type:Function},name:{type:String},original_name:{type:String},year:{type:String},country:{type:String},poster_img:{type:String},background_image:{type:String},type:{type:String},genres:{type:Object},categoryList:{type:Object},mark:{type:Number},watched:{type:Boolean},favorite:{type:Boolean}},setup(r){const d=r;console.log(d.categoryList);const t=at(),S=H(),{name:k,original_name:$,year:M,country:F,type:y,mark:D,watched:u,favorite:l}=d,e=ot({name:k,original_name:$,year:M,country:F,type:y,mark:D,watched:u,favorite:l}),g=c=>e.type=c,f=c=>e.favorite=c,h=c=>e.watched=c,x=c=>e.mark=c,b=async()=>{e.watched_date=e.watched?ut(new Date).format("DD-MM-YYYY"):"",await P(S.params.id,e),await d.updatedMovie(),console.log("updated movie"),t.close("edit-movie-id")};return(c,o)=>(s(),st(K(dt),{"modal-id":"edit-movie-id","content-class":"absolute inset-0  bg-[#30313299]"},{default:it(()=>[a("div",ht,[a("div",xt,[a("div",null,[bt,a("div",kt,[p(nt,{attrSelected:e==null?void 0:e.type,onSelected:g},null,8,["attrSelected"]),p(w,{placeholder:"名稱",text:e.name,"onUpdate:text":o[0]||(o[0]=n=>e.name=n)},null,8,["text"]),p(w,{placeholder:"原始名稱(選項)",text:e.original_name,"onUpdate:text":o[1]||(o[1]=n=>e.original_name=n)},null,8,["text"]),p(w,{placeholder:"年份",text:e.year,"onUpdate:text":o[2]||(o[2]=n=>e.year=n)},null,8,["text"]),p(w,{placeholder:"產地",text:e.country,"onUpdate:text":o[3]||(o[3]=n=>e.country=n)},null,8,["text"]),p(lt,{data:d.categoryList,category:e.categoryList,"onUpdate:category":o[4]||(o[4]=n=>e.categoryList=n)},null,8,["data","category"])]),a("div",wt,[p(J,{title:"最愛",current:e.favorite,onSelected:f},null,8,["current"]),p(J,{title:"已觀看",current:e.watched,onSelected:h},null,8,["current"]),p(ct,{current:e.mark,onSelected:x},null,8,["current"])]),p(rt,{text:"修改",class:"mt-8",disable:!0,onClick:o[5]||(o[5]=n=>b())})]),a("button",{type:"button",class:"absolute right-10 top-10",onClick:o[6]||(o[6]=n=>K(t).close("edit-movie-id"))},$t)])])]),_:1}))}},Ft=A(Mt,[["__scopeId","data-v-9cb93a5c"]]),C=r=>(Q("data-v-d8095616"),r=r(),X(),r),Dt={class:"z-1 relative flex h-[375px] items-end md:flex md:h-full md:min-h-[500px] md:items-center",id:"backdrop"},It=["src"],Lt=C(()=>a("div",{class:"bg-overlay absolute bottom-0 left-0 h-full w-[100%]"},null,-1)),Ct={class:"container relative z-10"},Tt={class:"text-heading-m"},Ut={class:"text-heading-s mt-1"},jt={class:"mb-20 mt-10 md:mt-20"},zt={class:"container"},Bt={class:"relative z-10 w-full items-center justify-between md:flex"},Nt={class:"mx-auto w-full md:ml-0 md:w-[35%]",id:"poster"},Vt=["src"],Yt={class:"w-full md:w-[55%]"},Ot={key:0,class:"text-body-s-medium info-anim mt-6 w-fit rounded-[4px] bg-primary px-1 py-[2px] text-second md:mt-0",id:"watched-wrap"},Wt={class:"text-body-l mt-3 grid gap-y-2",id:"info-wrap"},Et={key:0,class:"info-anim"},Gt={key:1,class:"info-anim"},Rt={key:2,class:"info-anim"},Jt={key:3,class:"info-anim"},Kt={key:4,class:"info-anim"},Zt={key:5,class:"info-anim"},qt={class:"info-anim mt-6 flex items-center",id:"star-wrap"},At={key:0,class:"icon-star-fill text-[24px]"},Ht={key:1,class:"icon-star text-[24px]"},Pt={class:"info-anim info-anim mt-6 flex space-x-6 text-[32px] opacity-0"},Qt={key:0,class:"icon-heart-fill"},Xt={key:1,class:"icon-heart"},te=C(()=>a("i",{class:"icon-pencil-simple"},null,-1)),ee=[te],ae=C(()=>a("i",{class:"icon-trash"},null,-1)),oe=[ae],se={__name:"movie-detail",setup(r){const d=H(),t=Z();Z({language:"zh-TW"});const S=pt(()=>{var u,l,e;if(((u=t.value)==null?void 0:u.type)==="movie")return"電影";if(((l=t.value)==null?void 0:l.type)==="tv")return"電視劇";if(((e=t.value)==null?void 0:e.type)==="show")return"綜藝"}),k=mt({component:Ft,attrs:{updatedMovie:async()=>{console.log("test"),t.value=await I(d.params.id)}}}),$=async()=>{var u;await P(d.params.id,{favorite:!((u=t.value)!=null&&u.favorite)}),t.value=await I(d.params.id)},M=async()=>{console.log(t.value);const{name:u,original_name:l,year:e,country:g,type:f,mark:h,watched:x,favorite:b,categoryList:c}=t.value;k.open(),k.patchOptions({attrs:{name:u,original_name:l,year:e,country:g,type:f,mark:h,watched:x,favorite:b,categoryList:c}})},F=async()=>{await ft(d.params.id)};let y=_t.timeline();const D=async()=>{y.fromTo("#backdrop",{opacity:0},{duration:1,delay:0,opacity:1}),y.fromTo("#backdrop p",{opacity:0,x:200},{x:0,duration:.5,opacity:1,stagger:.2},"-=0.5"),y.fromTo("#poster",{opacity:0,scale:.5},{x:0,duration:1,scale:1,opacity:1},"-=0.3"),y.fromTo(".info-anim",{opacity:0,x:100},{x:0,duration:.5,opacity:1,stagger:.1},"-=1")};return vt(async()=>{t.value=await I(d.params.id),yt(async()=>{await D()})}),(u,l)=>{var e,g,f,h,x,b,c,o,n,T,U,j,z,B,N,V,Y,O,W,E;return s(),i(L,null,[a("section",null,[a("div",Dt,[((e=t.value)==null?void 0:e.background_image)??((g=t.value)==null?void 0:g.postImageUrl)?(s(),i("img",{key:0,src:((f=t.value)==null?void 0:f.background_image)??((h=t.value)==null?void 0:h.postImageUrl),alt:"",class:"absolute inset-0 size-full object-cover"},null,8,It)):m("",!0),Lt,a("div",Ct,[a("p",Tt,v((x=t.value)==null?void 0:x.name),1),a("p",Ut,v((b=t.value)==null?void 0:b.original_name),1)])])]),a("section",jt,[a("div",zt,[a("div",Bt,[a("div",Nt,[a("img",{src:(c=t.value)==null?void 0:c.postImageUrl,alt:"",class:"rounded-[8px]"},null,8,Vt)]),a("div",Yt,[(o=t.value)!=null&&o.watched?(s(),i("div",Ot," 已觀看 ")):m("",!0),a("div",Wt,[(n=t.value)!=null&&n.year?(s(),i("p",Et,"上映年份: "+v((T=t.value)==null?void 0:T.year),1)):m("",!0),(U=t.value)!=null&&U.record_date?(s(),i("p",Gt," 記錄日期: "+v((j=t.value)==null?void 0:j.record_date),1)):m("",!0),(z=t.value)!=null&&z.watched?(s(),i("p",Rt," 觀看日期: "+v((B=t.value)==null?void 0:B.watched_date),1)):m("",!0),(N=t.value)!=null&&N.type?(s(),i("p",Jt,"種類: "+v(S.value),1)):m("",!0),(V=t.value)!=null&&V.categoryList?(s(),i("p",Kt,[gt(" 分類: "),(s(!0),i(L,null,q((Y=t.value)==null?void 0:Y.categoryList,_=>(s(),i("span",{key:_},v(_.label)+",",1))),128))])):m("",!0),(O=t.value)!=null&&O.country?(s(),i("p",Zt,"產地: "+v((W=t.value)==null?void 0:W.country),1)):m("",!0)]),a("div",qt,[(s(),i(L,null,q(5,(_,et)=>{var G,R;return a("div",{key:et},[_<=((G=t.value)==null?void 0:G.mark)?(s(),i("i",At)):m("",!0),_>((R=t.value)==null?void 0:R.mark)?(s(),i("i",Ht)):m("",!0)])}),64))]),a("div",Pt,[a("button",{onClick:l[0]||(l[0]=_=>$()),class:"transition-transform duration-200 hover:scale-125"},[(E=t.value)!=null&&E.favorite?(s(),i("i",Qt)):(s(),i("i",Xt))]),a("button",{class:"transition-transform duration-200 hover:scale-125",onClick:l[1]||(l[1]=_=>M())},ee),a("button",{class:"transition-transform duration-200 hover:scale-125",onClick:l[2]||(l[2]=_=>F())},oe)])])])])])],64)}}},ne=A(se,[["__scopeId","data-v-d8095616"]]);export{ne as default};
