var e={};function reusify(e){var n=new e;var r=n;function get(){var t=n;if(t.next)n=t.next;else{n=new e;r=n}t.next=null;return t}function release(e){r.next=e;r=e}return{get:get,release:release}}e=reusify;var n=e;export default n;

