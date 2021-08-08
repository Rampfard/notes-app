import { getEl, getElements, delegate } from '../utils/DOMHelper';

export default class UI {
	constructor(noteTemplate, formInstance) {
		this.noteTemplate = noteTemplate;
		this.formInstance = formInstance;
		this.noteList = getEl('.notes');
		this.tabs = getEl('.notes-tabs');
		this.createBtn = getEl('#create-note');
		this.settingsBtn = getEl('#settings-btn');
		this.searchInput = getEl('#search');
		this.form = getEl('#form');
		this.editMenu = getEl('.header__edit');
		this.tabs = getEl('.notes-tabs');
		this.isContextMenuActive = false;
		this.isEditMenuActive = false;

		this.connectSearchHandler();
		this.connectCreateBtn();
		this.connectTabsHandler();
		this.connectNoteEditHandler();
		this.connectBodyClickHandler();
	}

	createNote(formData) {
		if (!formData) {
			return;
		}

		const newNote = this.noteTemplate.createNote(formData);
		this.noteList.insertAdjacentElement('afterbegin', newNote);
	}

	editNote(target) {
		target.classList.add('editing');

		const textarea = document.createElement('textarea');
		textarea.classList.add('input', 'form-input', 'edit');

		textarea.value = target.innerText;
		target.appendChild(textarea);
		textarea.focus();
	}

	editNoteFinished(id, contentEl) {
		const note = getEl(`#${id}`);
		const textarea = getEl('textarea', note);

		contentEl.innerText = textarea.value;

		contentEl.classList.remove('editing');
		textarea.remove();
	}

	setNotesActiveStatus(id) {
		getElements('.note', this.noteList).forEach((note) => {
			if (id && note.id !== id) {
				return;
			}
			note.classList.add('completed');

			getElements('.note-option').forEach((opt) =>
				opt.classList.add('completed')
			);
		});
	}

	setNotesInactiveStatus(id) {
		getElements('.note', this.noteList).forEach((note) => {
			if (id && note.id !== id) {
				return;
			}
			note.classList.remove('completed');

			getElements('.note-option').forEach((opt) =>
				opt.classList.remove('completed')
			);
		});
	}

	filterNotesByType(type) {
		const notes = getElements('.note', this.noteList);

		notes.forEach((note) => {
			const noteType = note.dataset.type;

			if (type === 'all') {
				note.classList.remove('hide');
				return;
			}

			if (type === 'completed' && note.classList.contains(type)) {
				note.classList.remove('hide');
				return;
			}

			if (noteType !== type) {
				note.classList.add('hide');
			} else {
				note.classList.remove('hide');
			}
		});
	}

	createContextMenu(e) {
		const menu = document.createElement('div');
		menu.classList.add('context-menu');

		menu.innerHTML = `
			<button class="btn context-menu__btn" id="delete-note-btn" type="button">Remove Note</button>
			<button class="btn context-menu__btn" id="expand-note-btn" type="button">Expand Note</button>
			<button class="btn context-menu__btn" id="complete-note-btn" type="button">Mark as Complete</button>
			<button class="btn context-menu__btn" id="copy-description-btn" type="button">Copy Description</button>
		`;

		const y = e.clientY;
		const x = e.clientX;

		const menuTop = e.target.closest('.note').getBoundingClientRect().top;
		const menuLeft = e.target.closest('.note').getBoundingClientRect().left;

		const yInside = y - menuTop;
		const xInside = x - menuLeft;

		menu.style.top = `${yInside}px`;
		menu.style.left = `${xInside}px`;

		return menu;
	}

	// bind events to DOM elements

	connectSearchHandler() {
		this.searchInput.addEventListener('input', (e) => {
			getElements('.note', this.noteList).forEach((note) => {
				const searchValue = e.target.value.trim();
				const title = getEl('.note__title', note).textContent.trim();

				if (!title.toLowerCase().includes(searchValue.toLowerCase())) {
					note.classList.add('hide');
				} else {
					note.classList.remove('hide');
				}
			});
		});
	}

	connectCreateBtn() {
		this.createBtn.addEventListener('click', (e) => {
			this.form.classList.toggle('shown');
		});
	}

	connectEditBtn() {
		this.editBtn.addEventListener('click', (e) => {
			this.editBtn.classList.toggle('active');
			this.editBtn.nextElementSibling.classList.toggle('active');
		});
	}

	connectTabsHandler() {
		this.tabs.addEventListener('click', (e) => {
			const target = e.target;
			if (target.closest('.notes-tab')) {
				getElements('.notes-tab').forEach((tab) =>
					tab.classList.remove('active')
				);

				target.classList.add('active');

				const type = target.dataset.type;

				this.filterNotesByType(type);
			}
		});
	}

	connectNoteEditHandler() {
		this.noteList.addEventListener('dblclick', (e) => {
			const target = e.target;

			if (target.closest('.note')) {
				if (
					target.classList.contains('note__description') ||
					target.classList.contains('note__title')
				) {
					this.editNote(e.target);
				}
			}
		});
	}

