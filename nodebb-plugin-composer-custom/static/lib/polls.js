// lib/polls.js
console.log('Polls script loaded successfully.');

$(document).ready(function () {
    console.log('Polls DOM is ready.');

    // Add Option Button
    $('#add-option').on('click', function (e) {
        e.preventDefault();
        const newOption = `
            <div class="input-group mb-2">
                <input type="text" class="form-control poll-option" placeholder="New Option">
                <button class="btn btn-danger remove-option" type="button">&times;</button>
            </div>`;
        $('#poll-options').append(newOption);
    });

    // Remove Option Button
    $('#poll-options').on('click', '.remove-option', function (e) {
        e.preventDefault();
        $(this).closest('.input-group').remove();
    });


    // Save Poll Button
    $('#save-poll').on('click', function (e) {
        e.preventDefault();

        const pollTitle = $('#poll-title').val().trim();
        const pollOptions = [];

        // Collect poll options
        $('.poll-option').each(function () {
            const option = $(this).val().trim();
            if (option) {
                pollOptions.push(option);
            }
        });

        // Validation
        if (pollTitle === '' || pollOptions.length < 2) {
            alert('Please enter a title and at least two options.');
            return;
        }

        // Mockup: Console log the poll data (replace this with AJAX request later)
        console.log('Poll Title:', pollTitle);
        console.log('Poll Options:', pollOptions);

        // Close the modal properly using Bootstrap 5's API
        const pollModalElement = document.getElementById('pollModal');
        if (pollModalElement) {
            const pollModalInstance = bootstrap.Modal.getInstance(pollModalElement);
            if (pollModalInstance) {
                pollModalInstance.hide();
            } else {
                new bootstrap.Modal(pollModalElement).hide();
            }
        }
    });

});
