<script lang="ts">
	import Toggle from './toggle.svelte'
	import * as config from '$lib/config'
	import { goto } from '$app/navigation';
	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	let show = false

	setTimeout(() => {
		show = true
	}, 400);

	const links = [
		{ text: 'Design', route: '/design' },
		{ text: 'Games', route: '/games' },
		{ text: 'Blog', route: '/blog' },
		{ text: 'Comics', route: '/comics' },
		{ text: 'Apps', route: '/apps' }
	];
</script>

<nav>
	<div class="title" on:click={() => { goto(`/`);}}>
		<img src = 'smiley.png'>
	</div>


	<ul class="links">
		{#if show}
			{#each links as link, index}
				<li
					class="hoverable"
					on:click={() => { goto(link.route); }}
					in:fly={{ y: -200, delay: index * 80, duration: 800 }}
				>
					{link.text}
				</li>
			{/each}
		{/if}
	</ul>


	<ul class="links">
		<li on:click={() => { goto(`/contact`);}}>
			Contact
		</li>
	</ul>

</nav>

<style lang="scss">

	nav {
		position: fixed;
		top: 20px;
		left: 20px;
		width: calc(100vw - 40px);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title{
		background: white;
		border-radius: 12px;
		box-shadow: 0 10px 25px rgba(black, 0.1);
		padding: 4px;
		img{
			height: 32px;
			border-radius: 0;
		}
	}

	.links{
		gap: 12px;
		display: flex;
		align-items: center;
		li{
			background: rgba(white, 0.9);
			padding: 4px 14px;
			border-radius: 20px;
			font-size: 14px;
			font-weight: 500;
			margin: 0;
			transition: 0.2s ease;
			border: 2px solid white;
			box-shadow: 3px 6px 14px rgba(black, 0.1), inset 0 -3px 5px rgba(black, 0.03);
			backdrop-filter: blur(12px);
			&:hover{
				transform: scale(105%);

				//padding: 4px 18px;
			}
		}
	}


</style>
