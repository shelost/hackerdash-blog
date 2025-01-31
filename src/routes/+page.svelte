<script lang = "js">

	import { resolveRoute } from "$app/paths"
	import { writable } from 'svelte/store'
	import { tweened } from 'svelte/motion';
	import { expandedPost } from '$lib/store';
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import { onMount } from 'svelte'
	import {send, receive} from '$lib/crossfade.js';
	import { goto } from '$app/navigation';
	//import Masonry from 'masonry-layout'
	import bricks from 'bricks.js';

	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	export let data

	let modal = writable(false)

	let selected = writable(null)

	let Modal;
	let Flow;
	let Grid;

	onMount(() => {

		window.addEventListener('scroll', handleScroll);

		console.log(data)
		console.log(Grid)

		setTimeout(() => {

			const grid = bricks({
				container: Grid,
				packed: 'data-packed',
				position: true,
				sizes: [
					{ columns: 3, gutter: 10 },
					{ mq: '768px', columns: 3, gutter: 20 },
					{ mq: '1024px', columns: 3, gutter: 20 }
				]
			});

			grid.pack()

			grid.resize(true);

			console.log(grid)

			/*
			return () => {
				grid.resize(false);
			};
			*/
		}, 0);
	});

	function handleScroll(){
		if (Flow){
			Flow.style.opacity = 0
		}
	}

	function handleHover(post, event) {
		selected.set(post)

		let elem = event.currentTarget;
		let rect = elem.getBoundingClientRect();

		// Wait for modal to be created
		setTimeout(() => {
			if (Flow) {
				Flow.style.top = `${rect.top}px`;
				Flow.style.left = `${rect.left}px`;
				Flow.style.width = `${rect.width}px`;
				Flow.style.height = `${rect.height}px`;
				Flow.style.opacity = .2;
				if (elem.classList.contains('blog')){
					Flow.style.opacity = .4
				}
			}
		}, 0);
	}

	function clearHover() {
		if ($modal != true){
			//selected.set(null);
		}
	}

	function handleClick(post, event) {
		// goto(`/blog/${post.slug}`, {noScroll: true})
		let elem = event.currentTarget
		let rect = elem.getBoundingClientRect();
		modal.set('true')
		// Wait for modal to be created
		setTimeout(() => {
			let rect2 = Modal.getBoundingClientRect()
			setTimeout(() => {
				Flow.style.transition = '0.2s cubic-bezier(0.22, 1, 0.36, 1)'
				Flow.style.top = `${rect2.top}px`
				Flow.style.left = `${rect2.left}px`
				Flow.style.width = `${rect2.width}px`
				Flow.style.height = `${rect2.height}px`
				Flow.style.opacity = 1
				setTimeout(() => {
					Flow.style.opacity = 0
				}, 500);

			}, 100);
		}, 10);
	}

	function closeModal(event) {
		// Only close the modal if the click was on the background (not the modal itself)
		if (event.target.id === 'pop') {
			modal.set(false)
		}else{
			goto(`/${$selected.slug}`, {noScroll: true})
		}
	}

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>


