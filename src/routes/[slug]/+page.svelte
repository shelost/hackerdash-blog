<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { expandedPost } from '$lib/store';
	import { formatDate } from '$lib/utils';
	import {send, receive} from '$lib/crossfade.js';
	import {onMount} from 'svelte'
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


	onMount(()=> {
		document.body.style.overflow = 'hidden';

		// Restore scroll after animation
		setTimeout(() => {
			document.body.style.overflow = '';
		}, 500);

	})

	//  in:fly={{y: 500, duration: 500}} out:fly={{y: 500, duration: 500}}

</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="main" in:fade={{duration: 200}}>


	<div class = 'container'>
		{#if data.meta.banner}
			<div id = 'banner'>
				<div id = 'img' style='background-image: url("banner/{data.meta.banner}.png")'>
				</div>
				<div id = 'gradient'></div>
			</div>
		{/if}
		<article>

			<hgroup>
				<h3>{data.meta.series}</h3>
				<h1>{data.meta.title}</h1>

				<div class = 'profile'>
					<a href="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560" /> </a>
					<h2> {data.meta.author} </h2>
				</div>

				<h2> {formatDate(data.meta.date)}</h2>
			</hgroup>


			<div class="tags">
				{#each data.meta.categories as category}
					<span class="surface-4">&num;{category}</span>
				{/each}
			</div>


			<div class="prose preview">
				<svelte:component this={data.content} />
			</div>
		</article>

	</div>
</div>

<style lang="scss">

	.container {
		width: 98%;
		max-width: 1440px;
		height: calc(100vh - 85px);
		max-height: 1080px;
		margin: auto;
		//margin-top: 36px;
		transform: translateY(18px);
		background: rgba(white, 0.75);
		border-radius: 12px;
		box-shadow: 0 20px 50px rgba(#110c45, 0.1);
		overflow-y: scroll;
		padding: 20px;
		position: relative;
		border: 1px solid rgba(white, 0.1);
		transition: all 0.5s ease;
		border: 2px solid white;
	}


	.main {
		position: fixed; /* Ensures it floats over previous page */
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		//background: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		padding: 20px;
		//border: 3px solid red;
		transition: all 0.5s ease;

		display: flex;
		align-items: center;
		justify-content: center;
	}


	article {
		width: 1440px;
		max-inline-size: 95%;
		margin-inline: auto;
		padding: 40px;
		border-radius: 12px;
		position: relative;
	}

	#banner{
		width: 100%;
		aspect-ratio: 3;
		position: absolute;
		top: 0;
		left: 0;
		#img{
			width: 100%;
			aspect-ratio: 3;
			background-size: cover;
			background-position: 50% 20%;
			position: absolute;
			//background-attachment: fixed;
			background-color: #ffce00;
			top: 0;
			left: 0;
		}
		#gradient{
			width: 100%;
			aspect-ratio: 3;
			background-size: cover;
			background-image: linear-gradient(to top, white, rgba(white, 0.3), rgba(white,0) 25%);
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	hgroup{
		margin: 230px auto 100px auto;
		width: 900px;
		color: rgba(white, 0.8);
		h1{
			color: white;
			text-shadow: 0 10px 30px rgba(black, 0.8);
		}
		h2{
			background: rgba(white, 0.8);
			color: black;
			margin-top: 8px;
			font-size: 14px;
			padding: 8px 12px;
			border-radius: 8px;
			width: fit-content;
		}
	}

	.profile{
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 20px 0;
		display: none;
	}

	img{
		height: 32px;
		border-radius: 50px;
		border: 1px solid rgba(0,0,0,0.2);
	}

	h2{
		font-size: 18px;
		font-weight: 600;
	}

	h3{
		font-size: 16px;
		font-weight: 600;
		color: rgba(0,0,0,0.3);
		margin-bottom: 5px;
	}

	.tags {
		display: none;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}

</style>
