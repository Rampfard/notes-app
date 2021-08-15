import { getEl, createElement } from '../utils/DOMHelpers';

export default class Note {
	months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	createNote(formData) {
		const note = createElement('li');
		note.classList.add('note');

		if (formData.type !== 'note') {
			note.classList.add(formData.type);
		}

		if (formData.isCompleted) {
			note.classList.add('completed');
		}

		const { title, type, id } = formData;

		note.dataset.type = type;
		note.id = id;

		const [day, date, month] = formData.date.split(' ');

		note.innerHTML = `
			<div class="note__inner">
				<h2 class="note__title">
					${title}
				</h2>
				<div class="note__content"></div>
				<div class="note__info">
					<div class="note__date">${date} ${month}</div>
					<div class="note__type">${type}</div>
				</div>
			</div>
		`;

		const noteContentEl = getEl('.note__content', note);

		if (type !== 'todo') {
			const description = createElement('p');

			description.innerText = formData.description;
			description.classList.add('note__description');
			noteContentEl.insertAdjacentElement('afterbegin', description);
		}

		if (type === 'todo' || type === 'targets') {
			this.createOptions(formData.options, noteContentEl);
		}

		return note;
	}

	createOptions(options, parentEl) {
		const optionsList = createElement('ul');
		optionsList.classList.add('note-options');

		options.forEach((option) => {
			const newOption = createElement('li');
			newOption.classList.add('note-option');

			newOption.innerHTML = `
				<span></span>
				<p>${option.text}</p>
			`;

			if (option.isCompleted) {
				newOption.classList.add('completed');
			}

			newOption.id = option.id;

			optionsList.append(newOption);
		});

		parentEl.append(optionsList);
	}
}
