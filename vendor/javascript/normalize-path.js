var r={};r=function(r,e){if("string"!==typeof r)throw new TypeError("expected path to be a string");if("\\"===r||"/"===r)return"/";var t=r.length;if(t<=1)return r;var i="";if(t>4&&"\\"===r[3]){var n=r[2];if(("?"===n||"."===n)&&"\\\\"===r.slice(0,2)){r=r.slice(2);i="//"}}var a=r.split(/[/\\]+/);false!==e&&""===a[a.length-1]&&a.pop();return i+a.join("/")};var e=r;export default e;

