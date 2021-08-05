const elApp = document.querySelector('.main');
const notes = Array.from(document.querySelectorAll('.note'));
const elDetail = document.querySelector('.detail');

function flipImages(firstEl, lastEl, change) {
	const firstRect = firstEl.getBoundingClientRect();
	const lastRect = lastEl.getBoundingClientRect();

	// INVERT
	const deltaX = firstRect.left - lastRect.left;
	const deltaY = firstRect.top - lastRect.top;
	const deltaW = firstRect.width / lastRect.width;
	const deltaH = firstRect.height / lastRect.height;

	change();

	// lastEl.parentElement.dataset.flipping = true;

	const animation = lastEl.animate(
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
			easing: 'cubic-bezier(.2, 0, .3, 1)',
		}
	);

	animation.onfinish = () => {
		// delete lastEl.parentElement.dataset.flipping;
	};
}

notes.forEach((note) => {
	note.addEventListener('click', () => {

		elDetail.innerHTML = '';

		const elClone = note.cloneNode(true);
		elDetail.appendChild(elClone);

		flipImages(note, elClone, () => {
			elApp.dataset.state = 'detail';
		});

		function revert() {
			flipImages(elClone, note, () => {
				elApp.dataset.state = 'gallery';
				elDetail.removeEventListener('click', revert);
        elClone.remove()
			});
		}

		elDetail.addEventListener('click', revert);
	});
});


