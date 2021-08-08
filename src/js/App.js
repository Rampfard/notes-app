import Store from './components/Store';
import UI from './components/UI';
import Form from './components/Form';
import NoteTemplate from './components/NoteTemplate';
import Actions from './components/Actions';

export default class App {
	constructor() {}

	static init() {
		const noteTemplate = new NoteTemplate();
		const mainForm = new Form('.form');
		const store = new Store('notes');
		const ui = new UI(noteTemplate, mainForm);
		const actionsHandler = new Actions(store, ui);
	}
}
