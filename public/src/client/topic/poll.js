'use strict';

define('forum/topic/poll', ['components', 'translator', 'alerts'], function (components, translator, alerts) {
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

            const pollNameInput = pollModal.find('#pollName');
            const pollOptionInput = pollModal.find('#pollOption');
            const addOptionButton = pollModal.find('#addOption');
            const createPollButton = pollModal.find('#createPoll');
            const closePollButton = pollModal.find('#closePollModal');
            const pollOptionsContainer = pollModal.find('#pollOptionsContainer');
            const pollOptionsList = pollModal.find('#pollOptionsList');
            const scrollIndicator = pollModal.find('#scrollIndicator');

            // Add option when button is clicked
            addOptionButton.on('click', function () {
                const optionText = pollOptionInput.val().trim();
                if (optionText) {
                    pollOptions.push(optionText);
                    pollOptionInput.val('');

                    // Add option to the list
                    const optionItem = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>')
                        .text(optionText)
                        .append($('<button class="btn btn-sm btn-danger">X</button>')
                            .on('click', function () {
                                pollOptions = pollOptions.filter(opt => opt !== optionText);
                                optionItem.remove();
                                checkScrollIndicator();
                            })
                        );
                    pollOptionsList.append(optionItem);
                    checkScrollIndicator();
                }
            });

            // Check if scrollbar should be visible
            function checkScrollIndicator() {
                if (pollOptionsContainer[0].scrollHeight > pollOptionsContainer.innerHeight()) {
                    scrollIndicator.show();
                } else {
                    scrollIndicator.hide();
                }
            }

            // Listen for scrolling to hide indicator
            pollOptionsContainer.on('scroll', function () {
                if (pollOptionsContainer.scrollTop() + pollOptionsContainer.innerHeight() >= pollOptionsContainer[0].scrollHeight) {
                    scrollIndicator.fadeOut();
                } else {
                    scrollIndicator.fadeIn();
                }
            });

            // Close modal
            closePollButton.on('click', function () {
                pollModal.remove();
                pollModal = null;
            });

            // Create Poll
            createPollButton.on('click', function () {
                const pollName = pollNameInput.val().trim();
                if (!pollName) {
                    return alerts.error('Please enter a poll name.');
                }
                if (pollOptions.length < 2) {
                    return alerts.error('Please add at least two options.');
                }

                const pollData = {
                    name: pollName,
                    options: pollOptions
                };

                console.log('Poll Created:', pollData);
                alerts.success('Poll Created Successfully!');

                // Close modal after creating poll
                pollModal.remove();
                pollModal = null;
            });
        });
    };

    return Poll;
});
