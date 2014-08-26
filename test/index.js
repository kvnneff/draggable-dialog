describe('DraggableDialog', function () {
	var assert = require('component/assert');
	var trigger = require('ianstormtaylor/trigger-event');
	var dom = require('component/dom');
	var draggable = require('../index');
	var el = document.createElement('div');
	var invalidEl = {};
	var tempDraggable;

	el.id = 'draggable';
	el.innerText = 'dialog';

	describe('draggable(el, options)', function () {
		it('should return a new draggable dialog', function () {
			assert(draggable(el) != draggable(el));
		});

		it('should return an error if invalid `el`', function () {
			tempDraggable = draggable(invalidEl)
			assert(tempDraggable.message === 'Not a suitable element');
		});

		it('should set dialog title', function () {
			tempDraggable = draggable(el, {title: 'Foo'});
			assert(tempDraggable.nodes.titleSpan.innerHTML === 'Foo');
		});

		it('should emit `click` event', function () {
			tempDraggable.on('click', function () {
				assert(true);
			});

			trigger(tempDraggable.nodes.containerDiv, 'click');
		});
		
	});

	describe('draggable#render', function () {
		it('should render the dialog', function () {
			tempDraggable.options.title = 'Bar';
			tempDraggable.render();
			assert(tempDraggable.nodes.titleSpan.innerHTML === 'Bar');
		})
	})

	describe('draggable#show', function () {
		it('should emit `show`', function () {
			tempDraggable.on('show', function () {
				assert(true);
			});
		});

		it('should display the dialog', function () {
			tempDraggable.show();
			assert(document.querySelector('#draggable') === el);
		});
	});

	describe('draggable#hide', function () {
		it('should emit `hide`', function () {
			tempDraggable.on('hide', function () {
				assert(true);
			});
		});

		it('should add class `DraggableDialog--hidden`', function () {
			tempDraggable.hide();
			assert(dom(tempDraggable.nodes.containerDiv).hasClass('DraggableDialog--hidden'));
		});
	});

	describe('draggable#addClass', function () {
		it('should add a class', function () {
			tempDraggable.addClass('Baz');
			assert(dom(tempDraggable.nodes.containerDiv).hasClass('Baz'));
		});
	});

	describe('draggable#active', function () {
		it('should add class `DraggableDialog--active`', function () {
			dom(tempDraggable.nodes.containerDiv).removeClass('DraggableDialog--active');
			tempDraggable.active();
			assert(dom(tempDraggable.nodes.containerDiv).hasClass('DraggableDialog--active'));
		});
	});

	describe('draggable#remove', function () {
		it('should emit `remove`', function () {
			tempDraggable.on('remove', function () {
				assert(true);
			});
		});

		it('should remove the dialog from the dom', function () {
			tempDraggable.remove();
			assert(dom('.DraggableDialog').length === 0);
		});
	});
});