import{_ as f,r as c,i as g,D as h,a as d,c as i,b as t,u as n,I as p,t as w,x as y,J as k,z as _,k as F,K as I,L as N,M as V,N as C}from"./index-J2Dyeqh_.js";const u=s=>(N("data-v-d908283b"),s=s(),V(),s),S={class:"bg"},B={class:"container z-10"},$={class:"main-wrap mx-auto h-[708px] max-w-[489px] rounded-b-[50px] border-x border-b border-[#FFFFFF33] bg-[#0080ff99]"},z=u(()=>t("div",{class:"mx-auto w-[55%] pt-[184px]"},[t("img",{src:C,alt:""})],-1)),D={class:"px-20"},M=u(()=>t("div",{class:"mt-[104px] text-center text-[32px] font-bold"},"用戶登入",-1)),U={class:"mt-8 space-y-6"},A={key:0,class:"text-body-s text-error mt-2"},E={class:"text-body-s mt-8 text-center"},J={__name:"login",setup(s){const o=c(""),a=c(""),l=c(""),x=g(()=>o.value.length>0&&a.value.length>0),m=async()=>{await I(o.value,a.value)&&(l.value="身份驗證/無效憑證")};return(v,e)=>{const b=h("router-link");return d(),i("div",S,[t("div",B,[t("div",$,[z,t("div",D,[M,t("form",U,[n(p,{placeholder:"帳戶名稱/電郵",text:o.value,"onUpdate:text":e[0]||(e[0]=r=>o.value=r)},null,8,["text"]),n(p,{placeholder:"密碼",type:"password",text:a.value,"onUpdate:text":e[1]||(e[1]=r=>a.value=r)},null,8,["text"])]),l.value?(d(),i("div",A,w(l.value),1)):y("",!0),n(k,{text:"登入",class:"mt-8",disable:x.value,onClick:e[2]||(e[2]=r=>m())},null,8,["disable"]),t("div",E,[_(" 還未有帳戶?立即 "),n(b,{to:"/register",class:"text-primary underline"},{default:F(()=>[_(" 註冊 ")]),_:1})])])])])])}}},L=f(J,[["__scopeId","data-v-d908283b"]]);export{L as default};
