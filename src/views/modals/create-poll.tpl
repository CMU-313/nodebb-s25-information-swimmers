<div class="card tool-modal shadow" style="width: 500px; height: 450px;">
	<h5 class="card-header">
		Create Poll
	</h5>
	<div class="card-body">
		<p>Write your options below</p>
		<div>
			<label class="form-label" for="topicId"><strong>Options</strong></label>
			<input id="topicId" type="text" class="form-control"><br/>
		</div>
        <button class="btn btn-primary btn-sm" id="add_option" disabled>Add Option</button>

		<!-- Scrollable container for poll options -->
		<div id="poll-options-container" style="max-height: 150px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
			<!-- Poll options will be inserted here dynamically -->
			<div id="poll-options-list"></div>
		</div>
	</div>
	<div class="card-footer text-end">
		<button class="btn btn-link btn-sm" id="move_posts_cancel">Close</button>
		<button class="btn btn-primary btn-sm" id="create_poll" disabled>Create Poll</button>
	</div>
</div>
