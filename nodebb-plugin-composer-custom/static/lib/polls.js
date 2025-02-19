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
});