	connectBodyClickHandler() {
		document.body.addEventListener('click', (e) => {
			if (this.isContextMenuActive && !e.target.closest('.context-menu')) {
				getEl('.context-menu').remove();
				this.isContextMenuActive = false;
			}

			if (!e.target.closest('.header__edit')) {
				getEl('.header__edit').classList.remove('active');
			}
		});
	}

	// get Handler Function from Actions class and calls bind event to DOM elements from it

	contextMenuHandler(handlers) {
		this.noteList.addEventListener('contextmenu', (e) => {
			e.preventDefault();

			const { removeNote, setNoteComplete } = handlers;
			const target = e.target;

			let note;
			let noteId;

			if (target.closest('.note') && !target.closest('.context-menu')) {
				note = target.closest('.note');
				noteId = note.id;

				if (this.isContextMenuActive) {
					getEl('.context-menu').remove();
					this.contextMenu = this.createContextMenu(e);
					target.closest('.note').append(this.contextMenu);
				} else {
					this.contextMenu = this.createContextMenu(e);
					target.closest('.note').append(this.contextMenu);
					this.isContextMenuActive = true;
				}
			}

			if (this.contextMenu) {
				this.contextMenu.addEventListener('click', (e) => {
					switch (e.target.id) {
						case 'delete-note-btn':
							removeNote(noteId);
							note.remove();
							this.isContextMenuActive = false;
							break;
						case 'expand-note-btn':
							break;
						case 'complete-note-btn':
							const options = [...getElements('.option', note)].map(
								(op) => op.id
							);
							setNoteComplete(noteId, options);
							this.setNotesActiveStatus(noteId);
							break;
						case 'copy-description-btn':
							break;
					}
				});
			}
		});
	}

	editMenuHandler(handlers) {
		const { removeAll, removeCompleted, setAllIncompleted, setAllCompleted } =
			handlers;

		this.editMenu.addEventListener('click', (e) => {
			const target = e.target;

			switch (target.id) {
				case 'edit-btn': {
					target.parentNode.classList.toggle('active');
					this.isEditMenuActive = true;
					break;
				}
				case 'remove-all-btn': {
					removeAll();
					this.noteList.innerHTML = '';
					break;
				}
				case 'remove-completed-btn': {
					removeCompleted();
					getElements('.note', this.noteList).forEach((note) => {
						if (note.classList.contains('completed')) {
							note.remove();
						}
					});
					break;
				}
				case 'mark-notes-btn': {
					if (target.dataset.complete === 'false') {
						setAllCompleted();
						this.setNotesActiveStatus();
						target.dataset.complete = true;

						target.innerText = 'Mark all as incompleted';
					} else {
						setAllIncompleted();
						this.setNotesInactiveStatus();
						target.dataset.complete = false;

						target.innerText = 'Mark all as completed';
					}
					break;
				}
			}
		});
	}

	submitFormHandler(handler) {
		this.formInstance.form.addEventListener('submit', (e) => {
			e.preventDefault();

			const formData = this.formInstance.getFormData();

			if (!formData) {
				return;
			}

			this.createNote(formData);
			handler(formData);

			this.form.classList.remove('shown');
		});
	}

	toggleCompleteStatusHandler(handler) {
		this.noteList.addEventListener('click', (e) => {
			if (!e.target.closest('.note')) {
				return;
			}

			const target = e.target.closest('.note-option');
			const id = e.target.closest('.note').id;

			if (target) {
				const allOptions = getElements('.note-option', target.parentNode);
				target.classList.toggle('completed');

				const completedOptions = getElements(
					'.note-option.completed',
					target.parentNode
				);

				if (completedOptions.length === allOptions.length) {
					target.closest('.note').classList.add('completed');
				} else {
					target.closest('.note').classList.remove('completed');
				}

				const completedIds = [...completedOptions].map((op) => op.id);

				handler(id, completedIds);
			}
		});
	}

	editNoteSave(handler) {
		this.noteList.addEventListener(
			'blur',
			(e) => {
				const id = e.target.closest('.note').id;
				const newValue = e.target.value;

				if (newValue.trim() === '') {
					return;
				}

				if (e.target.closest('.note__title')) {
					handler(id, newValue, 'title');
					this.editNoteFinished(id, e.target.parentNode);
				} else {
					handler(id, newValue, 'description');
					this.editNoteFinished(id, e.target.parentNode);
				}
			},
			true
		);

		this.noteList.addEventListener('keypress', (e) => {
			if (e.keyCode === 13) {
				e.target.blur();
			}
		});
	}

	// first render

	renderNotes(store) {
		if (store.length > 0) {
			this.noteList.innerHTML = '';
			store.forEach((itemData) => {
				this.createNote(itemData);
			});
		}
	}
}
