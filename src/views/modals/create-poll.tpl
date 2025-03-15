<div class="card tool-modal shadow" style="width: 800px; height: 650px;">
    <h5 class="card-header">
        Create Poll
    </h5>

    <!-- Modal Body (Scrollable) -->
    <div class="card-body" style="overflow-y: auto; max-height: 550px;">
        <!-- Poll Name -->
        <p><strong>Poll Name:</strong></p>
        <input id="pollName" type="text" class="form-control mb-3" placeholder="Enter poll name">

        <!-- Poll Options -->
        <p>Write your options below:</p>
        <div>
            <label class="form-label" for="pollOption"><strong>Options</strong></label>
            <input id="pollOption" type="text" class="form-control">
        </div>
        <button class="btn btn-primary btn-sm mt-2" id="addOption">Add Option</button>

        <!-- Scrollable Container for Options -->
        <div id="pollOptionsContainer" class="border rounded p-2 mt-3 position-relative"
            style="max-height: 250px; overflow-y: scroll; scrollbar-width: thin; scrollbar-color: #555 #eee;">
            <ul id="pollOptionsList" class="list-group" style="margin-bottom: 0;"></ul>
            <!-- Scroll Indicator -->
            <div id="scrollIndicator" class="position-absolute bottom-0 start-0 w-100"
                style="height: 20px; background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));">
            </div>
        </div>
    </div>

    <!-- Footer (Static) -->
    <div class="card-footer text-end" style="position: absolute; bottom: 0; width: 100%; background: white;">
        <button class="btn btn-link btn-sm" id="closePollModal">[[global:buttons.close]]</button>
        <button class="btn btn-primary btn-sm" id="createPoll">Create Poll</button>
    </div>
</div>
