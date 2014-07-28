/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("component~indexof@0.0.1", Function("exports, module",
"\n\
var indexOf = [].indexOf;\n\
\n\
module.exports = function(arr, obj){\n\
  if (indexOf) return arr.indexOf(obj);\n\
  for (var i = 0; i < arr.length; ++i) {\n\
    if (arr[i] === obj) return i;\n\
  }\n\
  return -1;\n\
};\n\
//# sourceURL=components/component/indexof/0.0.1/index.js"
));

require.modules["component-indexof"] = require.modules["component~indexof@0.0.1"];
require.modules["component~indexof"] = require.modules["component~indexof@0.0.1"];
require.modules["indexof"] = require.modules["component~indexof@0.0.1"];


require.register("component~indexof@0.0.3", Function("exports, module",
"module.exports = function(arr, obj){\n\
  if (arr.indexOf) return arr.indexOf(obj);\n\
  for (var i = 0; i < arr.length; ++i) {\n\
    if (arr[i] === obj) return i;\n\
  }\n\
  return -1;\n\
};\n\
//# sourceURL=components/component/indexof/0.0.3/index.js"
));

require.modules["component-indexof"] = require.modules["component~indexof@0.0.3"];
require.modules["component~indexof"] = require.modules["component~indexof@0.0.3"];
require.modules["indexof"] = require.modules["component~indexof@0.0.3"];


require.register("component~classes@1.1.1", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var index = require(\"component~indexof@0.0.3\");\n\
\n\
/**\n\
 * Whitespace regexp.\n\
 */\n\
\n\
var re = /\\s+/;\n\
\n\
/**\n\
 * toString reference.\n\
 */\n\
\n\
var toString = Object.prototype.toString;\n\
\n\
/**\n\
 * Wrap `el` in a `ClassList`.\n\
 *\n\
 * @param {Element} el\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(el){\n\
  return new ClassList(el);\n\
};\n\
\n\
/**\n\
 * Initialize a new ClassList for `el`.\n\
 *\n\
 * @param {Element} el\n\
 * @api private\n\
 */\n\
\n\
function ClassList(el) {\n\
  this.el = el;\n\
  this.list = el.classList;\n\
}\n\
\n\
/**\n\
 * Add class `name` if not already present.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.add = function(name){\n\
  // classList\n\
  if (this.list) {\n\
    this.list.add(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  var arr = this.array();\n\
  var i = index(arr, name);\n\
  if (!~i) arr.push(name);\n\
  this.el.className = arr.join(' ');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove class `name` when present, or\n\
 * pass a regular expression to remove\n\
 * any which match.\n\
 *\n\
 * @param {String|RegExp} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.remove = function(name){\n\
  if ('[object RegExp]' == toString.call(name)) {\n\
    return this.removeMatching(name);\n\
  }\n\
\n\
  // classList\n\
  if (this.list) {\n\
    this.list.remove(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  var arr = this.array();\n\
  var i = index(arr, name);\n\
  if (~i) arr.splice(i, 1);\n\
  this.el.className = arr.join(' ');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove all classes matching `re`.\n\
 *\n\
 * @param {RegExp} re\n\
 * @return {ClassList}\n\
 * @api private\n\
 */\n\
\n\
ClassList.prototype.removeMatching = function(re){\n\
  var arr = this.array();\n\
  for (var i = 0; i < arr.length; i++) {\n\
    if (re.test(arr[i])) {\n\
      this.remove(arr[i]);\n\
    }\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Toggle class `name`.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.toggle = function(name){\n\
  // classList\n\
  if (this.list) {\n\
    this.list.toggle(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  if (this.has(name)) {\n\
    this.remove(name);\n\
  } else {\n\
    this.add(name);\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return an array of classes.\n\
 *\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.array = function(){\n\
  var arr = this.el.className.split(re);\n\
  if ('' === arr[0]) arr.pop();\n\
  return arr;\n\
};\n\
\n\
/**\n\
 * Check if class `name` is present.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.has =\n\
ClassList.prototype.contains = function(name){\n\
  return this.list\n\
    ? this.list.contains(name)\n\
    : !! ~index(this.array(), name);\n\
};\n\
\n\
//# sourceURL=components/component/classes/1.1.1/index.js"
));

require.modules["component-classes"] = require.modules["component~classes@1.1.1"];
require.modules["component~classes"] = require.modules["component~classes@1.1.1"];
require.modules["classes"] = require.modules["component~classes@1.1.1"];


require.register("component~classes@1.2.1", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var index = require(\"component~indexof@0.0.3\");\n\
\n\
/**\n\
 * Whitespace regexp.\n\
 */\n\
\n\
var re = /\\s+/;\n\
\n\
/**\n\
 * toString reference.\n\
 */\n\
\n\
var toString = Object.prototype.toString;\n\
\n\
/**\n\
 * Wrap `el` in a `ClassList`.\n\
 *\n\
 * @param {Element} el\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(el){\n\
  return new ClassList(el);\n\
};\n\
\n\
/**\n\
 * Initialize a new ClassList for `el`.\n\
 *\n\
 * @param {Element} el\n\
 * @api private\n\
 */\n\
\n\
function ClassList(el) {\n\
  if (!el) throw new Error('A DOM element reference is required');\n\
  this.el = el;\n\
  this.list = el.classList;\n\
}\n\
\n\
/**\n\
 * Add class `name` if not already present.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.add = function(name){\n\
  // classList\n\
  if (this.list) {\n\
    this.list.add(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  var arr = this.array();\n\
  var i = index(arr, name);\n\
  if (!~i) arr.push(name);\n\
  this.el.className = arr.join(' ');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove class `name` when present, or\n\
 * pass a regular expression to remove\n\
 * any which match.\n\
 *\n\
 * @param {String|RegExp} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.remove = function(name){\n\
  if ('[object RegExp]' == toString.call(name)) {\n\
    return this.removeMatching(name);\n\
  }\n\
\n\
  // classList\n\
  if (this.list) {\n\
    this.list.remove(name);\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  var arr = this.array();\n\
  var i = index(arr, name);\n\
  if (~i) arr.splice(i, 1);\n\
  this.el.className = arr.join(' ');\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove all classes matching `re`.\n\
 *\n\
 * @param {RegExp} re\n\
 * @return {ClassList}\n\
 * @api private\n\
 */\n\
\n\
ClassList.prototype.removeMatching = function(re){\n\
  var arr = this.array();\n\
  for (var i = 0; i < arr.length; i++) {\n\
    if (re.test(arr[i])) {\n\
      this.remove(arr[i]);\n\
    }\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Toggle class `name`, can force state via `force`.\n\
 *\n\
 * For browsers that support classList, but do not support `force` yet,\n\
 * the mistake will be detected and corrected.\n\
 *\n\
 * @param {String} name\n\
 * @param {Boolean} force\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.toggle = function(name, force){\n\
  // classList\n\
  if (this.list) {\n\
    if (\"undefined\" !== typeof force) {\n\
      if (force !== this.list.toggle(name, force)) {\n\
        this.list.toggle(name); // toggle again to correct\n\
      }\n\
    } else {\n\
      this.list.toggle(name);\n\
    }\n\
    return this;\n\
  }\n\
\n\
  // fallback\n\
  if (\"undefined\" !== typeof force) {\n\
    if (!force) {\n\
      this.remove(name);\n\
    } else {\n\
      this.add(name);\n\
    }\n\
  } else {\n\
    if (this.has(name)) {\n\
      this.remove(name);\n\
    } else {\n\
      this.add(name);\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return an array of classes.\n\
 *\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.array = function(){\n\
  var str = this.el.className.replace(/^\\s+|\\s+$/g, '');\n\
  var arr = str.split(re);\n\
  if ('' === arr[0]) arr.shift();\n\
  return arr;\n\
};\n\
\n\
/**\n\
 * Check if class `name` is present.\n\
 *\n\
 * @param {String} name\n\
 * @return {ClassList}\n\
 * @api public\n\
 */\n\
\n\
ClassList.prototype.has =\n\
ClassList.prototype.contains = function(name){\n\
  return this.list\n\
    ? this.list.contains(name)\n\
    : !! ~index(this.array(), name);\n\
};\n\
\n\
//# sourceURL=components/component/classes/1.2.1/index.js"
));

require.modules["component-classes"] = require.modules["component~classes@1.2.1"];
require.modules["component~classes"] = require.modules["component~classes@1.2.1"];
require.modules["classes"] = require.modules["component~classes@1.2.1"];


require.register("component~event@0.1.0", Function("exports, module",
"\n\
/**\n\
 * Bind `el` event `type` to `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, type, fn, capture){\n\
  if (el.addEventListener) {\n\
    el.addEventListener(type, fn, capture);\n\
  } else {\n\
    el.attachEvent('on' + type, fn);\n\
  }\n\
  return fn;\n\
};\n\
\n\
/**\n\
 * Unbind `el` event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  if (el.removeEventListener) {\n\
    el.removeEventListener(type, fn, capture);\n\
  } else {\n\
    el.detachEvent('on' + type, fn);\n\
  }\n\
  return fn;\n\
};\n\
\n\
//# sourceURL=components/component/event/0.1.0/index.js"
));

require.modules["component-event"] = require.modules["component~event@0.1.0"];
require.modules["component~event"] = require.modules["component~event@0.1.0"];
require.modules["event"] = require.modules["component~event@0.1.0"];


require.register("component~event@0.1.4", Function("exports, module",
"var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',\n\
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',\n\
    prefix = bind !== 'addEventListener' ? 'on' : '';\n\
\n\
/**\n\
 * Bind `el` event `type` to `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, type, fn, capture){\n\
  el[bind](prefix + type, fn, capture || false);\n\
  return fn;\n\
};\n\
\n\
/**\n\
 * Unbind `el` event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  el[unbind](prefix + type, fn, capture || false);\n\
  return fn;\n\
};\n\
//# sourceURL=components/component/event/0.1.4/index.js"
));

require.modules["component-event"] = require.modules["component~event@0.1.4"];
require.modules["component~event"] = require.modules["component~event@0.1.4"];
require.modules["event"] = require.modules["component~event@0.1.4"];


require.register("component~query@0.0.1", Function("exports, module",
"\n\
function one(selector, el) {\n\
  return el.querySelector(selector);\n\
}\n\
\n\
exports = module.exports = function(selector, el){\n\
  el = el || document;\n\
  return one(selector, el);\n\
};\n\
\n\
exports.all = function(selector, el){\n\
  el = el || document;\n\
  return el.querySelectorAll(selector);\n\
};\n\
\n\
exports.engine = function(obj){\n\
  if (!obj.one) throw new Error('.one callback required');\n\
  if (!obj.all) throw new Error('.all callback required');\n\
  one = obj.one;\n\
  exports.all = obj.all;\n\
};\n\
\n\
//# sourceURL=components/component/query/0.0.1/index.js"
));

