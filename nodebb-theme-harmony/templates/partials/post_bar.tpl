<div class="{{{ if config.theme.stickyToolbar }}}sticky-tools{{{ end }}}">
	<nav class="d-flex flex-nowrap my-2 p-0 border-0 rounded topic-main-buttons">
		<div class="d-flex flex-row p-2 text-bg-light border rounded w-100 align-items-center">
			<div class="d-flex me-auto mb-0 gap-2 align-items-center flex-wrap">
				{{{ if loggedIn }}}
				<button component="topic/mark-unread" class="btn-ghost-sm ff-secondary d-flex gap-2 align-items-center">
					<i class="fa fa-fw fa-inbox text-primary"></i>
					<span class="d-none d-md-inline fw-semibold">[[topic:mark-unread]]</span>
				</button>
				{{{ end }}}

				<!-- IMPORT partials/topic/watch.tpl -->
				<!-- IMPORT partials/topic/sort.tpl -->
				<!-- IMPORT partials/topic/tools.tpl -->

				{{{ if isAdminOrGlobalMod }}}
					<button component="topic/mark-unread" class="btn-ghost-sm ff-secondary d-flex gap-2 align-items-center">
						<i class="fa fa-fw fa-inbox text-primary"></i>
						<span class="d-none d-md-inline fw-semibold"> Endorse </span>
					</button>
				{{{ else }}}
					status of endorsed or not
				{{{ end }}}

				<!-- IF loggedIn -->
				<div component="topic/heart" class="topic-heart">
					<a href="#" class="heart btn-ghost-sm ff-secondary" data-tid="{tid}">
						<i class="fa fa-heart text-danger"></i>
						<span component="topic/heart/count" class="heart-count text-danger fw-semibold">9</span>
					</a>
				</div>

				<div component="topic/thumbsup" class="topic-thumbsup">
					<a href="#" class="thumbsup btn-ghost-sm ff-secondary" data-tid="{tid}">
						<i class="fa fa-thumbs-up text-primary"></i>
						<span component="topic/thumbsup/count" class="thumbsup-count text-primary fw-semibold">19</span>
					</a>
				</div>

				<div component="topic/thumbsdown" class="topic-thumbsdown">
					<a href="#" class="thumbsdown btn-ghost-sm ff-secondary" data-tid="{tid}">
						<i class="fa fa-thumbs-down text-primary"></i>
						<span component="topic/thumbsdown/count" class="thumbsdown-count text-primary fw-semibold">2</span>
					</a>
				</div>
				<!-- ENDIF loggedIn -->

				{{{ if (!feeds:disableRSS && rssFeedUrl) }}}
				<a class="btn-ghost-sm d-none d-lg-flex align-self-stretch" target="_blank" href="{rssFeedUrl}" title="[[global:rss-feed]]"><i class="fa fa-rss text-primary"></i></a>
				{{{ end }}}

				{{{ if browsingUsers }}}
				<div class="hidden-xs"><!-- IMPORT partials/topic/browsing-users.tpl --></div>
				{{{ end }}}
			</div>
			<!-- IMPORT partials/topic/reply-button.tpl -->
		</div>
	</nav>
</div>
