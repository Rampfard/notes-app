export default class Store {
	constructor(name) {
		this.name = name;
		this.store = window.localStorage;
		this.items;
	}

	getLocalStorage() {
		return this.items || JSON.parse(this.store.getItem(this.name) || '[]');
	}

	setLocalStorage(newItems) {
		this.store.setItem(this.name, JSON.stringify((this.items = newItems)));
	}

	setTheme(themeName) {
		this.store.setItem('Theme', themeName);
	}

	getTheme() {
		return this.store.getItem('Theme');
	}

	updateItem(newItem) {
		const id = newItem.id;
		const storeItems = this.getLocalStorage();

		const newItems = storeItems.map((item) => {
			if (item.id !== id) {
				return item;
			}

			return newItem;
		});

		this.setLocalStorage(newItems);
	}

	findItem(id) {
		const storeItems = this.getLocalStorage();
		return storeItems.find((item) => item.id === id);
	}

	addItem(item) {
		const storeItems = this.getLocalStorage();
		storeItems.push(item);
		this.setLocalStorage(storeItems);
	}

	removeItem(id) {
		const storeItems = this.getLocalStorage();
		const updatedStoreItems = storeItems.filter((item) => item.id !== id);
		this.setLocalStorage(updatedStoreItems);
	}

	removeAll() {
		this.setLocalStorage([]);
	}

	removeCompleted() {
		const storeItems = this.getLocalStorage();

		if (storeItems.length < 1) {
			return;
		}

		const updatedItems = storeItems.filter((item) => !item.isCompleted);
		this.setLocalStorage(updatedItems);
	}

	setCompleteStatus(status) {
		let completeStatus;
		const storeItems = this.getLocalStorage();

		if (status === 'complete') {
			completeStatus = true;
		} else {
			completeStatus = false;
		}

		if (storeItems.length < 1) {
			return;
		}

		const updatedItems = storeItems.map((item) => {
			item.isCompleted = completeStatus;

			if (item.options) {
				item.options.forEach((opt) => (opt.isCompleted = completeStatus));
			}

			return item;
		});

		this.setLocalStorage(updatedItems);
	}

	getItemsCount() {
		const storeItems = this.getLocalStorage();
		const completedNotes = storeItems.filter((item) => item.isCompleted).length;

		return {
			notesQuantity: storeItems.length,
			completedNotesQuantity: completedNotes,
		};
	}
}
