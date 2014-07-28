
;(function(){

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
require.register("component~indexof@0.0.1", function (exports, module) {

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});

require.register("component~indexof@0.0.3", function (exports, module) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});

require.register("component~classes@1.1.1", function (exports, module) {

/**
 * Module dependencies.
 */

var index = require("component~indexof@0.0.3");

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name){
  // classList
  if (this.list) {
    this.list.toggle(name);
    return this;
  }

  // fallback
  if (this.has(name)) {
    this.remove(name);
  } else {
    this.add(name);
  }
  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var arr = this.el.className.split(re);
  if ('' === arr[0]) arr.pop();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

});

require.register("component~classes@1.2.1", function (exports, module) {
/**
 * Module dependencies.
 */

var index = require("component~indexof@0.0.3");

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el) throw new Error('A DOM element reference is required');
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var str = this.el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

});

require.register("component~event@0.1.0", function (exports, module) {

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture);
  } else {
    el.attachEvent('on' + type, fn);
  }
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture);
  } else {
    el.detachEvent('on' + type, fn);
  }
  return fn;
};

});

require.register("component~event@0.1.3", function (exports, module) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});

require.register("component~event@0.1.4", function (exports, module) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});

require.register("component~query@0.0.1", function (exports, module) {

function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
};

});

require.register("component~emitter@1.0.0", function (exports, module) {

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = callbacks.indexOf(fn._off || fn);
  if (~i) callbacks.splice(i, 1);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});

require.register("component~emitter@1.1.1", function (exports, module) {

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});

require.register("component~emitter@1.1.2", function (exports, module) {

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});

require.register("component~domify@1.2.1", function (exports, module) {

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.text =
map.circle =
map.ellipse =
map.line =
map.path =
map.polygon =
map.polyline =
map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');
  
  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return document.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = document.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

});

require.register("component~domify@1.2.2", function (exports, module) {

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.text =
map.circle =
map.ellipse =
map.line =
map.path =
map.polygon =
map.polyline =
map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');
  
  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return document.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = document.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

});

require.register("yields~merge-attrs@0.0.1", function (exports, module) {

/**
 * Export `merge`
 */

module.exports = merge;

/**
 * Merge `b`'s attrs into `a`.
 *
 * @param {Element} a
 * @param {Element} b
 * @api public
 */

function merge(a, b){
  for (var i = 0; i < b.attributes.length; ++i) {
    var attr = b.attributes[i];
    if (ignore(a, attr)) continue;
    a.setAttribute(attr.name, attr.value);
  }
}

/**
 * Check if `attr` should be ignored.
 *
 * @param {Element} a
 * @param {Attr} attr
 * @return {Boolean}
 * @api private
 */

function ignore(a, attr){
  return !attr.specified
    || 'class' == attr.name
    || 'id' == attr.name
    || a.hasAttribute(attr.name);
}

});

require.register("yields~uniq@1.0.0", function (exports, module) {

/**
 * dependencies
 */

try {
  var indexOf = require("component~indexof@0.0.1");
} catch(e){
  var indexOf = require("indexof-component");
}

/**
 * Create duplicate free array
 * from the provided `arr`.
 *
 * @param {Array} arr
 * @param {Array} select
 * @return {Array}
 */

module.exports = function (arr, select) {
  var len = arr.length, ret = [], v;
  select = select ? (select instanceof Array ? select : [select]) : false;

  for (var i = 0; i < len; i++) {
    v = arr[i];
    if (select && !~indexOf(select, v)) {
      ret.push(v);
    } else if (!~indexOf(ret, v)) {
      ret.push(v);
    }
  }
  return ret;
};

});

require.register("yields~carry@0.0.1", function (exports, module) {

/**
 * dependencies
 */

var merge = require("yields~merge-attrs@0.0.1")
  , classes = require("component~classes@1.2.1")
  , uniq = require("yields~uniq@1.0.0");

/**
 * Export `carry`
 */

module.exports = carry;

/**
 * Carry over attrs and classes
 * from `b` to `a`.
 *
 * @param {Element} a
 * @param {Element} b
 * @return {Element}
 * @api public
 */

function carry(a, b){
  if (!a) return b.cloneNode();
  carry.attrs(a, b);
  carry.classes(a, b);
  return a;
}

/**
 * Carry attributes.
 *
 * @param {Element} a
 * @param {Element} b
 * @return {Element} a
 * @api public
 */

carry.attrs = function(a, b){
  merge(a, b);
  return a;
};

/**
 * Carry over classes.
 *
 * @param {Element} a
 * @param {Element} b
 * @return {Element} a
 * @api public
 */

carry.classes = function(a, b){
  if (a.className == b.className) return a;
  var blist = classes(b).array();
  var alist = classes(a).array();
  var list = alist.concat(blist);
  a.className = uniq(list).join(' ');
  return a;
};

});

require.register("visionmedia~debug@0.7.4", function (exports, module) {
if ('undefined' == typeof window) {
  module.exports = require("./lib/debug");
} else {
  module.exports = require("visionmedia~debug@0.7.4/debug.js");
}

});

require.register("visionmedia~debug@0.7.4/debug.js", function (exports, module) {

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

});

