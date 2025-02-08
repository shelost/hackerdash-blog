<script lang="ts">
	import { formatDate } from '$lib/utils'
	import { goto } from '$app/navigation';
	import * as config from '$lib/config'
	import {send, receive} from '$lib/crossfade.js';
	import Cards from '$lib/components/Cards.svelte'
	import { showHeader, themeColor } from '$lib/store';
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

	themeColor.set('F4EDFF')
	showHeader.set(true)

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

	<div id = 'posts'>
		<Cards data={data} gap = {36}/>
	</div>

	<!--
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
	-->
</section>

<style lang='scss'>

	section{
		padding-bottom: 100px;
		padding-top: 100px;
	}

	#header{
		margin: 0;
		padding: 120px 0 60px 0;
		//background: yellow

		display: none;
	}

	#posts {

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



		width: fit-content;
		max-width: 85%;

		//border: 1px solid red;
	}


</style>
