export const getEl = (selector, parent = document) => {
	return parent.querySelector(selector);
};

export const getElements = (selector, parent = document) => {
	return parent.querySelectorAll(selector);
};

export const createElement = (tag) => {
	return document.createElement(tag);
};

export const connectEvent = (target, type, handler, capture) => {
	target.addEventListener(type, handler, !!capture);
};

export const delegate = (target, selector, type, handler, capture) => {
	const dispatchEvent = (e) => {
		if (e.target.closest(selector)) {
			handler.call(e.target, e);
		}
	};

	connectEvent(target, type, dispatchEvent, !!capture);
};