<div id = 'main' out:fade={{duration: 200}}>

	<div id="splash">
		<div id="container">
			<canvas id="bgcanvas">
			</canvas>
		</div>

		<video id = 'video' autoplay muted loop>
			<source src="timelapse.mp4" type="video/mp4">
		</video>

		<div class="expo">
			<img id = 'logo' src = 'ahnheewon3.png' alt = 'Logo' transition:fly={{ duration: 500 }}>

			<h1> Designs and Code </h1>
		</div>

		<canvas id="canvas">
		</canvas>
	</div>


	<section>

		<h1 class = 'title'> Featured </h1>
		<div id = 'posts' bind:this={Grid}>
			{#each data.posts as post}

			{#if post.meta.card}

				<div
					class="post game hoverable"
					on:click={(event) => handleClick(post, event)}
					on:mouseenter={(event) => handleHover(post, event)}
					on:mouseleave={clearHover}
				>
					<img src = '/card/{post.meta.card}.png' class = 'img' alt = 'Image'>
					<div class = 'expo'>
						<h1 class="title">{post.meta.title}</h1>
						<p class="date">{formatDate(post.meta.date)}</p>
						<p class="description">{post.meta.type}</p>
					</div>
				</div>

			{:else}

				<div
					class="post blog hoverable"
					on:click={(event) => handleClick(post, event)}
					on:mouseenter={(event) => handleHover(post, event)}
					on:mouseleave={clearHover}
				>

					<div class = 'expo'>
						{#if post.meta.series}
							<h3 class = 'series'> {post.meta.series} </h3>
						{/if}
						<h1 class="title">{post.meta.title}</h1>
						<p class="date">{formatDate(post.meta.date)}</p>
						<p class="description">{post.meta.type}</p>
					</div>
					<div class = 'prose text'>
						<svelte:component this={post.content}></svelte:component>
					</div>
				</div>

			{/if}


		{/each}
		</div>
	</section>


	{#if $modal}

	<div id = 'dark' transition:fade={{duration: 50}} ></div>
	<div id = 'pop' on:click={closeModal}>

			<div id = 'modal' bind:this={Modal} in:fade={{delay: 250}}>

				{#if $selected.meta.banner}
					<img src = '/banner/{$selected.meta.banner}.png' alt = 'Image'>
				{/if}

				<div class = 'content'>

					<h1> { $selected ? $selected.meta.title : 'Title' } </h1>
					<h2> { $selected ? $selected.meta.type : 'Title' } </h2>
					<p>  { $selected ? $selected.meta.description : 'Description' } </p>
					<div class="tags">
						{#each $selected.meta.categories as category}
							<div class = 'tag'>
								<h3>
									{category}
								</h3>
							</div>
						{/each}
					</div>

					<div class="prose">
						<svelte:component class = 'mode' this={$selected.content} />
					</div>

					{#if $selected.meta.url}
						<a href = '{$selected.meta.url}'>
							<button>
								<h1>
									Visit
								</h1>
							</button>
						</a>
					{/if}

				</div>


			</div>
		</div>

	{/if}
	<div id="flow-container">
		<div id = 'flow' bind:this={Flow}></div>
	</div>

</div>


<style lang="scss">

	#flow-container{
		z-index: 1;
	}

	#flow{
		position: fixed;
		top: 0;
		left: 0;
		width: 20px;
		height: 20px;
		background: white;
		border-radius: 10px;
		pointer-events: none;
		will-change: transform, opacity;
		transition: 0.2s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: 0 5px 10px rgba(black, 0.1);
	}

	#dark{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(black, 0.3);
		z-index: 1;
	}

	section{
		.title{
			font-size: 48px;
			width: 100%;
			max-inline-size: 100%;
			text-align: center;
			margin-bottom: 60px;
		}
	}

	#pop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(black, 0.1);
		z-index: 2;

		display: flex;
		justify-content: center;
		align-items: center;

		#modal{

			width: 720px;
			height: 600px;
			max-height: 80%;
			border-radius: 12px;
			transition: 0.2s ease;
			z-index: 4 !important;
			background: white;
			overflow-y: scroll;
			box-shadow: 0 15px 60px rgba(black, .25);
			//border: .5px solid rgba(white, 0.1);
			//border: 1px solid rgba(white, 0.1);
			clip-path: inset(0 0 0 0 round 16px);

			img{
				border: 0;
				border-radius: 0;
			}

			.content{
				padding: 32px;

				h1{
					font-size: 48px;
					font-weight: 900;
					line-height: 98%;
				}

				h2{
					font-size: 24px;
					font-weight: 500;
				}

				p{
					margin-top: 12px;
					letter-spacing: -0.15px;
					font-size: 14px;
					font-weight: 300;
				}

				.tags{
					display: flex;
					gap: 10px;
					margin-top: 20px;
					.tag{
						padding: 8px 10px;
						border-radius: 12px;
						background: rgba(#030025, 0.1);
						h3{
							font-size: 14px;
							font-weight: 500;
						}
					}
				}


				button{
					background: #030025;
					color: white;

					border: none;
					outline: none;

					padding: 12px 30px;
					border-radius: 8px;

					margin-top: 24px;

					h1{
						font-size: 20px;
						font-weight: 700;
						text-shadow: none;
					}
				}
			}
		}
	}




	#bgcanvas{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -2;
	}

	#canvas{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
		pointer-events: none;
		display: none;
	}

	#video{
		position: fixed;
		top: 0vh;
		left: 0;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		z-index: -3;
		opacity: 0.4;
		filter: grayscale(100%);
		display: none;
	}

	#splash{
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	#logo{
		height: 120px;
		margin-bottom: 100px;
	}

	#socials {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin-top: 30px;
	}

	.icon {
		height: 44px;
	}

	.exp {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		h1 {
			font-size: 64px;
			font-weight: 600;
			letter-spacing: -1px;
			color: black;
			margin-bottom: 10px;
		}

		h2 {
			font-size: 24px;
			font-weight: 500;
			letter-spacing: -1px;
			color: black;
			margin-bottom: 10px;
		}
	}

	/* Blog */

	#posts {
		//display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: auto;
		width: 1440px;
		max-width: 90%;
		padding: 0;
		//gap: 2%;
	}

	.post {
		width: 31%;
		height: fit-content;
		color: black;
		margin: 0;
		margin-bottom: 3%;

		border-radius: 8px;
		border: 2px solid rgba(white, 0.1);
		background: rgba(white, 0.4);
		box-shadow: 0 15px 40px rgba(black, 0.08);

		opacity: 1;
		transition: 0.2s ease;
		color: #030025;
		position: relative;

		overflow: hidden;

		&.game{
			color: white;
			background: none;
			aspect-ratio: 5/4;

			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			.expo{
				display: none;
				background-image: linear-gradient(to top, rgba(#030025, 0.25), rgba(#030025, 0));
				h1{
					text-shadow: 0 10px 25px rgba(black, .5);
				}
			}
		}

		&.blog{
			aspect-ratio: 15/10;
			background: rgba(white, 0.8);

			h3{
				font-size: 14px;
				font-weight: 600;
				margin-bottom: 4px;
				color: red;
			}

			h1{
				font-family: 'Playfair Display', sans-serif;
				font-weight: 900;
				font-size: 32px !important;
				letter-spacing: -.5px;
				color: rgba(black, 0.8);
			}

			.text{
				padding: 0 24px 24px 24px;

				p{
					font-size: 11px;
					color: red;
				}
			}
		}

		img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			z-index: -1;
		}

		.expo{
			padding: 24px;

			h1{
				font-size: 28px;
				line-height: 98%;
				font-weight: 800;
				margin-bottom: 8px;
				text-align: left;
				//color: #19163b;
			}
			p{
				font-size: 14px;
				font-weight: 300;
				letter-spacing: -0.25px;
			}
			.date{
			//	display: none;
			}
			.description{
				display: none;
			}
		}


		&:hover{
			opacity: 1;
			transform: scale(1.04);
		}
	}

</style>
