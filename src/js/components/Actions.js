export default class Actions {
	constructor(store) {
		this.store = store;
	}

	addItem(noteData) {
		this.store.addItem(noteData);
	}

	saveNoteChanges(id, newValue, prop) {
		const existingItem = this.store.findItem(id);

		const newItem = {
			...existingItem,
			[prop]: newValue,
		};

		this.store.updateItem(newItem);
	}

	removeNote(id) {
		this.store.removeItem(id);
	}

	removeAll() {
		this.store.removeAll();
	}

	removeCompleted() {
		this.store.removeCompleted();
	}

	setAllIncompleted() {
		this.store.setCompleteStatus('incomplete');
	}

	setAllCompleted() {
		this.store.setCompleteStatus('complete');
	}

	setNoteComplete(id) {
		const existingItem = this.store.findItem(id);
		existingItem.isCompleted = true;
		this.store.updateItem(existingItem);
	}

	getItemsCount() {
		return this.store.getItemsCount();
	}

	setTheme(themeName) {
		this.store.setTheme(themeName);
	}

	getTheme() {
		return this.store.getTheme('Theme');
	}

	toggleCompleteStatus(id, completedOptions = []) {
		const existingItem = this.store.findItem(id);

		if (!existingItem.options) {
			existingItem.isCompleted = !existingItem.isCompleted;
			this.store.updateItem(existingItem);
			return;
		}

		existingItem.options = existingItem.options.map((op) => {
			const shouldUpdate = completedOptions.includes(op.id);

			if (shouldUpdate) {
				op.isCompleted = true;
				return op;
			}

			op.isCompleted = false;
			return op;
		});

		if (completedOptions.length === existingItem.options.length) {
			existingItem.isCompleted = true;
		} else {
			existingItem.isCompleted = false;
		}

		this.store.updateItem(existingItem);
	}
}
