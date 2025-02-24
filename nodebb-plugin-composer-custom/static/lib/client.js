'use strict';

const bootstrap = require('bootstrap');

$(document).ready(function () {
    console.log('Poll Script Loaded!');

    // === Composer Initialization ===
    $(window).on('action:app.load', function () {
        require(['composer/drafts'], function (drafts) {
            drafts.migrateGuest();
            drafts.loadOpen();
        });
    });

    $(window).on('action:composer.topic.new', function (ev, data) {
        if (config['composer-default'].composeRouteEnabled !== 'on') {
            require(['composer'], function (composer) {
                composer.newTopic({
                    cid: data.cid,
                    title: data.title || '',
                    body: data.body || '',
                    tags: data.tags || [],
                });
            });
        } else {
            ajaxify.go(
                'compose?cid=' + data.cid +
                (data.title ? '&title=' + encodeURIComponent(data.title) : '') +
                (data.body ? '&body=' + encodeURIComponent(data.body) : '')
            );
        }
    });

    $(window).on('action:composer.post.edit', function (ev, data) {
        if (config['composer-default'].composeRouteEnabled !== 'on') {
            require(['composer'], function (composer) {
                composer.editPost({ pid: data.pid });
            });
        } else {
            ajaxify.go('compose?pid=' + data.pid);
        }
    });

    $(window).on('action:composer.post.new', function (ev, data) {
        data.body = data.body || data.text;
        data.title = data.title || data.topicName;
        if (config['composer-default'].composeRouteEnabled !== 'on') {
            require(['composer'], function (composer) {
                composer.newReply({
                    tid: data.tid,
                    toPid: data.pid,
                    title: data.title,
                    body: data.body,
                });
            });
        } else {
            ajaxify.go(
                'compose?tid=' + data.tid +
                (data.pid ? '&toPid=' + data.pid : '') +
                (data.title ? '&title=' + encodeURIComponent(data.title) : '') +
                (data.body ? '&body=' + encodeURIComponent(data.body) : '')
            );
        }
    });

    $(window).on('action:composer.addQuote', function (ev, data) {
        data.body = data.body || data.text;
        data.title = data.title || data.topicName;
        if (config['composer-default'].composeRouteEnabled !== 'on') {
            require(['composer'], function (composer) {
                var topicUUID = composer.findByTid(data.tid);
                composer.addQuote({
                    tid: data.tid,
                    toPid: data.pid,
                    selectedPid: data.selectedPid,
                    title: data.title,
                    username: data.username,
                    body: data.body,
                    uuid: topicUUID,
                });
            });
        } else {
            ajaxify.go('compose?tid=' + data.tid + '&toPid=' + data.pid + '&quoted=1&username=' + data.username);
        }
    });

    $(window).on('action:composer.enhance', function (ev, data) {
        require(['composer'], function (composer) {
            composer.enhance(data.container);
        });
    });

    // === Bootstrap Modal Fix ===
    const pollModalElement = document.getElementById('pollModal');
    let pollModalInstance;
    
    if (pollModalElement) {
        pollModalInstance = new bootstrap.Modal(pollModalElement);
        
        // Reset the poll form when the modal is closed
        pollModalElement.addEventListener('hidden.bs.modal', function () {
            document.getElementById('poll-form').reset();
            $('#poll-options .input-group:gt(1)').remove(); // Keep the first two options
        });
    } else {
        console.warn('Poll modal not found in DOM.');
    }

    // === Add Poll Option ===
    $(document).on('click', '#add-option', function (e) {
        e.preventDefault();
        const newOption = $(`
            <div class="input-group mb-2">
                <input type="text" class="form-control poll-option" placeholder="New Option" required>
                <button class="btn btn-danger remove-option" type="button">&times;</button>
            </div>
        `);
        $('#poll-options').append(newOption);
    });

    // === Remove Poll Option ===
    $(document).on('click', '.remove-option', function (e) {
        $(this).closest('.input-group').remove();
    });

    // === Save Poll ===
	$(document).on('click', '#save-poll', function (e) {
		e.preventDefault();

		const pollTitle = $('#poll-title').val().trim();
		const pollOptions = [];

		$('.poll-option').each(function () {
			const option = $(this).val().trim();
			if (option) {
				pollOptions.push(option);
			}
		});

		if (pollTitle === '' || pollOptions.length < 2) {
			alert('Please enter a title and at least two options.');
			return;
		}

		console.log('Poll Title:', pollTitle);
		console.log('Poll Options:', pollOptions);

		// Add the poll data to the composer textarea
		const pollMarkdown = `**${pollTitle}**\n\n${pollOptions.map(opt => `- ${opt}`).join('\n')}`;
		const textarea = $('.composer .write');
		textarea.val(textarea.val() + '\n\n' + pollMarkdown);

		// Manually trigger preview update
		$(window).trigger('action:composer.preview');

		// === Properly Hide Modal ===
		const pollModalElement = document.getElementById('pollModal');
		if (pollModalElement) {
			let pollModalInstance = bootstrap.Modal.getInstance(pollModalElement);
			if (!pollModalInstance) {
				pollModalInstance = new bootstrap.Modal(pollModalElement);
			}
			pollModalInstance.hide();
		} else {
			console.error('Poll modal instance is undefined.');
		}
	});


    // === Update Poll Preview in Composer ===
    $(window).on('action:composer.preview', function () {
		const textareaValue = $('.composer .write').val().trim();
		let pollContainer = $('#poll-preview');
	
		if (pollContainer.length === 0) {
			console.warn('Poll preview container not found. Creating it...');
			pollContainer = $('<div id="poll-preview" class="poll-preview alert alert-light mt-3 p-3"></div>');
			$('.composer .preview-container').prepend(pollContainer);
		}
	
		const pollRegex = /\*\*(.*?)\*\*\n\n(- .+(\n- .+)*)/s;
		const match = textareaValue.match(pollRegex);
	
		if (match && match[1] && match[2]) {
			const pollTitle = match[1];
			const pollOptions = match[2]
				.split('\n')
				.map((opt, index) => `
					<div class="form-check">
						<input class="form-check-input poll-radio" type="radio" name="poll-preview-options" id="poll-option-${index}">
						<label class="form-check-label" for="poll-option-${index}">${opt.substring(2)}</label>
					</div>
				`)
				.join('');
	
			pollContainer.html(`
				<div class="poll-card">
					<h4 class="poll-title">${pollTitle}</h4>
					<form>${pollOptions}</form>
					<button class="btn btn-primary btn-sm mt-2 poll-vote-btn" disabled>Vote</button>
				</div>
			`);
			pollContainer.removeClass('d-none');
	
			// Enable vote button when an option is selected
			$('.poll-radio').on('change', function () {
				$('.poll-vote-btn').prop('disabled', false);
			});
		} else {
			pollContainer.addClass('d-none').html('');
		}
	});
	

});
