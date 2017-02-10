# Same Height

This library can be used to dynamically ensure all elements of a given CSS selector are rendered at the same height. On page-load all elements in the set are measured and the height of the biggest element is assigned to all elements. On a window resize (or orientation change on mobile) the heights are set to auto, measured again and then reset to accomodate any shift in layout caused by the change in window size. Resizing can be made conditional to a media rule/query.

Additional triggers can be added via [LayoutQueue](https://github.com/davejtoews/layout-queue).

##  Installation

Install via npm or yarn.

    npm install same-height

OR

	yarn add same-height

Then require this module within your javascript:

    var SameHeight = require('../SameHeight.js');

## Basic Use

The methods of SameHeight all use standard CSS selectors, (e.g. 'p', '.class', '#id'). To assign a group of elements to have the same height use `init()`:

    SameHeight.init(selector);

A media rule/query (e.g. `"screen and (min-width: 700px)"`, or `"(max-width: 40em)"`) can be added as a second parameter if it is to be applied conditionally.

    SameHeight.init(selector, mediaRule);

This will add resizing the elements to a queue of tasks that will be executed on window load and window resize in the order which they have been added. If a media rule is provided the heights will be unset when the media rule condition is not met. 

## Advanced use

To manually unset the height of a group of elements use `unset()`:

	SameHeight.unset(selector);

To manually set the height of a group of elements use 'set()';

    SameHeight.set(selector);

To add additional triggers for the execution of the queue see the documentation for [LayoutQueue](https://github.com/davejtoews/layout-queue);