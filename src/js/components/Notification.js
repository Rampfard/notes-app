import { createElement } from '../utils/DOMHelpers';

export default class Notification {
	constructor(description, type) {
		this.type = type;
		this.description = description;
	}

	createNotification() {
		const notification = createElement('div');
		notification.classList.add('notification');

		if (this.type) {
			notification.classList.add(this.type);
		}

		notification.innerText = this.description;

		return notification;
	}
}
