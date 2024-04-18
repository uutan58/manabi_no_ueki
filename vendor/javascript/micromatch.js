import*as t from"util";import*as e from"braces";import*as r from"picomatch";import*as n from"picomatch/lib/utils";var o="default"in t?t.default:t;var a="default"in e?e.default:e;var l="default"in r?r.default:r;var s="default"in n?n.default:n;var i={};const u=o;const c=a;const f=l;const p=s;const isEmptyString=t=>""===t||"./"===t
/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} `list` List of strings to match.
 * @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */;const micromatch=(t,e,r)=>{e=[].concat(e);t=[].concat(t);let n=new Set;let o=new Set;let a=new Set;let l=0;let onResult=t=>{a.add(t.output);r&&r.onResult&&r.onResult(t)};for(let a=0;a<e.length;a++){let s=f(String(e[a]),{...r,onResult:onResult},true);let i=s.state.negated||s.state.negatedExtglob;i&&l++;for(let e of t){let t=s(e,true);let r=i?!t.isMatch:t.isMatch;if(r)if(i)n.add(t.output);else{n.delete(t.output);o.add(t.output)}}}let s=l===e.length?[...a]:[...o];let i=s.filter((t=>!n.has(t)));if(r&&0===i.length){if(true===r.failglob)throw new Error(`No matches found for "${e.join(", ")}"`);if(true===r.nonull||true===r.nullglob)return r.unescape?e.map((t=>t.replace(/\\/g,""))):e}return i};micromatch.match=micromatch;
/**
 * Returns a matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matcher(pattern[, options]);
 *
 * const isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options`
 * @return {Function} Returns a matcher function.
 * @api public
 */micromatch.matcher=(t,e)=>f(t,e)
/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.isMatch(string, patterns[, options]);
 *
 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `[options]` See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */;micromatch.isMatch=(t,e,r)=>f(e,r)(t);micromatch.any=micromatch.isMatch;
/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */micromatch.not=(t,e,r={})=>{e=[].concat(e).map(String);let n=new Set;let o=[];let onResult=t=>{r.onResult&&r.onResult(t);o.push(t.output)};let a=new Set(micromatch(t,e,{...r,onResult:onResult}));for(let t of o)a.has(t)||n.add(t);return[...n]};
/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * // mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any of the patterns matches any part of `str`.
 * @api public
 */micromatch.contains=(t,e,r)=>{if("string"!==typeof t)throw new TypeError(`Expected a string: "${u.inspect(t)}"`);if(Array.isArray(e))return e.some((e=>micromatch.contains(t,e,r)));if("string"===typeof e){if(isEmptyString(t)||isEmptyString(e))return false;if(t.includes(e)||t.startsWith("./")&&t.slice(2).includes(e))return true}return micromatch.isMatch(t,e,{...r,contains:true})};
/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matchKeys(object, patterns[, options]);
 *
 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */micromatch.matchKeys=(t,e,r)=>{if(!p.isObject(t))throw new TypeError("Expected the first argument to be an object");let n=micromatch(Object.keys(t),e,r);let o={};for(let e of n)o[e]=t[e];return o};
/**
 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
 * @api public
 */micromatch.some=(t,e,r)=>{let n=[].concat(t);for(let t of[].concat(e)){let e=f(String(t),r);if(n.some((t=>e(t))))return true}return false};
/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
 * @api public
 */micromatch.every=(t,e,r)=>{let n=[].concat(t);for(let t of[].concat(e)){let e=f(String(t),r);if(!n.every((t=>e(t))))return false}return true};
/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */micromatch.all=(t,e,r)=>{if("string"!==typeof t)throw new TypeError(`Expected a string: "${u.inspect(t)}"`);return[].concat(e).every((e=>f(e,r)(t)))};
/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `glob` Glob pattern to use for matching.
 * @param {String} `input` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
 * @api public
 */micromatch.capture=(t,e,r)=>{let n=p.isWindows(r);let o=f.makeRe(String(t),{...r,capture:true});let a=o.exec(n?p.toPosixSlashes(e):e);if(a)return a.slice(1).map((t=>void 0===t?"":t))};
/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */micromatch.makeRe=(...t)=>f.makeRe(...t)
/**
 * Scan a glob pattern to separate the pattern into segments. Used
 * by the [split](#split) method.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.scan(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */;micromatch.scan=(...t)=>f.scan(...t)
/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.parse(pattern[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
 * @api public
 */;micromatch.parse=(t,e)=>{let r=[];for(let n of[].concat(t||[]))for(let t of c(String(n),e))r.push(f.parse(t,e));return r};
/**
 * Process the given brace `pattern`.
 *
 * ```js
 * const { braces } = require('micromatch');
 * console.log(braces('foo/{a,b,c}/bar'));
 * //=> [ 'foo/(a|b|c)/bar' ]
 *
 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
 * ```
 * @param {String} `pattern` String with brace pattern to process.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */micromatch.braces=(t,e)=>{if("string"!==typeof t)throw new TypeError("Expected a string");return e&&true===e.nobrace||!/\{.*\}/.test(t)?[t]:c(t,e)};micromatch.braceExpand=(t,e)=>{if("string"!==typeof t)throw new TypeError("Expected a string");return micromatch.braces(t,{...e,expand:true})};i=micromatch;var d=i;export{d as default};

