<script lang = "js">

import { base } from "$app/paths";

const myRoute = `${base}/some-page`;

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
	import Card from '$lib/components/Card.svelte'
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

	export let data

	console.log(data)

	let modal = writable(false)

	let selected = writable(null)

	let Modal;
	let Flow;
	let Grid;

	let Bricks;

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		/*
		setTimeout(() => {
			Bricks = bricks({
				container: Grid,
				packed: 'data-packed',
				position: true,
				sizes: [
					{ columns: 3, gutter: 1 },
					{ mq: '768px', columns: 3, gutter: 20 },
					{ mq: '1024px', columns: 3, gutter: 32 }
				]
			});
			Bricks.pack()
			Bricks.update()
			setTimeout(() => {
				Bricks.pack()
			}, 100);
			setTimeout(() => {
				Bricks.update()
			}, 200);
			Bricks.resize(true);
			return () => {
				grid.resize(false);
			};
		}, 10);
		*/
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

		<div class="head">
			<img id = 'logo' src = 'ahnheewon3.png' alt = 'Logo' transition:fly={{ duration: 500 }}>
			<div id = 'ahw'>
				<img class = 'letter' src = 'a.svg' in:fly={{ y:100, delay: 100 }}>
				<img class = 'letter' src = 'h.svg' in:fly={{ y:100, delay: 150 }}>
				<img class = 'letter' src = 'n.svg' in:fly={{ y:100, delay: 200 }}>
				<img class = 'letter' src = 'h.svg' in:fly={{ y:100, delay: 300 }}>
				<img class = 'letter' src = 'e.svg' in:fly={{ y:100, delay: 400 }}>
				<img class = 'letter' src = 'e.svg' in:fly={{ y:100, delay: 500 }}>
				<img class = 'letter' src = 'w.svg' in:fly={{ y:100, delay: 600 }}>
				<img class = 'letter' src = 'o.svg' in:fly={{ y:100, delay: 700 }}>
				<img class = 'letter' src = 'n.svg' in:fly={{ y:100, delay: 800 }}>
			</div>
			<h1>  </h1>
		</div>

		<canvas id="canvas">
		</canvas>
	</div>


	<section>
		<h1 class = 'title'> Featured </h1>

		<!--
		<div id = 'posts' bind:this={Grid}>
			{#each data.posts as post}
				<Card post={post} />
			{/each}
		</div>
		-->

		<div id = 'posts'>
			<Cards data={data} />
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

	#main{
		width: 100vw;
		padding-bottom: 100px;
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
		width: 100vw;
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
			height: 720px;
			max-height: 85%;
			border-radius: 12px;
			transition: 0.2s ease;
			z-index: 4 !important;
			background: white;
			overflow-y: scroll;
			transform: translateY(16px);
			box-shadow: 0 15px 60px rgba(black, .25);

			img{
				border: 0;
				border-radius: 0;
			}

			.content{
				padding: 32px;

				h1{
					font-family: 'DM Serif Display', sans-serif;
					font-size: 48px;
					font-weight: 900;
					line-height: 98%;
					letter-spacing: 0;
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



	#splash{
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90vh;
		width: 100vw;
	}

	#logo{
		height: 120px;
		margin-bottom: 100px;
		display: none;
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

	.head{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;


		#ahw{
			display: flex;
			justify-content: center;
			align-items: flex-end;
			gap: 0;
			margin-bottom: 56px;
			//background: red;
			.letter{
				flex-shrink: 0;
				margin: 0 -4px;
				//transform: scale(0.1);
				//width: 60px;
				//height: auto;
			}
		}

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
		width: 1120px;
		max-width: 90%;
		padding: 0;
		//border: 1px solid yellow;
		//gap: 2%;
	}

	@keyframes float{
		0%{
			transform: scale(1.04) translateY(0);
		}
		100%{
			transform: scale(1.03) translateY(-8px);
		}
	}

	.post {
		width: 31%;
		height: fit-content;
		color: black;
		margin: 0;
		margin-bottom: 3%;

		border-radius: 8px;
		//border: 2px solid rgba(white, 0.1);
		background: rgba(white, 0.4);
		box-shadow: 0 15px 40px rgba(black, 0.25);

		opacity: 1;
		transition: 0.2s ease;
		color: #030025;
		position: relative;

		overflow: hidden;

		&.game{
			color: white;
			background: none;
			aspect-ratio: 5/4;

			//border-radius: 40px;

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
				font-family: 'DM Serif Display', sans-serif;
				font-weight: 900;
				font-size: 32px !important;
				letter-spacing: .1px;
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
			border-radius: 0;
		}

		.expo{
			padding: 24px;

			h1{
				font-size: 28px;
				line-height: 98%;
				font-weight: 800;
				margin-bottom: 8px;
				text-align: left;
			}

			p{
				font-size: 14px;
				font-weight: 300;
				letter-spacing: -0.25px;
			}

			.description{
				display: none;
			}
		}


		&:hover{
			opacity: 1;
			transform: scale(1.02);
			//animation: float 0.5s ease-in-out infinite alternate-reverse;
		}
	}

</style>