require.register("component~reactive@v1.2.0", function (exports, module) {
/**
 * Module dependencies.
 */

var Emitter = require("component~emitter@1.1.1");
var query = require("component~query@0.0.1");
var domify = require("component~domify@1.2.1");
var debug = require("visionmedia~debug@0.7.4")('reactive');

var Adapter = require("component~reactive@v1.2.0/lib/adapter.js");
var AttrBinding = require("component~reactive@v1.2.0/lib/attr-binding.js");
var TextBinding = require("component~reactive@v1.2.0/lib/text-binding.js");
var bindings = require("component~reactive@v1.2.0/lib/bindings.js");
var Binding = require("component~reactive@v1.2.0/lib/binding.js");
var utils = require("component~reactive@v1.2.0/lib/utils.js");
var walk = require("component~reactive@v1.2.0/lib/walk.js");

/**
 * Expose `Reactive`.
 */

exports = module.exports = Reactive;

/**
 * Initialize a reactive template for `el` and `obj`.
 *
 * @param {Element} el
 * @param {Element} obj
 * @param {Object} options
 * @api public
 */

function Reactive(el, model, opt) {
  if (!(this instanceof Reactive)) return new Reactive(el, model, opt);
  opt = opt || {};

  if (typeof el === 'string') {
    el = domify(el);
  }

  var self = this;
  self.opt = opt || {};
  self.model = model || {};
  self.adapter = (opt.adapter || Adapter)(self.model);
  self.el = el;
  self.view = opt.delegate || Object.create(null);

  self.bindings = opt.bindings || Object.create(null);

  // TODO undo this crap and just export bindings regularly
  // not that binding order matters!!
  bindings({
    bind: function(name, fn) {
      self.bindings[name] = fn;
    }
  });

  self._bind(this.el, []);
}

Emitter(Reactive.prototype);

/**
 * Subscribe to changes on `prop`.
 *
 * @param {String} prop
 * @param {Function} fn
 * @return {Reactive}
 * @api private
 */

Reactive.prototype.sub = function(prop, fn){
  var self = this;

  debug('subscribe %s', prop);

  // if we have parts, we need to subscribe to the parent as well
  // TODO (defunctzombie) multiple levels of properties
  var parts = prop.split('.');
  if (parts.length > 1) {
    self.sub(parts[0], function() {
      // use self.get(prop) here because we wanted the value of the nested
      // property but the subscription is for the parent
      fn(self.get(prop));
    });
  }

  // for when reactive changes the property
  self.on('change ' + prop, fn);

  // for when the property changed within the adapter
  self.adapter.subscribe(prop, function() {
    // skip items set internally from calling function twice
    if (self._internal_set) return;

    fn.apply(this, arguments);
  });

  return self;
};

/**
 * Unsubscribe to changes from `prop`.
 *
 * @param {String} prop
 * @param {Function} fn
 * @return {Reactive}
 * @api private
 */

Reactive.prototype.unsub = function(prop, fn){
  this.off('change ' + prop, fn);
  this.adapter.unsubscribe(prop, fn);

  return this;
};

/**
 * Get a `prop`
 *
 * @param {String} prop
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

Reactive.prototype.get = function(prop) {
  if (prop === 'this') {
    return this.model;
  }

  // model takes precedence
  var modelVal = this.adapter.get(prop);
  if (modelVal) {
    return modelVal;
  }

  var view = this.view;
  var viewVal = view[prop];
  if ('function' == typeof viewVal) {
    return viewVal.call(view);
  }
  else if (viewVal) {
    return viewVal;
  }

  return undefined;
};

/**
 * Set a `prop`
 *
 * @param {String} prop
 * @param {Mixed} val
 * @return {Reactive}
 * @api private
 */

Reactive.prototype.set = function(prop, val) {
  var self = this;
  // internal set flag lets reactive updates know to avoid triggering
  // updates for the Adapter#set call
  // we will already trigger updates with the change event
  self._internal_set = true;
  if( "object" == typeof prop) {
    Object.keys(prop).forEach(function(name){
      self.set(name, prop[name]);
    });
  }
  else {
    self.adapter.set(prop, val);
    self.emit('change ' + prop, val);
  }
  self._internal_set = false;
  return self;
};

/**
 * Traverse and bind all interpolation within attributes and text.
 *
 * @param {Element} el
 * @api private
 */

Reactive.prototype.bindInterpolation = function(el, els){

  // element
  if (el.nodeType == 1) {
    for (var i = 0; i < el.attributes.length; i++) {
      var attr = el.attributes[i];
      if (utils.hasInterpolation(attr.value)) {
        new AttrBinding(this, el, attr);
      }
    }
  }

  // text node
  if (el.nodeType == 3) {
    if (utils.hasInterpolation(el.data)) {
      debug('bind text "%s"', el.data);
      new TextBinding(this, el);
    }
  }

  // walk nodes
  for (var i = 0; i < el.childNodes.length; i++) {
    var node = el.childNodes[i];
    this.bindInterpolation(node, els);
  }
};

Reactive.prototype._bind = function() {
  var self = this;

  var bindings = self.bindings;

  walk(self.el, function(el, next) {
    // element
    if (el.nodeType == 1) {
      var skip = false;

      var attrs = {};
      for (var i = 0; i < el.attributes.length; ++i) {
        var attr = el.attributes[i];
        var name = attr.name;
        attrs[name] = attr;
      }

      // bindings must be iterated first
      // to see if any request skipping
      // only then can we see about attributes
      Object.keys(bindings).forEach(function(name) {
        if (!attrs[name] || skip) {
          return;
        }

        debug('bind [%s]', name);

        var prop = attrs[name].value;
        var binding_fn = bindings[name];
        if (!binding_fn) {
          return;
        }

        var binding = new Binding(name, self, el, binding_fn);
        binding.bind();
        if (binding.skip) {
          skip = true;
        }
      });

      if (skip) {
        return next(skip);
      }

      // if we are not skipping
      // bind any interpolation attrs
      for (var i = 0; i < el.attributes.length; ++i) {
        var attr = el.attributes[i];
        var name = attr.name;
        if (utils.hasInterpolation(attr.value)) {
          new AttrBinding(self, el, attr);
        }
      }

      return next(skip);
    }
    // text
    else if (el.nodeType == 3) {
      if (utils.hasInterpolation(el.data)) {
        debug('bind text "%s"', el.data);
        new TextBinding(self, el);
      }
    }

    next();
  });
};

/**
 * Bind `name` to `fn`.
 *
 * @param {String|Object} name or object
 * @param {Function} fn
 * @api public
 */

Reactive.prototype.bind = function(name, fn) {
  var self = this;
  if ('object' == typeof name) {
    for (var key in name) {
      this.bind(key, name[key]);
    }
    return;
  }

  var els = query.all('[' + name + ']', this.el);
  if (this.el.hasAttribute && this.el.hasAttribute(name)) {
    els = [].slice.call(els);
    els.unshift(this.el);
  }
  if (!els.length) return;

  debug('bind [%s] (%d elements)', name, els.length);
  for (var i = 0; i < els.length; i++) {
    var binding = new Binding(name, this, els[i], fn);
    binding.bind();
  }
};

/**
 * Destroy the binding
 * - Removes the element from the dom (if inserted)
 * - unbinds any event listeners
 *
 * @api public
 */

Reactive.prototype.destroy = function() {
  var self = this;

  if (self.el.parentNode) {
    self.el.parentNode.removeChild(self.el);
  }

  self.adapter.unsubscribeAll();
  self.emit('destroyed');
  self.removeAllListeners();
};

/**
 * Use middleware
 *
 * @api public
 */

Reactive.prototype.use = function(fn) {
  fn(this);
  return this;
};

});

