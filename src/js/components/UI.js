import Notification from './Notification';
import { getEl, getElements, createElement } from '../utils/DOMHelper';
export default class UI {
	constructor(noteTemplate, formInstance, actions) {
		this.actions = actions;
		this.noteTemplate = noteTemplate;
		this.formInstance = formInstance;
		this.mainSection = getEl('.main');
		this.noteList = getEl('.notes');
		this.tabs = getEl('.notes-tabs');
		this.createNoteBtn = getEl('#create-note');
		this.settingsBtn = getEl('#settings-btn');
		this.searchInput = getEl('#search-input');
		this.form = getEl('#form');
		this.editMenu = getEl('.header__edit');
		this.tabs = getEl('.notes-tabs');
		this.notifications = getEl('#notifications');
		this.backdrop = getEl('.backdrop');
		this.contextMenuTemplate = getEl('#context-menu-template');
		this.noteDetail = getEl('#note-detail');

		this.bindEventsToElements();
	}

	createNote(formData) {
		if (!formData) {
			return;
		}

		const newNote = this.noteTemplate.createNote(formData);
		this.noteList.insertAdjacentElement('afterbegin', newNote);
	}

	createNotification(type, description) {
		const notification = new Notification(
			type,
			description
		).createNotification();

		this.notifications.append(notification);

		setTimeout(() => {
			notification.remove();
		}, 4000);
	}

