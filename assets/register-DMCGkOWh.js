import{_ as v,r as c,i as f,g as y,o as b,L as g,D as h,a as w,c as k,b as t,x as i,M as l,N as F,B as d,k as S,U as T,P as B,Q as C,T as I}from"./index-Hpi7XxpT.js";const p=s=>(B("data-v-97f62a49"),s=s(),C(),s),N={class:"bg"},V={class:"container z-10"},P={class:"main-wrap mx-auto h-[708px] max-w-[489px] rounded-b-[50px] border-x border-b border-[#FFFFFF33] bg-[#0080ff99]"},U=p(()=>t("div",{class:"mx-auto w-[55%] pt-[184px]"},[t("img",{src:I,alt:""})],-1)),$={class:"px-20"},M=p(()=>t("div",{class:"mt-[104px] text-center text-[32px] font-bold"},"用戶註冊",-1)),z={class:"mt-8 space-y-6"},A={class:"text-body-s mt-8 text-center"},D={__name:"register",setup(s){const a=c(""),o=c(""),_=f(()=>a.value.length>0&&o.value.length>0),u=()=>{T(a.value,o.value)};let r=y.timeline();const x=async()=>{r.fromTo(".bg",{opacity:0},{duration:1,delay:0,opacity:1}),r.fromTo(".main-wrap",{opacity:0,yPercent:-100},{yPercent:0,duration:1,delay:0,opacity:1})};return b(async()=>{await g(),await x()}),(E,e)=>{const m=h("router-link");return w(),k("div",N,[t("div",V,[t("div",P,[U,t("div",$,[M,t("div",z,[i(l,{placeholder:"帳戶名稱/電郵",text:a.value,"onUpdate:text":e[0]||(e[0]=n=>a.value=n)},null,8,["text"]),i(l,{placeholder:"密碼",type:"password",text:o.value,"onUpdate:text":e[1]||(e[1]=n=>o.value=n)},null,8,["text"])]),i(F,{text:"註冊",class:"mt-8",disable:_.value,onClick:e[2]||(e[2]=n=>u())},null,8,["disable"]),t("div",A,[d(" 還未有帳戶?立即 "),i(m,{to:"/login",class:"text-primary underline"},{default:S(()=>[d(" 登入 ")]),_:1})])])])])])}}},L=v(D,[["__scopeId","data-v-97f62a49"]]);export{L as default};