require.register("component~reactive@v1.2.0/lib/utils.js", function (exports, module) {

/**
 * Module dependencies.
 */

var debug = require("visionmedia~debug@0.7.4")('reactive:utils');
//var props = require('props');

/**
 * Function cache.
 */

var cache = {};

/**
 * Return possible properties of a string
 * @param {String} str
 * @return {Array} of properties found in the string
 * @api private
 */
var props = function(str) {
  return str
    .replace(/\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
    .match(/[a-zA-Z_]\w*([.][a-zA-Z_]\w*)*/g)
    || [];
};
/**
 * Return interpolation property names in `str`,
 * for example "{foo} and {bar}" would return
 * ['foo', 'bar'].
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

exports.interpolationProps = function(str) {
  var m;
  var arr = [];
  var re = /\{([^}]+)\}/g;

  while (m = re.exec(str)) {
    var expr = m[1];
    arr = arr.concat(props(expr));
  }

  return unique(arr);
};

/**
 * Interpolate `str` with the given `fn`.
 *
 * @param {String} str
 * @param {Function} fn
 * @return {String}
 * @api private
 */

exports.interpolate = function(str, fn){
  return str.replace(/\{([^}]+)\}/g, function(_, expr){
    var cb = cache[expr];
    if (!cb) cb = cache[expr] = compile(expr);
    var val = fn(expr.trim(), cb);
    return val == null ? '' : val;
  });
};

/**
 * Check if `str` has interpolation.
 *
 * @param {String} str
 * @return {Boolean}
 * @api private
 */

exports.hasInterpolation = function(str) {
  return ~str.indexOf('{');
};

/**
 * Compile `expr` to a `Function`.
 *
 * @param {String} expr
 * @return {Function}
 * @api private
 */

function compile(expr) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)*/g;
  var p = props(expr);

  // replace function calls with [ ] syntax to avoid capture as property
  var funCallRe = /.\w+ *\(/g;
  var body = expr.replace(funCallRe, function(_) {
    return '[\'' + _.slice(1, -1) + '\'](';
  });

  var body = body.replace(re, function(_) {
    if (p.indexOf(_) >= 0) {
      return access(_);
    };

    return _;
  });

  debug('compile `%s`', body);
  return new Function('reactive', 'return ' + body);
}

/**
 * Access a method `prop` with dot notation.
 *
 * @param {String} prop
 * @return {String}
 * @api private
 */

function access(prop) {
  return 'reactive.get(\'' + prop + '\')';
}

/**
 * Return unique array.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function unique(arr) {
  var ret = [];

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue;
    ret.push(arr[i]);
  }

  return ret;
}

});

require.register("component~reactive@v1.2.0/lib/text-binding.js", function (exports, module) {

/**
 * Module dependencies.
 */

var debug = require("visionmedia~debug@0.7.4")('reactive:text-binding');
var utils = require("component~reactive@v1.2.0/lib/utils.js");

/**
 * Expose `TextBinding`.
 */

module.exports = TextBinding;

/**
 * Initialize a new text binding.
 *
 * @param {Reactive} view
 * @param {Element} node
 * @param {Attribute} attr
 * @api private
 */

function TextBinding(reactive, node) {
  this.reactive = reactive;
  this.text = node.data;
  this.node = node;
  this.props = utils.interpolationProps(this.text);
  this.subscribe();
  this.render();
}

/**
 * Subscribe to changes.
 */

TextBinding.prototype.subscribe = function(){
  var self = this;
  var reactive = this.reactive;
  this.props.forEach(function(prop){
    reactive.sub(prop, function(){
      self.render();
    });
  });
};

/**
 * Render text.
 */

TextBinding.prototype.render = function(){
  var node = this.node;
  var text = this.text;
  var reactive = this.reactive;
  var model = reactive.model;

  // TODO: delegate most of this to `Reactive`
  debug('render "%s"', text);
  node.data = utils.interpolate(text, function(prop, fn){
    if (fn) {
      return fn(reactive);
    } else {
      return reactive.get(prop);
    }
  });
};

});

require.register("component~reactive@v1.2.0/lib/attr-binding.js", function (exports, module) {

/**
 * Module dependencies.
 */

var debug = require("visionmedia~debug@0.7.4")('reactive:attr-binding');
var utils = require("component~reactive@v1.2.0/lib/utils.js");

/**
 * Expose `AttrBinding`.
 */

module.exports = AttrBinding;

/**
 * Initialize a new attribute binding.
 *
 * @param {Reactive} view
 * @param {Element} node
 * @param {Attribute} attr
 * @api private
 */

function AttrBinding(reactive, node, attr) {
  var self = this;
  this.reactive = reactive;
  this.node = node;
  this.attr = attr;
  this.text = attr.value;
  this.props = utils.interpolationProps(this.text);
  this.subscribe();
  this.render();
}

/**
 * Subscribe to changes.
 */

AttrBinding.prototype.subscribe = function(){
  var self = this;
  var reactive = this.reactive;
  this.props.forEach(function(prop){
    reactive.sub(prop, function(){
      self.render();
    });
  });
};

/**
 * Render the value.
 */

AttrBinding.prototype.render = function(){
  var attr = this.attr;
  var text = this.text;
  var reactive = this.reactive;
  var model = reactive.model;

  // TODO: delegate most of this to `Reactive`
  debug('render %s "%s"', attr.name, text);
  attr.value = utils.interpolate(text, function(prop, fn){
    if (fn) {
      return fn(reactive);
    } else {
      return reactive.get(prop);
    }
  });
};

});

