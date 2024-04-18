import*as a from"is-glob";import*as r from"path";import*as e from"os";var s="default"in a?a.default:a;var t="default"in r?r.default:r;var i="default"in e?e.default:e;var l={};var n=s;var f=t.posix.dirname;var o="win32"===i.platform();var u="/";var c=/\\/g;var v=/\\([!*?|[\](){}])/g;
/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 */l=function globParent(a,r){var e=Object.assign({flipBackslashes:true},r);e.flipBackslashes&&o&&a.indexOf(u)<0&&(a=a.replace(c,u));isEnclosure(a)&&(a+=u);a+="a";do{a=f(a)}while(isGlobby(a));return a.replace(v,"$1")};function isEnclosure(a){var r=a.slice(-1);var e;switch(r){case"}":e="{";break;case"]":e="[";break;default:return false}var s=a.indexOf(e);return!(s<0)&&a.slice(s+1,-1).includes(u)}function isGlobby(a){return!!/\([^()]+$/.test(a)||("{"===a[0]||"["===a[0]||(!!/[^\\][{[]/.test(a)||n(a)))}var d=l;export{d as default};

