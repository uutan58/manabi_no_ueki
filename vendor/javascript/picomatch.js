import*as t from"path";import{e,_ as u}from"./_/7f34f3c1.js";import"process";var o={};const s=e;const{CHAR_ASTERISK:n,CHAR_AT:r,CHAR_BACKWARD_SLASH:a,CHAR_COMMA:l,CHAR_DOT:i,CHAR_EXCLAMATION_MARK:c,CHAR_FORWARD_SLASH:p,CHAR_LEFT_CURLY_BRACE:f,CHAR_LEFT_PARENTHESES:h,CHAR_LEFT_SQUARE_BRACKET:b,CHAR_PLUS:g,CHAR_QUESTION_MARK:y,CHAR_RIGHT_CURLY_BRACE:x,CHAR_RIGHT_PARENTHESES:v,CHAR_RIGHT_SQUARE_BRACKET:d}=u;const isPathSeparator=t=>t===p||t===a;const depth=t=>{true!==t.isPrefix&&(t.depth=t.isGlobstar?Infinity:1)};
/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */const scan$1=(t,e)=>{const u=e||{};const o=t.length-1;const $=true===u.parts||true===u.scanToEnd;const k=[];const R=[];const A=[];let m=t;let E=-1;let _=0;let S=0;let w=false;let T=false;let C=false;let L=false;let H=false;let O=false;let B=false;let I=false;let M=false;let G=false;let N=0;let D;let P;let K={value:"",depth:0,isGlob:false};const eos=()=>E>=o;const peek=()=>m.charCodeAt(E+1);const advance=()=>{D=P;return m.charCodeAt(++E)};while(E<o){P=advance();let t;if(P!==a){if(true===O||P===f){N++;while(true!==eos()&&(P=advance()))if(P!==a)if(P!==f){if(true!==O&&P===i&&(P=advance())===i){w=K.isBrace=true;C=K.isGlob=true;G=true;if(true===$)continue;break}if(true!==O&&P===l){w=K.isBrace=true;C=K.isGlob=true;G=true;if(true===$)continue;break}if(P===x){N--;if(0===N){O=false;w=K.isBrace=true;G=true;break}}}else N++;else{B=K.backslashes=true;advance()}if(true===$)continue;break}if(P!==p){if(true!==u.noext){const t=P===g||P===r||P===n||P===y||P===c;if(true===t&&peek()===h){C=K.isGlob=true;L=K.isExtglob=true;G=true;P===c&&E===_&&(M=true);if(true===$){while(true!==eos()&&(P=advance()))if(P!==a){if(P===v){C=K.isGlob=true;G=true;break}}else{B=K.backslashes=true;P=advance()}continue}break}}if(P===n){D===n&&(H=K.isGlobstar=true);C=K.isGlob=true;G=true;if(true===$)continue;break}if(P===y){C=K.isGlob=true;G=true;if(true===$)continue;break}if(P===b){while(true!==eos()&&(t=advance()))if(t!==a){if(t===d){T=K.isBracket=true;C=K.isGlob=true;G=true;break}}else{B=K.backslashes=true;advance()}if(true===$)continue;break}if(true===u.nonegate||P!==c||E!==_){if(true!==u.noparen&&P===h){C=K.isGlob=true;if(true===$){while(true!==eos()&&(P=advance()))if(P!==h){if(P===v){G=true;break}}else{B=K.backslashes=true;P=advance()}continue}break}if(true===C){G=true;if(true===$)continue;break}}else{I=K.negated=true;_++}}else{k.push(E);R.push(K);K={value:"",depth:0,isGlob:false};if(true===G)continue;if(D===i&&E===_+1){_+=2;continue}S=E+1}}else{B=K.backslashes=true;P=advance();P===f&&(O=true)}}if(true===u.noext){L=false;C=false}let q=m;let U="";let Q="";if(_>0){U=m.slice(0,_);m=m.slice(_);S-=_}if(q&&true===C&&S>0){q=m.slice(0,S);Q=m.slice(S)}else if(true===C){q="";Q=m}else q=m;q&&""!==q&&"/"!==q&&q!==m&&isPathSeparator(q.charCodeAt(q.length-1))&&(q=q.slice(0,-1));if(true===u.unescape){Q&&(Q=s.removeBackslashes(Q));q&&true===B&&(q=s.removeBackslashes(q))}const W={prefix:U,input:t,start:_,base:q,glob:Q,isBrace:w,isBracket:T,isGlob:C,isExtglob:L,isGlobstar:H,negated:I,negatedExtglob:M};if(true===u.tokens){W.maxDepth=0;isPathSeparator(P)||R.push(K);W.tokens=R}if(true===u.parts||true===u.tokens){let e;for(let o=0;o<k.length;o++){const s=e?e+1:_;const n=k[o];const r=t.slice(s,n);if(u.tokens){if(0===o&&0!==_){R[o].isPrefix=true;R[o].value=U}else R[o].value=r;depth(R[o]);W.maxDepth+=R[o].depth}0===o&&""===r||A.push(r);e=n}if(e&&e+1<t.length){const o=t.slice(e+1);A.push(o);if(u.tokens){R[R.length-1].value=o;depth(R[R.length-1]);W.maxDepth+=R[R.length-1].depth}}W.slashes=k;W.parts=A}return W};o=scan$1;var $=o;var k={};const R=u;const A=e;const{MAX_LENGTH:m,POSIX_REGEX_SOURCE:E,REGEX_NON_SPECIAL_CHARS:_,REGEX_SPECIAL_CHARS_BACKREF:S,REPLACEMENTS:w}=R;const expandRange=(t,e)=>{if("function"===typeof e.expandRange)return e.expandRange(...t,e);t.sort();const u=`[${t.join("-")}]`;try{new RegExp(u)}catch(e){return t.map((t=>A.escapeRegex(t))).join("..")}return u};const syntaxError=(t,e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`;
/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */const parse$1=(t,e)=>{if("string"!==typeof t)throw new TypeError("Expected a string");t=w[t]||t;const u={...e};const o="number"===typeof u.maxLength?Math.min(m,u.maxLength):m;let s=t.length;if(s>o)throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${o}`);const n={type:"bos",value:"",output:u.prepend||""};const r=[n];const a=u.capture?"":"?:";const l=A.isWindows(e);const i=R.globChars(l);const c=R.extglobChars(i);const{DOT_LITERAL:p,PLUS_LITERAL:f,SLASH_LITERAL:h,ONE_CHAR:b,DOTS_SLASH:g,NO_DOT:y,NO_DOT_SLASH:x,NO_DOTS_SLASH:v,QMARK:d,QMARK_NO_DOT:$,STAR:k,START_ANCHOR:T}=i;const globstar=t=>`(${a}(?:(?!${T}${t.dot?g:p}).)*?)`;const C=u.dot?"":y;const L=u.dot?d:$;let H=true===u.bash?globstar(u):k;u.capture&&(H=`(${H})`);"boolean"===typeof u.noext&&(u.noextglob=u.noext);const O={input:t,index:-1,start:0,dot:true===u.dot,consumed:"",output:"",prefix:"",backtrack:false,negated:false,brackets:0,braces:0,parens:0,quotes:0,globstar:false,tokens:r};t=A.removePrefix(t,O);s=t.length;const B=[];const I=[];const M=[];let G=n;let N;const eos=()=>O.index===s-1;const D=O.peek=(e=1)=>t[O.index+e];const P=O.advance=()=>t[++O.index]||"";const remaining=()=>t.slice(O.index+1);const consume=(t="",e=0)=>{O.consumed+=t;O.index+=e};const append=t=>{O.output+=null!=t.output?t.output:t.value;consume(t.value)};const negate=()=>{let t=1;while("!"===D()&&("("!==D(2)||"?"===D(3))){P();O.start++;t++}if(t%2===0)return false;O.negated=true;O.start++;return true};const increment=t=>{O[t]++;M.push(t)};const decrement=t=>{O[t]--;M.pop()};const push=t=>{if("globstar"===G.type){const e=O.braces>0&&("comma"===t.type||"brace"===t.type);const u=true===t.extglob||B.length&&("pipe"===t.type||"paren"===t.type);if("slash"!==t.type&&"paren"!==t.type&&!e&&!u){O.output=O.output.slice(0,-G.output.length);G.type="star";G.value="*";G.output=H;O.output+=G.output}}B.length&&"paren"!==t.type&&(B[B.length-1].inner+=t.value);(t.value||t.output)&&append(t);if(G&&"text"===G.type&&"text"===t.type){G.value+=t.value;G.output=(G.output||"")+t.value}else{t.prev=G;r.push(t);G=t}};const extglobOpen=(t,e)=>{const o={...c[e],conditions:1,inner:""};o.prev=G;o.parens=O.parens;o.output=O.output;const s=(u.capture?"(":"")+o.open;increment("parens");push({type:t,value:e,output:O.output?"":b});push({type:"paren",extglob:true,value:P(),output:s});B.push(o)};const extglobClose=t=>{let o=t.close+(u.capture?")":"");let s;if("negate"===t.type){let n=H;t.inner&&t.inner.length>1&&t.inner.includes("/")&&(n=globstar(u));(n!==H||eos()||/^\)+$/.test(remaining()))&&(o=t.close=`)$))${n}`);if(t.inner.includes("*")&&(s=remaining())&&/^\.[^\\/.]+$/.test(s)){const u=parse$1(s,{...e,fastpaths:false}).output;o=t.close=`)${u})${n})`}"bos"===t.prev.type&&(O.negatedExtglob=true)}push({type:"paren",extglob:true,value:N,output:o});decrement("parens")};if(false!==u.fastpaths&&!/(^[*!]|[/()[\]{}"])/.test(t)){let o=false;let s=t.replace(S,((t,e,u,s,n,r)=>{if("\\"===s){o=true;return t}return"?"===s?e?e+s+(n?d.repeat(n.length):""):0===r?L+(n?d.repeat(n.length):""):d.repeat(u.length):"."===s?p.repeat(u.length):"*"===s?e?e+s+(n?H:""):H:e?t:`\\${t}`}));true===o&&(s=true===u.unescape?s.replace(/\\/g,""):s.replace(/\\+/g,(t=>t.length%2===0?"\\\\":t?"\\":"")));if(s===t&&true===u.contains){O.output=t;return O}O.output=A.wrapOutput(s,O,e);return O}while(!eos()){N=P();if("\0"===N)continue;if("\\"===N){const t=D();if("/"===t&&true!==u.bash)continue;if("."===t||";"===t)continue;if(!t){N+="\\";push({type:"text",value:N});continue}const e=/^\\+/.exec(remaining());let o=0;if(e&&e[0].length>2){o=e[0].length;O.index+=o;o%2!==0&&(N+="\\")}true===u.unescape?N=P():N+=P();if(0===O.brackets){push({type:"text",value:N});continue}}if(O.brackets>0&&("]"!==N||"["===G.value||"[^"===G.value)){if(false!==u.posix&&":"===N){const t=G.value.slice(1);if(t.includes("[")){G.posix=true;if(t.includes(":")){const t=G.value.lastIndexOf("[");const e=G.value.slice(0,t);const u=G.value.slice(t+2);const o=E[u];if(o){G.value=e+o;O.backtrack=true;P();n.output||1!==r.indexOf(G)||(n.output=b);continue}}}}("["===N&&":"!==D()||"-"===N&&"]"===D())&&(N=`\\${N}`);"]"!==N||"["!==G.value&&"[^"!==G.value||(N=`\\${N}`);true===u.posix&&"!"===N&&"["===G.value&&(N="^");G.value+=N;append({value:N});continue}if(1===O.quotes&&'"'!==N){N=A.escapeRegex(N);G.value+=N;append({value:N});continue}if('"'===N){O.quotes=1===O.quotes?0:1;true===u.keepQuotes&&push({type:"text",value:N});continue}if("("===N){increment("parens");push({type:"paren",value:N});continue}if(")"===N){if(0===O.parens&&true===u.strictBrackets)throw new SyntaxError(syntaxError("opening","("));const t=B[B.length-1];if(t&&O.parens===t.parens+1){extglobClose(B.pop());continue}push({type:"paren",value:N,output:O.parens?")":"\\)"});decrement("parens");continue}if("["===N){if(true!==u.nobracket&&remaining().includes("]"))increment("brackets");else{if(true!==u.nobracket&&true===u.strictBrackets)throw new SyntaxError(syntaxError("closing","]"));N=`\\${N}`}push({type:"bracket",value:N});continue}if("]"===N){if(true===u.nobracket||G&&"bracket"===G.type&&1===G.value.length){push({type:"text",value:N,output:`\\${N}`});continue}if(0===O.brackets){if(true===u.strictBrackets)throw new SyntaxError(syntaxError("opening","["));push({type:"text",value:N,output:`\\${N}`});continue}decrement("brackets");const t=G.value.slice(1);true===G.posix||"^"!==t[0]||t.includes("/")||(N=`/${N}`);G.value+=N;append({value:N});if(false===u.literalBrackets||A.hasRegexChars(t))continue;const e=A.escapeRegex(G.value);O.output=O.output.slice(0,-G.value.length);if(true===u.literalBrackets){O.output+=e;G.value=e;continue}G.value=`(${a}${e}|${G.value})`;O.output+=G.value;continue}if("{"===N&&true!==u.nobrace){increment("braces");const t={type:"brace",value:N,output:"(",outputIndex:O.output.length,tokensIndex:O.tokens.length};I.push(t);push(t);continue}if("}"===N){const t=I[I.length-1];if(true===u.nobrace||!t){push({type:"text",value:N,output:N});continue}let e=")";if(true===t.dots){const t=r.slice();const o=[];for(let e=t.length-1;e>=0;e--){r.pop();if("brace"===t[e].type)break;"dots"!==t[e].type&&o.unshift(t[e].value)}e=expandRange(o,u);O.backtrack=true}if(true!==t.comma&&true!==t.dots){const u=O.output.slice(0,t.outputIndex);const o=O.tokens.slice(t.tokensIndex);t.value=t.output="\\{";N=e="\\}";O.output=u;for(const t of o)O.output+=t.output||t.value}push({type:"brace",value:N,output:e});decrement("braces");I.pop();continue}if("|"===N){B.length>0&&B[B.length-1].conditions++;push({type:"text",value:N});continue}if(","===N){let t=N;const e=I[I.length-1];if(e&&"braces"===M[M.length-1]){e.comma=true;t="|"}push({type:"comma",value:N,output:t});continue}if("/"===N){if("dot"===G.type&&O.index===O.start+1){O.start=O.index+1;O.consumed="";O.output="";r.pop();G=n;continue}push({type:"slash",value:N,output:h});continue}if("."===N){if(O.braces>0&&"dot"===G.type){"."===G.value&&(G.output=p);const t=I[I.length-1];G.type="dots";G.output+=N;G.value+=N;t.dots=true;continue}if(O.braces+O.parens===0&&"bos"!==G.type&&"slash"!==G.type){push({type:"text",value:N,output:p});continue}push({type:"dot",value:N,output:p});continue}if("?"===N){const t=G&&"("===G.value;if(!t&&true!==u.noextglob&&"("===D()&&"?"!==D(2)){extglobOpen("qmark",N);continue}if(G&&"paren"===G.type){const t=D();let e=N;if("<"===t&&!A.supportsLookbehinds())throw new Error("Node.js v10 or higher is required for regex lookbehinds");("("===G.value&&!/[!=<:]/.test(t)||"<"===t&&!/<([!=]|\w+>)/.test(remaining()))&&(e=`\\${N}`);push({type:"text",value:N,output:e});continue}if(true!==u.dot&&("slash"===G.type||"bos"===G.type)){push({type:"qmark",value:N,output:$});continue}push({type:"qmark",value:N,output:d});continue}if("!"===N){if(true!==u.noextglob&&"("===D()&&("?"!==D(2)||!/[!=<:]/.test(D(3)))){extglobOpen("negate",N);continue}if(true!==u.nonegate&&0===O.index){negate();continue}}if("+"===N){if(true!==u.noextglob&&"("===D()&&"?"!==D(2)){extglobOpen("plus",N);continue}if(G&&"("===G.value||false===u.regex){push({type:"plus",value:N,output:f});continue}if(G&&("bracket"===G.type||"paren"===G.type||"brace"===G.type)||O.parens>0){push({type:"plus",value:N});continue}push({type:"plus",value:f});continue}if("@"===N){if(true!==u.noextglob&&"("===D()&&"?"!==D(2)){push({type:"at",extglob:true,value:N,output:""});continue}push({type:"text",value:N});continue}if("*"!==N){"$"!==N&&"^"!==N||(N=`\\${N}`);const t=_.exec(remaining());if(t){N+=t[0];O.index+=t[0].length}push({type:"text",value:N});continue}if(G&&("globstar"===G.type||true===G.star)){G.type="star";G.star=true;G.value+=N;G.output=H;O.backtrack=true;O.globstar=true;consume(N);continue}let e=remaining();if(true!==u.noextglob&&/^\([^?]/.test(e)){extglobOpen("star",N);continue}if("star"===G.type){if(true===u.noglobstar){consume(N);continue}const o=G.prev;const s=o.prev;const n="slash"===o.type||"bos"===o.type;const r=s&&("star"===s.type||"globstar"===s.type);if(true===u.bash&&(!n||e[0]&&"/"!==e[0])){push({type:"star",value:N,output:""});continue}const a=O.braces>0&&("comma"===o.type||"brace"===o.type);const l=B.length&&("pipe"===o.type||"paren"===o.type);if(!n&&"paren"!==o.type&&!a&&!l){push({type:"star",value:N,output:""});continue}while("/**"===e.slice(0,3)){const u=t[O.index+4];if(u&&"/"!==u)break;e=e.slice(3);consume("/**",3)}if("bos"===o.type&&eos()){G.type="globstar";G.value+=N;G.output=globstar(u);O.output=G.output;O.globstar=true;consume(N);continue}if("slash"===o.type&&"bos"!==o.prev.type&&!r&&eos()){O.output=O.output.slice(0,-(o.output+G.output).length);o.output=`(?:${o.output}`;G.type="globstar";G.output=globstar(u)+(u.strictSlashes?")":"|$)");G.value+=N;O.globstar=true;O.output+=o.output+G.output;consume(N);continue}if("slash"===o.type&&"bos"!==o.prev.type&&"/"===e[0]){const t=void 0!==e[1]?"|$":"";O.output=O.output.slice(0,-(o.output+G.output).length);o.output=`(?:${o.output}`;G.type="globstar";G.output=`${globstar(u)}${h}|${h}${t})`;G.value+=N;O.output+=o.output+G.output;O.globstar=true;consume(N+P());push({type:"slash",value:"/",output:""});continue}if("bos"===o.type&&"/"===e[0]){G.type="globstar";G.value+=N;G.output=`(?:^|${h}|${globstar(u)}${h})`;O.output=G.output;O.globstar=true;consume(N+P());push({type:"slash",value:"/",output:""});continue}O.output=O.output.slice(0,-G.output.length);G.type="globstar";G.output=globstar(u);G.value+=N;O.output+=G.output;O.globstar=true;consume(N);continue}const o={type:"star",value:N,output:H};if(true!==u.bash)if(!G||"bracket"!==G.type&&"paren"!==G.type||true!==u.regex){if(O.index===O.start||"slash"===G.type||"dot"===G.type){if("dot"===G.type){O.output+=x;G.output+=x}else if(true===u.dot){O.output+=v;G.output+=v}else{O.output+=C;G.output+=C}if("*"!==D()){O.output+=b;G.output+=b}}push(o)}else{o.output=N;push(o)}else{o.output=".*?";"bos"!==G.type&&"slash"!==G.type||(o.output=C+o.output);push(o)}}while(O.brackets>0){if(true===u.strictBrackets)throw new SyntaxError(syntaxError("closing","]"));O.output=A.escapeLast(O.output,"[");decrement("brackets")}while(O.parens>0){if(true===u.strictBrackets)throw new SyntaxError(syntaxError("closing",")"));O.output=A.escapeLast(O.output,"(");decrement("parens")}while(O.braces>0){if(true===u.strictBrackets)throw new SyntaxError(syntaxError("closing","}"));O.output=A.escapeLast(O.output,"{");decrement("braces")}true===u.strictSlashes||"star"!==G.type&&"bracket"!==G.type||push({type:"maybe_slash",value:"",output:`${h}?`});if(true===O.backtrack){O.output="";for(const t of O.tokens){O.output+=null!=t.output?t.output:t.value;t.suffix&&(O.output+=t.suffix)}}return O};parse$1.fastpaths=(t,e)=>{const u={...e};const o="number"===typeof u.maxLength?Math.min(m,u.maxLength):m;const s=t.length;if(s>o)throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${o}`);t=w[t]||t;const n=A.isWindows(e);const{DOT_LITERAL:r,SLASH_LITERAL:a,ONE_CHAR:l,DOTS_SLASH:i,NO_DOT:c,NO_DOTS:p,NO_DOTS_SLASH:f,STAR:h,START_ANCHOR:b}=R.globChars(n);const g=u.dot?p:c;const y=u.dot?f:c;const x=u.capture?"":"?:";const v={negated:false,prefix:""};let d=true===u.bash?".*?":h;u.capture&&(d=`(${d})`);const globstar=t=>true===t.noglobstar?d:`(${x}(?:(?!${b}${t.dot?i:r}).)*?)`;const create=t=>{switch(t){case"*":return`${g}${l}${d}`;case".*":return`${r}${l}${d}`;case"*.*":return`${g}${d}${r}${l}${d}`;case"*/*":return`${g}${d}${a}${l}${y}${d}`;case"**":return g+globstar(u);case"**/*":return`(?:${g}${globstar(u)}${a})?${y}${l}${d}`;case"**/*.*":return`(?:${g}${globstar(u)}${a})?${y}${d}${r}${l}${d}`;case"**/.*":return`(?:${g}${globstar(u)}${a})?${r}${l}${d}`;default:{const e=/^(.*?)\.(\w+)$/.exec(t);if(!e)return;const u=create(e[1]);if(!u)return;return u+r+e[2]}}};const $=A.removePrefix(t,v);let k=create($);k&&true!==u.strictSlashes&&(k+=`${a}?`);return k};k=parse$1;var T=k;var C="default"in t?t.default:t;var L={};const H=C;const O=$;const B=T;const I=e;const M=u;const isObject=t=>t&&"object"===typeof t&&!Array.isArray(t)
/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */;const picomatch=(t,e,u=false)=>{if(Array.isArray(t)){const o=t.map((t=>picomatch(t,e,u)));const arrayMatcher=t=>{for(const e of o){const u=e(t);if(u)return u}return false};return arrayMatcher}const o=isObject(t)&&t.tokens&&t.input;if(""===t||"string"!==typeof t&&!o)throw new TypeError("Expected pattern to be a non-empty string");const s=e||{};const n=I.isWindows(e);const r=o?picomatch.compileRe(t,e):picomatch.makeRe(t,e,false,true);const a=r.state;delete r.state;let isIgnored=()=>false;if(s.ignore){const t={...e,ignore:null,onMatch:null,onResult:null};isIgnored=picomatch(s.ignore,t,u)}const matcher=(u,o=false)=>{const{isMatch:l,match:i,output:c}=picomatch.test(u,r,e,{glob:t,posix:n});const p={glob:t,state:a,regex:r,posix:n,input:u,output:c,match:i,isMatch:l};"function"===typeof s.onResult&&s.onResult(p);if(false===l){p.isMatch=false;return!!o&&p}if(isIgnored(u)){"function"===typeof s.onIgnore&&s.onIgnore(p);p.isMatch=false;return!!o&&p}"function"===typeof s.onMatch&&s.onMatch(p);return!o||p};u&&(matcher.state=a);return matcher};
/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */picomatch.test=(t,e,u,{glob:o,posix:s}={})=>{if("string"!==typeof t)throw new TypeError("Expected input to be a string");if(""===t)return{isMatch:false,output:""};const n=u||{};const r=n.format||(s?I.toPosixSlashes:null);let a=t===o;let l=a&&r?r(t):t;if(false===a){l=r?r(t):t;a=l===o}false!==a&&true!==n.capture||(a=true===n.matchBase||true===n.basename?picomatch.matchBase(t,e,u,s):e.exec(l));return{isMatch:Boolean(a),match:a,output:l}};
/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */picomatch.matchBase=(t,e,u,o=I.isWindows(u))=>{const s=e instanceof RegExp?e:picomatch.makeRe(e,u);return s.test(H.basename(t))};
/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */picomatch.isMatch=(t,e,u)=>picomatch(e,u)(t)
/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */;picomatch.parse=(t,e)=>Array.isArray(t)?t.map((t=>picomatch.parse(t,e))):B(t,{...e,fastpaths:false});
/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */picomatch.scan=(t,e)=>O(t,e)
/**
 * Compile a regular expression from the `state` object returned by the
 * [parse()](#parse) method.
 *
 * @param {Object} `state`
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
 * @return {RegExp}
 * @api public
 */;picomatch.compileRe=(t,e,u=false,o=false)=>{if(true===u)return t.output;const s=e||{};const n=s.contains?"":"^";const r=s.contains?"":"$";let a=`${n}(?:${t.output})${r}`;t&&true===t.negated&&(a=`^(?!${a}).*$`);const l=picomatch.toRegex(a,e);true===o&&(l.state=t);return l};
/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */picomatch.makeRe=(t,e={},u=false,o=false)=>{if(!t||"string"!==typeof t)throw new TypeError("Expected a non-empty string");let s={negated:false,fastpaths:true};false===e.fastpaths||"."!==t[0]&&"*"!==t[0]||(s.output=B.fastpaths(t,e));s.output||(s=B(t,e));return picomatch.compileRe(s,e,u,o)};
/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */picomatch.toRegex=(t,e)=>{try{const u=e||{};return new RegExp(t,u.flags||(u.nocase?"i":""))}catch(t){if(e&&true===e.debug)throw t;return/$^/}};picomatch.constants=M;L=picomatch;var G=L;export{G as default};