require.register("component~reactive@v1.2.0/lib/binding.js", function (exports, module) {
var hasInterpolation = require("component~reactive@v1.2.0/lib/utils.js").hasInterpolation;
var interpolationProps = require("component~reactive@v1.2.0/lib/utils.js").interpolationProps;

/**
 * Expose `Binding`.
 */

module.exports = Binding;

/**
 * Initialize a binding.
 *
 * @api private
 */

function Binding(name, reactive, el, fn) {
  this.name = name;
  this.reactive = reactive;
  this.model = reactive.model;
  this.view = reactive.view;
  this.el = el;
  this.fn = fn;
}

/**
 * Apply the binding.
 *
 * @api private
 */

Binding.prototype.bind = function() {
  var val = this.el.getAttribute(this.name);
  this.fn(this.el, val, this.model);
};

/**
 * Perform interpolation on `name`.
 *
 * @param {String} name
 * @return {String}
 * @api public
 */

Binding.prototype.interpolate = function(name) {
  var self = this;

  if (~name.indexOf('{')) {
    return name.replace(/{([^}]+)}/g, function(_, name){
      return self.value(name);
    });
  }

  return self.value(name);
};

/**
 * Return value for property `name`.
 *
 *  - check if the "view" has a `name` method
 *  - check if the "model" has a `name` method
 *  - check if the "model" has a `name` property
 *
 * @param {String} name
 * @return {Mixed}
 * @api public
 */

Binding.prototype.value = function(name) {
  return this.reactive.get(name);
};

/**
 * Invoke `fn` on changes.
 *
 * @param {Function} fn
 * @api public
 */

Binding.prototype.change = function(fn) {
  fn.call(this);

  var self = this;
  var reactive = this.reactive;
  var val = this.el.getAttribute(this.name);

  // interpolation
  if (hasInterpolation(val)) {
    var props = interpolationProps(val);
    props.forEach(function(prop){
      reactive.sub(prop, fn.bind(self));
    });
    return;
  }

  // bind to prop
  var prop = val;
  reactive.sub(prop, fn.bind(this));
};

});

require.register("component~reactive@v1.2.0/lib/bindings.js", function (exports, module) {
/**
 * Module dependencies.
 */

var carry = require("yields~carry@0.0.1");
var classes = require("component~classes@1.1.1");
var event = require("component~event@0.1.0");

var each_binding = require("component~reactive@v1.2.0/lib/each.js");

/**
 * Attributes supported.
 */

var attrs = [
  'id',
  'src',
  'rel',
  'cols',
  'rows',
  'name',
  'href',
  'title',
  'class',
  'style',
  'width',
  'value',
  'height',
  'tabindex',
  'placeholder'
];

/**
 * Events supported.
 */

var events = [
  'change',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseleave',
  'scroll',
  'blur',
  'focus',
  'input',
  'submit',
  'keydown',
  'keypress',
  'keyup'
];

/**
 * Apply bindings.
 */

module.exports = function(reactive){

  reactive.bind('each', each_binding);

  /**
   * Generate attribute bindings.
   */

  attrs.forEach(function(attr){
    reactive.bind('data-' + attr, function(el, name, obj){
      var change = function () {
        el.setAttribute(attr, this.interpolate(name));
      };

      if (!!~['INPUT', 'TEXTAREA'].indexOf(el.tagName) && attr === 'value') {
        change = function () {
          el.value = this.interpolate(name);
        };
      }

      this.change(change);
    });
  });

  /**
   * Show binding.
   */

  reactive.bind('data-visible', function(el, name){
    this.change(function(){
      var val = this.value(name);
      if (val) {
        classes(el).add('visible').remove('hidden');
      } else {
        classes(el).remove('visible').add('hidden');
      }
    });
  });

  /**
   * Hide binding.
   */

  reactive.bind('data-hidden', function(el, name){
    this.change(function(){
      var val = this.value(name);
      if (val) {
        classes(el).remove('visible').add('hidden');
      } else {
        classes(el).add('visible').remove('hidden');
      }
    });
  });

  /**
   * Checked binding.
   */

  reactive.bind('data-checked', function(el, name){
    this.change(function(){
      if (this.value(name)) {
        el.setAttribute('checked', 'checked');
      } else {
        el.removeAttribute('checked');
      }
    });
  });

  /**
   * Selected binding.
   */

  reactive.bind('data-selected', function(el, name){
    this.change(function(){
      if (this.value(name)) {
        el.setAttribute('selected', 'selected');
      } else {
        el.removeAttribute('selected');
      }
    });
  });

  /**
   * Text binding.
   */

  reactive.bind('data-text', function(el, name){
    var change = function () {
      el.textContent = this.interpolate(name);
    };

    if (el.tagName === 'TEXTAREA') {
      change = function () {
        el.value = this.interpolate(name);
      };
    }

    this.change(change);
  });

  /**
   * HTML binding.
   */

  reactive.bind('data-html', function(el, name){
    this.change(function(){
      el.innerHTML = this.interpolate(name);
    });
  });

  /**
   * Generate event bindings.
   */

  events.forEach(function(name){
    reactive.bind('on-' + name, function(el, method){
      var self = this;
      var view = self.reactive.view;
      event.bind(el, name, function(e){
        e.preventDefault();

        var fn = view[method];
        if (!fn) throw new Error('method .' + method + '() missing');
        fn.call(view, e, self.reactive);
      });
    });
  });

  /**
   * Append child element.
   */

  reactive.bind('data-append', function(el, name){
    var other = this.value(name);
    el.appendChild(other);
  });

  /**
   * Replace element, carrying over its attributes.
   */

  reactive.bind('data-replace', function(el, name){
    var other = carry(this.value(name), el);
    el.parentNode.replaceChild(other, el);
  });
};

});

require.register("component~reactive@v1.2.0/lib/adapter.js", function (exports, module) {

function Adapter(obj) {
  if (!(this instanceof Adapter)) {
    return new Adapter(obj);
  }

  var self = this;
  self.obj = obj;
};

/**
 * Default subscription method.
 * Subscribe to changes on the model.
 *
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} fn
 */

Adapter.prototype.subscribe = function(prop, fn) {
};

/**
 * Default unsubscription method.
 * Unsubscribe from changes on the model.
 */

Adapter.prototype.unsubscribe = function(prop, fn) {
};

/**
 * Remove all subscriptions on this adapter
 */

Adapter.prototype.unsubscribeAll = function() {
};

/**
 * Default setter method.
 * Set a property on the model.
 *
 * @param {Object} obj
 * @param {String} prop
 * @param {Mixed} val
 */

Adapter.prototype.set = function(prop, val) {
  var obj = this.obj;
  if (!obj) return;
  if ('function' == typeof obj[prop]) {
    obj[prop](val);
  }
  else if ('function' == typeof obj.set) {
    obj.set(prop, val);
  }
  else {
    obj[prop] = val;
  }
};

/**
 * Default getter method.
 * Get a property from the model.
 *
 * @param {Object} obj
 * @param {String} prop
 * @return {Mixed}
 */

Adapter.prototype.get = function(prop) {
  var obj = this.obj;
  if (!obj) {
    return undefined;
  }

  // split property on '.' access
  // and dig into the object
  var parts = prop.split('.');
  var part = parts.shift();
  do {
    if (typeof obj[part] === 'function') {
      obj = obj[part].call(obj);
    }
    else {
      obj = obj[part];
    }

    if (!obj) {
      return undefined;
    }

    part = parts.shift();
  } while(part);

  return obj;
};

module.exports = Adapter;

});

