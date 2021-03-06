var Emitter = require('emitter'),
    classes = require('classes'),
    draggable = require('draggable'),
    mouse = require('mouse'),
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
    if (!(this instanceof Dialog)) return new Dialog(el, options);

    this.options = options || {};
    this.nodes = {};
    this.el = el;

    if (!this.el || !this.el.tagName) {
        return new Error('Not a suitable element');
    }
    
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
        // tempEl = this.el.cloneNode(true);
        // classes(tempEl).remove('DraggableDialog--hidden');
        classes(this.el).remove('DraggableDialog--hidden');
        this.nodes.contentDiv.appendChild(this.el);
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

    this.mouse = mouse(this.nodes.containerDiv, this);
    this.mouse.bind();

    this.draggable = draggable(this.nodes.containerDiv);

    if (this.options.title) {
        this.draggable.handle(this.nodes.titleDiv);
    }

    this.draggable.on('drag', function () {
        self.emit('drag');
    }); 

    this.draggable.on('start', function () {
        self.emit('start');
    }); 

    this.draggable.on('end', function () {
        self.emit('end');
    }); 

    this.draggable.build();
};

/**
 * Display the dialog
 * @api public
 */
Dialog.prototype.show = function show() {
    document.body.appendChild(this.docFragment);

    classes(this.nodes.containerDiv).remove('DraggableDialog--hidden');

    this.active();
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

/**
 * on-mousedown
 */
Dialog.prototype.onmousedown = function onmousedown() {
    this.active();

    this.emit('click');
};

/**
 * Add class `name`
 * @param {String} name
 * @api public
 */

Dialog.prototype.addClass = function addClass(name) {
    classes(this.nodes.containerDiv).add(name);
};

/**
 * Make this dialog active
 * @api public
 */
Dialog.prototype.active = function active() {
    var draggables = document.getElementsByClassName('DraggableDialog'),
        arr = [],
        l;
        
    arr = Array.prototype.slice.call(draggables);
    i = arr.length;

    while (i--) {
        classes(arr[i]).add('DraggableDialog--inactive');
    }

    classes(this.nodes.containerDiv).remove('DraggableDialog--inactive').add('DraggableDialog--active');
};

module.exports = function (el, options) {
    return new Dialog(el, options);
};
