(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{390:function(e,t,o){
/*!
 * MIT License
 *
 * Copyright (c) 2021 Phap Dieu Duong
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
var r;self,r=function(){return(()=>{"use strict";var e={"./src/modules/fluent-reveal.ts":
/*!**************************************!*\
  !*** ./src/modules/fluent-reveal.ts ***!
  \**************************************/(e,t,o)=>{o.r(t),o.d(t,{default:()=>i});var r=o(/*! ./helpers */"./src/modules/helpers.ts");class i{constructor(e,t={}){this.isPressed=!1,this.options={lightColor:"rgba(255,255,255,0.25)",gradientSize:150,clickEffect:!1,isContainer:!1,children:{borderSelector:".eff-reveal-border",elementSelector:".eff-reveal",lightColor:"rgba(255,255,255,0.25)",gradientSize:150}},Object.assign(this.options,t),this.els=r.preProcessElements(document.querySelectorAll(e))}clearEffect(e){this.isPressed=!1,e.el.style.backgroundImage=e.oriBg}enableBackgroundEffects(e,t,o){e.el.addEventListener("mousemove",i=>{const s=i.pageX-r.getOffset(e).left-window.scrollX,l=i.pageY-r.getOffset(e).top-window.scrollY;if(this.options.clickEffect&&this.isPressed){const i=`radial-gradient(circle ${o}px at ${s}px ${l}px, ${t}, rgba(255,255,255,0)), radial-gradient(circle 70px at ${s}px ${l}px, rgba(255,255,255,0), ${t}, rgba(255,255,255,0), rgba(255,255,255,0))`;r.drawEffect(e,s,l,t,o,i)}else r.drawEffect(e,s,l,t,o)}),e.el.addEventListener("mouseleave",()=>this.clearEffect(e))}enableClickEffects(e,t,o){e.el.addEventListener("mousedown",i=>{this.isPressed=!0;const s=i.pageX-r.getOffset(e).left-window.scrollX,l=i.pageY-r.getOffset(e).top-window.scrollY,n=`radial-gradient(circle ${o}px at ${s}px ${l}px, ${t}, rgba(255,255,255,0)), radial-gradient(circle 70px at ${s}px ${l}px, rgba(255,255,255,0), ${t}, rgba(255,255,255,0), rgba(255,255,255,0))`;r.drawEffect(e,s,l,t,o,n)}),e.el.addEventListener("mouseup",i=>{this.isPressed=!1;const s=i.pageX-r.getOffset(e).left-window.scrollX,l=i.pageY-r.getOffset(e).top-window.scrollY;r.drawEffect(e,s,l,t,o)})}apply(){this.options.isContainer?this.els.forEach(e=>{var t,o,i,s,l;const n=this.options.isContainer?r.preProcessElements(document.querySelectorAll(this.options.children.borderSelector)):[];e.el.addEventListener("mousemove",e=>{for(let t=0;t<n.length;t++){const o=e.pageX-r.getOffset(n[t]).left-window.scrollX,i=e.pageY-r.getOffset(n[t]).top-window.scrollY;r.isIntersected(n[t],e.clientX,e.clientY,this.options.gradientSize)?r.drawEffect(n[t],o,i,this.options.lightColor,this.options.gradientSize):this.clearEffect(n[t])}}),e.el.addEventListener("mouseleave",()=>{for(let e=0;e<n.length;e++)this.clearEffect(n[e])});const c=e.el.querySelectorAll(null===(t=this.options.children)||void 0===t?void 0:t.elementSelector),a=r.preProcessElements(c);for(let e=0;e<a.length;e++)this.enableBackgroundEffects(a[e],null===(o=this.options.children)||void 0===o?void 0:o.lightColor,null===(i=this.options.children)||void 0===i?void 0:i.gradientSize),this.options.clickEffect&&this.enableClickEffects(a[e],null===(s=this.options.children)||void 0===s?void 0:s.lightColor,null===(l=this.options.children)||void 0===l?void 0:l.gradientSize)}):this.els.forEach(e=>{this.enableBackgroundEffects(e,this.options.lightColor,this.options.gradientSize),this.options.clickEffect&&this.enableClickEffects(e,this.options.lightColor,this.options.gradientSize)})}}},"./src/modules/helpers.ts":
/*!********************************!*\
  !*** ./src/modules/helpers.ts ***!
  \********************************/(e,t,o)=>{o.r(t),o.d(t,{getOffset:()=>r,drawEffect:()=>i,preProcessElements:()=>s,isIntersected:()=>l});const r=e=>({top:e.el.getBoundingClientRect().top,left:e.el.getBoundingClientRect().left}),i=(e,t,o,r,i,s)=>{let l;l=s||`radial-gradient(circle ${i}px at ${t}px ${o}px, ${r}, rgba(255,255,255,0))`,e.el.style.backgroundImage=l},s=e=>{const t=[];return e.forEach(e=>{t.push({oriBg:getComputedStyle(e).backgroundImage,el:e})}),t},l=(e,t,o,r)=>{const i={left:t-r,right:t+r,top:o-r,bottom:o+r},s={left:e.el.getBoundingClientRect().left,right:e.el.getBoundingClientRect().right,top:e.el.getBoundingClientRect().top,bottom:e.el.getBoundingClientRect().bottom};var l,n;return!((n=s).left>(l=i).right||n.right<l.left||n.top>l.bottom||n.bottom<l.top)}}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
o.r(r),o.d(r,{version:()=>t,FluentRevealEffect:()=>i});var e=o(/*! ./modules/fluent-reveal */"./src/modules/fluent-reveal.ts");const t=process.env.VERSION,i=e.default})(),r})()},e.exports=r()}}]);