require.register("component~reactive@v1.2.0/lib/each.js", function (exports, module) {
// 'each' binding
module.exports = function(el, val) {
    var self = this;

    // get the reactive constructor from the current reactive instance
    // TODO(shtylman) port over adapter and bindings from instance?
    var Reactive = self.reactive.constructor;

    var val = val.split(/ +/);
    el.removeAttribute('each');

    var name = val[0];
    var prop = val[0];

    if (val.length > 1) {
        name = val[0];
        prop = val[2];
    }

    var parent = el.parentNode;

    // use text node to hold where end of list should be
    var placeholder = document.createTextNode('');
    parent.insertBefore(placeholder, el);
    parent.removeChild(el);

    // the reactive views we created for our array
    // one per array item
    // the length of this MUST always match the length of the 'arr'
    // and mutates with 'arr'
    var views = [];

    function childView(el, model) {
        return Reactive(el, model, {
            delegate: self.view,
            adapter: self.reactive.opt.adapter,
            bindings: self.reactive.bindings
        });
    }

    var array;

    // bind entire new array
    function change(arr) {
        // remove any old bindings/views
        views.forEach(function(view) {
            view.destroy();
        });
        views = [];

        // remove any old array observers
        if (array) {
            unpatchArray(array);
        }
        patchArray(arr);
        array = arr;

        // handle initial array
        var fragment = document.createDocumentFragment();
        arr.forEach(function(obj) {
            var clone = el.cloneNode(true);
            var view = childView(clone, obj);
            views.push(view);
            fragment.appendChild(clone);
        });
        parent.insertBefore(fragment, placeholder);
    }

    function unpatchArray(arr) {
        delete arr.splice;
        delete arr.push;
        delete arr.unshift;
    }

    function patchArray(arr) {
        // splice will replace the current arr.splice function
        // so that we can intercept modifications
        var old_splice = arr.splice;
        // idx -> index to start operation
        // how many -> elements to remove
        // ... elements to insert
        // return removed elements
        var splice = function(idx, how_many) {
            var args = Array.prototype.slice.apply(arguments);

            // new items to insert if any
            var new_items = args.slice(2);

            var place = placeholder;
            if (idx < views.length) {
                place = views[idx].el;
            }

            // make views for these items
            var new_views = new_items.map(function(item) {
                var clone = el.cloneNode(true);
                return childView(clone, item);
            });

            var splice_args = [idx, how_many].concat(new_views);

            var removed = views.splice.apply(views, splice_args);

            var frag = document.createDocumentFragment();
            // insert into appropriate place
            // first removed item is where to insert
            new_views.forEach(function(view) {
                frag.appendChild(view.el);
            });

            // insert before a specific location
            // the location is defined by the element at idx
            parent.insertBefore(frag, place);

            // remove after since we may need the element for 'placement'
            // of the new document fragment
            removed.forEach(function(view) {
                view.destroy();
            });

            var ret = old_splice.apply(arr, args);

            // set the length property of the array
            // so that any listeners can pick up on it
            self.reactive.set(prop + '.length', arr.length);
            return ret;
        };

        /// existing methods can be implemented via splice

        var push = function(el1, el2) {
            var args = Array.prototype.slice.apply(arguments);
            var len = arr.length;

            var splice_args = [len, 0].concat(args)
            splice.apply(arr, splice_args);
            return arr.length;
        };

        var unshift = function(el1, el2) {
            var args = Array.prototype.slice.apply(arguments);
            var len = arr.length;

            var splice_args = [0, 0].concat(args)
            splice.apply(arr, splice_args);
            return arr.length;
        };

        var pop = function() {
            if (!arr.length) {
                return void 0;
            }
            var element = arr[arr.length-1];
            splice.apply(arr,[arr.length-1,1]);
            return element;
        };

        var shift = function() {
            if (!arr.length) {
                return void 0;
            }
            var element = arr[0];
            splice.apply(arr,[0,1]);
            return element;
        };

        var sort = function () {
            var ret = Array.prototype.sort.apply(arr,arguments);
            var arr2 = [0,arr.length].concat(arr);
            splice.apply(arr,arr2);
            return ret;
        };

        var reverse = function() {
            var ret = Array.prototype.reverse.apply(arr);
            var arr2 = [0,arr.length].concat(arr);
            splice.apply(arr,arr2);
            return ret;
        };

        // use defineProperty to avoid making ownProperty fields
        function set_prop(prop, fn) {
            Object.defineProperty(arr, prop, {
                enumerable: false,
                writable: true,
                configurable: true,
                value: fn
            });
        }

        set_prop('splice', splice);
        set_prop('push', push);
        set_prop('unshift', unshift);
        set_prop('pop', pop);
        set_prop('shift', shift);
        set_prop('sort', sort);
        set_prop('reverse', reverse);
    }

    change(self.reactive.get(prop) || []);
    self.skip = true;

    self.reactive.sub(prop, change);
};


});

require.register("component~reactive@v1.2.0/lib/walk.js", function (exports, module) {
/**
 * @api private
 */
module.exports = function walk(el, process, done) {
  var end = done || function(){};
  var nodes = [].slice.call(el.childNodes);

  function next(stop){
    if (stop || nodes.length === 0) {
      return end();
    }
    walk(nodes.shift(), process, next);
  }

  process(el, next);
}

});

