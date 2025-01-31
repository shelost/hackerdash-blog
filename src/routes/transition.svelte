<script lang="ts">
	import { fade, fly, crossfade } from 'svelte/transition'

	const [send, receive] = crossfade({});

	// in:receive={{key: 'box'}} out:send={{key: 'box'}}

	export let url: string
</script>

{#key url}
	<div class="transition" >
		<slot />
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