require.modules["component-query"] = require.modules["component~query@0.0.1"];
require.modules["component~query"] = require.modules["component~query@0.0.1"];
require.modules["query"] = require.modules["component~query@0.0.1"];


require.register("component~emitter@1.1.1", Function("exports, module",
"\n\
/**\n\
 * Expose `Emitter`.\n\
 */\n\
\n\
module.exports = Emitter;\n\
\n\
/**\n\
 * Initialize a new `Emitter`.\n\
 *\n\
 * @api public\n\
 */\n\
\n\
function Emitter(obj) {\n\
  if (obj) return mixin(obj);\n\
};\n\
\n\
/**\n\
 * Mixin the emitter properties.\n\
 *\n\
 * @param {Object} obj\n\
 * @return {Object}\n\
 * @api private\n\
 */\n\
\n\
function mixin(obj) {\n\
  for (var key in Emitter.prototype) {\n\
    obj[key] = Emitter.prototype[key];\n\
  }\n\
  return obj;\n\
}\n\
\n\
/**\n\
 * Listen on the given `event` with `fn`.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.on =\n\
Emitter.prototype.addEventListener = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
  (this._callbacks[event] = this._callbacks[event] || [])\n\
    .push(fn);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Adds an `event` listener that will be invoked a single\n\
 * time then automatically removed.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.once = function(event, fn){\n\
  var self = this;\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  function on() {\n\
    self.off(event, on);\n\
    fn.apply(this, arguments);\n\
  }\n\
\n\
  on.fn = fn;\n\
  this.on(event, on);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Remove the given callback for `event` or all\n\
 * registered callbacks.\n\
 *\n\
 * @param {String} event\n\
 * @param {Function} fn\n\
 * @return {Emitter}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.off =\n\
Emitter.prototype.removeListener =\n\
Emitter.prototype.removeAllListeners =\n\
Emitter.prototype.removeEventListener = function(event, fn){\n\
  this._callbacks = this._callbacks || {};\n\
\n\
  // all\n\
  if (0 == arguments.length) {\n\
    this._callbacks = {};\n\
    return this;\n\
  }\n\
\n\
  // specific event\n\
  var callbacks = this._callbacks[event];\n\
  if (!callbacks) return this;\n\
\n\
  // remove all handlers\n\
  if (1 == arguments.length) {\n\
    delete this._callbacks[event];\n\
    return this;\n\
  }\n\
\n\
  // remove specific handler\n\
  var cb;\n\
  for (var i = 0; i < callbacks.length; i++) {\n\
    cb = callbacks[i];\n\
    if (cb === fn || cb.fn === fn) {\n\
      callbacks.splice(i, 1);\n\
      break;\n\
    }\n\
  }\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Emit `event` with the given args.\n\
 *\n\
 * @param {String} event\n\
 * @param {Mixed} ...\n\
 * @return {Emitter}\n\
 */\n\
\n\
Emitter.prototype.emit = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  var args = [].slice.call(arguments, 1)\n\
    , callbacks = this._callbacks[event];\n\
\n\
  if (callbacks) {\n\
    callbacks = callbacks.slice(0);\n\
    for (var i = 0, len = callbacks.length; i < len; ++i) {\n\
      callbacks[i].apply(this, args);\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Return array of callbacks for `event`.\n\
 *\n\
 * @param {String} event\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.listeners = function(event){\n\
  this._callbacks = this._callbacks || {};\n\
  return this._callbacks[event] || [];\n\
};\n\
\n\
/**\n\
 * Check if this emitter has `event` handlers.\n\
 *\n\
 * @param {String} event\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
Emitter.prototype.hasListeners = function(event){\n\
  return !! this.listeners(event).length;\n\
};\n\
\n\
//# sourceURL=components/component/emitter/1.1.1/index.js"
));

require.modules["component-emitter"] = require.modules["component~emitter@1.1.1"];
require.modules["component~emitter"] = require.modules["component~emitter@1.1.1"];
require.modules["emitter"] = require.modules["component~emitter@1.1.1"];


require.register("component~domify@1.2.1", Function("exports, module",
"\n\
/**\n\
 * Expose `parse`.\n\
 */\n\
\n\
module.exports = parse;\n\
\n\
/**\n\
 * Wrap map from jquery.\n\
 */\n\
\n\
var map = {\n\
  legend: [1, '<fieldset>', '</fieldset>'],\n\
  tr: [2, '<table><tbody>', '</tbody></table>'],\n\
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],\n\
  _default: [0, '', '']\n\
};\n\
\n\
map.td =\n\
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];\n\
\n\
map.option =\n\
map.optgroup = [1, '<select multiple=\"multiple\">', '</select>'];\n\
\n\
map.thead =\n\
map.tbody =\n\
map.colgroup =\n\
map.caption =\n\
map.tfoot = [1, '<table>', '</table>'];\n\
\n\
map.text =\n\
map.circle =\n\
map.ellipse =\n\
map.line =\n\
map.path =\n\
map.polygon =\n\
map.polyline =\n\
map.rect = [1, '<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">','</svg>'];\n\
\n\
/**\n\
 * Parse `html` and return the children.\n\
 *\n\
 * @param {String} html\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function parse(html) {\n\
  if ('string' != typeof html) throw new TypeError('String expected');\n\
  \n\
  // tag name\n\
  var m = /<([\\w:]+)/.exec(html);\n\
  if (!m) return document.createTextNode(html);\n\
\n\
  html = html.replace(/^\\s+|\\s+$/g, ''); // Remove leading/trailing whitespace\n\
\n\
  var tag = m[1];\n\
\n\
  // body support\n\
  if (tag == 'body') {\n\
    var el = document.createElement('html');\n\
    el.innerHTML = html;\n\
    return el.removeChild(el.lastChild);\n\
  }\n\
\n\
  // wrap map\n\
  var wrap = map[tag] || map._default;\n\
  var depth = wrap[0];\n\
  var prefix = wrap[1];\n\
  var suffix = wrap[2];\n\
  var el = document.createElement('div');\n\
  el.innerHTML = prefix + html + suffix;\n\
  while (depth--) el = el.lastChild;\n\
\n\
  // one element\n\
  if (el.firstChild == el.lastChild) {\n\
    return el.removeChild(el.firstChild);\n\
  }\n\
\n\
  // several elements\n\
  var fragment = document.createDocumentFragment();\n\
  while (el.firstChild) {\n\
    fragment.appendChild(el.removeChild(el.firstChild));\n\
  }\n\
\n\
  return fragment;\n\
}\n\
\n\
//# sourceURL=components/component/domify/1.2.1/index.js"
));

require.modules["component-domify"] = require.modules["component~domify@1.2.1"];
require.modules["component~domify"] = require.modules["component~domify@1.2.1"];
require.modules["domify"] = require.modules["component~domify@1.2.1"];


require.register("yields~merge-attrs@0.0.1", Function("exports, module",
"\n\
/**\n\
 * Export `merge`\n\
 */\n\
\n\
module.exports = merge;\n\
\n\
/**\n\
 * Merge `b`'s attrs into `a`.\n\
 *\n\
 * @param {Element} a\n\
 * @param {Element} b\n\
 * @api public\n\
 */\n\
\n\
function merge(a, b){\n\
  for (var i = 0; i < b.attributes.length; ++i) {\n\
    var attr = b.attributes[i];\n\
    if (ignore(a, attr)) continue;\n\
    a.setAttribute(attr.name, attr.value);\n\
  }\n\
}\n\
\n\
/**\n\
 * Check if `attr` should be ignored.\n\
 *\n\
 * @param {Element} a\n\
 * @param {Attr} attr\n\
 * @return {Boolean}\n\
 * @api private\n\
 */\n\
\n\
function ignore(a, attr){\n\
  return !attr.specified\n\
    || 'class' == attr.name\n\
    || 'id' == attr.name\n\
    || a.hasAttribute(attr.name);\n\
}\n\
\n\
//# sourceURL=components/yields/merge-attrs/0.0.1/index.js"
));

require.modules["yields-merge-attrs"] = require.modules["yields~merge-attrs@0.0.1"];
require.modules["yields~merge-attrs"] = require.modules["yields~merge-attrs@0.0.1"];
require.modules["merge-attrs"] = require.modules["yields~merge-attrs@0.0.1"];


require.register("yields~uniq@1.0.0", Function("exports, module",
"\n\
/**\n\
 * dependencies\n\
 */\n\
\n\
try {\n\
  var indexOf = require(\"component~indexof@0.0.1\");\n\
} catch(e){\n\
  var indexOf = require(\"indexof-component\");\n\
}\n\
\n\
/**\n\
 * Create duplicate free array\n\
 * from the provided `arr`.\n\
 *\n\
 * @param {Array} arr\n\
 * @param {Array} select\n\
 * @return {Array}\n\
 */\n\
\n\
module.exports = function (arr, select) {\n\
  var len = arr.length, ret = [], v;\n\
  select = select ? (select instanceof Array ? select : [select]) : false;\n\
\n\
  for (var i = 0; i < len; i++) {\n\
    v = arr[i];\n\
    if (select && !~indexOf(select, v)) {\n\
      ret.push(v);\n\
    } else if (!~indexOf(ret, v)) {\n\
      ret.push(v);\n\
    }\n\
  }\n\
  return ret;\n\
};\n\
\n\
//# sourceURL=components/yields/uniq/1.0.0/index.js"
));

require.modules["yields-uniq"] = require.modules["yields~uniq@1.0.0"];
require.modules["yields~uniq"] = require.modules["yields~uniq@1.0.0"];
require.modules["uniq"] = require.modules["yields~uniq@1.0.0"];


require.register("yields~carry@0.0.1", Function("exports, module",
"\n\
/**\n\
 * dependencies\n\
 */\n\
\n\
var merge = require(\"yields~merge-attrs@0.0.1\")\n\
  , classes = require(\"component~classes@1.2.1\")\n\
  , uniq = require(\"yields~uniq@1.0.0\");\n\
\n\
/**\n\
 * Export `carry`\n\
 */\n\
\n\
module.exports = carry;\n\
\n\
/**\n\
 * Carry over attrs and classes\n\
 * from `b` to `a`.\n\
 *\n\
 * @param {Element} a\n\
 * @param {Element} b\n\
 * @return {Element}\n\
 * @api public\n\
 */\n\
\n\
function carry(a, b){\n\
  if (!a) return b.cloneNode();\n\
  carry.attrs(a, b);\n\
  carry.classes(a, b);\n\
  return a;\n\
}\n\
\n\
/**\n\
 * Carry attributes.\n\
 *\n\
 * @param {Element} a\n\
 * @param {Element} b\n\
 * @return {Element} a\n\
 * @api public\n\
 */\n\
\n\
carry.attrs = function(a, b){\n\
  merge(a, b);\n\
  return a;\n\
};\n\
\n\
/**\n\
 * Carry over classes.\n\
 *\n\
 * @param {Element} a\n\
 * @param {Element} b\n\
 * @return {Element} a\n\
 * @api public\n\
 */\n\
\n\
carry.classes = function(a, b){\n\
  if (a.className == b.className) return a;\n\
  var blist = classes(b).array();\n\
  var alist = classes(a).array();\n\
  var list = alist.concat(blist);\n\
  a.className = uniq(list).join(' ');\n\
  return a;\n\
};\n\
\n\
//# sourceURL=components/yields/carry/0.0.1/index.js"
));

require.modules["yields-carry"] = require.modules["yields~carry@0.0.1"];
require.modules["yields~carry"] = require.modules["yields~carry@0.0.1"];
require.modules["carry"] = require.modules["yields~carry@0.0.1"];


require.register("visionmedia~debug@0.7.4", Function("exports, module",
"if ('undefined' == typeof window) {\n\
  module.exports = require(\"./lib/debug\");\n\
} else {\n\
  module.exports = require(\"visionmedia~debug@0.7.4/debug.js\");\n\
}\n\
\n\
//# sourceURL=components/visionmedia/debug/0.7.4/index.js"
));

require.register("visionmedia~debug@0.7.4/debug.js", Function("exports, module",
"\n\
/**\n\
 * Expose `debug()` as the module.\n\
 */\n\
\n\
module.exports = debug;\n\
\n\
/**\n\
 * Create a debugger with the given `name`.\n\
 *\n\
 * @param {String} name\n\
 * @return {Type}\n\
 * @api public\n\
 */\n\
\n\
function debug(name) {\n\
  if (!debug.enabled(name)) return function(){};\n\
\n\
  return function(fmt){\n\
    fmt = coerce(fmt);\n\
\n\
    var curr = new Date;\n\
    var ms = curr - (debug[name] || curr);\n\
    debug[name] = curr;\n\
\n\
    fmt = name\n\
      + ' '\n\
      + fmt\n\
      + ' +' + debug.humanize(ms);\n\
\n\
    // This hackery is required for IE8\n\
    // where `console.log` doesn't have 'apply'\n\
    window.console\n\
      && console.log\n\
      && Function.prototype.apply.call(console.log, console, arguments);\n\
  }\n\
}\n\
\n\
/**\n\
 * The currently active debug mode names.\n\
 */\n\
\n\
debug.names = [];\n\
debug.skips = [];\n\
\n\
/**\n\
 * Enables a debug mode by name. This can include modes\n\
 * separated by a colon and wildcards.\n\
 *\n\
 * @param {String} name\n\
 * @api public\n\
 */\n\
\n\
debug.enable = function(name) {\n\
  try {\n\
    localStorage.debug = name;\n\
  } catch(e){}\n\
\n\
  var split = (name || '').split(/[\\s,]+/)\n\
    , len = split.length;\n\
\n\
  for (var i = 0; i < len; i++) {\n\
    name = split[i].replace('*', '.*?');\n\
    if (name[0] === '-') {\n\
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));\n\
    }\n\
    else {\n\
      debug.names.push(new RegExp('^' + name + '$'));\n\
    }\n\
  }\n\
};\n\
\n\
/**\n\
 * Disable debug output.\n\
 *\n\
 * @api public\n\
 */\n\
\n\
debug.disable = function(){\n\
  debug.enable('');\n\
};\n\
\n\
/**\n\
 * Humanize the given `ms`.\n\
 *\n\
 * @param {Number} m\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
debug.humanize = function(ms) {\n\
  var sec = 1000\n\
    , min = 60 * 1000\n\
    , hour = 60 * min;\n\
\n\
  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';\n\
  if (ms >= min) return (ms / min).toFixed(1) + 'm';\n\
  if (ms >= sec) return (ms / sec | 0) + 's';\n\
  return ms + 'ms';\n\
};\n\
\n\
/**\n\
 * Returns true if the given mode name is enabled, false otherwise.\n\
 *\n\
 * @param {String} name\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
debug.enabled = function(name) {\n\
  for (var i = 0, len = debug.skips.length; i < len; i++) {\n\
    if (debug.skips[i].test(name)) {\n\
      return false;\n\
    }\n\
  }\n\
  for (var i = 0, len = debug.names.length; i < len; i++) {\n\
    if (debug.names[i].test(name)) {\n\
      return true;\n\
    }\n\
  }\n\
  return false;\n\
};\n\
\n\
/**\n\
 * Coerce `val`.\n\
 */\n\
\n\
function coerce(val) {\n\
  if (val instanceof Error) return val.stack || val.message;\n\
  return val;\n\
}\n\
\n\
// persist\n\
\n\
try {\n\
  if (window.localStorage) debug.enable(localStorage.debug);\n\
} catch(e){}\n\
\n\
//# sourceURL=components/visionmedia/debug/0.7.4/debug.js"
));

require.modules["visionmedia-debug"] = require.modules["visionmedia~debug@0.7.4"];
require.modules["visionmedia~debug"] = require.modules["visionmedia~debug@0.7.4"];
require.modules["debug"] = require.modules["visionmedia~debug@0.7.4"];


require.register("component~reactive@v1.2.0", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var Emitter = require(\"component~emitter@1.1.1\");\n\
var query = require(\"component~query@0.0.1\");\n\
var domify = require(\"component~domify@1.2.1\");\n\
var debug = require(\"visionmedia~debug@0.7.4\")('reactive');\n\
\n\
var Adapter = require(\"component~reactive@v1.2.0/lib/adapter.js\");\n\
var AttrBinding = require(\"component~reactive@v1.2.0/lib/attr-binding.js\");\n\
var TextBinding = require(\"component~reactive@v1.2.0/lib/text-binding.js\");\n\
var bindings = require(\"component~reactive@v1.2.0/lib/bindings.js\");\n\
var Binding = require(\"component~reactive@v1.2.0/lib/binding.js\");\n\
var utils = require(\"component~reactive@v1.2.0/lib/utils.js\");\n\
var walk = require(\"component~reactive@v1.2.0/lib/walk.js\");\n\
\n\
/**\n\
 * Expose `Reactive`.\n\
 */\n\
\n\
exports = module.exports = Reactive;\n\
\n\
/**\n\
 * Initialize a reactive template for `el` and `obj`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {Element} obj\n\
 * @param {Object} options\n\
 * @api public\n\
 */\n\
\n\
function Reactive(el, model, opt) {\n\
  if (!(this instanceof Reactive)) return new Reactive(el, model, opt);\n\
  opt = opt || {};\n\
\n\
  if (typeof el === 'string') {\n\
    el = domify(el);\n\
  }\n\
\n\
  var self = this;\n\
  self.opt = opt || {};\n\
  self.model = model || {};\n\
  self.adapter = (opt.adapter || Adapter)(self.model);\n\
  self.el = el;\n\
  self.view = opt.delegate || Object.create(null);\n\
\n\
  self.bindings = opt.bindings || Object.create(null);\n\
\n\
  // TODO undo this crap and just export bindings regularly\n\
  // not that binding order matters!!\n\
  bindings({\n\
    bind: function(name, fn) {\n\
      self.bindings[name] = fn;\n\
    }\n\
  });\n\
\n\
  self._bind(this.el, []);\n\
}\n\
\n\
Emitter(Reactive.prototype);\n\
\n\
/**\n\
 * Subscribe to changes on `prop`.\n\
 *\n\
 * @param {String} prop\n\
 * @param {Function} fn\n\
 * @return {Reactive}\n\
 * @api private\n\
 */\n\
\n\
Reactive.prototype.sub = function(prop, fn){\n\
  var self = this;\n\
\n\
  debug('subscribe %s', prop);\n\
\n\
  // if we have parts, we need to subscribe to the parent as well\n\
  // TODO (defunctzombie) multiple levels of properties\n\
  var parts = prop.split('.');\n\
  if (parts.length > 1) {\n\
    self.sub(parts[0], function() {\n\
      // use self.get(prop) here because we wanted the value of the nested\n\
      // property but the subscription is for the parent\n\
      fn(self.get(prop));\n\
    });\n\
  }\n\
\n\
  // for when reactive changes the property\n\
  self.on('change ' + prop, fn);\n\
\n\
  // for when the property changed within the adapter\n\
  self.adapter.subscribe(prop, function() {\n\
    // skip items set internally from calling function twice\n\
    if (self._internal_set) return;\n\
\n\
    fn.apply(this, arguments);\n\
  });\n\
\n\
  return self;\n\
};\n\
\n\
/**\n\
 * Unsubscribe to changes from `prop`.\n\
 *\n\
 * @param {String} prop\n\
 * @param {Function} fn\n\
 * @return {Reactive}\n\
 * @api private\n\
 */\n\
\n\
Reactive.prototype.unsub = function(prop, fn){\n\
  this.off('change ' + prop, fn);\n\
  this.adapter.unsubscribe(prop, fn);\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Get a `prop`\n\
 *\n\
 * @param {String} prop\n\
 * @param {Mixed} val\n\
 * @return {Mixed}\n\
 * @api private\n\
 */\n\
\n\
Reactive.prototype.get = function(prop) {\n\
  if (prop === 'this') {\n\
    return this.model;\n\
  }\n\
\n\
  // model takes precedence\n\
  var modelVal = this.adapter.get(prop);\n\
  if (modelVal) {\n\
    return modelVal;\n\
  }\n\
\n\
  var view = this.view;\n\
  var viewVal = view[prop];\n\
  if ('function' == typeof viewVal) {\n\
    return viewVal.call(view);\n\
  }\n\
  else if (viewVal) {\n\
    return viewVal;\n\
  }\n\
\n\
  return undefined;\n\
};\n\
\n\
/**\n\
 * Set a `prop`\n\
 *\n\
 * @param {String} prop\n\
 * @param {Mixed} val\n\
 * @return {Reactive}\n\
 * @api private\n\
 */\n\
\n\
Reactive.prototype.set = function(prop, val) {\n\
  var self = this;\n\
  // internal set flag lets reactive updates know to avoid triggering\n\
  // updates for the Adapter#set call\n\
  // we will already trigger updates with the change event\n\
  self._internal_set = true;\n\
  if( \"object\" == typeof prop) {\n\
    Object.keys(prop).forEach(function(name){\n\
      self.set(name, prop[name]);\n\
    });\n\
  }\n\
  else {\n\
    self.adapter.set(prop, val);\n\
    self.emit('change ' + prop, val);\n\
  }\n\
  self._internal_set = false;\n\
  return self;\n\
};\n\
\n\
/**\n\
 * Traverse and bind all interpolation within attributes and text.\n\
 *\n\
 * @param {Element} el\n\
 * @api private\n\
 */\n\
\n\
Reactive.prototype.bindInterpolation = function(el, els){\n\
\n\
  // element\n\
  if (el.nodeType == 1) {\n\
    for (var i = 0; i < el.attributes.length; i++) {\n\
      var attr = el.attributes[i];\n\
      if (utils.hasInterpolation(attr.value)) {\n\
        new AttrBinding(this, el, attr);\n\
      }\n\
    }\n\
  }\n\
\n\
  // text node\n\
  if (el.nodeType == 3) {\n\
    if (utils.hasInterpolation(el.data)) {\n\
      debug('bind text \"%s\"', el.data);\n\
      new TextBinding(this, el);\n\
    }\n\
  }\n\
\n\
  // walk nodes\n\
  for (var i = 0; i < el.childNodes.length; i++) {\n\
    var node = el.childNodes[i];\n\
    this.bindInterpolation(node, els);\n\
  }\n\
};\n\
\n\
Reactive.prototype._bind = function() {\n\
  var self = this;\n\
\n\
  var bindings = self.bindings;\n\
\n\
  walk(self.el, function(el, next) {\n\
    // element\n\
    if (el.nodeType == 1) {\n\
      var skip = false;\n\
\n\
      var attrs = {};\n\
      for (var i = 0; i < el.attributes.length; ++i) {\n\
        var attr = el.attributes[i];\n\
        var name = attr.name;\n\
        attrs[name] = attr;\n\
      }\n\
\n\
      // bindings must be iterated first\n\
      // to see if any request skipping\n\
      // only then can we see about attributes\n\
      Object.keys(bindings).forEach(function(name) {\n\
        if (!attrs[name] || skip) {\n\
          return;\n\
        }\n\
\n\
        debug('bind [%s]', name);\n\
\n\
        var prop = attrs[name].value;\n\
        var binding_fn = bindings[name];\n\
        if (!binding_fn) {\n\
          return;\n\
        }\n\
\n\
        var binding = new Binding(name, self, el, binding_fn);\n\
        binding.bind();\n\
        if (binding.skip) {\n\
          skip = true;\n\
        }\n\
      });\n\
\n\
      if (skip) {\n\
        return next(skip);\n\
      }\n\
\n\
      // if we are not skipping\n\
      // bind any interpolation attrs\n\
      for (var i = 0; i < el.attributes.length; ++i) {\n\
        var attr = el.attributes[i];\n\
        var name = attr.name;\n\
        if (utils.hasInterpolation(attr.value)) {\n\
          new AttrBinding(self, el, attr);\n\
        }\n\
      }\n\
\n\
      return next(skip);\n\
    }\n\
    // text\n\
    else if (el.nodeType == 3) {\n\
      if (utils.hasInterpolation(el.data)) {\n\
        debug('bind text \"%s\"', el.data);\n\
        new TextBinding(self, el);\n\
      }\n\
    }\n\
\n\
    next();\n\
  });\n\
};\n\
\n\
/**\n\
 * Bind `name` to `fn`.\n\
 *\n\
 * @param {String|Object} name or object\n\
 * @param {Function} fn\n\
 * @api public\n\
 */\n\
\n\
Reactive.prototype.bind = function(name, fn) {\n\
  var self = this;\n\
  if ('object' == typeof name) {\n\
    for (var key in name) {\n\
      this.bind(key, name[key]);\n\
    }\n\
    return;\n\
  }\n\
\n\
  var els = query.all('[' + name + ']', this.el);\n\
  if (this.el.hasAttribute && this.el.hasAttribute(name)) {\n\
    els = [].slice.call(els);\n\
    els.unshift(this.el);\n\
  }\n\
  if (!els.length) return;\n\
\n\
  debug('bind [%s] (%d elements)', name, els.length);\n\
  for (var i = 0; i < els.length; i++) {\n\
    var binding = new Binding(name, this, els[i], fn);\n\
    binding.bind();\n\
  }\n\
};\n\
\n\
/**\n\
 * Destroy the binding\n\
 * - Removes the element from the dom (if inserted)\n\
 * - unbinds any event listeners\n\
 *\n\
 * @api public\n\
 */\n\
\n\
Reactive.prototype.destroy = function() {\n\
  var self = this;\n\
\n\
  if (self.el.parentNode) {\n\
    self.el.parentNode.removeChild(self.el);\n\
  }\n\
\n\
  self.adapter.unsubscribeAll();\n\
  self.emit('destroyed');\n\
  self.removeAllListeners();\n\
};\n\
\n\
/**\n\
 * Use middleware\n\
 *\n\
 * @api public\n\
 */\n\
\n\
Reactive.prototype.use = function(fn) {\n\
  fn(this);\n\
  return this;\n\
};\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/index.js"
));

require.register("component~reactive@v1.2.0/lib/utils.js", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var debug = require(\"visionmedia~debug@0.7.4\")('reactive:utils');\n\
//var props = require('props');\n\
\n\
/**\n\
 * Function cache.\n\
 */\n\
\n\
var cache = {};\n\
\n\
/**\n\
 * Return possible properties of a string\n\
 * @param {String} str\n\
 * @return {Array} of properties found in the string\n\
 * @api private\n\
 */\n\
var props = function(str) {\n\
  return str\n\
    .replace(/\\w+ *\\(|\"[^\"]*\"|'[^']*'|\\/([^/]+)\\//g, '')\n\
    .match(/[a-zA-Z_]\\w*([.][a-zA-Z_]\\w*)*/g)\n\
    || [];\n\
};\n\
/**\n\
 * Return interpolation property names in `str`,\n\
 * for example \"{foo} and {bar}\" would return\n\
 * ['foo', 'bar'].\n\
 *\n\
 * @param {String} str\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
exports.interpolationProps = function(str) {\n\
  var m;\n\
  var arr = [];\n\
  var re = /\\{([^}]+)\\}/g;\n\
\n\
  while (m = re.exec(str)) {\n\
    var expr = m[1];\n\
    arr = arr.concat(props(expr));\n\
  }\n\
\n\
  return unique(arr);\n\
};\n\
\n\
/**\n\
 * Interpolate `str` with the given `fn`.\n\
 *\n\
 * @param {String} str\n\
 * @param {Function} fn\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
exports.interpolate = function(str, fn){\n\
  return str.replace(/\\{([^}]+)\\}/g, function(_, expr){\n\
    var cb = cache[expr];\n\
    if (!cb) cb = cache[expr] = compile(expr);\n\
    var val = fn(expr.trim(), cb);\n\
    return val == null ? '' : val;\n\
  });\n\
};\n\
\n\
/**\n\
 * Check if `str` has interpolation.\n\
 *\n\
 * @param {String} str\n\
 * @return {Boolean}\n\
 * @api private\n\
 */\n\
\n\
exports.hasInterpolation = function(str) {\n\
  return ~str.indexOf('{');\n\
};\n\
\n\
/**\n\
 * Compile `expr` to a `Function`.\n\
 *\n\
 * @param {String} expr\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function compile(expr) {\n\
  var re = /\\.\\w+|\\w+ *\\(|\"[^\"]*\"|'[^']*'|\\/([^/]+)\\/|[a-zA-Z_]\\w*(\\.[a-zA-Z_]\\w*)*/g;\n\
  var p = props(expr);\n\
\n\
  // replace function calls with [ ] syntax to avoid capture as property\n\
  var funCallRe = /.\\w+ *\\(/g;\n\
  var body = expr.replace(funCallRe, function(_) {\n\
    return '[\\'' + _.slice(1, -1) + '\\'](';\n\
  });\n\
\n\
  var body = body.replace(re, function(_) {\n\
    if (p.indexOf(_) >= 0) {\n\
      return access(_);\n\
    };\n\
\n\
    return _;\n\
  });\n\
\n\
  debug('compile `%s`', body);\n\
  return new Function('reactive', 'return ' + body);\n\
}\n\
\n\
/**\n\
 * Access a method `prop` with dot notation.\n\
 *\n\
 * @param {String} prop\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function access(prop) {\n\
  return 'reactive.get(\\'' + prop + '\\')';\n\
}\n\
\n\
/**\n\
 * Return unique array.\n\
 *\n\
 * @param {Array} arr\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function unique(arr) {\n\
  var ret = [];\n\
\n\
  for (var i = 0; i < arr.length; i++) {\n\
    if (~ret.indexOf(arr[i])) continue;\n\
    ret.push(arr[i]);\n\
  }\n\
\n\
  return ret;\n\
}\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/utils.js"
));

require.register("component~reactive@v1.2.0/lib/text-binding.js", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var debug = require(\"visionmedia~debug@0.7.4\")('reactive:text-binding');\n\
var utils = require(\"component~reactive@v1.2.0/lib/utils.js\");\n\
\n\
/**\n\
 * Expose `TextBinding`.\n\
 */\n\
\n\
module.exports = TextBinding;\n\
\n\
/**\n\
 * Initialize a new text binding.\n\
 *\n\
 * @param {Reactive} view\n\
 * @param {Element} node\n\
 * @param {Attribute} attr\n\
 * @api private\n\
 */\n\
\n\
function TextBinding(reactive, node) {\n\
  this.reactive = reactive;\n\
  this.text = node.data;\n\
  this.node = node;\n\
  this.props = utils.interpolationProps(this.text);\n\
  this.subscribe();\n\
  this.render();\n\
}\n\
\n\
/**\n\
 * Subscribe to changes.\n\
 */\n\
\n\
TextBinding.prototype.subscribe = function(){\n\
  var self = this;\n\
  var reactive = this.reactive;\n\
  this.props.forEach(function(prop){\n\
    reactive.sub(prop, function(){\n\
      self.render();\n\
    });\n\
  });\n\
};\n\
\n\
/**\n\
 * Render text.\n\
 */\n\
\n\
TextBinding.prototype.render = function(){\n\
  var node = this.node;\n\
  var text = this.text;\n\
  var reactive = this.reactive;\n\
  var model = reactive.model;\n\
\n\
  // TODO: delegate most of this to `Reactive`\n\
  debug('render \"%s\"', text);\n\
  node.data = utils.interpolate(text, function(prop, fn){\n\
    if (fn) {\n\
      return fn(reactive);\n\
    } else {\n\
      return reactive.get(prop);\n\
    }\n\
  });\n\
};\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/text-binding.js"
));

require.register("component~reactive@v1.2.0/lib/attr-binding.js", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var debug = require(\"visionmedia~debug@0.7.4\")('reactive:attr-binding');\n\
var utils = require(\"component~reactive@v1.2.0/lib/utils.js\");\n\
\n\
/**\n\
 * Expose `AttrBinding`.\n\
 */\n\
\n\
module.exports = AttrBinding;\n\
\n\
/**\n\
 * Initialize a new attribute binding.\n\
 *\n\
 * @param {Reactive} view\n\
 * @param {Element} node\n\
 * @param {Attribute} attr\n\
 * @api private\n\
 */\n\
\n\
function AttrBinding(reactive, node, attr) {\n\
  var self = this;\n\
  this.reactive = reactive;\n\
  this.node = node;\n\
  this.attr = attr;\n\
  this.text = attr.value;\n\
  this.props = utils.interpolationProps(this.text);\n\
  this.subscribe();\n\
  this.render();\n\
}\n\
\n\
/**\n\
 * Subscribe to changes.\n\
 */\n\
\n\
AttrBinding.prototype.subscribe = function(){\n\
  var self = this;\n\
  var reactive = this.reactive;\n\
  this.props.forEach(function(prop){\n\
    reactive.sub(prop, function(){\n\
      self.render();\n\
    });\n\
  });\n\
};\n\
\n\
/**\n\
 * Render the value.\n\
 */\n\
\n\
AttrBinding.prototype.render = function(){\n\
  var attr = this.attr;\n\
  var text = this.text;\n\
  var reactive = this.reactive;\n\
  var model = reactive.model;\n\
\n\
  // TODO: delegate most of this to `Reactive`\n\
  debug('render %s \"%s\"', attr.name, text);\n\
  attr.value = utils.interpolate(text, function(prop, fn){\n\
    if (fn) {\n\
      return fn(reactive);\n\
    } else {\n\
      return reactive.get(prop);\n\
    }\n\
  });\n\
};\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/attr-binding.js"
));

require.register("component~reactive@v1.2.0/lib/binding.js", Function("exports, module",
"var hasInterpolation = require(\"component~reactive@v1.2.0/lib/utils.js\").hasInterpolation;\n\
var interpolationProps = require(\"component~reactive@v1.2.0/lib/utils.js\").interpolationProps;\n\
\n\
/**\n\
 * Expose `Binding`.\n\
 */\n\
\n\
module.exports = Binding;\n\
\n\
/**\n\
 * Initialize a binding.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
function Binding(name, reactive, el, fn) {\n\
  this.name = name;\n\
  this.reactive = reactive;\n\
  this.model = reactive.model;\n\
  this.view = reactive.view;\n\
  this.el = el;\n\
  this.fn = fn;\n\
}\n\
\n\
/**\n\
 * Apply the binding.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
Binding.prototype.bind = function() {\n\
  var val = this.el.getAttribute(this.name);\n\
  this.fn(this.el, val, this.model);\n\
};\n\
\n\
/**\n\
 * Perform interpolation on `name`.\n\
 *\n\
 * @param {String} name\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
Binding.prototype.interpolate = function(name) {\n\
  var self = this;\n\
\n\
  if (~name.indexOf('{')) {\n\
    return name.replace(/{([^}]+)}/g, function(_, name){\n\
      return self.value(name);\n\
    });\n\
  }\n\
\n\
  return self.value(name);\n\
};\n\
\n\
/**\n\
 * Return value for property `name`.\n\
 *\n\
 *  - check if the \"view\" has a `name` method\n\
 *  - check if the \"model\" has a `name` method\n\
 *  - check if the \"model\" has a `name` property\n\
 *\n\
 * @param {String} name\n\
 * @return {Mixed}\n\
 * @api public\n\
 */\n\
\n\
Binding.prototype.value = function(name) {\n\
  return this.reactive.get(name);\n\
};\n\
\n\
/**\n\
 * Invoke `fn` on changes.\n\
 *\n\
 * @param {Function} fn\n\
 * @api public\n\
 */\n\
\n\
Binding.prototype.change = function(fn) {\n\
  fn.call(this);\n\
\n\
  var self = this;\n\
  var reactive = this.reactive;\n\
  var val = this.el.getAttribute(this.name);\n\
\n\
  // interpolation\n\
  if (hasInterpolation(val)) {\n\
    var props = interpolationProps(val);\n\
    props.forEach(function(prop){\n\
      reactive.sub(prop, fn.bind(self));\n\
    });\n\
    return;\n\
  }\n\
\n\
  // bind to prop\n\
  var prop = val;\n\
  reactive.sub(prop, fn.bind(this));\n\
};\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/binding.js"
));

require.register("component~reactive@v1.2.0/lib/bindings.js", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var carry = require(\"yields~carry@0.0.1\");\n\
var classes = require(\"component~classes@1.1.1\");\n\
var event = require(\"component~event@0.1.0\");\n\
\n\
var each_binding = require(\"component~reactive@v1.2.0/lib/each.js\");\n\
\n\
/**\n\
 * Attributes supported.\n\
 */\n\
\n\
var attrs = [\n\
  'id',\n\
  'src',\n\
  'rel',\n\
  'cols',\n\
  'rows',\n\
  'name',\n\
  'href',\n\
  'title',\n\
  'class',\n\
  'style',\n\
  'width',\n\
  'value',\n\
  'height',\n\
  'tabindex',\n\
  'placeholder'\n\
];\n\
\n\
/**\n\
 * Events supported.\n\
 */\n\
\n\
var events = [\n\
  'change',\n\
  'click',\n\
  'dblclick',\n\
  'mousedown',\n\
  'mouseup',\n\
  'mouseenter',\n\
  'mouseleave',\n\
  'scroll',\n\
  'blur',\n\
  'focus',\n\
  'input',\n\
  'submit',\n\
  'keydown',\n\
  'keypress',\n\
  'keyup'\n\
];\n\
\n\
/**\n\
 * Apply bindings.\n\
 */\n\
\n\
module.exports = function(reactive){\n\
\n\
  reactive.bind('each', each_binding);\n\
\n\
  /**\n\
   * Generate attribute bindings.\n\
   */\n\
\n\
  attrs.forEach(function(attr){\n\
    reactive.bind('data-' + attr, function(el, name, obj){\n\
      var change = function () {\n\
        el.setAttribute(attr, this.interpolate(name));\n\
      };\n\
\n\
      if (!!~['INPUT', 'TEXTAREA'].indexOf(el.tagName) && attr === 'value') {\n\
        change = function () {\n\
          el.value = this.interpolate(name);\n\
        };\n\
      }\n\
\n\
      this.change(change);\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Show binding.\n\
   */\n\
\n\
  reactive.bind('data-visible', function(el, name){\n\
    this.change(function(){\n\
      var val = this.value(name);\n\
      if (val) {\n\
        classes(el).add('visible').remove('hidden');\n\
      } else {\n\
        classes(el).remove('visible').add('hidden');\n\
      }\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Hide binding.\n\
   */\n\
\n\
  reactive.bind('data-hidden', function(el, name){\n\
    this.change(function(){\n\
      var val = this.value(name);\n\
      if (val) {\n\
        classes(el).remove('visible').add('hidden');\n\
      } else {\n\
        classes(el).add('visible').remove('hidden');\n\
      }\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Checked binding.\n\
   */\n\
\n\
  reactive.bind('data-checked', function(el, name){\n\
    this.change(function(){\n\
      if (this.value(name)) {\n\
        el.setAttribute('checked', 'checked');\n\
      } else {\n\
        el.removeAttribute('checked');\n\
      }\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Selected binding.\n\
   */\n\
\n\
  reactive.bind('data-selected', function(el, name){\n\
    this.change(function(){\n\
      if (this.value(name)) {\n\
        el.setAttribute('selected', 'selected');\n\
      } else {\n\
        el.removeAttribute('selected');\n\
      }\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Text binding.\n\
   */\n\
\n\
  reactive.bind('data-text', function(el, name){\n\
    var change = function () {\n\
      el.textContent = this.interpolate(name);\n\
    };\n\
\n\
    if (el.tagName === 'TEXTAREA') {\n\
      change = function () {\n\
        el.value = this.interpolate(name);\n\
      };\n\
    }\n\
\n\
    this.change(change);\n\
  });\n\
\n\
  /**\n\
   * HTML binding.\n\
   */\n\
\n\
  reactive.bind('data-html', function(el, name){\n\
    this.change(function(){\n\
      el.innerHTML = this.interpolate(name);\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Generate event bindings.\n\
   */\n\
\n\
  events.forEach(function(name){\n\
    reactive.bind('on-' + name, function(el, method){\n\
      var self = this;\n\
      var view = self.reactive.view;\n\
      event.bind(el, name, function(e){\n\
        e.preventDefault();\n\
\n\
        var fn = view[method];\n\
        if (!fn) throw new Error('method .' + method + '() missing');\n\
        fn.call(view, e, self.reactive);\n\
      });\n\
    });\n\
  });\n\
\n\
  /**\n\
   * Append child element.\n\
   */\n\
\n\
  reactive.bind('data-append', function(el, name){\n\
    var other = this.value(name);\n\
    el.appendChild(other);\n\
  });\n\
\n\
  /**\n\
   * Replace element, carrying over its attributes.\n\
   */\n\
\n\
  reactive.bind('data-replace', function(el, name){\n\
    var other = carry(this.value(name), el);\n\
    el.parentNode.replaceChild(other, el);\n\
  });\n\
};\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/bindings.js"
));

require.register("component~reactive@v1.2.0/lib/adapter.js", Function("exports, module",
"\n\
function Adapter(obj) {\n\
  if (!(this instanceof Adapter)) {\n\
    return new Adapter(obj);\n\
  }\n\
\n\
  var self = this;\n\
  self.obj = obj;\n\
};\n\
\n\
/**\n\
 * Default subscription method.\n\
 * Subscribe to changes on the model.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {String} prop\n\
 * @param {Function} fn\n\
 */\n\
\n\
Adapter.prototype.subscribe = function(prop, fn) {\n\
};\n\
\n\
/**\n\
 * Default unsubscription method.\n\
 * Unsubscribe from changes on the model.\n\
 */\n\
\n\
Adapter.prototype.unsubscribe = function(prop, fn) {\n\
};\n\
\n\
/**\n\
 * Remove all subscriptions on this adapter\n\
 */\n\
\n\
Adapter.prototype.unsubscribeAll = function() {\n\
};\n\
\n\
/**\n\
 * Default setter method.\n\
 * Set a property on the model.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {String} prop\n\
 * @param {Mixed} val\n\
 */\n\
\n\
Adapter.prototype.set = function(prop, val) {\n\
  var obj = this.obj;\n\
  if (!obj) return;\n\
  if ('function' == typeof obj[prop]) {\n\
    obj[prop](val);\n\
  }\n\
  else if ('function' == typeof obj.set) {\n\
    obj.set(prop, val);\n\
  }\n\
  else {\n\
    obj[prop] = val;\n\
  }\n\
};\n\
\n\
/**\n\
 * Default getter method.\n\
 * Get a property from the model.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {String} prop\n\
 * @return {Mixed}\n\
 */\n\
\n\
Adapter.prototype.get = function(prop) {\n\
  var obj = this.obj;\n\
  if (!obj) {\n\
    return undefined;\n\
  }\n\
\n\
  // split property on '.' access\n\
  // and dig into the object\n\
  var parts = prop.split('.');\n\
  var part = parts.shift();\n\
  do {\n\
    if (typeof obj[part] === 'function') {\n\
      obj = obj[part].call(obj);\n\
    }\n\
    else {\n\
      obj = obj[part];\n\
    }\n\
\n\
    if (!obj) {\n\
      return undefined;\n\
    }\n\
\n\
    part = parts.shift();\n\
  } while(part);\n\
\n\
  return obj;\n\
};\n\
\n\
module.exports = Adapter;\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/adapter.js"
));

require.register("component~reactive@v1.2.0/lib/each.js", Function("exports, module",
"// 'each' binding\n\
module.exports = function(el, val) {\n\
    var self = this;\n\
\n\
    // get the reactive constructor from the current reactive instance\n\
    // TODO(shtylman) port over adapter and bindings from instance?\n\
    var Reactive = self.reactive.constructor;\n\
\n\
    var val = val.split(/ +/);\n\
    el.removeAttribute('each');\n\
\n\
    var name = val[0];\n\
    var prop = val[0];\n\
\n\
    if (val.length > 1) {\n\
        name = val[0];\n\
        prop = val[2];\n\
    }\n\
\n\
    var parent = el.parentNode;\n\
\n\
    // use text node to hold where end of list should be\n\
    var placeholder = document.createTextNode('');\n\
    parent.insertBefore(placeholder, el);\n\
    parent.removeChild(el);\n\
\n\
    // the reactive views we created for our array\n\
    // one per array item\n\
    // the length of this MUST always match the length of the 'arr'\n\
    // and mutates with 'arr'\n\
    var views = [];\n\
\n\
    function childView(el, model) {\n\
        return Reactive(el, model, {\n\
            delegate: self.view,\n\
            adapter: self.reactive.opt.adapter,\n\
            bindings: self.reactive.bindings\n\
        });\n\
    }\n\
\n\
    var array;\n\
\n\
    // bind entire new array\n\
    function change(arr) {\n\
        // remove any old bindings/views\n\
        views.forEach(function(view) {\n\
            view.destroy();\n\
        });\n\
        views = [];\n\
\n\
        // remove any old array observers\n\
        if (array) {\n\
            unpatchArray(array);\n\
        }\n\
        patchArray(arr);\n\
        array = arr;\n\
\n\
        // handle initial array\n\
        var fragment = document.createDocumentFragment();\n\
        arr.forEach(function(obj) {\n\
            var clone = el.cloneNode(true);\n\
            var view = childView(clone, obj);\n\
            views.push(view);\n\
            fragment.appendChild(clone);\n\
        });\n\
        parent.insertBefore(fragment, placeholder);\n\
    }\n\
\n\
    function unpatchArray(arr) {\n\
        delete arr.splice;\n\
        delete arr.push;\n\
        delete arr.unshift;\n\
    }\n\
\n\
    function patchArray(arr) {\n\
        // splice will replace the current arr.splice function\n\
        // so that we can intercept modifications\n\
        var old_splice = arr.splice;\n\
        // idx -> index to start operation\n\
        // how many -> elements to remove\n\
        // ... elements to insert\n\
        // return removed elements\n\
        var splice = function(idx, how_many) {\n\
            var args = Array.prototype.slice.apply(arguments);\n\
\n\
            // new items to insert if any\n\
            var new_items = args.slice(2);\n\
\n\
            var place = placeholder;\n\
            if (idx < views.length) {\n\
                place = views[idx].el;\n\
            }\n\
\n\
            // make views for these items\n\
            var new_views = new_items.map(function(item) {\n\
                var clone = el.cloneNode(true);\n\
                return childView(clone, item);\n\
            });\n\
\n\
            var splice_args = [idx, how_many].concat(new_views);\n\
\n\
            var removed = views.splice.apply(views, splice_args);\n\
\n\
            var frag = document.createDocumentFragment();\n\
            // insert into appropriate place\n\
            // first removed item is where to insert\n\
            new_views.forEach(function(view) {\n\
                frag.appendChild(view.el);\n\
            });\n\
\n\
            // insert before a specific location\n\
            // the location is defined by the element at idx\n\
            parent.insertBefore(frag, place);\n\
\n\
            // remove after since we may need the element for 'placement'\n\
            // of the new document fragment\n\
            removed.forEach(function(view) {\n\
                view.destroy();\n\
            });\n\
\n\
            var ret = old_splice.apply(arr, args);\n\
\n\
            // set the length property of the array\n\
            // so that any listeners can pick up on it\n\
            self.reactive.set(prop + '.length', arr.length);\n\
            return ret;\n\
        };\n\
\n\
        /// existing methods can be implemented via splice\n\
\n\
        var push = function(el1, el2) {\n\
            var args = Array.prototype.slice.apply(arguments);\n\
            var len = arr.length;\n\
\n\
            var splice_args = [len, 0].concat(args)\n\
            splice.apply(arr, splice_args);\n\
            return arr.length;\n\
        };\n\
\n\
        var unshift = function(el1, el2) {\n\
            var args = Array.prototype.slice.apply(arguments);\n\
            var len = arr.length;\n\
\n\
            var splice_args = [0, 0].concat(args)\n\
            splice.apply(arr, splice_args);\n\
            return arr.length;\n\
        };\n\
\n\
        var pop = function() {\n\
            if (!arr.length) {\n\
                return void 0;\n\
            }\n\
            var element = arr[arr.length-1];\n\
            splice.apply(arr,[arr.length-1,1]);\n\
            return element;\n\
        };\n\
\n\
        var shift = function() {\n\
            if (!arr.length) {\n\
                return void 0;\n\
            }\n\
            var element = arr[0];\n\
            splice.apply(arr,[0,1]);\n\
            return element;\n\
        };\n\
\n\
        var sort = function () {\n\
            var ret = Array.prototype.sort.apply(arr,arguments);\n\
            var arr2 = [0,arr.length].concat(arr);\n\
            splice.apply(arr,arr2);\n\
            return ret;\n\
        };\n\
\n\
        var reverse = function() {\n\
            var ret = Array.prototype.reverse.apply(arr);\n\
            var arr2 = [0,arr.length].concat(arr);\n\
            splice.apply(arr,arr2);\n\
            return ret;\n\
        };\n\
\n\
        // use defineProperty to avoid making ownProperty fields\n\
        function set_prop(prop, fn) {\n\
            Object.defineProperty(arr, prop, {\n\
                enumerable: false,\n\
                writable: true,\n\
                configurable: true,\n\
                value: fn\n\
            });\n\
        }\n\
\n\
        set_prop('splice', splice);\n\
        set_prop('push', push);\n\
        set_prop('unshift', unshift);\n\
        set_prop('pop', pop);\n\
        set_prop('shift', shift);\n\
        set_prop('sort', sort);\n\
        set_prop('reverse', reverse);\n\
    }\n\
\n\
    change(self.reactive.get(prop) || []);\n\
    self.skip = true;\n\
\n\
    self.reactive.sub(prop, change);\n\
};\n\
\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/each.js"
));

require.register("component~reactive@v1.2.0/lib/walk.js", Function("exports, module",
"/**\n\
 * @api private\n\
 */\n\
module.exports = function walk(el, process, done) {\n\
  var end = done || function(){};\n\
  var nodes = [].slice.call(el.childNodes);\n\
\n\
  function next(stop){\n\
    if (stop || nodes.length === 0) {\n\
      return end();\n\
    }\n\
    walk(nodes.shift(), process, next);\n\
  }\n\
\n\
  process(el, next);\n\
}\n\
\n\
//# sourceURL=components/component/reactive/v1.2.0/lib/walk.js"
));

require.modules["component-reactive"] = require.modules["component~reactive@v1.2.0"];
require.modules["component~reactive"] = require.modules["component~reactive@v1.2.0"];
require.modules["reactive"] = require.modules["component~reactive@v1.2.0"];


require.register("ui-component~mouse@0.0.1", Function("exports, module",
"\n\
/**\n\
 * dependencies.\n\
 */\n\
\n\
var emitter = require(\"component~emitter@1.1.1\")\n\
  , event = require(\"component~event@0.1.0\");\n\
\n\
/**\n\
 * export `Mouse`\n\
 */\n\
\n\
module.exports = function(el, obj){\n\
  return new Mouse(el, obj);\n\
};\n\
\n\
/**\n\
 * initialize new `Mouse`.\n\
 * \n\
 * @param {Element} el\n\
 * @param {Object} obj\n\
 */\n\
\n\
function Mouse(el, obj){\n\
  this.obj = obj || {};\n\
  this.el = el;\n\
}\n\
\n\
/**\n\
 * mixin emitter.\n\
 */\n\
\n\
emitter(Mouse.prototype);\n\
\n\
/**\n\
 * bind mouse.\n\
 * \n\
 * @return {Mouse}\n\
 */\n\
\n\
Mouse.prototype.bind = function(){\n\
  var obj = this.obj\n\
    , self = this;\n\
\n\
  // up\n\
  function up(e){\n\
    obj.onmouseup && obj.onmouseup(e);\n\
    event.unbind(document, 'mousemove', move);\n\
    event.unbind(document, 'mouseup', up);\n\
    self.emit('up', e);\n\
  }\n\
\n\
  // move\n\
  function move(e){\n\
    obj.onmousemove && obj.onmousemove(e);\n\
    self.emit('move', e);\n\
  }\n\
\n\
  // down\n\
  self.down = function(e){\n\
    obj.onmousedown && obj.onmousedown(e);\n\
    event.bind(document, 'mouseup', up);\n\
    event.bind(document, 'mousemove', move);\n\
    self.emit('down', e);\n\
  };\n\
\n\
  // bind all.\n\
  event.bind(this.el, 'mousedown', self.down);\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * unbind mouse.\n\
 * \n\
 * @return {Mouse}\n\
 */\n\
\n\
Mouse.prototype.unbind = function(){\n\
  event.unbind(this.el, 'mousedown', this.down);\n\
  this.down = null;\n\
};\n\
\n\
//# sourceURL=components/ui-component/mouse/0.0.1/index.js"
));

require.modules["ui-component-mouse"] = require.modules["ui-component~mouse@0.0.1"];
require.modules["ui-component~mouse"] = require.modules["ui-component~mouse@0.0.1"];
require.modules["mouse"] = require.modules["ui-component~mouse@0.0.1"];


require.register("component~matches-selector@0.1.4", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var query = require(\"component~query@0.0.1\");\n\
\n\
/**\n\
 * Element prototype.\n\
 */\n\
\n\
var proto = Element.prototype;\n\
\n\
/**\n\
 * Vendor function.\n\
 */\n\
\n\
var vendor = proto.matches\n\
  || proto.webkitMatchesSelector\n\
  || proto.mozMatchesSelector\n\
  || proto.msMatchesSelector\n\
  || proto.oMatchesSelector;\n\
\n\
/**\n\
 * Expose `match()`.\n\
 */\n\
\n\
module.exports = match;\n\
\n\
/**\n\
 * Match `el` to `selector`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} selector\n\
 * @return {Boolean}\n\
 * @api public\n\
 */\n\
\n\
function match(el, selector) {\n\
  if (vendor) return vendor.call(el, selector);\n\
  var nodes = query.all(selector, el.parentNode);\n\
  for (var i = 0; i < nodes.length; ++i) {\n\
    if (nodes[i] == el) return true;\n\
  }\n\
  return false;\n\
}\n\
\n\
//# sourceURL=components/component/matches-selector/0.1.4/index.js"
));

require.modules["component-matches-selector"] = require.modules["component~matches-selector@0.1.4"];
require.modules["component~matches-selector"] = require.modules["component~matches-selector@0.1.4"];
require.modules["matches-selector"] = require.modules["component~matches-selector@0.1.4"];


require.register("discore~closest@0.1.3", Function("exports, module",
"var matches = require(\"component~matches-selector@0.1.4\")\n\
\n\
module.exports = function (element, selector, checkYoSelf, root) {\n\
  element = checkYoSelf ? {parentNode: element} : element\n\
\n\
  root = root || document\n\
\n\
  // Make sure `element !== document` and `element != null`\n\
  // otherwise we get an illegal invocation\n\
  while ((element = element.parentNode) && element !== document) {\n\
    if (matches(element, selector))\n\
      return element\n\
    // After `matches` on the edge case that\n\
    // the selector matches the root\n\
    // (when the root is not the document)\n\
    if (element === root)\n\
      return  \n\
  }\n\
}\n\
//# sourceURL=components/discore/closest/0.1.3/index.js"
));

require.modules["discore-closest"] = require.modules["discore~closest@0.1.3"];
require.modules["discore~closest"] = require.modules["discore~closest@0.1.3"];
require.modules["closest"] = require.modules["discore~closest@0.1.3"];


require.register("component~delegate@0.2.2", Function("exports, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var closest = require(\"discore~closest@0.1.3\")\n\
  , event = require(\"component~event@0.1.0\");\n\
\n\
/**\n\
 * Delegate event `type` to `selector`\n\
 * and invoke `fn(e)`. A callback function\n\
 * is returned which may be passed to `.unbind()`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} selector\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, selector, type, fn, capture){\n\
  return event.bind(el, type, function(e){\n\
    var target = e.target || e.srcElement;\n\
    e.delegateTarget = closest(target, selector, true, el);\n\
    if (e.delegateTarget) fn.call(el, e);\n\
  }, capture);\n\
};\n\
\n\
/**\n\
 * Unbind event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  event.unbind(el, type, fn, capture);\n\
};\n\
\n\
//# sourceURL=components/component/delegate/0.2.2/index.js"
));

require.modules["component-delegate"] = require.modules["component~delegate@0.2.2"];
require.modules["component~delegate"] = require.modules["component~delegate@0.2.2"];
require.modules["delegate"] = require.modules["component~delegate@0.2.2"];


require.register("component~events@1.0.8", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var events = require(\"component~event@0.1.4\");\n\
var delegate = require(\"component~delegate@0.2.2\");\n\
\n\
/**\n\
 * Expose `Events`.\n\
 */\n\
\n\
module.exports = Events;\n\
\n\
/**\n\
 * Initialize an `Events` with the given\n\
 * `el` object which events will be bound to,\n\
 * and the `obj` which will receive method calls.\n\
 *\n\
 * @param {Object} el\n\
 * @param {Object} obj\n\
 * @api public\n\
 */\n\
\n\
function Events(el, obj) {\n\
  if (!(this instanceof Events)) return new Events(el, obj);\n\
  if (!el) throw new Error('element required');\n\
  if (!obj) throw new Error('object required');\n\
  this.el = el;\n\
  this.obj = obj;\n\
  this._events = {};\n\
}\n\
\n\
/**\n\
 * Subscription helper.\n\
 */\n\
\n\
Events.prototype.sub = function(event, method, cb){\n\
  this._events[event] = this._events[event] || {};\n\
  this._events[event][method] = cb;\n\
};\n\
\n\
/**\n\
 * Bind to `event` with optional `method` name.\n\
 * When `method` is undefined it becomes `event`\n\
 * with the \"on\" prefix.\n\
 *\n\
 * Examples:\n\
 *\n\
 *  Direct event handling:\n\
 *\n\
 *    events.bind('click') // implies \"onclick\"\n\
 *    events.bind('click', 'remove')\n\
 *    events.bind('click', 'sort', 'asc')\n\
 *\n\
 *  Delegated event handling:\n\
 *\n\
 *    events.bind('click li > a')\n\
 *    events.bind('click li > a', 'remove')\n\
 *    events.bind('click a.sort-ascending', 'sort', 'asc')\n\
 *    events.bind('click a.sort-descending', 'sort', 'desc')\n\
 *\n\
 * @param {String} event\n\
 * @param {String|function} [method]\n\
 * @return {Function} callback\n\
 * @api public\n\
 */\n\
\n\
Events.prototype.bind = function(event, method){\n\
  var e = parse(event);\n\
  var el = this.el;\n\
  var obj = this.obj;\n\
  var name = e.name;\n\
  var method = method || 'on' + name;\n\
  var args = [].slice.call(arguments, 2);\n\
\n\
  // callback\n\
  function cb(){\n\
    var a = [].slice.call(arguments).concat(args);\n\
    obj[method].apply(obj, a);\n\
  }\n\
\n\
  // bind\n\
  if (e.selector) {\n\
    cb = delegate.bind(el, e.selector, name, cb);\n\
  } else {\n\
    events.bind(el, name, cb);\n\
  }\n\
\n\
  // subscription for unbinding\n\
  this.sub(name, method, cb);\n\
\n\
  return cb;\n\
};\n\
\n\
/**\n\
 * Unbind a single binding, all bindings for `event`,\n\
 * or all bindings within the manager.\n\
 *\n\
 * Examples:\n\
 *\n\
 *  Unbind direct handlers:\n\
 *\n\
 *     events.unbind('click', 'remove')\n\
 *     events.unbind('click')\n\
 *     events.unbind()\n\
 *\n\
 * Unbind delegate handlers:\n\
 *\n\
 *     events.unbind('click', 'remove')\n\
 *     events.unbind('click')\n\
 *     events.unbind()\n\
 *\n\
 * @param {String|Function} [event]\n\
 * @param {String|Function} [method]\n\
 * @api public\n\
 */\n\
\n\
Events.prototype.unbind = function(event, method){\n\
  if (0 == arguments.length) return this.unbindAll();\n\
  if (1 == arguments.length) return this.unbindAllOf(event);\n\
\n\
  // no bindings for this event\n\
  var bindings = this._events[event];\n\
  if (!bindings) return;\n\
\n\
  // no bindings for this method\n\
  var cb = bindings[method];\n\
  if (!cb) return;\n\
\n\
  events.unbind(this.el, event, cb);\n\
};\n\
\n\
/**\n\
 * Unbind all events.\n\
 *\n\
 * @api private\n\
 */\n\
\n\
Events.prototype.unbindAll = function(){\n\
  for (var event in this._events) {\n\
    this.unbindAllOf(event);\n\
  }\n\
};\n\
\n\
/**\n\
 * Unbind all events for `event`.\n\
 *\n\
 * @param {String} event\n\
 * @api private\n\
 */\n\
\n\
Events.prototype.unbindAllOf = function(event){\n\
  var bindings = this._events[event];\n\
  if (!bindings) return;\n\
\n\
  for (var method in bindings) {\n\
    this.unbind(event, method);\n\
  }\n\
};\n\
\n\
/**\n\
 * Parse `event`.\n\
 *\n\
 * @param {String} event\n\
 * @return {Object}\n\
 * @api private\n\
 */\n\
\n\
function parse(event) {\n\
  var parts = event.split(/ +/);\n\
  return {\n\
    name: parts.shift(),\n\
    selector: parts.join(' ')\n\
  }\n\
}\n\
\n\
//# sourceURL=components/component/events/1.0.8/index.js"
));

require.modules["component-events"] = require.modules["component~events@1.0.8"];
require.modules["component~events"] = require.modules["component~events@1.0.8"];
require.modules["events"] = require.modules["component~events@1.0.8"];


require.register("component~transform-property@0.0.1", Function("exports, module",
"\n\
var styles = [\n\
  'webkitTransform',\n\
  'MozTransform',\n\
  'msTransform',\n\
  'OTransform',\n\
  'transform'\n\
];\n\
\n\
var el = document.createElement('p');\n\
var style;\n\
\n\
for (var i = 0; i < styles.length; i++) {\n\
  style = styles[i];\n\
  if (null != el.style[style]) {\n\
    module.exports = style;\n\
    break;\n\
  }\n\
}\n\
\n\
//# sourceURL=components/component/transform-property/0.0.1/index.js"
));

require.modules["component-transform-property"] = require.modules["component~transform-property@0.0.1"];
require.modules["component~transform-property"] = require.modules["component~transform-property@0.0.1"];
require.modules["transform-property"] = require.modules["component~transform-property@0.0.1"];


require.register("component~has-translate3d@0.0.3", Function("exports, module",
"\n\
var prop = require(\"component~transform-property@0.0.1\");\n\
\n\
// IE <=8 doesn't have `getComputedStyle`\n\
if (!prop || !window.getComputedStyle) {\n\
  module.exports = false;\n\
\n\
} else {\n\
  var map = {\n\
    webkitTransform: '-webkit-transform',\n\
    OTransform: '-o-transform',\n\
    msTransform: '-ms-transform',\n\
    MozTransform: '-moz-transform',\n\
    transform: 'transform'\n\
  };\n\
\n\
  // from: https://gist.github.com/lorenzopolidori/3794226\n\
  var el = document.createElement('div');\n\
  el.style[prop] = 'translate3d(1px,1px,1px)';\n\
  document.body.insertBefore(el, null);\n\
  var val = getComputedStyle(el).getPropertyValue(map[prop]);\n\
  document.body.removeChild(el);\n\
  module.exports = null != val && val.length && 'none' != val;\n\
}\n\
\n\
//# sourceURL=components/component/has-translate3d/0.0.3/index.js"
));

require.modules["component-has-translate3d"] = require.modules["component~has-translate3d@0.0.3"];
require.modules["component~has-translate3d"] = require.modules["component~has-translate3d@0.0.3"];
require.modules["has-translate3d"] = require.modules["component~has-translate3d@0.0.3"];


require.register("component~translate@0.1.0", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var transform = require(\"component~transform-property@0.0.1\");\n\
var has3d = require(\"component~has-translate3d@0.0.3\");\n\
\n\
\n\
/**\n\
 * Regexp to check \"End with %\"\n\
 */\n\
\n\
var percentRegexp = /%$/;\n\
\n\
\n\
/**\n\
 * Expose `translate`.\n\
 */\n\
\n\
module.exports = translate;\n\
\n\
\n\
/**\n\
 * Translate `el` by `(x, y)`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {Number|String} x\n\
 * @param {Number|String} y \n\
 * @api public\n\
 */\n\
\n\
\n\
function translate(el, x, y){\n\
  \n\
  if (!percentRegexp.test(x)) x += 'px';\n\
  if (!percentRegexp.test(y)) y += 'px';\n\
\n\
  if (transform) {\n\
    if (has3d) {\n\
      el.style[transform] = 'translate3d(' + x + ', ' + y + ', 0)';\n\
    } else {\n\
      el.style[transform] = 'translate(' + x + ',' + y + ')';\n\
    }\n\
  } else {\n\
    el.style.left = x;\n\
    el.style.top = y;\n\
  }\n\
};\n\
\n\
//# sourceURL=components/component/translate/0.1.0/index.js"
));

require.modules["component-translate"] = require.modules["component~translate@0.1.0"];
require.modules["component~translate"] = require.modules["component~translate@0.1.0"];
require.modules["translate"] = require.modules["component~translate@0.1.0"];


require.register("staygrimm~draggable@23989c3", Function("exports, module",
"\n\
/**\n\
 * dependencies.\n\
 */\n\
\n\
var emitter = require(\"component~emitter@1.1.1\")\n\
  , mouse = require(\"ui-component~mouse@0.0.1\")\n\
  , events = require(\"component~events@1.0.8\")\n\
  , translate = require(\"component~translate@0.1.0\")\n\
  , classes = require(\"component~classes@1.2.1\");\n\
\n\
/**\n\
 * export `Draggable`.\n\
 */\n\
\n\
module.exports = function(el){\n\
  return new Draggable(el);\n\
};\n\
\n\
/**\n\
 * initialize new `Draggable`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {Object} opts\n\
 */\n\
\n\
function Draggable(el){\n\
  this._xAxis = true;\n\
  this._yAxis = true;\n\
  this.el = el;\n\
}\n\
\n\
/**\n\
 * mixins.\n\
 */\n\
\n\
emitter(Draggable.prototype);\n\
\n\
/**\n\
 * build draggable.\n\
 *\n\
 * @return {Draggable}\n\
 */\n\
\n\
Draggable.prototype.build = function(){\n\
  var el = this._handle || this.el;\n\
  this.touch = events(el, this);\n\
  this.touch.bind('touchstart', 'onmousedown');\n\
  this.touch.bind('touchmove', 'onmousemove');\n\
  this.touch.bind('touchend', 'onmouseup');\n\
  this.mouse = mouse(el, this);\n\
  this.mouse.bind();\n\
  return this;\n\
};\n\
\n\
/**\n\
 * on-mousedown\n\
 */\n\
\n\
Draggable.prototype.onmousedown = function(e){\n\
  e.preventDefault();\n\
  if (e.touches) e = e.touches[0];\n\
  var rect = this.rect = this.el.getBoundingClientRect();\n\
  this.ox = rect.left - this.el.offsetLeft;\n\
  this.oy = rect.top - this.el.offsetTop;\n\
  this.x = e.pageX - rect.left;\n\
  this.y = e.pageY - rect.top;\n\
  classes(this.el).add('dragging');\n\
  this.emit('start');\n\
};\n\
\n\
/**\n\
 * on-mousemove\n\
 */\n\
\n\
Draggable.prototype.onmousemove = function(e){\n\
  if (e.touches) e = e.touches[0];\n\
  var styles = this.el.style\n\
    , x = this._xAxis ? e.pageX - this.el.offsetLeft - this.x : this.ox\n\
    , y = this._yAxis ? e.pageY - this.el.offsetTop - this.y : this.oy\n\
    , rel = this.el\n\
    , el\n\
    , o;\n\
\n\
  // support containment\n\
  if (el = this._containment) {\n\
    o = { y: y + rel.clientHeight };\n\
    o.x = x + rel.clientWidth;\n\
    o.height = el.clientHeight;\n\
    o.width = el.clientWidth;\n\
    o.h = o.height - rel.clientHeight;\n\
    o.w = o.width - rel.clientWidth;\n\
    if (0 >= x) x = 0;\n\
    if (0 >= y) y = 0;\n\
    if (o.y >= o.height) y = o.h;\n\
    if (o.x >= o.width) x = o.w;\n\
  }\n\
\n\
  // move draggable.\n\
  translate(this.el, x, y);\n\
\n\
  // all done.\n\
  this.emit('drag');\n\
};\n\
\n\
/**\n\
 * on-mouseup\n\
 */\n\
\n\
Draggable.prototype.onmouseup = function(e){\n\
  classes(this.el).remove('dragging');\n\
  this.emit('end');\n\
};\n\
\n\
/**\n\
 * destroy draggable.\n\
 */\n\
\n\
Draggable.prototype.destroy = function(){\n\
  if (this.mouse) this.mouse.unbind();\n\
  this.mouse = null;\n\
  if (this.touch) this.touch.unbind();\n\
  this.touch = null;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Disable x-axis movement.\n\
 * @return {Draggable} \n\
 */\n\
\n\
Draggable.prototype.disableXAxis = function(){\n\
  this._xAxis = false;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Disable y-axis movement.\n\
 * @return {Draggable}\n\
 */\n\
\n\
Draggable.prototype.disableYAxis = function(){\n\
  this._yAxis = false;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Set a containment element.\n\
 * @param  {Element} el \n\
 * @return {Draggable}    \n\
 */\n\
\n\
Draggable.prototype.containment = function(el){\n\
  this._containment = el;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Set a handle.\n\
 * @param  {Element} el \n\
 * @return {Draggable}    \n\
 */\n\
\n\
Draggable.prototype.handle = function(el){\n\
  this._handle = el;\n\
  return this;\n\
};\n\
\n\
//# sourceURL=components/staygrimm/draggable/23989c3/index.js"
));

require.modules["staygrimm-draggable"] = require.modules["staygrimm~draggable@23989c3"];
require.modules["staygrimm~draggable"] = require.modules["staygrimm~draggable@23989c3"];
require.modules["draggable"] = require.modules["staygrimm~draggable@23989c3"];


require.register("draggable-dialog", Function("exports, module",
"var Emitter = require(\"component-emitter\"),\n\
    classes = require(\"component~classes@1.2.1\"),\n\
    draggable = require(\"staygrimm~draggable@23989c3\"),\n\
    Dialog,\n\
    closeHandler,\n\
    emit;\n\
\n\
\n\
closeHandler = function closeHandler() {\n\
    this.hide();\n\
};\n\
\n\
/**\n\
 * Return a new Dialog with given `element` \n\
 * and `options`.\n\
 * \n\
 * @param {DOM Element||String} el DOM element to clone or string\n\
 * @param {Object} options Options Object\n\
 * @param {String} options.title Optional dialog title\n\
 * @api public\n\
 */\n\
Dialog = function Dialog(el, options) {\n\
    this.options = options || {};\n\
    this.nodes = {};\n\
    this.el = el;\n\
    \n\
    if (this.el.tagName) {\n\
        classes(el).add('DraggableDialog--hidden');\n\
    }\n\
\n\
    this.render();\n\
};\n\
\n\
/**\n\
 * Inherit from `Emitter.prototype`\n\
 */\n\
Emitter(Dialog.prototype);\n\
\n\
/**\n\
 * Render the dialog\n\
 * @api public\n\
 */\n\
Dialog.prototype.render = function render() {\n\
    var self = this,\n\
        tempEl;\n\
\n\
    this.docFragment = document.createDocumentFragment();\n\
\n\
    this.nodes.containerDiv = document.createElement('div');\n\
    this.nodes.titleClose = document.createElement('a');\n\
    this.nodes.titleDiv = this.nodes.containerDiv.cloneNode();\n\
    this.nodes.contentDiv = this.nodes.containerDiv.cloneNode();\n\
    this.nodes.titleClose.innerHTML = '&times;<em>close</em>';\n\
\n\
    if ('string' === typeof this.el) {\n\
        this.nodes.contentDiv.innerHTML = this.el;\n\
    } else {\n\
        tempEl = this.el.cloneNode(true);\n\
        classes(tempEl).remove('DraggableDialog--hidden');\n\
        this.nodes.contentDiv.appendChild(tempEl);\n\
    }\n\
\n\
    if (this.options.title) {\n\
        this.nodes.titleSpan = document.createElement('span');\n\
        this.nodes.titleSpan.innerHTML = this.options.title;\n\
        classes(this.nodes.titleSpan).add('DraggableDialog-title');\n\
\n\
        this.nodes.titleDiv.appendChild(this.nodes.titleSpan);\n\
        this.nodes.titleDiv.appendChild(this.nodes.titleClose);\n\
    } else {\n\
        this.nodes.titleDiv.appendChild(this.nodes.titleClose);\n\
    }\n\
\n\
    this.nodes.containerDiv.appendChild(this.nodes.titleDiv);\n\
    this.nodes.containerDiv.appendChild(this.nodes.contentDiv);\n\
\n\
    this.docFragment.appendChild(this.nodes.containerDiv);\n\
\n\
    classes(this.nodes.containerDiv).add('DraggableDialog').add('DraggableDialog--hidden');\n\
    classes(this.nodes.titleDiv).add('DraggableDialog-titleBar');\n\
    classes(this.nodes.titleClose).add('DraggableDialog-closeButton');\n\
    classes(this.nodes.contentDiv).add('DraggableDialog-content');\n\
\n\
    this.nodes.titleClose.addEventListener('click', closeHandler.bind(self), false);\n\
\n\
    this.draggable = draggable(this.nodes.containerDiv);\n\
\n\
    this.draggable.on('drag', function () {\n\
        self.emit('drag');\n\
    }); \n\
\n\
    this.draggable.on('start', function () {\n\
        self.emit('start');\n\
    }); \n\
\n\
    this.draggable.on('end', function () {\n\
        self.emit('end');\n\
    }); \n\
\n\
    this.draggable.build();\n\
};\n\
\n\
/**\n\
 * Display the dialog\n\
 * @api public\n\
 */\n\
Dialog.prototype.show = function show() {\n\
    document.body.appendChild(this.docFragment);\n\
\n\
    classes(this.nodes.containerDiv).remove('DraggableDialog--hidden');\n\
    this.emit('show');\n\
};\n\
\n\
/**\n\
 * Hide the dialog\n\
 * @api public\n\
 */\n\
Dialog.prototype.hide = function hide() {\n\
    classes(this.nodes.containerDiv).add('DraggableDialog--hidden');\n\
\n\
    this.emit('hide');\n\
};\n\
\n\
/**\n\
 * Destroy the dialog\n\
 * @api public\n\
 */\n\
Dialog.prototype.remove = function remove() {\n\
    if (this.draggable) {\n\
        this.draggable.destroy()\n\
    }\n\
    this.nodes.titleClose.removeEventListener('click', closeHandler.bind(self), false);\n\
    this.nodes.containerDiv.parentNode.removeChild(this.nodes.containerDiv);\n\
\n\
    this.emit('remove');\n\
};\n\
\n\
module.exports = function (el, options) {\n\
    return new Dialog(el, options);\n\
};\n\
//# sourceURL=index.js"
));

require.modules["draggable-dialog"] = require.modules["draggable-dialog"];


require("draggable-dialog")