require.register("component~overlay@0.3.1", function (exports, module) {

/**
 * Module dependencies.
 */

var Emitter = require("component~emitter@1.1.2");
var tmpl = require("component~overlay@0.3.1/template.html");
var domify = require("component~domify@1.2.2");
var event = require("component~event@0.1.3");
var classes = require("component~classes@1.2.1");

/**
 * Expose `overlay()`.
 */

exports = module.exports = overlay;

/**
 * Expose `Overlay`.
 */

exports.Overlay = Overlay;

/**
 * Return a new `Overlay` with the given `options`.
 *
 * @param {Object|Element} options
 * @return {Overlay}
 * @api public
 */

function overlay(options){
  options = options || {};

  // element
  if (options.nodeName) {
    options = { target: options };
  }

  return new Overlay(options);
}

/**
 * Initialize a new `Overlay`.
 *
 * @param {Object} options
 * @api public
 */

function Overlay(options) {
  Emitter.call(this);
  options = options || {};
  this.target = options.target || document.body;
  this.closable = options.closable;
  this.el = domify(tmpl);
  this.target.appendChild(this.el);
  if (this.closable) {
	event.bind(this.el, 'click', this.hide.bind(this));
    classes(this.el).add('closable');
  }
}

/**
 * Mixin emitter.
 */

Emitter(Overlay.prototype);

/**
 * Show the overlay.
 *
 * Emits "show" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.show = function(){
  this.emit('show');
  classes(this.el).remove('hidden');
  return this;
};

/**
 * Hide the overlay.
 *
 * Emits "hide" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.hide = function(){
  this.emit('hide');
  return this.remove();
};

/**
 * Hide the overlay without emitting "hide".
 *
 * Emits "close" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.remove = function(){
  var self = this;
  this.emit('close');
  classes(this.el).add('hidden');
  setTimeout(function(){
    self.target.removeChild(self.el);
  }, 350);
  return this;
};


});

require.define("component~overlay@0.3.1/template.html", "<div class=\"overlay hidden\"></div>\n");

require.register("component~dialog@0.2.1", function (exports, module) {

/**
 * Module dependencies.
 */

var Emitter = require("component~emitter@1.0.0")
  , overlay = require("component~overlay@0.3.1")
  , domify = require("component~domify@1.2.1")
  , events = require("component~event@0.1.0")
  , classes = require("component~classes@1.2.1")
  , query = require("component~query@0.0.1");

/**
 * Active dialog.
 */

var active;

/**
 * Expose `dialog()`.
 */

exports = module.exports = dialog;

/**
 * Expose `Dialog`.
 */

exports.Dialog = Dialog;

/**
 * Return a new `Dialog` with the given
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

function dialog(title, msg){
  switch (arguments.length) {
    case 2:
      return new Dialog({ title: title, message: msg });
    case 1:
      return new Dialog({ message: title });
  }
};

/**
 * Initialize a new `Dialog`.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * Emits:
 *
 *    - `show` when visible
 *    - `hide` when hidden
 *
 * @param {Object} options
 * @api public
 */

function Dialog(options) {
  Emitter.call(this);
  options = options || {};
  this.template = require("component~dialog@0.2.1/template.html");
  this.el = domify(this.template);
  this._classes = classes(this.el);
  this.render(options);
  if (active && !active.hiding) active.hide();
  if (exports.effect) this.effect(exports.effect);
  this.on('escape', this.hide.bind(this));
  active = this;
};

/**
 * Inherit from `Emitter.prototype`.
 */

Dialog.prototype = new Emitter;

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Dialog.prototype.render = function(options){
  var self = this
    , el = self.el
    , title = options.title
    , titleEl = query('.title', el)
    , pEl = query('p', el)
    , msg = options.message;

  events.bind(query('.close', el), 'click', function (ev) {
    ev.preventDefault();
    self.emit('close');
    self.hide();
  });

  if (titleEl) {
    if (!title) {
      titleEl.parentNode.removeChild(titleEl);
    } else {
      titleEl.textContent = title;
    }
  }

  // message
  if ('string' == typeof msg) {
    pEl.textContent = msg;
  } else if (msg) {
    pEl.parentNode.insertBefore(msg.el || msg, pEl);
    pEl.parentNode.removeChild(pEl);
  }
};

/**
 * Enable the dialog close link.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.closable = function(){
  return this.addClass('closable');
};

/**
 * Add class `name`.
 *
 * @param {String} name
 * @return {Dialog}
 * @api public
 */

Dialog.prototype.addClass = function(name){
  this._classes.add(name);
  return this;
};

/**
 * Set the effect to `type`.
 *
 * @param {String} type
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.effect = function(type){
  this._effect = type;
  this.addClass(type);
  return this;
};

/**
 * Make it modal!
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.modal = function(){
  this._overlay = overlay();
  return this;
};

/**
 * Add an overlay.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.overlay = function(opts){
  var self = this;
  opts = opts || { closable: true };
  var o = overlay(opts);
  o.on('hide', function(){
    self._overlay = null;
    self.hide();
  });
  this._overlay = o;
  return this;
};

/**
 * Close the dialog when the escape key is pressed.
 *
 * @api public
 */

Dialog.prototype.escapable = function(){
  var self = this;
  // Save reference to remove listener later
  self._escKeyCallback = self._escKeyCallback || function (e) {
    e.which = e.which || e.keyCode;
    if (27 !== e.which) return;
    self.emit('escape');
  };
  events.bind(document, 'keydown', self._escKeyCallback);
  return this;
};

/**
 * Fixed dialogs position can be manipulated through CSS.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.fixed = function(){
  this._fixed = true;
  return this;
}

/**
 * Show the dialog.
 *
 * Emits "show" event.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.show = function(){
  var overlay = this._overlay;
  var self = this;

  // overlay
  if (overlay) {
    overlay.show();
    this._classes.add('modal');
  }

  // escape
  if (!overlay || overlay.closable) this.escapable();

  // position
  document.body.appendChild(this.el);
  if (!this._fixed) {
    setTimeout(function() {
      self.el.style.marginLeft = -(self.el.offsetWidth / 2) + 'px'
    }, 0);
  }
  this._classes.remove('hide');
  this.emit('show');
  return this;
};

/**
 * Hide the overlay.
 *
 * @api private
 */

Dialog.prototype.hideOverlay = function(){
  if (!this._overlay) return;
  this._overlay.remove();
  this._overlay = null;
};

/**
 * Hide the dialog with optional delay of `ms`,
 * otherwise the dialog is removed immediately.
 *
 * Emits "hide" event.
 *
 * @return {Number} ms
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.hide = function(ms){
  var self = this;

  if (self._escKeyCallback) {
    events.unbind(document, 'keydown', self._escKeyCallback);
  }

  // prevent thrashing - this isn't used
  self.hiding = true;

  // duration
  if (ms) {
    setTimeout(function(){
      self.hide();
    }, ms);
    return self;
  }

  // hide / remove
  self._classes.add('hide');
  if (self._effect) {
    setTimeout(function(){
      self.remove();
    }, 500);
  } else {
    self.remove();
  }

  // overlay
  self.hideOverlay();

  return self;
};
/**
 * Hide the dialog without potential animation.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.remove = function(){
  if (this.el.parentNode) {
    this.emit('hide');
    this.el.parentNode.removeChild(this.el);
  }
  return this;
};

});

require.define("component~dialog@0.2.1/template.html", "<div id=\"dialog\" class=\"hide\">\n  <div class=\"content\">\n    <span class=\"title\">Title</span>\n    <a href=\"#\" class=\"close\">&times;<em>close</em></a>\n    <div class=\"body\">\n      <p>Message</p>\n    </div>\n  </div>\n</div>\n");

require.register("ui-component~mouse@0.0.1", function (exports, module) {

/**
 * dependencies.
 */

var emitter = require("component~emitter@1.1.1")
  , event = require("component~event@0.1.0");

/**
 * export `Mouse`
 */

module.exports = function(el, obj){
  return new Mouse(el, obj);
};

/**
 * initialize new `Mouse`.
 * 
 * @param {Element} el
 * @param {Object} obj
 */

function Mouse(el, obj){
  this.obj = obj || {};
  this.el = el;
}

/**
 * mixin emitter.
 */

emitter(Mouse.prototype);

/**
 * bind mouse.
 * 
 * @return {Mouse}
 */

Mouse.prototype.bind = function(){
  var obj = this.obj
    , self = this;

  // up
  function up(e){
    obj.onmouseup && obj.onmouseup(e);
    event.unbind(document, 'mousemove', move);
    event.unbind(document, 'mouseup', up);
    self.emit('up', e);
  }

  // move
  function move(e){
    obj.onmousemove && obj.onmousemove(e);
    self.emit('move', e);
  }

  // down
  self.down = function(e){
    obj.onmousedown && obj.onmousedown(e);
    event.bind(document, 'mouseup', up);
    event.bind(document, 'mousemove', move);
    self.emit('down', e);
  };

  // bind all.
  event.bind(this.el, 'mousedown', self.down);

  return this;
};

/**
 * unbind mouse.
 * 
 * @return {Mouse}
 */

Mouse.prototype.unbind = function(){
  event.unbind(this.el, 'mousedown', this.down);
  this.down = null;
};

});

