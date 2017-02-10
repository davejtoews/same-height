require('jsdom-global')();
var assert = require('chai').assert;
var SameHeight = require('../SameHeight.js');

describe('sameHeight', function() {
	document.body.innerHTML = '<div><p>Hello</p></div><div><h1>Hello</h1><p>Hello</p></div>';
	
	var divs = document.querySelectorAll('div');

	it('should set height', function() {
		divs[0].clientHeight = 10;
		divs[1].clientHeight = 20;
		SameHeight.set('div');

		assert.equal(document.body.innerHTML, '<div style="height: 20px;"><p>Hello</p></div><div style="height: 20px;"><h1>Hello</h1><p>Hello</p></div>');		
	});
	it('should unset height', function() {
		SameHeight.unset('div');
		assert.equal(document.body.innerHTML, '<div style="height: auto;"><p>Hello</p></div><div style="height: auto;"><h1>Hello</h1><p>Hello</p></div>');		
	});
	it('should set height on resize when no media query', function() {
		window.matchMedia = function() {
		    return {
		        matches : false,
		        addListener : function() {},
		        removeListener: function() {}
		    };
		};

		SameHeight.init('div');
		divs[0].clientHeight = 40;
		divs[1].clientHeight = 20;
		window.dispatchEvent(new Event('resize'));

		assert.equal(document.body.innerHTML, '<div style="height: 40px;"><p>Hello</p></div><div style="height: 40px;"><h1>Hello</h1><p>Hello</p></div>');		
	});
	it('should set height on resize when matches media query', function() {
		window.matchMedia = function() {
		    return {
		        matches : true,
		        addListener : function() {},
		        removeListener: function() {}
		    };
		};

		SameHeight.init('div', "(min-width: 400px)");
		divs[0].clientHeight = 30;
		divs[1].clientHeight = 10;
		window.dispatchEvent(new Event('resize'));

		assert.equal(document.body.innerHTML, '<div style="height: 30px;"><p>Hello</p></div><div style="height: 30px;"><h1>Hello</h1><p>Hello</p></div>');		
	});
	it('should unset height on resize when does not match media query', function() {
		window.matchMedia = function() {
		    return {
		        matches : false,
		        addListener : function() {},
		        removeListener: function() {}
		    };
		};

		SameHeight.init('div', "(min-width: 400px)");
		divs[0].clientHeight = 25;
		divs[1].clientHeight = 20;
		window.dispatchEvent(new Event('resize'));

		assert.equal(document.body.innerHTML, '<div style="height: auto;"><p>Hello</p></div><div style="height: auto;"><h1>Hello</h1><p>Hello</p></div>');
	});

});