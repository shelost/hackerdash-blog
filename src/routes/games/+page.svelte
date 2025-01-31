<script lang="ts">
	import { formatDate } from '$lib/utils'
	import { goto } from '$app/navigation';
	import * as config from '$lib/config'
	import {send, receive} from '$lib/crossfade.js';
	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	export let data;

	function handleClick(event, post) {
		goto(`/${post.slug}`, { noScroll: true });
	}

	let posts = data.posts.filter( a => a.type == 'game')

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>

	<div id = 'header'>
		<img id  = 'logo' src = 'ahnheewon3.png' alt = 'Image'>
		<h2> Games </h2>
	</div>

	<div class="posts">
		{#each posts as post, i}
			<div class="post" on:click={(event) => handleClick(event, post)} in:fly = {{y:100, delay: 50+i*100}} >

				{#if post.banner}
					<img src = '/card/{post.card}.png' class = 'img' alt = 'Image'>
				{/if}

				<div class = 'expo'>
					<h1 class="title">{post.title}</h1>
					<p class="date">{formatDate(post.date)}</p>
					<p class="description">{post.description}</p>
				</div>

			</div>
		{/each}
	</div>
</section>

<style lang='scss'>

	body{
		background: yellow !important;
	}

	.posts {
		//border: 1px solid yellow;
		/*
		display: grid;
		grid: 32% 32% 32% / 32% 32% 32%;
		gap: 4% 2%;
		width: 1080px;
		margin: auto;
		margin-top: 40px;
		max-inline-size: 90%;
		padding-bottom: 100px;
		*/

		display: flex;
		flex-wrap: wrap;
		gap: 24px;

		margin: auto;

		width: 1080px;
		max-width: 85%;

		//border: 1px solid red;
	}

	.post {
		width: calc(33% - 14px);
		color: black;
		//background: rgba(white, 0.1);
		border-radius: 18px;
		position: relative;
		box-shadow: 0 15px 50px rgba(#030025, 0.12), inset 0px -8px 10px rgba(black, 0.02);
		overflow: hidden;
		aspect-ratio: 5/4;
		color: rgba(white, 0.8);
		padding: 0;
		padding-bottom: 0;

		border: 2px solid rgba(white, 0.01);

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;

		transition: 0.2s ease;

		opacity: 1;


		.expo{
			background: linear-gradient(to top, black, rgba(black, 0));
			padding: 24px;
			width: 100%;
			display: none;
		}

		img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			z-index: -1;
			border-radius: 0;
		}

  		&.game{
			color: white;
			background: none;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}

		.title {
			font-size: 32px;
			line-height: 98%;
			font-weight: 800;
			text-transform: capitalize;
			margin-bottom: 5px;
		}

		.profile{
			display: none;
			align-items: center;
			gap: 14px;
			padding: 20px 0;
		}

		.date{
			font-size: 14px;
			font-weight: 300;
			color: rgba(white, 0.5);
			letter-spacing: -0.2px;
		}

		&:hover{
			transform: scale(1.03);
		}
	}


</style>
