'use strict';

define('forum/topic/poll', [
	'components', 'translator', 'alerts',
], function (components, translator, alerts) {
	const Poll = {};

	let pollModal;
	let pollOptions = [];

	Poll.init = function () {
		if (pollModal) {
			return;
		}

		app.parseAndTranslate('modals/create-poll', {}, function (html) {
			pollModal = html;
			$('body').append(pollModal);

			// Get Elements
			const inputField = pollModal.find('#topicId');
			const addButton = pollModal.find('#add_option');
			const createPollButton = pollModal.find('#create_poll');
			const optionsContainer = pollModal.find('#poll-options-list');

			// Initially disable buttons
			addButton.prop('disabled', true);
			createPollButton.prop('disabled', true);

			// Event Listeners
			pollModal.find('#move_posts_cancel').on('click', closePollModal);

			// Enable "Add Option" button when input is not empty
			inputField.on('input', function () {
				const inputText = inputField.val().trim();
				addButton.prop('disabled', inputText === '');
			});

			// Add option when button is clicked
			addButton.on('click', function () {
				addPollOption(inputField, optionsContainer, addButton, createPollButton);
			});
		});
	};

	function addPollOption(inputField, optionsContainer, addButton, createPollButton) {
		const optionText = inputField.val().trim();
		if (optionText === '') {
			return;
		}

		// Add to the options list
		pollOptions.push(optionText);

		// Create option element and append it to the container
		const optionElement = $(`
			<div class="poll-option-item d-flex justify-content-between align-items-center" style="padding: 5px; border-bottom: 1px solid #ddd;">
				<span>${optionText}</span>
				<button class="btn btn-sm btn-danger remove-option" style="margin-left: auto;">✖</button>
			</div>
		`);
		optionsContainer.append(optionElement);

		// Clear input field and disable "Add Option" button
		inputField.val('');
		addButton.prop('disabled', true);

		// Enable "Create Poll" button when at least one option is added
		createPollButton.prop('disabled', pollOptions.length === 0);

		// Handle removing an option
		optionElement.find('.remove-option').on('click', function () {
			const index = pollOptions.indexOf(optionText);
			if (index > -1) {
				pollOptions.splice(index, 1);
			}
			optionElement.remove();

			// Disable "Create Poll" button if no options remain
			createPollButton.prop('disabled', pollOptions.length === 0);
		});
	}

	function closePollModal() {
		if (pollModal) {
			pollModal.remove();
			pollModal = null;
		}
	}

	return Poll;
});
