var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function a(t){t.forEach(n)}function s(t){return"function"==typeof t}function r(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function l(t,n){t.appendChild(n)}function o(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function c(t){return document.createTextNode(t)}function p(){return c(" ")}function f(t,n,e,a){return t.addEventListener(n,e,a),()=>t.removeEventListener(n,e,a)}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function m(t){return""===t?void 0:+t}function $(t,n){n=""+n,t.data!==n&&(t.data=n)}function h(t,n){t.value=null==n?"":n}function b(t,n,e,a){t.style.setProperty(n,e,a?"important":"")}function g(t,n){for(let e=0;e<t.options.length;e+=1){const a=t.options[e];if(a.__value===n)return void(a.selected=!0)}}let x;function v(t){x=t}const y=[],C=[],w=[],F=[],_=Promise.resolve();let k=!1;function B(t){w.push(t)}function T(t){F.push(t)}let E=!1;const L=new Set;function M(){if(!E){E=!0;do{for(let t=0;t<y.length;t+=1){const n=y[t];v(n),P(n.$$)}for(y.length=0;C.length;)C.pop()();for(let t=0;t<w.length;t+=1){const n=w[t];L.has(n)||(L.add(n),n())}w.length=0}while(y.length);for(;F.length;)F.pop()();k=!1,E=!1,L.clear()}}function P(t){if(null!==t.fragment){t.update(),a(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(B)}}const q=new Set;let A;function S(){A={r:0,c:[],p:A}}function G(){A.r||a(A.c),A=A.p}function D(t,n){t&&t.i&&(q.delete(t),t.i(n))}function H(t,n,e,a){if(t&&t.o){if(q.has(t))return;q.add(t),A.c.push(()=>{q.delete(t),a&&(e&&t.d(1),a())}),t.o(n)}}function N(t,n,e){const a=t.$$.props[n];void 0!==a&&(t.$$.bound[a]=e,e(t.$$.ctx[a]))}function W(t){t&&t.c()}function R(t,e,r){const{fragment:l,on_mount:o,on_destroy:i,after_update:u}=t.$$;l&&l.m(e,r),B(()=>{const e=o.map(n).filter(s);i?i.push(...e):a(e),t.$$.on_mount=[]}),u.forEach(B)}function V(t,n){const e=t.$$;null!==e.fragment&&(a(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function I(t,n){-1===t.$$.dirty[0]&&(y.push(t),k||(k=!0,_.then(M)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function U(n,s,r,l,o,u,c=[-1]){const p=x;v(n);const f=s.props||{},d=n.$$={fragment:null,ctx:null,props:u,update:t,not_equal:o,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:e(),dirty:c};let m=!1;if(d.ctx=r?r(n,f,(t,e,...a)=>{const s=a.length?a[0]:e;return d.ctx&&o(d.ctx[t],d.ctx[t]=s)&&(d.bound[t]&&d.bound[t](s),m&&I(n,t)),e}):[],d.update(),m=!0,a(d.before_update),d.fragment=!!l&&l(d.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);d.fragment&&d.fragment.l(t),t.forEach(i)}else d.fragment&&d.fragment.c();s.intro&&D(n.$$.fragment),R(n,s.target,s.anchor),M()}v(p)}class O{$destroy(){V(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}function Q(n){let e,s,r,c,$,b,g,x,v,y,C,w,F,_,k;return{c(){e=u("br"),s=u("div"),r=u("input"),c=p(),$=u("p"),$.textContent="Specific Gravity",b=p(),g=u("br"),x=p(),v=u("div"),y=u("input"),C=p(),w=u("p"),w.textContent="°P",F=u("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d(r,"max","1.629"),d($,"class","smallBlack"),d(s,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(y,"max","100"),d(w,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),l(s,r),h(r,n[0]),l(s,c),l(s,$),l(s,b),o(t,g,a),o(t,x,a),o(t,v,a),l(v,y),h(y,n[1]),l(v,C),l(v,w),o(t,F,a),_||(k=[f(r,"input",n[4]),f(r,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],_=!0)},p(t,[n]){1&n&&m(r.value)!==t[0]&&h(r,t[0]),2&n&&m(y.value)!==t[1]&&h(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(g),t&&i(x),t&&i(v),t&&i(F),_=!1,a(k)}}}function j(t,n,e){let a,{standard:s=1.059}=n,r=(259-259/s).toFixed(2);return t.$set=t=>{"standard"in t&&e(0,s=t.standard)},t.$$.update=()=>{1&t.$$.dirty&&(a=s.toFixed(3))},[s,r,function(){e(1,r=259-259/s),e(1,r)},function(){e(0,s=259/(259-r)),e(0,s)},function(){s=m(this.value),e(0,s)},function(){r=m(this.value),e(1,r)}]}class X extends O{constructor(t){super(),U(this,t,j,Q,r,{standard:0})}}function Y(t){let n,e,a,s,r,f,m,h,b,g,x,v,y,w,F,_,k,B,E,L,M,P,q,A,S,G,I,U,O,Q,j,Y,z,J,K,Z,tt,nt=(131.25*(t[0]-t[1])).toFixed(3)+"",et=((t[0]-t[1])/(t[0]-1)*100).toFixed(3)+"";function at(n){t[2].call(null,n)}let st={};function rt(n){t[3].call(null,n)}void 0!==t[0]&&(st.standard=t[0]),f=new X({props:st}),C.push(()=>N(f,"standard",at));let lt={};return void 0!==t[1]&&(lt.standard=t[1]),y=new X({props:lt}),C.push(()=>N(y,"standard",rt)),{c(){n=u("h4"),n.textContent="ABV calculator",e=p(),a=u("label"),a.textContent="Original Gravity:",s=u("br"),r=p(),W(f.$$.fragment),h=u("br"),b=p(),g=u("label"),g.textContent="Final Gravity: ",x=u("br"),v=p(),W(y.$$.fragment),F=p(),_=u("br"),k=p(),B=u("label"),B.textContent="Result:",E=p(),L=u("br"),M=p(),P=u("br"),q=p(),A=u("div"),S=u("span"),G=c(nt),I=u("span"),I.textContent="% ABV",U=u("br"),O=p(),Q=u("div"),j=u("span"),Y=c(et),z=u("span"),z.textContent="% Attenuation",J=u("br"),K=p(),Z=u("p"),Z.innerHTML='<span class="medium green">Note:</span> Plato, brix, and balling are all very close to the same thing. They&#39;re all essentially the strenth of a solution as a percentage by mass. Plato corrects some minor errors in the brix scale, starting in the fifth decimal place, where brix was originally invented to correct similar errors in the balling scale, which is the oldest.',d(n,"class","mono gray"),d(I,"class","smallBlack"),d(S,"class","answerText"),d(A,"class","answers"),d(z,"class","smallBlack"),d(j,"class","answerText"),d(Q,"class","answers2")},m(t,i){o(t,n,i),o(t,e,i),o(t,a,i),o(t,s,i),o(t,r,i),R(f,t,i),o(t,h,i),o(t,b,i),o(t,g,i),o(t,x,i),o(t,v,i),R(y,t,i),o(t,F,i),o(t,_,i),o(t,k,i),o(t,B,i),o(t,E,i),o(t,L,i),o(t,M,i),o(t,P,i),o(t,q,i),o(t,A,i),l(A,S),l(S,G),l(S,I),l(A,U),o(t,O,i),o(t,Q,i),l(Q,j),l(j,Y),l(j,z),l(Q,J),o(t,K,i),o(t,Z,i),tt=!0},p(t,[n]){const e={};!m&&1&n&&(m=!0,e.standard=t[0],T(()=>m=!1)),f.$set(e);const a={};!w&&2&n&&(w=!0,a.standard=t[1],T(()=>w=!1)),y.$set(a),(!tt||3&n)&&nt!==(nt=(131.25*(t[0]-t[1])).toFixed(3)+"")&&$(G,nt),(!tt||3&n)&&et!==(et=((t[0]-t[1])/(t[0]-1)*100).toFixed(3)+"")&&$(Y,et)},i(t){tt||(D(f.$$.fragment,t),D(y.$$.fragment,t),tt=!0)},o(t){H(f.$$.fragment,t),H(y.$$.fragment,t),tt=!1},d(t){t&&i(n),t&&i(e),t&&i(a),t&&i(s),t&&i(r),V(f,t),t&&i(h),t&&i(b),t&&i(g),t&&i(x),t&&i(v),V(y,t),t&&i(F),t&&i(_),t&&i(k),t&&i(B),t&&i(E),t&&i(L),t&&i(M),t&&i(P),t&&i(q),t&&i(A),t&&i(O),t&&i(Q),t&&i(K),t&&i(Z)}}}function z(t,n,e){let a=1.062,s=1.012;return[a,s,function(t){a=t,e(0,a)},function(t){s=t,e(1,s)}]}class J extends O{constructor(t){super(),U(this,t,z,Y,r,{})}}function K(n){let e,a,s,r,l,c;return s=new X({}),{c(){e=u("h4"),e.textContent="gravity unit converter",a=p(),W(s.$$.fragment),r=p(),l=u("p"),l.innerHTML='<span class="medium green">Note:</span> Plato, brix, and balling are all very close to the same thing. They&#39;re all essentially the strenth of a solution as a percentage by mass. Plato corrects some minor errors in the brix scale, starting in the fifth decimal place, where brix was originally invented to correct similar errors in the balling scale, which is the oldest.',d(e,"class","mono gray")},m(t,n){o(t,e,n),o(t,a,n),R(s,t,n),o(t,r,n),o(t,l,n),c=!0},p:t,i(t){c||(D(s.$$.fragment,t),c=!0)},o(t){H(s.$$.fragment,t),c=!1},d(t){t&&i(e),t&&i(a),V(s,t),t&&i(r),t&&i(l)}}}class Z extends O{constructor(t){super(),U(this,t,null,K,r,{})}}function tt(n){let e,s,r,c,$,b,g,x,v,y,C,w,F,_,k,B,T,E,L;return{c(){e=u("h4"),e.textContent="Swap Liquid Malt Extract (LME) and Dry Malt Extract (DME)",s=p(),r=u("div"),c=u("input"),$=p(),b=u("p"),b.textContent="lbs LME",g=u("br"),x=p(),v=u("div"),y=u("input"),C=p(),w=u("p"),w.textContent="lbs DME",F=u("br"),_=p(),k=u("br"),B=p(),T=u("p"),T.innerHTML='<span class="medium green">Note:</span> Because liquid malt extract contains more water than dry malt extract, when you switch out the two in a recipe, you need to use more LME than you would DME to make up for that water weight. ',d(e,"class","mono gray"),d(c,"type","number"),d(c,"class","input1"),d(c,"name","input"),d(c,"max","1.629"),d(b,"class","smallBlack"),d(r,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(y,"max","100"),d(w,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),o(t,r,a),l(r,c),h(c,n[0]),l(r,$),l(r,b),o(t,g,a),o(t,x,a),o(t,v,a),l(v,y),h(y,n[1]),l(v,C),l(v,w),o(t,F,a),o(t,_,a),o(t,k,a),o(t,B,a),o(t,T,a),E||(L=[f(c,"input",n[4]),f(c,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],E=!0)},p(t,[n]){1&n&&m(c.value)!==t[0]&&h(c,t[0]),2&n&&m(y.value)!==t[1]&&h(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(r),t&&i(g),t&&i(x),t&&i(v),t&&i(F),t&&i(_),t&&i(k),t&&i(B),t&&i(T),E=!1,a(L)}}}function nt(t,n,e){let a=5,s=(a*(36/43)).toFixed(3);return[a,s,function(){e(1,s=(a*(36/43)).toFixed(3)),e(1,s)},function(){e(0,a=(s*(43/36)).toFixed(3)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class et extends O{constructor(t){super(),U(this,t,nt,tt,r,{})}}function at(n){let e,r,c,$,b,g,x,v,y,C,w,F,_;return{c(){e=u("div"),r=u("input"),c=p(),$=u("p"),$.textContent="°F",b=u("br"),g=p(),x=u("div"),v=u("input"),y=p(),C=u("p"),C.textContent="°C",w=u("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d($,"class","smallBlack"),d(e,"class","unit1"),d(v,"type","number"),d(v,"class","input1"),d(v,"name","input"),d(C,"class","smallBlack"),d(x,"class","unit2")},m(t,a){o(t,e,a),l(e,r),h(r,n[0]),l(e,c),l(e,$),o(t,b,a),o(t,g,a),o(t,x,a),l(x,v),h(v,n[1]),l(x,y),l(x,C),o(t,w,a),F||(_=[f(r,"input",n[2]),f(r,"input",(function(){s(n[0])&&n[0].apply(this,arguments)})),f(v,"input",n[3]),f(v,"input",(function(){s(n[1])&&n[1].apply(this,arguments)}))],F=!0)},p(t,[e]){n=t,1&e&&m(r.value)!==n[0]&&h(r,n[0]),2&e&&m(v.value)!==n[1]&&h(v,n[1])},i:t,o:t,d(t){t&&i(e),t&&i(b),t&&i(g),t&&i(x),t&&i(w),F=!1,a(_)}}}function st(t,n,e){let a,{F:s=60}=n;return t.$set=t=>{"F"in t&&e(0,s=t.F)},t.$$.update=()=>{1&t.$$.dirty&&e(1,a=5*(s-32)/9)},[s,a,function(){s=m(this.value),e(0,s)},function(){a=m(this.value),e(1,a),e(0,s)}]}class rt extends O{constructor(t){super(),U(this,t,st,at,r,{F:0})}}function lt(t){let n,e,s,r,m,h,b,g,x,v,y,w,F,_,k,B,E,L,M,P,q,A,S,G,I,U,O,Q,j,Y,z,J,K,Z,tt,nt,et,at,st,lt,ot,it,ut,ct,pt,ft,dt,mt,$t,ht;function bt(n){t[7].call(null,n)}let gt={};function xt(n){t[8].call(null,n)}void 0!==t[2]&&(gt.standard=t[2]),b=new X({props:gt}),C.push(()=>N(b,"standard",bt));let vt={};function yt(n){t[9].call(null,n)}void 0!==t[0]&&(vt.F=t[0]),k=new rt({props:vt}),C.push(()=>N(k,"F",xt));let Ct={};return void 0!==t[1]&&(Ct.F=t[1]),j=new rt({props:Ct}),C.push(()=>N(j,"F",yt)),{c(){n=u("h4"),n.textContent="Correct Gravity for Temperature",e=p(),s=u("label"),s.textContent="Gravity:",r=u("br"),m=u("br"),h=p(),W(b.$$.fragment),x=u("br"),v=p(),y=u("label"),y.textContent="Temperature of Liquid:",w=u("br"),F=u("br"),_=p(),W(k.$$.fragment),E=u("br"),L=p(),M=u("label"),M.textContent="Calibration Temp of Hydrometer:",P=u("br"),q=p(),A=u("button"),A.textContent="60",S=p(),G=u("button"),G.textContent="68",I=p(),U=u("label"),U.textContent="Quick Change",O=u("br"),Q=p(),W(j.$$.fragment),z=u("br"),J=p(),K=u("label"),K.textContent="Corrected gravity:",Z=u("br"),tt=u("br"),nt=p(),et=u("div"),at=u("span"),st=c(t[3]),lt=p(),ot=u("span"),ot.textContent="SPECIFIC GRAVITY",it=p(),ut=u("div"),ct=u("span"),pt=c(t[4]),ft=p(),dt=u("span"),dt.textContent="°P",d(n,"class","mono gray"),d(A,"class","button"),d(A,"type","button"),d(G,"class","button"),d(G,"type","button"),d(at,"class","answerText"),d(ot,"class","smallBlack"),d(et,"class","answers"),d(ct,"class","answerText"),d(dt,"class","smallBlack"),d(ut,"class","answers2")},m(a,i){o(a,n,i),o(a,e,i),o(a,s,i),o(a,r,i),o(a,m,i),o(a,h,i),R(b,a,i),o(a,x,i),o(a,v,i),o(a,y,i),o(a,w,i),o(a,F,i),o(a,_,i),R(k,a,i),o(a,E,i),o(a,L,i),o(a,M,i),o(a,P,i),o(a,q,i),o(a,A,i),o(a,S,i),o(a,G,i),o(a,I,i),o(a,U,i),o(a,O,i),o(a,Q,i),R(j,a,i),o(a,z,i),o(a,J,i),o(a,K,i),o(a,Z,i),o(a,tt,i),o(a,nt,i),o(a,et,i),l(et,at),l(at,st),l(et,lt),l(et,ot),o(a,it,i),o(a,ut,i),l(ut,ct),l(ct,pt),l(ut,ft),l(ut,dt),mt=!0,$t||(ht=[f(A,"click",t[5]),f(G,"click",t[6])],$t=!0)},p(t,[n]){const e={};!g&&4&n&&(g=!0,e.standard=t[2],T(()=>g=!1)),b.$set(e);const a={};!B&&1&n&&(B=!0,a.F=t[0],T(()=>B=!1)),k.$set(a);const s={};!Y&&2&n&&(Y=!0,s.F=t[1],T(()=>Y=!1)),j.$set(s),(!mt||8&n)&&$(st,t[3]),(!mt||16&n)&&$(pt,t[4])},i(t){mt||(D(b.$$.fragment,t),D(k.$$.fragment,t),D(j.$$.fragment,t),mt=!0)},o(t){H(b.$$.fragment,t),H(k.$$.fragment,t),H(j.$$.fragment,t),mt=!1},d(t){t&&i(n),t&&i(e),t&&i(s),t&&i(r),t&&i(m),t&&i(h),V(b,t),t&&i(x),t&&i(v),t&&i(y),t&&i(w),t&&i(F),t&&i(_),V(k,t),t&&i(E),t&&i(L),t&&i(M),t&&i(P),t&&i(q),t&&i(A),t&&i(S),t&&i(G),t&&i(I),t&&i(U),t&&i(O),t&&i(Q),V(j,t),t&&i(z),t&&i(J),t&&i(K),t&&i(Z),t&&i(tt),t&&i(nt),t&&i(et),t&&i(it),t&&i(ut),$t=!1,a(ht)}}}function ot(t,n,e){let a,s,r,l,o,i=75;return t.$$.update=()=>{7&t.$$.dirty&&e(11,r=s*((1.00130346-.000134722124*a+204052596e-14*a-2.32820948e-9*a)/(1.00130346-.000134722124*i+204052596e-14*i-2.32820948e-9*i))),2048&t.$$.dirty&&e(3,l=r.toFixed(3)),2048&t.$$.dirty&&e(4,o=(259-259/r).toFixed(2))},e(1,a=60),e(2,s=1.059),[i,a,s,l,o,function(){e(1,a=60)},function(){e(1,a=68)},function(t){s=t,e(2,s)},function(t){i=t,e(0,i)},function(t){a=t,e(1,a)}]}class it extends O{constructor(t){super(),U(this,t,ot,lt,r,{})}}function ut(n){let e,a,s,r;return s=new rt({}),{c(){e=u("h4"),e.textContent="Temperature Unit Converter",a=p(),W(s.$$.fragment),d(e,"class","mono gray")},m(t,n){o(t,e,n),o(t,a,n),R(s,t,n),r=!0},p:t,i(t){r||(D(s.$$.fragment,t),r=!0)},o(t){H(s.$$.fragment,t),r=!1},d(t){t&&i(e),t&&i(a),V(s,t)}}}class ct extends O{constructor(t){super(),U(this,t,null,ut,r,{})}}function pt(n){let e,s,r,c,$,b,g,x,v,y,C,w,F,_,k;return{c(){e=u("br"),s=u("div"),r=u("input"),c=p(),$=u("p"),$.textContent="Lbs",b=p(),g=u("br"),x=p(),v=u("div"),y=u("input"),C=p(),w=u("p"),w.textContent="kg",F=u("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d($,"class","smallBlack"),d(s,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(w,"class","smallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),l(s,r),h(r,n[0]),l(s,c),l(s,$),l(s,b),o(t,g,a),o(t,x,a),o(t,v,a),l(v,y),h(y,n[1]),l(v,C),l(v,w),o(t,F,a),_||(k=[f(r,"input",n[4]),f(r,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],_=!0)},p(t,[n]){1&n&&m(r.value)!==t[0]&&h(r,t[0]),2&n&&m(y.value)!==t[1]&&h(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(g),t&&i(x),t&&i(v),t&&i(F),_=!1,a(k)}}}function ft(t,n,e){let{lbs:a=12}=n,s=(.45359237*a).toFixed(2);return t.$set=t=>{"lbs"in t&&e(0,a=t.lbs)},[a,s,function(){e(1,s=(.45359237*a).toFixed(2)),e(1,s)},function(){e(0,a=(2.20462262185*s).toFixed(2)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class dt extends O{constructor(t){super(),U(this,t,ft,pt,r,{lbs:0})}}function mt(n){let e,s,r,c,$,b,g,x,v,y,C,w,F,_,k;return{c(){e=u("br"),s=u("div"),r=u("input"),c=p(),$=u("p"),$.textContent="Quarts per Lb",b=p(),g=u("br"),x=p(),v=u("div"),y=u("input"),C=p(),w=u("p"),w.textContent="Lbs per Lb or kgs per kg",F=u("br"),d(r,"type","number"),d(r,"class","input1"),d(r,"name","input"),d($,"class","smallBlack"),d(s,"class","unit1"),d(y,"type","number"),d(y,"class","input1"),d(y,"name","input"),d(w,"class","XsmallBlack"),d(v,"class","unit2")},m(t,a){o(t,e,a),o(t,s,a),l(s,r),h(r,n[0]),l(s,c),l(s,$),l(s,b),o(t,g,a),o(t,x,a),o(t,v,a),l(v,y),h(y,n[1]),l(v,C),l(v,w),o(t,F,a),_||(k=[f(r,"input",n[4]),f(r,"input",n[2]),f(y,"input",n[5]),f(y,"input",n[3])],_=!0)},p(t,[n]){1&n&&m(r.value)!==t[0]&&h(r,t[0]),2&n&&m(y.value)!==t[1]&&h(y,t[1])},i:t,o:t,d(t){t&&i(e),t&&i(s),t&&i(g),t&&i(x),t&&i(v),t&&i(F),_=!1,a(k)}}}function $t(t,n,e){let{quartsPerPound:a=1.25}=n,s=(2.086375*a).toFixed(2);return t.$set=t=>{"quartsPerPound"in t&&e(0,a=t.quartsPerPound)},[a,s,function(){e(1,s=(2.086375*a).toFixed(2)),e(1,s)},function(){e(0,a=(s/2.086375).toFixed(2)),e(0,a)},function(){a=m(this.value),e(0,a)},function(){s=m(this.value),e(1,s)}]}class ht extends O{constructor(t){super(),U(this,t,$t,mt,r,{quartsPerPound:0})}}function bt(t){let n,e,a,s,r,f,m,h,b,g,x,v,y,w,F,_,k,B,E,L,M,P,q,A,S,G,I,U,O,Q,j,X,Y,z,J,K,Z,tt,nt,et,at,st,lt,ot,it,ut,ct,pt,ft,mt,$t,bt,gt,xt,vt,yt,Ct,wt,Ft,_t,kt,Bt,Tt,Et,Lt,Mt,Pt,qt,At,St,Gt=(t[0]*t[1]/4).toFixed(2)+"",Dt=(t[0]*t[1]*.946353).toFixed(2)+"",Ht=(.2/t[1]*(t[3]-t[2])+t[3]).toFixed(2)+"",Nt=(5*(.2/t[1]*(t[3]-t[2])+t[3]-32)/9).toFixed(2)+"";function Wt(n){t[4].call(null,n)}let Rt={};function Vt(n){t[5].call(null,n)}void 0!==t[0]&&(Rt.lbs=t[0]),f=new dt({props:Rt}),C.push(()=>N(f,"lbs",Wt));let It={};function Ut(n){t[6].call(null,n)}void 0!==t[1]&&(It.quarts=t[1]),y=new ht({props:It}),C.push(()=>N(y,"quarts",Vt));let Ot={};function Qt(n){t[7].call(null,n)}void 0!==t[2]&&(Ot.F=t[2]),L=new rt({props:Ot}),C.push(()=>N(L,"F",Ut));let jt={};return void 0!==t[3]&&(jt.F=t[3]),I=new rt({props:jt}),C.push(()=>N(I,"F",Qt)),{c(){n=u("h4"),n.textContent="Strike Water Calculator",e=p(),a=u("label"),a.textContent="Grain Weight:",s=u("br"),r=p(),W(f.$$.fragment),h=u("br"),b=p(),g=u("label"),g.textContent="Water to Grain Ratio: ",x=u("br"),v=p(),W(y.$$.fragment),F=u("br"),_=p(),k=u("label"),k.textContent="Grain Temperature:",B=u("br"),E=p(),W(L.$$.fragment),P=u("br"),q=p(),A=u("label"),A.textContent="Desired Mash Temp: ",S=u("br"),G=p(),W(I.$$.fragment),O=p(),Q=u("br"),j=p(),X=u("label"),X.textContent="Volume of Water to Use: ",Y=u("br"),z=u("br"),J=p(),K=u("div"),Z=u("span"),tt=c(Gt),nt=u("span"),nt.textContent="Gallons of Water",et=u("br"),at=p(),st=u("div"),lt=u("span"),ot=c(Dt),it=u("span"),it.textContent="Liters of Water",ut=u("br"),ct=p(),pt=u("br"),ft=u("br"),mt=p(),$t=u("label"),$t.textContent="Strike Temperature:",bt=p(),gt=u("br"),xt=p(),vt=u("br"),yt=p(),Ct=u("div"),wt=u("span"),Ft=c(Ht),_t=u("span"),_t.textContent="°F",kt=u("br"),Bt=p(),Tt=u("div"),Et=u("span"),Lt=c(Nt),Mt=u("span"),Mt.textContent="°C",Pt=u("br"),qt=p(),At=u("p"),At.innerHTML='<span class="medium green">Note:</span> Basic Calculation. Does not factor in mash tun temperature.',d(n,"class","mono gray"),d(nt,"class","smallBlack"),d(Z,"class","answerText"),d(K,"class","answers"),d(it,"class","smallBlack"),d(lt,"class","answerText"),d(st,"class","answers2"),d(_t,"class","smallBlack"),d(wt,"class","answerText"),d(Ct,"class","answers"),d(Mt,"class","smallBlack"),d(Et,"class","answerText"),d(Tt,"class","answers2")},m(t,i){o(t,n,i),o(t,e,i),o(t,a,i),o(t,s,i),o(t,r,i),R(f,t,i),o(t,h,i),o(t,b,i),o(t,g,i),o(t,x,i),o(t,v,i),R(y,t,i),o(t,F,i),o(t,_,i),o(t,k,i),o(t,B,i),o(t,E,i),R(L,t,i),o(t,P,i),o(t,q,i),o(t,A,i),o(t,S,i),o(t,G,i),R(I,t,i),o(t,O,i),o(t,Q,i),o(t,j,i),o(t,X,i),o(t,Y,i),o(t,z,i),o(t,J,i),o(t,K,i),l(K,Z),l(Z,tt),l(Z,nt),l(K,et),o(t,at,i),o(t,st,i),l(st,lt),l(lt,ot),l(lt,it),l(st,ut),l(st,ct),o(t,pt,i),o(t,ft,i),o(t,mt,i),o(t,$t,i),o(t,bt,i),o(t,gt,i),o(t,xt,i),o(t,vt,i),o(t,yt,i),o(t,Ct,i),l(Ct,wt),l(wt,Ft),l(wt,_t),l(Ct,kt),o(t,Bt,i),o(t,Tt,i),l(Tt,Et),l(Et,Lt),l(Et,Mt),l(Tt,Pt),o(t,qt,i),o(t,At,i),St=!0},p(t,[n]){const e={};!m&&1&n&&(m=!0,e.lbs=t[0],T(()=>m=!1)),f.$set(e);const a={};!w&&2&n&&(w=!0,a.quarts=t[1],T(()=>w=!1)),y.$set(a);const s={};!M&&4&n&&(M=!0,s.F=t[2],T(()=>M=!1)),L.$set(s);const r={};!U&&8&n&&(U=!0,r.F=t[3],T(()=>U=!1)),I.$set(r),(!St||3&n)&&Gt!==(Gt=(t[0]*t[1]/4).toFixed(2)+"")&&$(tt,Gt),(!St||3&n)&&Dt!==(Dt=(t[0]*t[1]*.946353).toFixed(2)+"")&&$(ot,Dt),(!St||14&n)&&Ht!==(Ht=(.2/t[1]*(t[3]-t[2])+t[3]).toFixed(2)+"")&&$(Ft,Ht),(!St||14&n)&&Nt!==(Nt=(5*(.2/t[1]*(t[3]-t[2])+t[3]-32)/9).toFixed(2)+"")&&$(Lt,Nt)},i(t){St||(D(f.$$.fragment,t),D(y.$$.fragment,t),D(L.$$.fragment,t),D(I.$$.fragment,t),St=!0)},o(t){H(f.$$.fragment,t),H(y.$$.fragment,t),H(L.$$.fragment,t),H(I.$$.fragment,t),St=!1},d(t){t&&i(n),t&&i(e),t&&i(a),t&&i(s),t&&i(r),V(f,t),t&&i(h),t&&i(b),t&&i(g),t&&i(x),t&&i(v),V(y,t),t&&i(F),t&&i(_),t&&i(k),t&&i(B),t&&i(E),V(L,t),t&&i(P),t&&i(q),t&&i(A),t&&i(S),t&&i(G),V(I,t),t&&i(O),t&&i(Q),t&&i(j),t&&i(X),t&&i(Y),t&&i(z),t&&i(J),t&&i(K),t&&i(at),t&&i(st),t&&i(pt),t&&i(ft),t&&i(mt),t&&i($t),t&&i(bt),t&&i(gt),t&&i(xt),t&&i(vt),t&&i(yt),t&&i(Ct),t&&i(Bt),t&&i(Tt),t&&i(qt),t&&i(At)}}}function gt(t,n,e){let a=12,s=1.25,r=65,l=153;return[a,s,r,l,function(t){a=t,e(0,a)},function(t){s=t,e(1,s)},function(t){r=t,e(2,r)},function(t){l=t,e(3,l)}]}class xt extends O{constructor(t){super(),U(this,t,gt,bt,r,{})}}function vt(t,n,e){const a=t.slice();return a[6]=n[e],a[8]=e,a}function yt(t){let n,e,a,s,r,c,m;function $(...n){return t[4](t[8],...n)}var h=t[6];return h&&(s=new h({})),{c(){n=u("div"),e=u("button"),e.textContent="✖️",a=p(),s&&W(s.$$.fragment),d(e,"class","exit"),d(n,"class","calculator")},m(t,i){o(t,n,i),l(n,e),l(n,a),s&&R(s,n,null),r=!0,c||(m=f(e,"click",$),c=!0)},p(e,a){if(h!==(h=(t=e)[6])){if(s){S();const t=s;H(t.$$.fragment,1,0,()=>{V(t,1)}),G()}h?(s=new h({}),W(s.$$.fragment),D(s.$$.fragment,1),R(s,n,null)):s=null}},i(t){r||(s&&D(s.$$.fragment,t),r=!0)},o(t){s&&H(s.$$.fragment,t),r=!1},d(t){t&&i(n),s&&V(s),c=!1,m()}}}function Ct(t){let n,e,s,r,m,$,h,x,v,y,C,w,F,_,k,T,E,L,M,P,q,A,N,W,R,V,I,U,O,Q,j,X,Y,z=t[0],K=[];for(let n=0;n<z.length;n+=1)K[n]=yt(vt(t,z,n));const tt=t=>H(K[t],1,1,()=>{K[t]=null});return{c(){n=u("link"),e=p(),s=u("main"),r=u("h1"),r.innerHTML='<span class="green svelte-13tvwy1">drink</span><span class="black orange svelte-13tvwy1">SQUIRREL</span>',m=p(),$=u("img"),x=p(),v=u("h3"),v.textContent="calculator apps",y=p(),C=u("div");for(let t=0;t<K.length;t+=1)K[t].c();w=p(),F=u("div"),_=u("p"),_.textContent="Add an App:",k=p(),T=u("select"),E=u("option"),L=c("ABV Calculator"),M=u("option"),P=c("Strike Water Calculator"),q=u("option"),A=c("Convert Gravity Units"),N=u("option"),W=c("Convert Between LME and DME"),R=u("option"),V=c("Correct Hydrometer for Temperature"),I=u("option"),U=c("Temperature Conversion"),O=p(),Q=u("button"),Q.textContent="Add App",document.title="drinkSquirrel",d(n,"href","https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@200;600;900&family=DM+Mono:ital,wght@1,300&display=swap"),d(n,"rel","stylesheet"),d(r,"class","light svelte-13tvwy1"),b(r,"display","inline-block"),$.src!==(h="squirrel2.svg")&&d($,"src","squirrel2.svg"),d($,"alt",""),b($,"width","60px"),b($,"display","inline-block"),b($,"position","relative"),b($,"top","10px"),b($,"right","10px"),d(v,"class","mono center svelte-13tvwy1"),d(_,"class","mono center svelte-13tvwy1"),E.__value=J,E.value=E.__value,M.__value=xt,M.value=M.__value,q.__value=Z,q.value=q.__value,N.__value=et,N.value=N.__value,R.__value=it,R.value=R.__value,I.__value=ct,I.value=I.__value,d(T,"name","whichApp"),d(T,"id","whichApp"),void 0===t[1]&&B(()=>t[5].call(T)),d(Q,"class","submit svelte-13tvwy1"),d(Q,"type","submit"),d(C,"class","grid-container"),d(C,"id","gridContainer")},m(a,i){l(document.head,n),o(a,e,i),o(a,s,i),l(s,r),l(s,m),l(s,$),l(s,x),l(s,v),l(s,y),l(s,C);for(let t=0;t<K.length;t+=1)K[t].m(C,null);l(C,w),l(C,F),l(F,_),l(F,k),l(F,T),l(T,E),l(E,L),l(T,M),l(M,P),l(T,q),l(q,A),l(T,N),l(N,W),l(T,R),l(R,V),l(T,I),l(I,U),g(T,t[1]),l(F,O),l(F,Q),j=!0,X||(Y=[f(T,"change",t[5]),f(Q,"click",t[2])],X=!0)},p(t,[n]){if(9&n){let e;for(z=t[0],e=0;e<z.length;e+=1){const a=vt(t,z,e);K[e]?(K[e].p(a,n),D(K[e],1)):(K[e]=yt(a),K[e].c(),D(K[e],1),K[e].m(C,w))}for(S(),e=z.length;e<K.length;e+=1)tt(e);G()}2&n&&g(T,t[1])},i(t){if(!j){for(let t=0;t<z.length;t+=1)D(K[t]);j=!0}},o(t){K=K.filter(Boolean);for(let t=0;t<K.length;t+=1)H(K[t]);j=!1},d(t){i(n),t&&i(e),t&&i(s),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(K,t),X=!1,a(Y)}}}function wt(t,n,e){let a=[J,it,xt,Z,et,ct],s=J;function r(t){a.splice(t,1),console.log(a.length),e(0,a)}return[a,s,function(){a.push(s),e(0,a),console.log(a.length)},r,t=>r(t),function(){s=function(t){const n=t.querySelector(":checked")||t.options[0];return n&&n.__value}(this),e(1,s)}]}return new class extends O{constructor(t){super(),U(this,t,wt,Ct,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