require.register("component~matches-selector@0.1.4", function (exports, module) {
/**
 * Module dependencies.
 */

var query = require("component~query@0.0.1");

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

});

require.register("discore~closest@0.1.3", function (exports, module) {
var matches = require("component~matches-selector@0.1.4")

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? {parentNode: element} : element

  root = root || document

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector))
      return element
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root)
      return  
  }
}
});

require.register("component~delegate@0.2.2", function (exports, module) {
/**
 * Module dependencies.
 */

var closest = require("discore~closest@0.1.3")
  , event = require("component~event@0.1.0");

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};

});

require.register("component~events@1.0.8", function (exports, module) {

/**
 * Module dependencies.
 */

var events = require("component~event@0.1.4");
var delegate = require("component~delegate@0.2.2");

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

});

require.register("component~transform-property@0.0.1", function (exports, module) {

var styles = [
  'webkitTransform',
  'MozTransform',
  'msTransform',
  'OTransform',
  'transform'
];

var el = document.createElement('p');
var style;

for (var i = 0; i < styles.length; i++) {
  style = styles[i];
  if (null != el.style[style]) {
    module.exports = style;
    break;
  }
}

});

require.register("component~has-translate3d@0.0.3", function (exports, module) {

var prop = require("component~transform-property@0.0.1");

// IE <=8 doesn't have `getComputedStyle`
if (!prop || !window.getComputedStyle) {
  module.exports = false;

} else {
  var map = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  // from: https://gist.github.com/lorenzopolidori/3794226
  var el = document.createElement('div');
  el.style[prop] = 'translate3d(1px,1px,1px)';
  document.body.insertBefore(el, null);
  var val = getComputedStyle(el).getPropertyValue(map[prop]);
  document.body.removeChild(el);
  module.exports = null != val && val.length && 'none' != val;
}

});

require.register("component~translate@0.1.0", function (exports, module) {

/**
 * Module dependencies.
 */

var transform = require("component~transform-property@0.0.1");
var has3d = require("component~has-translate3d@0.0.3");


/**
 * Regexp to check "End with %"
 */

var percentRegexp = /%$/;


/**
 * Expose `translate`.
 */

module.exports = translate;


/**
 * Translate `el` by `(x, y)`.
 *
 * @param {Element} el
 * @param {Number|String} x
 * @param {Number|String} y 
 * @api public
 */


function translate(el, x, y){
  
  if (!percentRegexp.test(x)) x += 'px';
  if (!percentRegexp.test(y)) y += 'px';

  if (transform) {
    if (has3d) {
      el.style[transform] = 'translate3d(' + x + ', ' + y + ', 0)';
    } else {
      el.style[transform] = 'translate(' + x + ',' + y + ')';
    }
  } else {
    el.style.left = x;
    el.style.top = y;
  }
};

});

