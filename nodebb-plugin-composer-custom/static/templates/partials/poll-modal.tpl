<div class="modal fade" id="pollModal" tabindex="-1" aria-labelledby="pollModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pollModalLabel">Create a Poll</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="poll-form">
                    <div class="mb-3">
                        <label for="poll-title" class="form-label">Poll Title</label>
                        <input type="text" class="form-control" id="poll-title" placeholder="Enter poll title">
                    </div>
                    <div id="poll-options">
                        <label class="form-label">Poll Options</label>
                        <div class="input-group mb-2">
                            <input type="text" class="form-control poll-option" placeholder="Option 1">
                            <button class="btn btn-danger remove-option" type="button">&times;</button>
                        </div>
                        <div class="input-group mb-2">
                            <input type="text" class="form-control poll-option" placeholder="Option 2">
                            <button class="btn btn-danger remove-option" type="button">&times;</button>
                        </div>
                    </div>
                    <button type="button" id="add-option" class="btn btn-secondary">+ Add Option</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="save-poll">Save Poll</button>
            </div>
        </div>
    </div>
</div>

<script>
    require(['composer'], function (composer) {
        // Your custom JS code here
        console.log('Polls script loaded successfully.');
    });
</script>
