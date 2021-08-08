export default class Actions {
	constructor(store, UI) {
		this.store = store;
		this.ui = UI;

		this.ui.submitFormHandler(this.addItem.bind(this));
		this.ui.editNoteSave(this.saveNoteChanges.bind(this));
		this.ui.toggleCompleteStatusHandler(this.toggleCompleteStatus.bind(this));
		this.ui.renderNotes(this.store.getLocalStorage());
		this.ui.editMenuHandler({
			removeAll: this.removeAll.bind(this),
			removeCompleted: this.removeCompleted.bind(this),
			setAllIncompleted: this.setAllIncompleted.bind(this),
			setAllCompleted: this.setAllCompleted.bind(this),
		});
		this.ui.contextMenuHandler({
			removeNote: this.removeNote.bind(this),
			setNoteComplete: this.toggleCompleteStatus.bind(this),
		});
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

	toggleCompleteStatus(id, completedOptions) {
		const existingItem = this.store.findItem(id);

		if (completedOptions.length < 1) {
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