require.register("staygrimm~draggable@23989c3", function (exports, module) {

/**
 * dependencies.
 */

var emitter = require("component~emitter@1.1.1")
  , mouse = require("ui-component~mouse@0.0.1")
  , events = require("component~events@1.0.8")
  , translate = require("component~translate@0.1.0")
  , classes = require("component~classes@1.2.1");

/**
 * export `Draggable`.
 */

module.exports = function(el){
  return new Draggable(el);
};

/**
 * initialize new `Draggable`.
 *
 * @param {Element} el
 * @param {Object} opts
 */

function Draggable(el){
  this._xAxis = true;
  this._yAxis = true;
  this.el = el;
}

/**
 * mixins.
 */

emitter(Draggable.prototype);

/**
 * build draggable.
 *
 * @return {Draggable}
 */

Draggable.prototype.build = function(){
  var el = this._handle || this.el;
  this.touch = events(el, this);
  this.touch.bind('touchstart', 'onmousedown');
  this.touch.bind('touchmove', 'onmousemove');
  this.touch.bind('touchend', 'onmouseup');
  this.mouse = mouse(el, this);
  this.mouse.bind();
  return this;
};

/**
 * on-mousedown
 */

Draggable.prototype.onmousedown = function(e){
  e.preventDefault();
  if (e.touches) e = e.touches[0];
  var rect = this.rect = this.el.getBoundingClientRect();
  this.ox = rect.left - this.el.offsetLeft;
  this.oy = rect.top - this.el.offsetTop;
  this.x = e.pageX - rect.left;
  this.y = e.pageY - rect.top;
  classes(this.el).add('dragging');
  this.emit('start');
};

/**
 * on-mousemove
 */

Draggable.prototype.onmousemove = function(e){
  if (e.touches) e = e.touches[0];
  var styles = this.el.style
    , x = this._xAxis ? e.pageX - this.el.offsetLeft - this.x : this.ox
    , y = this._yAxis ? e.pageY - this.el.offsetTop - this.y : this.oy
    , rel = this.el
    , el
    , o;

  // support containment
  if (el = this._containment) {
    o = { y: y + rel.clientHeight };
    o.x = x + rel.clientWidth;
    o.height = el.clientHeight;
    o.width = el.clientWidth;
    o.h = o.height - rel.clientHeight;
    o.w = o.width - rel.clientWidth;
    if (0 >= x) x = 0;
    if (0 >= y) y = 0;
    if (o.y >= o.height) y = o.h;
    if (o.x >= o.width) x = o.w;
  }

  // move draggable.
  translate(this.el, x, y);

  // all done.
  this.emit('drag');
};

/**
 * on-mouseup
 */

Draggable.prototype.onmouseup = function(e){
  classes(this.el).remove('dragging');
  this.emit('end');
};

/**
 * destroy draggable.
 */

Draggable.prototype.destroy = function(){
  if (this.mouse) this.mouse.unbind();
  this.mouse = null;
  if (this.touch) this.touch.unbind();
  this.touch = null;
  return this;
};

/**
 * Disable x-axis movement.
 * @return {Draggable} 
 */

Draggable.prototype.disableXAxis = function(){
  this._xAxis = false;
  return this;
};

/**
 * Disable y-axis movement.
 * @return {Draggable}
 */

Draggable.prototype.disableYAxis = function(){
  this._yAxis = false;
  return this;
};

/**
 * Set a containment element.
 * @param  {Element} el 
 * @return {Draggable}    
 */

Draggable.prototype.containment = function(el){
  this._containment = el;
  return this;
};

/**
 * Set a handle.
 * @param  {Element} el 
 * @return {Draggable}    
 */

Draggable.prototype.handle = function(el){
  this._handle = el;
  return this;
};

});

require.register("draggable-dialog", function (exports, module) {
var Emitter = require("component-emitter"),
    classes = require("component~classes@1.2.1"),
    draggable = require("staygrimm~draggable@23989c3"),
    Dialog,
    closeHandler,
    emit;


closeHandler = function closeHandler() {
    this.hide();
};

/**
 * Return a new Dialog with given `element` 
 * and `options`.
 * 
 * @param {DOM Element||String} el DOM element to clone or string
 * @param {Object} options Options Object
 * @param {String} options.title Optional dialog title
 * @api public
 */
Dialog = function Dialog(el, options) {
    this.options = options || {};
    this.nodes = {};
    this.el = el;
    classes(el).add('DraggableDialog--hidden');

    this.render();
};

/**
 * Inherit from `Emitter.prototype`
 */
Emitter(Dialog.prototype);

/**
 * Render the dialog
 * @api public
 */
Dialog.prototype.render = function render() {
    var self = this,
        tempEl;

    this.docFragment = document.createDocumentFragment();

    this.nodes.containerDiv = document.createElement('div');
    this.nodes.titleClose = document.createElement('a');
    this.nodes.titleDiv = this.nodes.containerDiv.cloneNode();
    this.nodes.contentDiv = this.nodes.containerDiv.cloneNode();
    this.nodes.titleClose.innerHTML = '&times;<em>close</em>';

    if ('string' === typeof this.el) {
        this.nodes.contentDiv.innerHTML = this.el;
    } else {
        tempEl = this.el.cloneNode(true);
        classes(tempEl).remove('DraggableDialog--hidden');
        this.nodes.contentDiv.appendChild(tempEl);
    }

    if (this.options.title) {
        this.nodes.titleSpan = document.createElement('span');
        this.nodes.titleSpan.innerHTML = this.options.title;
        classes(this.nodes.titleSpan).add('DraggableDialog-title');

        this.nodes.titleDiv.appendChild(this.nodes.titleSpan);
        this.nodes.titleDiv.appendChild(this.nodes.titleClose);
    } else {
        this.nodes.titleDiv.appendChild(this.nodes.titleClose);
    }

    this.nodes.containerDiv.appendChild(this.nodes.titleDiv);
    this.nodes.containerDiv.appendChild(this.nodes.contentDiv);

    this.docFragment.appendChild(this.nodes.containerDiv);

    classes(this.nodes.containerDiv).add('DraggableDialog').add('DraggableDialog--hidden');
    classes(this.nodes.titleDiv).add('DraggableDialog-titleBar');
    classes(this.nodes.titleClose).add('DraggableDialog-closeButton');
    classes(this.nodes.contentDiv).add('DraggableDialog-content');

    this.nodes.titleClose.addEventListener('click', closeHandler.bind(self), false);

    this.draggable = draggable(this.nodes.containerDiv);

    this.draggable.build();
};

/**
 * Display the dialog
 * @api public
 */
Dialog.prototype.show = function show() {
    document.body.appendChild(this.docFragment);

    classes(this.nodes.containerDiv).remove('DraggableDialog--hidden');
    this.emit('show');
};

/**
 * Hide the dialog
 * @api public
 */
Dialog.prototype.hide = function hide() {
    classes(this.nodes.containerDiv).add('DraggableDialog--hidden');

    this.emit('hide');
};

/**
 * Destroy the dialog
 * @api public
 */
Dialog.prototype.remove = function remove() {
    if (this.draggable) {
        this.draggable.destroy()
    }
    this.nodes.titleClose.removeEventListener('click', closeHandler.bind(self), false);
    this.nodes.containerDiv.parentNode.removeChild(this.nodes.containerDiv);

    this.emit('remove');
};

module.exports = function (el, options) {
    return new Dialog(el, options);
};
});

if (typeof exports == "object") {
  module.exports = require("draggable-dialog");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("draggable-dialog"); });
} else {
  this["draggableDialog"] = require("draggable-dialog");
}
})()
