(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{325:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));n(131);var o=n(0);function s(){const e=Object(o.d)();if(!e)throw new Error("must be called in setup");return(null==e?void 0:e.proxy)||{}}function u(){const e=Object(o.h)(!1);return Object(o.e)(()=>{e.value=!0}),Object(o.f)(()=>{e.value=!1,setTimeout(()=>{e.value=!0},100)}),{recoShowModule:e}}},361:function(e,t,n){},381:function(e,t,n){"use strict";n(361)},406:function(e,t,n){"use strict";n.r(t);n(17);var o=n(0),s=n(61),u=n(325),c=Object(o.c)({components:{RecoIcon:s.b},setup(e,t){const n=Object(u.a)(),s=Object(o.g)({query:"",focused:!1,focusIndex:0,placeholder:void 0}),c=Object(o.a)(()=>s.focused&&l.value&&l.value.length),r=e=>{for(const t in n.$site.locales||{})if("/"!==t&&0===e.path.indexOf(t))return t;return"/"},l=Object(o.a)(()=>{const e=s.query.trim().toLowerCase();if(!e)return;const{pages:t}=n.$site,o=n.$site.themeConfig.searchMaxSuggestions,u=n.$localePath,c=t=>t&&t.title&&t.title.toLowerCase().indexOf(e)>-1,l=[];for(let e=0;e<t.length&&!(l.length>=o);e++){const n=t[e];if(r(n)===u)if(c(n))l.push(n);else if(n.headers)for(let e=0;e<n.headers.length&&!(l.length>=o);e++){const t=n.headers[e];c(t)&&l.push(Object.assign({},n,{path:n.path+"#"+t.slug,header:t}))}}return l}),a=Object(o.a)(()=>(n.$site.themeConfig.nav||[]).length+(n.$site.repo?1:0)<=2);return{showSuggestions:c,suggestions:l,alignRight:a,onUp:()=>{c.value&&(s.focusIndex>0?s.focusIndex--:s.focusIndex=l.value.length-1)},onDown:()=>{c.value&&(s.focusIndex<l.value.length-1?s.focusIndex++:s.focusIndex=0)},focus:e=>{s.focusIndex=e},unfocus:()=>{s.focusIndex=-1},go:e=>{c.value&&(n.$router.push(l.value[e].path),s.query="",s.focusIndex=0)},...Object(o.i)(s)}},mounted(){this.placeholder=this.$site.themeConfig.searchPlaceholder||""}}),r=(n(381),n(2)),l=Object(r.a)(c,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"search-box"},[t("reco-icon",{attrs:{icon:"reco-search"}}),e._v(" "),t("input",{ref:"input",class:{focused:e.focused},attrs:{"aria-label":"Search",placeholder:e.placeholder,autocomplete:"off",spellcheck:"false"},domProps:{value:e.query},on:{input:function(t){e.query=t.target.value},focus:function(t){e.focused=!0},blur:function(t){e.focused=!1},keyup:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.go(e.focusIndex)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?null:e.onUp.apply(null,arguments)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?null:e.onDown.apply(null,arguments)}]}}),e._v(" "),e.showSuggestions?t("ul",{staticClass:"suggestions",class:{"align-right":e.alignRight},on:{mouseleave:e.unfocus}},e._l(e.suggestions,(function(n,o){return t("li",{key:o,staticClass:"suggestion",class:{focused:o===e.focusIndex},on:{mousedown:function(t){return e.go(o)},mouseenter:function(t){return e.focus(o)}}},[t("a",{attrs:{href:n.path},on:{click:function(e){e.preventDefault()}}},[t("span",{staticClass:"page-title"},[e._v(e._s(n.title||n.path))]),e._v(" "),n.header?t("span",{staticClass:"header"},[e._v("> "+e._s(n.header.title))]):e._e()])])})),0):e._e()],1)}),[],!1,null,null,null);t.default=l.exports}}]);