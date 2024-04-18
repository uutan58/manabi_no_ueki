var e={};e.__esModule=true;e.default=unesc;
/**
 * 
 * @param {string} str 
 * @returns {[string, number]|undefined}
 */function gobbleHex(e){var r=e.toLowerCase();var t="";var a=false;for(var n=0;n<6&&r[n]!==void 0;n++){var o=r.charCodeAt(n);var v=o>=97&&o<=102||o>=48&&o<=57;a=o===32;if(!v)break;t+=r[n]}if(t.length!==0){var f=parseInt(t,16);var i=f>=55296&&f<=57343;return i||f===0||f>1114111?["�",t.length+(a?1:0)]:[String.fromCodePoint(f),t.length+(a?1:0)]}}var r=/\\/;function unesc(e){var t=r.test(e);if(!t)return e;var a="";for(var n=0;n<e.length;n++)if(e[n]!=="\\")a+=e[n];else{var o=gobbleHex(e.slice(n+1,n+7));if(o!==void 0){a+=o[0];n+=o[1];continue}if(e[n+1]==="\\"){a+="\\";n++;continue}e.length===n+1&&(a+=e[n])}return a}e=e.default;var t=e;const a=e.__esModule;export{a as __esModule,t as default};

