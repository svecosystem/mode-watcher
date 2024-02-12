<script lang="ts">
	import { ModeWatcherDark, ModeWatcherLight } from "$lib/components/logos";
</script>

<div class="flex items-center gap-1.5 lg:flex-1">
	<a
		href="/"
		class="flex flex-shrink-0 items-end gap-1.5 text-xl font-bold text-gray-900 dark:text-white"
	>
		<ModeWatcherLight class="block h-[26px] w-auto dark:hidden" />
		<ModeWatcherDark class="hidden h-[26px] w-auto dark:block" />
		<span class="sr-only"> Home </span>
	</a>
</div>
