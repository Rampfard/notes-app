import { getEl, getElements, createElement } from '../utils/DOMHelper';

export default class Form {
	constructor(formSelector) {
		this.form = getEl(formSelector);
		this.titleInput = getEl('input[name="note-title"]', this.form);
		this.descriptionInput = getEl('textarea', this.form);
		this.formBody = getEl('.form__body', this.form);
		this.formSelectors = getElements('input[type="radio"]', this.form);
		this.submitButton = getEl('#create-btn', this.form);
		this.formType = 'note';
		this.connectInputHandler(this.titleInput);
		this.connectInputHandler(this.descriptionInput);
		this.connectChangeBodyHandler();
		this.connectCloseBtnHandler();
	}

	getFormData() {
		// const typeInputs = getElements('input[type="radio"]', this.form);
		const options = getElements('.option p', this.form);

		// const type = [...typeInputs].filter((input) => input.checked)[0].dataset
		// 	.type;

		const formData = {
			id: `n${Math.random().toString().slice(4)}`,
			date: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
			type: this.formType,
			isCompleted: false,
		};

		if (!this.validateForm(options, this.formType)) {
			return;
		}

		formData.title = this.titleInput.value;

		if (this.descriptionInput) {
			formData.description = this.descriptionInput.value;
		}

		formData.options = [...options].map((el) => {
			return {
				text: el.textContent,
				isCompleted: false,
				id: 'opt' + Math.random().toString().slice(4),
			};
		});

		this.clearForm();

		return formData;
	}

	validateForm(options, noteType) {
		if (!this.isValid(this.titleInput)) {
			this.titleInput.parentNode.classList.add('invalid');
			return false;
		}

		if (this.descriptionInput) {
			if (!this.isValid(this.descriptionInput)) {
				this.descriptionInput.parentNode.classList.add('invalid');
				return false;
			}
		}

		if (options.length < 1 && noteType !== 'note') {
			const message = createElement('div');
			message.classList.add('form__message--invalid');

			message.innerText = 'You need to add at least 1 option';

			this.formBody.append(message);
			setTimeout(() => {
				message.remove();
			}, 3000);
		}

		return true;
	}

	isValid(input) {
		return input.value.trim() !== '' ? true : false;
	}

	clearForm() {
		this.titleInput.value = '';

		if (this.descriptionInput) {
			this.descriptionInput.value = '';
		}

		getElements('.option', this.form).forEach((el) => el.remove());
	}

	changeFormBody(e) {
		this.formType = e.target.dataset.type;
		this.formBody.innerHTML = '';
		this.createFormBody(this.formType);
	}

	createFormBody(type) {
		const optionPicker = createElement('div');
		optionPicker.classList.add('options-control');

		const optionsList = createElement('ul');
		optionsList.classList.add('options-list');

		if (type === 'todo') {
			optionsList.classList.add('options-list--todo');
		}

		if (type === 'targets' || type === 'note') {
			const descrInput = createElement('div');
			descrInput.classList.add('form-control');
			descrInput.innerHTML = `
				<label>Note Description</label>
				<textarea class="input form-input" placeholder="Enter description"></textarea>
			`;

			this.descriptionInput = getEl('textarea', descrInput);
			this.connectInputHandler(this.descriptionInput);

			this.formBody.append(descrInput);

			if (type === 'note') {
				return;
			}
		} else {
			this.descriptionInput = null;
		}

		optionPicker.innerHTML = `
			<input class="input form-input" placeholder="Enter Your task" type="text">
			<button type="button" class="btn form-btn">Add Option</button>
    `;

		const optionPickerBtn = getEl('button', optionPicker);
		optionPickerBtn.addEventListener('click', this.createOption.bind(this));

		this.formBody.append(optionsList, optionPicker);
	}

	createOption(e) {
		e.preventDefault();

		const parentEl = getEl('.options-list', this.formBody);
		const input = getEl('input', this.formBody);

		if (input.value.trim() === '') {
			return;
		}

		const option = createElement('li');
		option.classList.add('option');

		const optionText = createElement('p');
		optionText.textContent = input.value;

		const deleteBtn = createElement('button');
		deleteBtn.classList.add('btn', 'delete-btn');
		deleteBtn.innerText = 'X';

		deleteBtn.addEventListener('click', (e) => {
			e.target.parentNode.remove();
		});

		option.append(optionText, deleteBtn);

		parentEl.append(option);

		input.value = '';
	}

	connectChangeBodyHandler() {
		this.formSelectors.forEach((selector) =>
			selector.addEventListener('change', this.changeFormBody.bind(this))
		);
	}

	connectInputHandler(input) {
		input.addEventListener('blur', () => {
			if (this.isValid(input)) {
				input.parentNode.classList.remove('invalid');
			} else {
				input.parentNode.classList.add('invalid');
			}
		});
	}

	connectCloseBtnHandler() {
		getEl('.close-btn', this.form).addEventListener('click', () =>
			this.form.classList.remove('shown')
		);
	}
}