	editNoteHandler(e) {
		const target = e.target;

		if (
			target.closest('.note') &&
			(target.classList.contains('note__description') ||
				target.classList.contains('note__title'))
		) {
			target.classList.add('editing');

			const textarea = createElement('textarea');
			textarea.classList.add('input', 'form-input', 'edit');

			textarea.value = target.innerText;
			target.appendChild(textarea);
			textarea.focus();
		}
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

			getElements('.note-option', note).forEach((opt) =>
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

			getElements('.note-option', note).forEach((opt) =>
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

	createContextMenu(e, note) {
		const contextMenuTemplate =
			this.contextMenuTemplate.content.firstElementChild;
		const contextMenu = contextMenuTemplate.cloneNode(true);

		if (note.dataset.type === 'todo') {
			getEl('#copy-description-btn', contextMenu).remove();
		}

		const y = e.clientY;
		const x = e.clientX;

		const noteRect = note.getBoundingClientRect();

		let yInside = y - noteRect.top;
		let xInside = x - noteRect.left;

		if (x > document.documentElement.getBoundingClientRect().width / 2) {
			xInside -= note.clientWidth / 2;
		}

		contextMenu.style.top = `${yInside}px`;
		contextMenu.style.left = `${xInside}px`;

		contextMenu.addEventListener(
			'click',
			(e) => {
				this.contextMenuHandler(e, note);
			},
			true
		);

		this.contextMenu = contextMenu;
		note.append(contextMenu);
	}

	contextMenuHandler(e, note) {
		const noteId = note.id;

		switch (e.target.closest('button').id) {
			case 'delete-note-btn':
				this.actions.removeNote(noteId);
				note.remove();
				this.isContextMenuActive = false;
				break;
			case 'choose-text-btn':
				this.contextMenu.remove();
				this.chooseNoteText(noteId);
				break;
			case 'complete-note-btn':
				if (note.classList.contains('completed')) {
					note.classList.remove('completed');
					this.actions.toggleCompleteStatus(noteId);
					this.setNotesInactiveStatus(noteId);
				} else {
					const options = [...getElements('.note-option', note)].map(
						(op) => op.id
					);
					this.actions.toggleCompleteStatus(noteId, options);
					this.setNotesActiveStatus(noteId);
				}
				break;
			case 'copy-description-btn':
				this.contextMenu.remove();
				navigator.clipboard.writeText(getEl('.note__description').textContent);
				this.createNotification('Description copied!');
				break;
			case 'copy-title-btn':
				this.contextMenu.remove();
				navigator.clipboard.writeText(getEl('.note__title').textContent);
				this.createNotification('Title copied!');
				break;
		}
	}

	editMenuHandler(e) {
		const target = e.target;

		switch (target.id) {
			case 'edit-btn': {
				target.parentNode.classList.toggle('active');
				break;
			}
			case 'remove-all-btn': {
				this.actions.removeAll();
				this.noteList.innerHTML = '';
				this.createNotification('All notes removed', 'succsess');
				break;
			}
			case 'remove-completed-btn': {
				this.actions.removeCompleted();
				getElements('.note', this.noteList).forEach((note) => {
					if (note.classList.contains('completed')) {
						note.remove();
					}
				});
				this.createNotification('All completed notes removed', 'succsess');
				break;
			}
			case 'mark-notes-btn': {
				if (target.dataset.complete === 'false') {
					this.actions.setAllCompleted();
					this.setNotesActiveStatus();
					target.dataset.complete = true;

					target.innerText = 'Mark all as incompleted';
				} else {
					this.actions.setAllIncompleted();
					this.setNotesInactiveStatus();
					target.dataset.complete = false;

					target.innerText = 'Mark all as completed';
					break;
				}
			}
		}
	}

	chooseNoteText(id) {
		const note = getEl(`#${id}`);

		this.noteDetail.innerHTML = '';

		const noteClone = note.cloneNode(true);
		this.noteDetail.appendChild(noteClone);

		flipNotes(note, noteClone, () => {
			this.mainSection.dataset.state = 'detail';
			note.style.opacity = 0;
		});

		const revert = (e) => {
			if (!e.target.classList.contains('note-detail')) {
				return;
			}
			flipNotes(noteClone, note, () => {
				this.mainSection.dataset.state = 'gallery';
				note.style.opacity = '';
				noteClone.remove();
				this.noteDetail.removeEventListener('click', revert);
			});
		};

		this.noteDetail.addEventListener('click', revert);

		function flipNotes(firstEl, lastEl, change) {
			const firstRect = firstEl.getBoundingClientRect();
			const lastRect = lastEl.getBoundingClientRect();

			const deltaX = firstRect.left - lastRect.left;
			const deltaY = firstRect.top - lastRect.top;
			const deltaW = firstRect.width / lastRect.width;
			const deltaH = firstRect.height / lastRect.height;

			change();

			lastEl.animate(
				[
					{
						transform: `translateX(${deltaX}px) translateY(${deltaY}px) scaleX(${deltaW}) scaleY(${deltaH})`,
					},
					{
						transform: 'none',
					},
				],
				{
					duration: 600,
					easing: 'cubic-bezier(0.2, 0, 0.3, 1)',
				}
			);
		}
	}

	settingsMenuHandler(e) {
		const target = e.target;

		switch (target.id) {
			case 'change-theme-btn':
				document.body.classList.toggle('dray-theme');
		}
	}

	// bind events to DOM elements

	connectSettingsBtn() {
		this.settingsBtn.addEventListener('click', (e) => {
			this.settingsMenuHandler(e);
		});
	}

	connectContextMenu() {
		this.noteList.addEventListener('contextmenu', (e) => {
			e.preventDefault();

			const target = e.target;

			if (target.closest('.context-menu')) {
				return;
			}

			if (target.closest('.note') && !target.closest('.context-menu')) {
				const note = target.closest('.note');

				if (this.contextMenu) {
					this.contextMenu.remove();
				}

				this.createContextMenu(e, note);
			}
		});
	}

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

	connectShowFormBtn() {
		this.createNoteBtn.addEventListener('click', () => {
			this.form.classList.add('shown');
			this.backdrop.classList.add('shown');
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

	connectDoubleClickToNoteList() {
		this.noteList.addEventListener('dblclick', (e) => {
			this.editNoteHandler(e);
		});
	}

	connectBodyClickHandler() {
		document.body.addEventListener('click', (e) => {
			if (this.contextMenu && !e.target.closest('.context-menu')) {
				this.contextMenu.remove();
			}

			if (!e.target.closest('.header__edit')) {
				getEl('.header__edit').classList.remove('active');
			}

			if (e.target.classList.contains('backdrop')) {
				this.backdrop.classList.remove('shown');
				this.form.classList.remove('shown');
			}
		});
	}

	connectEditMenu() {
		this.editMenu.addEventListener('click', (e) => {
			const { notesQuantity } = this.actions.getItemsCount();

			if (notesQuantity < 1) {
				this.editMenu.classList.add('edit-disabled');
			} else {
				this.editMenu.classList.remove('edit-disabled');
			}

			this.editMenuHandler(e);
		});
	}

	connectSubmitFormHandler() {
		this.formInstance.form.addEventListener('submit', (e) => {
			e.preventDefault();

			const formData = this.formInstance.getFormData();

			if (!formData) {
				return;
			}

			this.createNote(formData);
			this.actions.addItem(formData);

			this.form.classList.remove('shown');
			this.backdrop.classList.remove('shown');

			this.createNotification(`${formData.type} created!`, 'success');
		});
	}

	connectToggleCompleteStatusHandler() {
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

				this.actions.toggleCompleteStatus(id, completedIds);
			}
		});
	}

	connectEditNoteSaveHandler() {
		this.noteList.addEventListener(
			'blur',
			(e) => {
				const id = e.target.closest('.note').id;
				const newValue = e.target.value;

				if (newValue.trim() === '') {
					return;
				}

				if (e.target.closest('.note__title')) {
					this.actions.saveNoteChanges(id, newValue, 'title');
					this.editNoteFinished(id, e.target.parentNode);
				} else {
					this.actions.saveNoteChanges(id, newValue, 'description');
					this.editNoteFinished(id, e.target.parentNode);
				}
			},
			true
		);
	}

	connectEditNoteCancel() {
		this.noteList.addEventListener('keyup', (e) => {
			const target = e.target;

			if (e.keyCode === 27) {
				target.value = target.parentNode.textContent.trim();
				target.blur();
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

	bindEventsToElements() {
		this.connectBodyClickHandler();
		this.connectSearchHandler();
		this.connectTabsHandler();
		this.connectDoubleClickToNoteList();
		this.connectToggleCompleteStatusHandler();
		this.connectContextMenu();
		this.connectEditMenu();
		this.connectEditNoteSaveHandler();
		this.connectEditNoteCancel();
		this.connectSubmitFormHandler();
		this.connectShowFormBtn();
		this.connectSettingsBtn();
	}
}
