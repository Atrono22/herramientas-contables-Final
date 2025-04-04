(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5531:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var a=r(2265);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase()),l=e=>{let t=n(e);return t.charAt(0).toUpperCase()+t.slice(1)},o=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,a.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:n="",children:l,iconNode:c,...u},d)=>(0,a.createElement)("svg",{ref:d,...i,width:t,height:t,stroke:e,strokeWidth:s?24*Number(r)/Number(t):r,className:o("lucide",n),...u},[...c.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(l)?l:[l]])),u=(e,t)=>{let r=(0,a.forwardRef)(({className:r,...n},i)=>(0,a.createElement)(c,{ref:i,iconNode:t,className:o(`lucide-${s(l(e))}`,`lucide-${e}`,r),...n}));return r.displayName=l(e),r}},885:function(e,t,r){Promise.resolve().then(r.bind(r,727))},727:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return i}});var a=r(7437),s=r(2265),n=r(5531);let l=(0,n.Z)("calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]),o=(0,n.Z)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function i(){let[e,t]=(0,s.useState)(""),[r,n]=(0,s.useState)(""),[i,c]=(0,s.useState)([]),u=(e,t)=>{let r=[],a=(s,n,l)=>{if(l===t){r.push([...n]);return}s>=e.length||l>t||(n.push(e[s]),a(s+1,n,l+e[s]),n.pop(),a(s+1,n,l))};a(0,[],0),0===r.length?c(["No se encontraron combinaciones que sumen el objetivo"]):c(r.map(e=>"".concat(e.join(" + ")," = ").concat(t)))};return(0,a.jsxs)("div",{className:"app-container",children:[(0,a.jsx)("h1",{className:"title",children:"Buscador de Sumas"}),(0,a.jsx)("p",{className:"subtitle",children:"Encuentra todas las combinaciones de n\xfameros que sumen el valor objetivo."}),(0,a.jsx)("div",{className:"glass-card",children:(0,a.jsxs)("form",{onSubmit:t=>{t.preventDefault();let a=e.split(/[\n,\s]+/).map(e=>parseFloat(e.replace(/,/g,""))).filter(e=>!isNaN(e)),s=parseFloat(r);if(isNaN(s)){c(["Por favor ingresa un n\xfamero v\xe1lido como objetivo"]);return}u(a,s)},className:"form-container",children:[(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{className:"input-label",children:"Lista de n\xfameros"}),(0,a.jsx)("textarea",{value:e,onChange:e=>t(e.target.value),className:"input-field min-h-[120px]",placeholder:"Ingresa los n\xfameros separados por comas, espacios o saltos de l\xednea"})]}),(0,a.jsxs)("div",{className:"input-group",children:[(0,a.jsx)("label",{className:"input-label",children:"Suma objetivo"}),(0,a.jsx)("input",{type:"text",value:r,onChange:e=>n(e.target.value),className:"input-field",placeholder:"Ingresa la suma objetivo"})]}),(0,a.jsxs)("button",{type:"submit",className:"button w-full flex items-center justify-center gap-2",children:[(0,a.jsx)(l,{className:"w-5 h-5"}),"Buscar combinaciones"]}),i.length>0&&(0,a.jsxs)("div",{className:"mt-6 space-y-2",children:[(0,a.jsx)("h3",{className:"text-lg font-medium text-gray-200 mb-3",children:"Resultados encontrados:"}),i.map((e,t)=>(0,a.jsxs)("div",{className:"bg-white/5 border border-white/10 rounded-lg p-3 flex items-center",children:[(0,a.jsx)(o,{className:"w-5 h-5 text-blue-400 mr-2 flex-shrink-0"}),(0,a.jsx)("span",{children:e})]},t))]})]})})]})}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=r(2265),s=Symbol.for("react.element"),n=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,o=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var a,n={},c=null,u=null;for(a in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)l.call(t,a)&&!i.hasOwnProperty(a)&&(n[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===n[a]&&(n[a]=t[a]);return{$$typeof:s,type:e,key:c,ref:u,props:n,_owner:o.current}}t.Fragment=n,t.jsx=c,t.jsxs=c},7437:function(e,t,r){"use strict";e.exports=r(622)}},function(e){e.O(0,[971,864,744],function(){return e(e.s=885)}),_N_E=e.O()}]);