var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function a(t){t.forEach(n)}function s(t){return"function"==typeof t}function r(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function l(t,n){t.appendChild(n)}function o(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function p(){return u(" ")}function f(t,n,e,a){return t.addEventListener(n,e,a),()=>t.removeEventListener(n,e,a)}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function m(t){return""===t?void 0:+t}function h(t,n){n=""+n,t.data!==n&&(t.data=n)}function $(t,n){t.value=null==n?"":n}function g(t,n,e,a){t.style.setProperty(n,e,a?"important":"")}function b(t,n){for(let e=0;e<t.options.length;e+=1){const a=t.options[e];if(a.__value===n)return void(a.selected=!0)}}let x;function v(t){x=t}const y=[],w=[],C=[],F=[],_=Promise.resolve();let k=!1;function B(t){C.push(t)}function T(t){F.push(t)}let E=!1;const M=new Set;function L(){if(!E){E=!0;do{for(let t=0;t<y.length;t+=1){const n=y[t];v(n),q(n.$$)}for(y.length=0;w.length;)w.pop()();for(let t=0;t<C.length;t+=1){const n=C[t];M.has(n)||(M.add(n),n())}C.length=0}while(y.length);for(;F.length;)F.pop()();k=!1,E=!1,M.clear()}}function q(t){if(null!==t.fragment){t.update(),a(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(B)}}const A=new Set;let P;function S(){P={r:0,c:[],p:P}}function G(){P.r||a(P.c),P=P.p}function D(t,n){t&&t.i&&(A.delete(t),t.i(n))}function H(t,n,e,a){if(t&&t.o){if(A.has(t))return;A.add(t),P.c.push(()=>{A.delete(t),a&&(e&&t.d(1),a())}),t.o(n)}}function N(t,n,e){const a=t.$$.props[n];void 0!==a&&(t.$$.bound[a]=e,e(t.$$.ctx[a]))}function W(t){t&&t.c()}function R(t,e,r){const{fragment:l,on_mount:o,on_destroy:i,after_update:c}=t.$$;l&&l.m(e,r),B(()=>{const e=o.map(n).filter(s);i?i.push(...e):a(e),t.$$.on_mount=[]}),c.forEach(B)}function V(t,n){const e=t.$$;null!==e.fragment&&(a(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function I(t,n){-1===t.$$.dirty[0]&&(y.push(t),k||(k=!0,_.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function U(n,s,r,l,o,c,u=[-1]){const p=x;v(n);const f=s.props||{},d=n.$$={fragment:null,ctx:null,props:c,update:t,not_equal:o,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:e(),dirty:u};let m=!1;if(d.ctx=r?r(n,f,(t,e,...a)=>{const s=a.length?a[0]:e;return d.ctx&&o(d.ctx[t],d.ctx[t]=s)&&(d.bound[t]&&d.bound[t](s),m&&I(n,t)),e}):[],d.update(),m=!0,a(d.before_update),d.fragment=!!l&&l(d.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);d.fragment&&d.fragment.l(t),t.forEach(i)}else d.fragment&&d.fragment.c();s.intro&&D(n.$$.fragment),R(n,s.target,s.anchor),L()}v(p)}class O{$destroy(){V(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}function j(n){let e,s,r,u,h,g,b,x,v,y,w,C,F,_,k;return{c(){e=c("br"),s=c("div"),r=c("input"),u=p(),h=c("p"),h.textContent="Specific Gravity",g=p(),b=c("br"),x=p(),v=c("div"),y=c("input"),w=p(),C=c("p"),C.textContent="°P",F=c("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d(r,"max","1.629"),d(h,"class","smallBlack"),d(s,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(y,"max","100"),d(C,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),l(s,r),$(r,n[0]),l(s,u),l(s,h),l(s,g),o(t,b,a),o(t,x,a),o(t,v,a),l(v,y),$(y,n[1]),l(v,w),l(v,C),o(t,F,a),_||(k=[f(r,"input",n[4]),f(r,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],_=!0)},p(t,[n]){1&n&&m(r.value)!==t[0]&&$(r,t[0]),2&n&&m(y.value)!==t[1]&&$(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(b),t&&i(x),t&&i(v),t&&i(F),_=!1,a(k)}}}function Q(t,n,e){let{standard:a=1.059}=n,s=(259-259/a).toFixed(2);return t.$set=t=>{"standard"in t&&e(0,a=t.standard)},[a,s,function(){e(1,s=(259-259/a).toFixed(2)),e(1,s)},function(){e(0,a=(259/(259-s)).toFixed(3)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class Y extends O{constructor(t){super(),U(this,t,Q,j,r,{standard:0})}}function z(t){let n,e,a,s,r,f,m,$,g,b,x,v,y,C,F,_,k,B,E,M,L,q,A,P,S,G,I,U,O,j,Q,z,J,K,X,Z,tt,nt=(131.25*(t[0]-t[1])).toFixed(3)+"",et=((t[0]-t[1])/(t[0]-1)*100).toFixed(3)+"";function at(n){t[2].call(null,n)}let st={};function rt(n){t[3].call(null,n)}void 0!==t[0]&&(st.standard=t[0]),f=new Y({props:st}),w.push(()=>N(f,"standard",at));let lt={};return void 0!==t[1]&&(lt.standard=t[1]),y=new Y({props:lt}),w.push(()=>N(y,"standard",rt)),{c(){n=c("h4"),n.textContent="ABV calculator",e=p(),a=c("label"),a.textContent="Original Gravity:",s=c("br"),r=p(),W(f.$$.fragment),$=c("br"),g=p(),b=c("label"),b.textContent="Final Gravity: ",x=c("br"),v=p(),W(y.$$.fragment),F=p(),_=c("br"),k=p(),B=c("label"),B.textContent="Result:",E=p(),M=c("br"),L=p(),q=c("br"),A=p(),P=c("div"),S=c("span"),G=u(nt),I=c("span"),I.textContent="% ABV",U=c("br"),O=p(),j=c("div"),Q=c("span"),z=u(et),J=c("span"),J.textContent="% Attenuation",K=c("br"),X=p(),Z=c("p"),Z.innerHTML='<span class="medium green">Note:</span> Plato, brix, and balling are all very close to the same thing. They&#39;re all essentially the strenth of a solution as a percentage by mass. Plato corrects some minor errors in the brix scale, starting in the fifth decimal place, where brix was originally invented to correct similar errors in the balling scale, which is the oldest.',d(n,"class","mono gray"),d(I,"class","smallBlack"),d(S,"class","answerText"),d(P,"class","answers"),d(J,"class","smallBlack"),d(Q,"class","answerText"),d(j,"class","answers2")},m(t,i){o(t,n,i),o(t,e,i),o(t,a,i),o(t,s,i),o(t,r,i),R(f,t,i),o(t,$,i),o(t,g,i),o(t,b,i),o(t,x,i),o(t,v,i),R(y,t,i),o(t,F,i),o(t,_,i),o(t,k,i),o(t,B,i),o(t,E,i),o(t,M,i),o(t,L,i),o(t,q,i),o(t,A,i),o(t,P,i),l(P,S),l(S,G),l(S,I),l(P,U),o(t,O,i),o(t,j,i),l(j,Q),l(Q,z),l(Q,J),l(j,K),o(t,X,i),o(t,Z,i),tt=!0},p(t,[n]){const e={};!m&&1&n&&(m=!0,e.standard=t[0],T(()=>m=!1)),f.$set(e);const a={};!C&&2&n&&(C=!0,a.standard=t[1],T(()=>C=!1)),y.$set(a),(!tt||3&n)&&nt!==(nt=(131.25*(t[0]-t[1])).toFixed(3)+"")&&h(G,nt),(!tt||3&n)&&et!==(et=((t[0]-t[1])/(t[0]-1)*100).toFixed(3)+"")&&h(z,et)},i(t){tt||(D(f.$$.fragment,t),D(y.$$.fragment,t),tt=!0)},o(t){H(f.$$.fragment,t),H(y.$$.fragment,t),tt=!1},d(t){t&&i(n),t&&i(e),t&&i(a),t&&i(s),t&&i(r),V(f,t),t&&i($),t&&i(g),t&&i(b),t&&i(x),t&&i(v),V(y,t),t&&i(F),t&&i(_),t&&i(k),t&&i(B),t&&i(E),t&&i(M),t&&i(L),t&&i(q),t&&i(A),t&&i(P),t&&i(O),t&&i(j),t&&i(X),t&&i(Z)}}}function J(t,n,e){let a=1.062,s=1.012;return[a,s,function(t){a=t,e(0,a)},function(t){s=t,e(1,s)}]}class K extends O{constructor(t){super(),U(this,t,J,z,r,{})}}function X(n){let e,a,s,r,l,u;return s=new Y({}),{c(){e=c("h4"),e.textContent="gravity unit converter",a=p(),W(s.$$.fragment),r=p(),l=c("p"),l.innerHTML='<span class="medium green">Note:</span> Plato, brix, and balling are all very close to the same thing. They&#39;re all essentially the strenth of a solution as a percentage by mass. Plato corrects some minor errors in the brix scale, starting in the fifth decimal place, where brix was originally invented to correct similar errors in the balling scale, which is the oldest.',d(e,"class","mono gray")},m(t,n){o(t,e,n),o(t,a,n),R(s,t,n),o(t,r,n),o(t,l,n),u=!0},p:t,i(t){u||(D(s.$$.fragment,t),u=!0)},o(t){H(s.$$.fragment,t),u=!1},d(t){t&&i(e),t&&i(a),V(s,t),t&&i(r),t&&i(l)}}}class Z extends O{constructor(t){super(),U(this,t,null,X,r,{})}}function tt(n){let e,s,r,u,h,g,b,x,v,y,w,C,F,_,k,B,T,E,M;return{c(){e=c("h4"),e.textContent="Swap Liquid Malt Extract (LME) and Dry Malt Extract (DME)",s=p(),r=c("div"),u=c("input"),h=p(),g=c("p"),g.textContent="lbs LME",b=c("br"),x=p(),v=c("div"),y=c("input"),w=p(),C=c("p"),C.textContent="lbs DME",F=c("br"),_=p(),k=c("br"),B=p(),T=c("p"),T.innerHTML='<span class="medium green">Note:</span> Because liquid malt extract contains more water than dry malt extract, when you switch out the two in a recipe, you need to use more LME than you would DME to make up for that water weight. ',d(e,"class","mono gray"),d(u,"type","number"),d(u,"class","input1"),d(u,"name","input"),d(u,"max","1.629"),d(g,"class","smallBlack"),d(r,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(y,"max","100"),d(C,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),o(t,r,a),l(r,u),$(u,n[0]),l(r,h),l(r,g),o(t,b,a),o(t,x,a),o(t,v,a),l(v,y),$(y,n[1]),l(v,w),l(v,C),o(t,F,a),o(t,_,a),o(t,k,a),o(t,B,a),o(t,T,a),E||(M=[f(u,"input",n[4]),f(u,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],E=!0)},p(t,[n]){1&n&&m(u.value)!==t[0]&&$(u,t[0]),2&n&&m(y.value)!==t[1]&&$(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(r),t&&i(b),t&&i(x),t&&i(v),t&&i(F),t&&i(_),t&&i(k),t&&i(B),t&&i(T),E=!1,a(M)}}}function nt(t,n,e){let a=5,s=(a*(36/43)).toFixed(3);return[a,s,function(){e(1,s=(a*(36/43)).toFixed(3)),e(1,s)},function(){e(0,a=(s*(43/36)).toFixed(3)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class et extends O{constructor(t){super(),U(this,t,nt,tt,r,{})}}function at(n){let e,s,r,u,h,g,b,x,v,y,w,C,F;return{c(){e=c("div"),s=c("input"),r=p(),u=c("p"),u.textContent="°F",h=c("br"),g=p(),b=c("div"),x=c("input"),v=p(),y=c("p"),y.textContent="°C",w=c("br"),d(s,"type","number"),d(s,"class","input1"),d(s,"name","input"),d(u,"class","smallBlack"),d(e,"class","unit1"),d(x,"type","number"),d(x,"class","input1"),d(x,"name","input"),d(y,"class","smallBlack"),d(b,"class","unit2")},m(t,a){o(t,e,a),l(e,s),$(s,n[0]),l(e,r),l(e,u),o(t,h,a),o(t,g,a),o(t,b,a),l(b,x),$(x,n[1]),l(b,v),l(b,y),o(t,w,a),C||(F=[f(s,"input",n[4]),f(s,"input",n[2]),f(x,"input",n[5]),f(x,"input",n[3])],C=!0)},p(t,[n]){1&n&&m(s.value)!==t[0]&&$(s,t[0]),2&n&&m(x.value)!==t[1]&&$(x,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(h),t&&i(g),t&&i(b),t&&i(w),C=!1,a(F)}}}function st(t,n,e){let{F:a=60}=n,s=(5*(a-32)/9).toFixed(3);return t.$set=t=>{"F"in t&&e(0,a=t.F)},[a,s,function(){e(1,s=(5*(a-32)/9).toFixed(3)),e(1,s)},function(){e(0,a=(9*s/5+32).toFixed(3)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class rt extends O{constructor(t){super(),U(this,t,st,at,r,{F:0})}}function lt(t){let n,e,a,s,r,f,m,$,g,b,x,v,y,C,F,_,k,B,E,M,L,q,A,P,S,G,I,U,O,j,Q,z,J,K,X,Z,tt,nt,et,at,st,lt;function ot(n){t[5].call(null,n)}let it={};function ct(n){t[6].call(null,n)}void 0!==t[2]&&(it.standard=t[2]),m=new Y({props:it}),w.push(()=>N(m,"standard",ot));let ut={};function pt(n){t[7].call(null,n)}void 0!==t[0]&&(ut.F=t[0]),F=new rt({props:ut}),w.push(()=>N(F,"F",ct));let ft={};return void 0!==t[1]&&(ft.F=t[1]),A=new rt({props:ft}),w.push(()=>N(A,"F",pt)),{c(){n=c("h4"),n.textContent="Correct Gravity for Temperature",e=p(),a=c("label"),a.textContent="Gravity:",s=c("br"),r=c("br"),f=p(),W(m.$$.fragment),g=c("br"),b=p(),x=c("label"),x.textContent="Temperature of Liquid:",v=c("br"),y=c("br"),C=p(),W(F.$$.fragment),k=c("br"),B=p(),E=c("label"),E.textContent="Calibration Temp of Hydrometer:",M=c("br"),L=c("br"),q=p(),W(A.$$.fragment),S=c("br"),G=p(),I=c("label"),I.textContent="Corrected gravity:",U=c("br"),O=c("br"),j=p(),Q=c("div"),z=c("span"),J=u(t[3]),K=p(),X=c("span"),X.textContent="SPECIFIC GRAVITY",Z=p(),tt=c("div"),nt=c("span"),et=u(t[4]),at=p(),st=c("span"),st.textContent="°P",d(n,"class","mono gray"),d(z,"class","answerText"),d(X,"class","smallBlack"),d(Q,"class","answers"),d(nt,"class","answerText"),d(st,"class","smallBlack"),d(tt,"class","answers2")},m(t,i){o(t,n,i),o(t,e,i),o(t,a,i),o(t,s,i),o(t,r,i),o(t,f,i),R(m,t,i),o(t,g,i),o(t,b,i),o(t,x,i),o(t,v,i),o(t,y,i),o(t,C,i),R(F,t,i),o(t,k,i),o(t,B,i),o(t,E,i),o(t,M,i),o(t,L,i),o(t,q,i),R(A,t,i),o(t,S,i),o(t,G,i),o(t,I,i),o(t,U,i),o(t,O,i),o(t,j,i),o(t,Q,i),l(Q,z),l(z,J),l(Q,K),l(Q,X),o(t,Z,i),o(t,tt,i),l(tt,nt),l(nt,et),l(tt,at),l(tt,st),lt=!0},p(t,[n]){const e={};!$&&4&n&&($=!0,e.standard=t[2],T(()=>$=!1)),m.$set(e);const a={};!_&&1&n&&(_=!0,a.F=t[0],T(()=>_=!1)),F.$set(a);const s={};!P&&2&n&&(P=!0,s.F=t[1],T(()=>P=!1)),A.$set(s),(!lt||8&n)&&h(J,t[3]),(!lt||16&n)&&h(et,t[4])},i(t){lt||(D(m.$$.fragment,t),D(F.$$.fragment,t),D(A.$$.fragment,t),lt=!0)},o(t){H(m.$$.fragment,t),H(F.$$.fragment,t),H(A.$$.fragment,t),lt=!1},d(t){t&&i(n),t&&i(e),t&&i(a),t&&i(s),t&&i(r),t&&i(f),V(m,t),t&&i(g),t&&i(b),t&&i(x),t&&i(v),t&&i(y),t&&i(C),V(F,t),t&&i(k),t&&i(B),t&&i(E),t&&i(M),t&&i(L),t&&i(q),V(A,t),t&&i(S),t&&i(G),t&&i(I),t&&i(U),t&&i(O),t&&i(j),t&&i(Q),t&&i(Z),t&&i(tt)}}}function ot(t,n,e){let a,s,r=80,l=60,o=1.059;return t.$$.update=()=>{7&t.$$.dirty&&e(3,a=(o*((1.00130346-.000134722124*l+204052596e-14*l-2.32820948e-9*l)/(1.00130346-.000134722124*r+204052596e-14*r-2.32820948e-9*r))).toFixed(3)),8&t.$$.dirty&&e(4,s=(259-259/a).toFixed(2))},[r,l,o,a,s,function(t){o=t,e(2,o)},function(t){r=t,e(0,r)},function(t){l=t,e(1,l)}]}class it extends O{constructor(t){super(),U(this,t,ot,lt,r,{})}}function ct(n){let e,a,s,r;return s=new rt({}),{c(){e=c("h4"),e.textContent="Temperature Unit Converter",a=p(),W(s.$$.fragment),d(e,"class","mono gray")},m(t,n){o(t,e,n),o(t,a,n),R(s,t,n),r=!0},p:t,i(t){r||(D(s.$$.fragment,t),r=!0)},o(t){H(s.$$.fragment,t),r=!1},d(t){t&&i(e),t&&i(a),V(s,t)}}}class ut extends O{constructor(t){super(),U(this,t,null,ct,r,{})}}function pt(n){let e,s,r,u,h,g,b,x,v,y,w,C,F,_,k;return{c(){e=c("br"),s=c("div"),r=c("input"),u=p(),h=c("p"),h.textContent="Lbs",g=p(),b=c("br"),x=p(),v=c("div"),y=c("input"),w=p(),C=c("p"),C.textContent="kg",F=c("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d(h,"class","smallBlack"),d(s,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(C,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),l(s,r),$(r,n[0]),l(s,u),l(s,h),l(s,g),o(t,b,a),o(t,x,a),o(t,v,a),l(v,y),$(y,n[1]),l(v,w),l(v,C),o(t,F,a),_||(k=[f(r,"input",n[4]),f(r,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],_=!0)},p(t,[n]){1&n&&m(r.value)!==t[0]&&$(r,t[0]),2&n&&m(y.value)!==t[1]&&$(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(b),t&&i(x),t&&i(v),t&&i(F),_=!1,a(k)}}}function ft(t,n,e){let{lbs:a=12}=n,s=(.45359237*a).toFixed(2);return t.$set=t=>{"lbs"in t&&e(0,a=t.lbs)},[a,s,function(){e(1,s=(.45359237*a).toFixed(2)),e(1,s)},function(){e(0,a=(2.20462262185*s).toFixed(2)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class dt extends O{constructor(t){super(),U(this,t,ft,pt,r,{lbs:0})}}function mt(n){let e,s,r,u,h,g,b,x,v,y,w,C,F,_,k;return{c(){e=c("br"),s=c("div"),r=c("input"),u=p(),h=c("p"),h.textContent="Quarts Per Pound",g=p(),b=c("br"),x=p(),v=c("div"),y=c("input"),w=p(),C=c("p"),C.textContent="Liters Per kg",F=c("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d(h,"class","smallBlack"),d(s,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(C,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),l(s,r),$(r,n[0]),l(s,u),l(s,h),l(s,g),o(t,b,a),o(t,x,a),o(t,v,a),l(v,y),$(y,n[1]),l(v,w),l(v,C),o(t,F,a),_||(k=[f(r,"input",n[4]),f(r,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],_=!0)},p(t,[n]){1&n&&m(r.value)!==t[0]&&$(r,t[0]),2&n&&m(y.value)!==t[1]&&$(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(b),t&&i(x),t&&i(v),t&&i(F),_=!1,a(k)}}}function ht(t,n,e){let{quarts:a=1.25}=n,s=(.946353*a*2.20462262185).toFixed(2);return t.$set=t=>{"quarts"in t&&e(0,a=t.quarts)},[a,s,function(){e(1,s=(.946353*a*2.20462262185).toFixed(2)),e(1,s)},function(){e(0,a=(1.05669*kg).toFixed(2)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class $t extends O{constructor(t){super(),U(this,t,ht,mt,r,{quarts:0})}}function gt(t){let n,e,a,s,r,f,m,$,g,b,x,v,y,C,F,_,k,B,E,M,L,q,A,P,S,G,I,U,O,j,Q,Y,z,J,K,X,Z,tt,nt,et,at,st,lt,ot,it,ct,ut,pt,ft,mt,ht,gt,bt,xt,vt,yt,wt,Ct,Ft,_t,kt,Bt,Tt,Et,Mt,Lt,qt,At,Pt,St,Gt,Dt,Ht,Nt=(t[0]*t[1]/4).toFixed(2)+"",Wt=(t[0]*t[1]*.946353).toFixed(2)+"",Rt=(.2/t[1]*(t[3]-t[2])+t[3]).toFixed(2)+"",Vt=(5*(.2/t[1]*(t[3]-t[2])+t[3]-32)/9).toFixed(2)+"";function It(n){t[4].call(null,n)}let Ut={};function Ot(n){t[5].call(null,n)}void 0!==t[0]&&(Ut.lbs=t[0]),f=new dt({props:Ut}),w.push(()=>N(f,"lbs",It));let jt={};function Qt(n){t[6].call(null,n)}void 0!==t[1]&&(jt.quarts=t[1]),y=new $t({props:jt}),w.push(()=>N(y,"quarts",Ot));let Yt={};function zt(n){t[7].call(null,n)}void 0!==t[2]&&(Yt.F=t[2]),L=new rt({props:Yt}),w.push(()=>N(L,"F",Qt));let Jt={};return void 0!==t[3]&&(Jt.F=t[3]),U=new rt({props:Jt}),w.push(()=>N(U,"F",zt)),{c(){n=c("h4"),n.textContent="Strike Water Calculator",e=p(),a=c("label"),a.textContent="Grain Weight:",s=c("br"),r=p(),W(f.$$.fragment),$=c("br"),g=p(),b=c("label"),b.textContent="Water to Grain Ratio: ",x=c("br"),v=p(),W(y.$$.fragment),F=p(),_=c("br"),k=p(),B=c("label"),B.textContent="Grain Temperature:",E=c("br"),M=p(),W(L.$$.fragment),A=c("br"),P=p(),S=c("label"),S.textContent="Desired Mash Temp: ",G=c("br"),I=p(),W(U.$$.fragment),j=p(),Q=c("br"),Y=p(),z=c("label"),z.textContent="Volume of Water to Use:",J=p(),K=c("br"),X=p(),Z=c("br"),tt=p(),nt=c("div"),et=c("span"),at=u(Nt),st=c("span"),st.textContent="Gallons of Water",lt=c("br"),ot=p(),it=c("div"),ct=c("span"),ut=u(Wt),pt=c("span"),pt.textContent="Liters of Water",ft=c("br"),mt=p(),ht=c("br"),gt=c("br"),bt=p(),xt=c("label"),xt.textContent="Strike Temperature:",vt=p(),yt=c("br"),wt=p(),Ct=c("br"),Ft=p(),_t=c("div"),kt=c("span"),Bt=u(Rt),Tt=c("span"),Tt.textContent="°F",Et=c("br"),Mt=p(),Lt=c("div"),qt=c("span"),At=u(Vt),Pt=c("span"),Pt.textContent="°C",St=c("br"),Gt=p(),Dt=c("p"),Dt.innerHTML='<span class="medium green">Note:</span> Basic Calculation. Does not factor in mash tun temperature.',d(n,"class","mono gray"),d(st,"class","smallBlack"),d(et,"class","answerText"),d(nt,"class","answers"),d(pt,"class","smallBlack"),d(ct,"class","answerText"),d(it,"class","answers2"),d(Tt,"class","smallBlack"),d(kt,"class","answerText"),d(_t,"class","answers"),d(Pt,"class","smallBlack"),d(qt,"class","answerText"),d(Lt,"class","answers2")},m(t,i){o(t,n,i),o(t,e,i),o(t,a,i),o(t,s,i),o(t,r,i),R(f,t,i),o(t,$,i),o(t,g,i),o(t,b,i),o(t,x,i),o(t,v,i),R(y,t,i),o(t,F,i),o(t,_,i),o(t,k,i),o(t,B,i),o(t,E,i),o(t,M,i),R(L,t,i),o(t,A,i),o(t,P,i),o(t,S,i),o(t,G,i),o(t,I,i),R(U,t,i),o(t,j,i),o(t,Q,i),o(t,Y,i),o(t,z,i),o(t,J,i),o(t,K,i),o(t,X,i),o(t,Z,i),o(t,tt,i),o(t,nt,i),l(nt,et),l(et,at),l(et,st),l(nt,lt),o(t,ot,i),o(t,it,i),l(it,ct),l(ct,ut),l(ct,pt),l(it,ft),l(it,mt),o(t,ht,i),o(t,gt,i),o(t,bt,i),o(t,xt,i),o(t,vt,i),o(t,yt,i),o(t,wt,i),o(t,Ct,i),o(t,Ft,i),o(t,_t,i),l(_t,kt),l(kt,Bt),l(kt,Tt),l(_t,Et),o(t,Mt,i),o(t,Lt,i),l(Lt,qt),l(qt,At),l(qt,Pt),l(Lt,St),o(t,Gt,i),o(t,Dt,i),Ht=!0},p(t,[n]){const e={};!m&&1&n&&(m=!0,e.lbs=t[0],T(()=>m=!1)),f.$set(e);const a={};!C&&2&n&&(C=!0,a.quarts=t[1],T(()=>C=!1)),y.$set(a);const s={};!q&&4&n&&(q=!0,s.F=t[2],T(()=>q=!1)),L.$set(s);const r={};!O&&8&n&&(O=!0,r.F=t[3],T(()=>O=!1)),U.$set(r),(!Ht||3&n)&&Nt!==(Nt=(t[0]*t[1]/4).toFixed(2)+"")&&h(at,Nt),(!Ht||3&n)&&Wt!==(Wt=(t[0]*t[1]*.946353).toFixed(2)+"")&&h(ut,Wt),(!Ht||14&n)&&Rt!==(Rt=(.2/t[1]*(t[3]-t[2])+t[3]).toFixed(2)+"")&&h(Bt,Rt),(!Ht||14&n)&&Vt!==(Vt=(5*(.2/t[1]*(t[3]-t[2])+t[3]-32)/9).toFixed(2)+"")&&h(At,Vt)},i(t){Ht||(D(f.$$.fragment,t),D(y.$$.fragment,t),D(L.$$.fragment,t),D(U.$$.fragment,t),Ht=!0)},o(t){H(f.$$.fragment,t),H(y.$$.fragment,t),H(L.$$.fragment,t),H(U.$$.fragment,t),Ht=!1},d(t){t&&i(n),t&&i(e),t&&i(a),t&&i(s),t&&i(r),V(f,t),t&&i($),t&&i(g),t&&i(b),t&&i(x),t&&i(v),V(y,t),t&&i(F),t&&i(_),t&&i(k),t&&i(B),t&&i(E),t&&i(M),V(L,t),t&&i(A),t&&i(P),t&&i(S),t&&i(G),t&&i(I),V(U,t),t&&i(j),t&&i(Q),t&&i(Y),t&&i(z),t&&i(J),t&&i(K),t&&i(X),t&&i(Z),t&&i(tt),t&&i(nt),t&&i(ot),t&&i(it),t&&i(ht),t&&i(gt),t&&i(bt),t&&i(xt),t&&i(vt),t&&i(yt),t&&i(wt),t&&i(Ct),t&&i(Ft),t&&i(_t),t&&i(Mt),t&&i(Lt),t&&i(Gt),t&&i(Dt)}}}function bt(t,n,e){let a=12,s=1.25,r=65,l=153;return[a,s,r,l,function(t){a=t,e(0,a)},function(t){s=t,e(1,s)},function(t){r=t,e(2,r)},function(t){l=t,e(3,l)}]}class xt extends O{constructor(t){super(),U(this,t,bt,gt,r,{})}}function vt(t,n,e){const a=t.slice();return a[6]=n[e],a[8]=e,a}function yt(t){let n,e,a,s,r,u,m;function h(...n){return t[4](t[8],...n)}var $=t[6];return $&&(s=new $({})),{c(){n=c("div"),e=c("button"),e.textContent="✖️",a=p(),s&&W(s.$$.fragment),d(e,"class","exit"),d(n,"class","calculator")},m(t,i){o(t,n,i),l(n,e),l(n,a),s&&R(s,n,null),r=!0,u||(m=f(e,"click",h),u=!0)},p(e,a){if($!==($=(t=e)[6])){if(s){S();const t=s;H(t.$$.fragment,1,0,()=>{V(t,1)}),G()}$?(s=new $({}),W(s.$$.fragment),D(s.$$.fragment,1),R(s,n,null)):s=null}},i(t){r||(s&&D(s.$$.fragment,t),r=!0)},o(t){s&&H(s.$$.fragment,t),r=!1},d(t){t&&i(n),s&&V(s),u=!1,m()}}}function wt(t){let n,e,s,r,m,h,$,x,v,y,w,C,F,_,k,T,E,M,L,q,A,P,N,W,R,V,I,U,O,j,Q,Y,z,J=t[0],X=[];for(let n=0;n<J.length;n+=1)X[n]=yt(vt(t,J,n));const tt=t=>H(X[t],1,1,()=>{X[t]=null});return{c(){n=c("link"),e=p(),s=c("main"),r=c("h1"),r.innerHTML='<span class="green svelte-13tvwy1">drink</span><span class="black orange svelte-13tvwy1">SQUIRREL</span>',m=p(),h=c("img"),x=p(),v=c("h3"),v.textContent="calculator apps",y=p(),w=c("div");for(let t=0;t<X.length;t+=1)X[t].c();C=p(),F=c("div"),_=c("p"),_.textContent="Add an App:",k=p(),T=c("select"),E=c("option"),M=u("ABV Calculator"),L=c("option"),q=u("Strike Water Calculator"),A=c("option"),P=u("Convert Gravity Units"),N=c("option"),W=u("Convert Between LME and DME"),R=c("option"),V=u("Correct Hydrometer for Temperature"),I=c("option"),U=u("Temperature Conversion"),O=p(),j=c("button"),j.textContent="Add App",document.title="drinkSquirrel",d(n,"href","https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@200;600;900&family=DM+Mono:ital,wght@1,300&display=swap"),d(n,"rel","stylesheet"),d(r,"class","light svelte-13tvwy1"),g(r,"display","inline-block"),h.src!==($="squirrel2.svg")&&d(h,"src","squirrel2.svg"),d(h,"alt",""),g(h,"width","60px"),g(h,"display","inline-block"),g(h,"position","relative"),g(h,"top","10px"),g(h,"right","10px"),d(v,"class","mono center svelte-13tvwy1"),d(_,"class","mono center svelte-13tvwy1"),E.__value=K,E.value=E.__value,L.__value=xt,L.value=L.__value,A.__value=Z,A.value=A.__value,N.__value=et,N.value=N.__value,R.__value=it,R.value=R.__value,I.__value=ut,I.value=I.__value,d(T,"name","whichApp"),d(T,"id","whichApp"),void 0===t[1]&&B(()=>t[5].call(T)),d(j,"class","submit svelte-13tvwy1"),d(j,"type","submit"),d(w,"class","grid-container"),d(w,"id","gridContainer")},m(a,i){l(document.head,n),o(a,e,i),o(a,s,i),l(s,r),l(s,m),l(s,h),l(s,x),l(s,v),l(s,y),l(s,w);for(let t=0;t<X.length;t+=1)X[t].m(w,null);l(w,C),l(w,F),l(F,_),l(F,k),l(F,T),l(T,E),l(E,M),l(T,L),l(L,q),l(T,A),l(A,P),l(T,N),l(N,W),l(T,R),l(R,V),l(T,I),l(I,U),b(T,t[1]),l(F,O),l(F,j),Q=!0,Y||(z=[f(T,"change",t[5]),f(j,"click",t[2])],Y=!0)},p(t,[n]){if(9&n){let e;for(J=t[0],e=0;e<J.length;e+=1){const a=vt(t,J,e);X[e]?(X[e].p(a,n),D(X[e],1)):(X[e]=yt(a),X[e].c(),D(X[e],1),X[e].m(w,C))}for(S(),e=J.length;e<X.length;e+=1)tt(e);G()}2&n&&b(T,t[1])},i(t){if(!Q){for(let t=0;t<J.length;t+=1)D(X[t]);Q=!0}},o(t){X=X.filter(Boolean);for(let t=0;t<X.length;t+=1)H(X[t]);Q=!1},d(t){i(n),t&&i(e),t&&i(s),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(X,t),Y=!1,a(z)}}}function Ct(t,n,e){let a=[K,it,xt,Z,et,ut],s=K;function r(t){a.splice(t,1),console.log(a.length),e(0,a)}return[a,s,function(){a.push(s),e(0,a),console.log(a.length)},r,t=>r(t),function(){s=function(t){const n=t.querySelector(":checked")||t.options[0];return n&&n.__value}(this),e(1,s)}]}return new class extends O{constructor(t){super(),U(this,t,Ct,wt,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
