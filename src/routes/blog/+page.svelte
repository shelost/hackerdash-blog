<script lang="ts">
	import { formatDate } from '$lib/utils'
	import { goto } from '$app/navigation';
	import * as config from '$lib/config'
	import {send, receive} from '$lib/crossfade.js';
	import Cards from '$lib/components/Cards.svelte'
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



	let posts = data.posts.filter( a => a.meta.type == 'blog')

	console.log(posts)

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>

	<div id = 'header'>
		<img id = 'logo' src = 'ahnheewon3.png' alt = 'Image'>
		<h2> Blog </h2>
	</div>


	<div class="posts" in:fade>
		{#each posts as post, i}
			<div class="post"  on:click={(event) => handleClick(event, post)} in:fly = {{x:200, delay: 0+i*100}}>

				<h1 class="title">{post.meta.title}</h1>

                <div class = 'profile'>
                    <a href="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560" /> </a>
                    <h2> {post.meta.author} </h2>
                </div>

				<p class="date">{formatDate(post.meta.date)}</p>
				<p class="description">{post.meta.description}</p>
			</div>
		{/each}
	</div>


	<!--
	<div id = 'posts' in:fade>
		<Cards data={data} />
	</div>
	-->

</section>

<style lang='scss'>

	section{
		//border: 5px solid red;
		padding-bottom: 100px;
	}

	body{
		background: yellow;
	}

	#header{
		margin: 0;
		padding: 120px 0 60px 0;
		//background: yellow
	}

	.posts {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		width: 800px;
		margin: auto;
		margin-top: 40px;
		max-inline-size: 90%;
	}

	.post {
		color: black;
		background: white;
		border-radius: 8px;
		padding: 20px;
		width: 100%;
		opacity: 1 !important;
		box-shadow: 0 15px 50px rgba(black, 0.1);

		.title {
			font-family: 'DM Serif Display', 'Newsreader', sans-serif;
			font-size: 32px;
			font-weight: 800;
			text-transform: capitalize;
			margin-bottom: 10px;
			max-inline-size: 100%;
			letter-spacing: 0.1px;
		}
		h2{
			font-size: 16px;
			font-weight: 500;
		}
		.profile{
			display: none;
			align-items: center;
			gap: 14px;
			padding: 20px 0;
		}
	}

	img{
		height: 32px;
		border-radius: 50px;
		border: 1px solid rgba(0,0,0,0.2);
	}



	ul{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 90vw;
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.date {
		font-size: 16px;
		color: var(--text-2);
	}

	.description {
		font-size: 16px;
		font-weight: 300;
		margin-top: var(--size-3);
	}


</style>
