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

	console.log(data)

	let posts = data.posts.filter( a => a.type == 'blog')

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

				<h1 class="title">{post.title}</h1>

                <div class = 'profile'>
                    <a href="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560" /> </a>
                    <h2> {post.author} </h2>
                </div>

				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</div>
		{/each}
	</div>
</section>

<style lang='scss'>

	body{
		background: yellow;
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
			font-family: 'Playfair Display', 'Newsreader', sans-serif;
			font-size: 28px;
			font-weight: 800;
			text-transform: capitalize;
			margin-bottom: 10px;
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
