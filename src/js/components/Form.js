import { getEl, getElements, connectEvent } from '../utils/DOMHelper';

export default class Form {
	store = [];

	constructor(formSelector) {
		this.form = getEl(formSelector);
		this.titleInput = getEl('input[name="note-title"]', this.form);
		this.formBody = getEl('.form__body', this.form);
		this.formSelectors = getElements('input[type="radio"]', this.form);
		this.submitButton = getEl('#create-btn', this.form);
		this.connectInputHandler(this.titleInput);
		this.connectChangeBodyHandler();
		this.connectCloseBtnHandler();
	}

	getFormData() {
		const typeInputs = getElements('input[type="radio"]', this.form);
		const description = getEl('textarea', this.form);
		const options = getElements('.option p', this.form);

		const type = [...typeInputs].filter((input) => input.checked)[0].dataset
			.type;

		const formData = {
			id: `n${Math.random().toString().slice(4)}`,
			date: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
			type,
			isCompleted: false,
		};

		if (this.titleInput) {
			if (this.isValid(this.titleInput)) {
				formData.title = this.titleInput.value;
				this.titleInput.parentNode.classList.remove('invalid');
				this.titleInput.value = '';
			} else {
				this.titleInput.parentNode.classList.add('invalid');
				return;
			}
		}

		if (description) {
			if (this.isValid(description)) {
				description.parentNode.classList.add('invalid');
				formData.description = description.value;
				description.value = '';
			} else {
				description.parentNode.classList.remove('invalid');
				return;
			}
		}

		if (options.length < 1 && type !== 'note') {
			const message = document.createElement('div');
			message.classList.add('form__message--invalid');

			message.innerText = 'You need to add at least 1 option';

			this.formBody.append(message);
			setTimeout(() => {
				message.remove();
			}, 3000);
			return;
		}

		formData.options = [...options].map((el) => {
			return {
				text: el.textContent,
				isCompleted: false,
				id: 'opt' + Math.random().toString().slice(4),
			};
		});

		getElements('.option', this.form).forEach((el) => el.remove());

		return formData;
	}

	isValid(input) {
		return input.value.trim() !== '' ? true : false;
	}

	changeFormBody(e) {
		const type = e.target.dataset.type;
		this.formBody.innerHTML = '';
		this.createFormBody(type);
	}

	createFormBody(type) {
		const picker = document.createElement('div');
		picker.classList.add('options-controls');

		const optionsList = document.createElement('ul');
		optionsList.classList.add('options-list');

		if (type === 'todo') {
			optionsList.classList.add('options-list--todo');
		}

		if (type === 'targets' || type === 'note') {
			const descrInput = document.createElement('div');
			descrInput.classList.add('form-control');
			descrInput.innerHTML = `
				<label>Note Description</label>
				<textarea class="input form-input" placeholder="Enter description"></textarea>
			`;

			this.connectInputHandler(getEl('textarea', descrInput));
			this.formBody.append(descrInput);

			if (type === 'note') {
				return;
			}
		}

		picker.innerHTML = `
			<input class="input form-input" placeholder="Enter Your task" type="text">
			<button type="button" class="btn form-btn">Add Option</button>
    `;

		const pickerBtn = picker.querySelector('button');
		pickerBtn.addEventListener('click', this.createOption.bind(this));

		this.formBody.append(optionsList, picker);
	}

	createOption(e) {
		e.preventDefault();

		const parentEl = this.formBody.querySelector('.options-list');
		const input = this.formBody.querySelector('input');

		if (input.value.trim() === '') {
			return;
		}

		const option = document.createElement('li');
		option.classList.add('option');

		const optionText = document.createElement('p');
		optionText.textContent = input.value;

		const deleteBtn = document.createElement('button');
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
		this.formSelectors.forEach((sel) =>
			sel.addEventListener('change', this.changeFormBody.bind(this))
		);
	}

	connectInputHandler(input) {
		input.addEventListener('blur', (e) => {
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
