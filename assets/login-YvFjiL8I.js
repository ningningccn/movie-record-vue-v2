import{_ as u,r as c,h as m,A as v,a as b,c as f,b as t,q as l,B as d,C as h,y as r,j as g,D as w,E as F,G as k,H as y}from"./index-CDzyXr9h.js";const i=s=>(F("data-v-b50fc0e3"),s=s(),k(),s),B={class:"bg"},C={class:"container z-10"},I={class:"main-wrap mx-auto h-[708px] max-w-[489px] rounded-b-[50px] border-x border-b border-[#FFFFFF33] bg-[#0080ff99]"},V=i(()=>t("div",{class:"mx-auto w-[55%] pt-[184px]"},[t("img",{src:y,alt:""})],-1)),N={class:"px-20"},S=i(()=>t("div",{class:"mt-[104px] text-center text-[32px] font-bold"},"用戶登入",-1)),$={class:"mt-8 space-y-6"},A={class:"text-body-s mt-8 text-center"},E={__name:"login",setup(s){const o=c(""),a=c(""),p=m(()=>o.value.length>0&&a.value.length>0),_=()=>{w(o.value,a.value)};return(U,e)=>{const x=v("router-link");return b(),f("div",B,[t("div",C,[t("div",I,[V,t("div",N,[S,t("div",$,[l(d,{placeholder:"帳戶名稱/電郵",text:o.value,"onUpdate:text":e[0]||(e[0]=n=>o.value=n)},null,8,["text"]),l(d,{placeholder:"密碼",text:a.value,"onUpdate:text":e[1]||(e[1]=n=>a.value=n)},null,8,["text"])]),l(h,{text:"登入",class:"mt-8",disable:p.value,onClick:e[2]||(e[2]=n=>_())},null,8,["disable"]),t("div",A,[r(" 還未有帳戶?立即 "),l(x,{to:"/register",class:"text-primary underline"},{default:g(()=>[r(" 註冊 ")]),_:1})])])])])])}}},q=u(E,[["__scopeId","data-v-b50fc0e3"]]);export{q as default};