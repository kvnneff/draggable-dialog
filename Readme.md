draggable-dialog
===

A simple draggable dialog box.

Live demo is [here](http://staygrimm.github.io/draggable-dialog).

Installation
===

    $ component install staygrimm/draggable-dialog

Features
===
* events for composition
* structural CSS with minimal default styling

Events
===

* `show` the dialog is shown
* `hide` the dialog is hidden
* `remove` the dialog is destroyed
* `start` the dialog is beginning to move
* `drag` the dialog is being dragged
* `end` the dialog has stopped moving

API
===
draggable(el, [options])
---

Create a new draggable dialog using `el` and optional `options` object.  `el` may be a DOM element or a string (e.g. `"<p>Click <a href="#">here</a> to view your status.</p>"`).

Options may include a property `title` which will be displayed in the title bar of the draggable dialog.

Draggable#show()
===

Display the dialog.

Draggable#hide()
===

Hide the dialog

Draggable#remove()
===

Destroy the dialog, removing it from the DOM completely.





License
---
(The MIT License)

Copyright (c) 2013 River Grimm river.grimm@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
