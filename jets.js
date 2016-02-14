/*! Jets.js - v0.6.0 - 2015-12-15
* http://NeXTs.github.com/Jets.js/
* Copyright (c) 2015 Denis Lukov; Licensed MIT */

;(function(g,c){"undefined"!=typeof module?module.exports=c():"function"==typeof define&&"object"==typeof define.amd?define(c):this[g]=c()})("Jets",function(){function g(c){if(!(this instanceof g))return new g(c);var a=this;["searchTag","contentTag"].forEach(function(b){var d=b.replace("Tag","");a[d+"_tag"]=document["querySelector"+("contentTag"==b?"All":"")](c[b]);a[d+"_param"]=c[b];if(!a[d+"_tag"])throw Error("Error! Could not find "+b+" element");});var b={searchSelector:"*AND",diacriticsMap:{}};
a.options={};"columns addImportant searchSelector manualContentHandling diacriticsMap didSearch".split(" ").forEach(function(d){a.options[d]=c[d]||b[d]});if(1<this.options.searchSelector.length){var d=a.options.searchSelector.trim();a.options.searchSelector=d.substr(0,1);a.options.searchSelectorMode=d.substr(1).toUpperCase()}var e,h=function(){e!=(e=a.search_tag.value)&&(a._applyCSS(),a.options.didSearch&&a.options.didSearch(a.search_tag.value))};a._onSearch=function(a){if("keydown"==a.type)return setTimeout(h,
0);h()};a.destroy=function(){a._processEventListeners("remove");a._destroy()};a._processEventListeners("add");a._addStyleTag();a._setJets();a._applyCSS()}g.prototype={constructor:g,_processEventListeners:function(c){["input","keydown","change"].forEach(function(a){this.search_tag[c+"EventListener"](a,this._onSearch)}.bind(this))},_applyCSS:function(){for(var c=this.replaceDiacritics(this.search_tag.value.trim().toLowerCase().replace(/\s\s+/g," ")),a=this.options.searchSelectorMode?c.split(" ").filter(function(a,
c,b){return b.indexOf(a)==c}):[c],b="AND"==this.options.searchSelectorMode,d=[],e=0,h=a.length;e<h;e++)d.push((b?this.content_param+">":"")+":not([data-jets"+this.options.searchSelector+'="'+a[e]+'"])');a=(b?"":this.content_param+">")+d.join(b?",":"")+"{display:none"+(this.options.addImportant?"!important":"")+"}";this.styleTag.innerHTML=c.length?a:""},_addStyleTag:function(){this.styleTag=document.createElement("style");document.head.appendChild(this.styleTag)},_getText:function(c){return c&&(c.textContent||
c.innerText)||""},_getContentTags:function(c){return Array.prototype.slice.call(this.content_tag).reduce(function(a,b){return a.concat(Array.prototype.slice.call(b.querySelectorAll(c||":scope > *")))},[])},_setJets:function(c,a){for(var b=this,d=b._getContentTags(a?"":c),e,h=0,f;f=d[h];h++)if(!f.hasAttribute("data-jets")||a)e=this.options.manualContentHandling?this.options.manualContentHandling(f):b.options.columns&&b.options.columns.length?b.options.columns.map(function(a){return b._getText(f.children[a])}).join(" "):
b._getText(f),f.setAttribute("data-jets",b.replaceDiacritics(e.trim().replace(/\s+/g," ").toLowerCase()))},replaceDiacritics:function(c){var a=this.options.diacriticsMap,b;for(b in a)if(a.hasOwnProperty(b))for(var d=0,e=a[b].length;d<e;d++)c=c.replace(new RegExp(a[b][d],"g"),b);return c},update:function(c){this._setJets(":scope > :not([data-jets])",c)},_destroy:function(){this.styleTag.parentNode&&document.head.removeChild(this.styleTag);for(var c=this._getContentTags(),a=0,b;b=c[a];a++)b.removeAttribute("data-jets")}};
(function(c,a){try{c.querySelector(":scope body")}catch(b){["querySelector","querySelectorAll"].forEach(function(b){var e=a[b];a[b]=function(a){if(/(^|,)\s*:scope/.test(a)){var f=this.id;this.id="ID_"+Date.now();a=a.replace(/((^|,)\s*):scope/g,"$1#"+this.id);a=c[b](a);this.id=f;return a}return e.call(this,a)}})}})(window.document,Element.prototype);return g});