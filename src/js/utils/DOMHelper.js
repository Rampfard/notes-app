export default class DOMHelper {
	static getEl(selector, parent = document) {
		return parent.querySelector(selector);
	}

	static getElements(selector, parent = document) {
		return parent.querySelectorAll(selector);
	}

	static connectEvent(target, type, callback, capture) {
		target.addEventListener(type, callback, !!capture);
	}

	// static delegateEvent(target, type, selector) {}
}

export function getEl(selector, parent = document) {
	return parent.querySelector(selector);
}

export function getElements(selector, parent = document) {
	return parent.querySelectorAll(selector);
}

export function connectEvent(target, type, handler, capture) {
	target.addEventListener(type, handler, !!capture);
}

export function delegate(target, selector, type, handler, capture) {
	const dispatchEvent = (e) => {
		if (e.target.closest(selector)) {
			handler.call(e.target, e);
		}
	};

	connectEvent(target, type, dispatchEvent, !!capture);
}
