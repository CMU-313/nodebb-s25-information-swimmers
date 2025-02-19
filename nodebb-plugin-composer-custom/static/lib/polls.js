$(document).ready(function () {
    // Function to add a new poll option
    $('#add-option').on('click', function (e) {
        e.preventDefault();
        
        // Create a new poll option input group
        var newOption = $(`
            <div class="input-group mb-2">
                <input type="text" class="form-control poll-option" placeholder="New Option">
                <button class="btn btn-danger remove-option" type="button">&times;</button>
            </div>
        `);

        // Append the new option to the poll-options container
        $('#poll-options').append(newOption);
    });

    // Function to remove a poll option
    $('#poll-options').on('click', '.remove-option', function (e) {
        e.preventDefault();

        // Remove the parent input group of the clicked remove button
        $(this).closest('.input-group').remove();
    });
});
