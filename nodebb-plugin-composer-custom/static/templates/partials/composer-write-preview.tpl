<div class="write-preview-container d-flex gap-2 flex-grow-1 overflow-auto">
    <div class="write-container d-flex d-md-flex w-50 position-relative">
        <div component="composer/post-queue/alert" class="m-2 alert alert-info fade pe-none position-absolute top-0 start-0 alert-dismissible">
            [[modules:composer.post-queue-alert]]
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="draft-icon position-absolute end-0 top-0 mx-2 my-1 hidden-md hidden-lg"></div>
        <textarea class="write shadow-none rounded-1 w-100 form-control" placeholder="[[modules:composer.textarea.placeholder]]">{body}</textarea>
    </div>
    <div class="preview-container d-none d-md-flex w-50">
        <div class="preview w-100 overflow-auto">
			<div id="poll-preview" class="alert alert-info d-none"></div>
		</div>

        <div id="poll-preview-container" class="w-100 p-3 border rounded bg-light d-none">
            <h5 id="poll-preview-title"></h5>
            <ul id="poll-preview-options" class="list-group"></ul>
        </div>
    </div>
</div>
