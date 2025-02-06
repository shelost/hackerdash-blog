<script lang = "js">

	const myRoute = `${base}/some-page`;

	import { base } from "$app/paths";
	import { writable } from 'svelte/store'
	import { tweened } from 'svelte/motion';
	import { expandedPost, showHeader } from '$lib/store';
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import { onMount } from 'svelte'
	import {send, receive} from '$lib/crossfade.js';
	import { goto } from '$app/navigation';
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

	const links = [
		{ text: 'Design', route: '/design', icon: 'palette', color: '#F959FF' },
		{ text: 'Games', route: '/games', icon: 'sports_esports', color: '#6355FF' },
		{ text: 'Blog', route: '/blog', icon: 'article', color: '#FF2E65' },
		{ text: 'Comics', route: '/comics', icon: 'question_answer', color: '#FF7559' },
		{ text: 'Apps', route: '/apps', icon: 'apps', color: '#0C75ED' }
	];


	let games = data.posts.filter(a => a.meta.type == 'game')
	let gallery = data.posts.filter(a => a.meta.type == 'gallery')
	let blog = data.posts.filter(a => a.meta.type == 'blog')

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>


<div id = 'main' out:fade={{duration: 200}}>

	<div id="splash">

		<div class="head">
			<img id = 'logo' src = 'ahnheewon3.png' alt = 'Logo' transition:fly={{ duration: 500 }}>
			<div id = 'ahw'>
				<img class = 'letter a 1' src = 'a.svg' in:fly={{ x: 80, delay: 100 }}>
				<img class = 'letter h 2' src = 'h.svg' in:fly={{ x: 80, delay: 150 }}>
				<img class = 'letter n 3' src = 'n.svg' in:fly={{ x: 80, delay: 200 }}>
				<img class = 'letter h 4' src = 'h.svg' in:fly={{ x: 80, delay: 300 }}>
				<img class = 'letter e 5' src = 'e.svg' in:fly={{ x: 80, delay: 400 }}>
				<img class = 'letter e 6' src = 'e.svg' in:fly={{ x: 80, delay: 500 }}>
				<img class = 'letter w 7' src = 'w.svg' in:fly={{ x: 80, delay: 600 }}>
				<img class = 'letter o 8' src = 'o.svg' in:fly={{ x: 80, delay: 700 }}>
				<img class = 'letter n 9' src = 'n.svg' in:fly={{ x: 80, delay: 800 }}>
			</div>

			<h3>
				Design · Webdev · Comics · AI
			</h3>

			<div class = 'links'>
				{#each links as link, index}
					<div
						class="link hoverable"
						transition:fly={{y: -30, delay: index*75}}
					>
						<span class="material-icons" style="color: {link.color}">
							{link.icon}
						</span>
						<h3>
							{link.text}
						</h3>
					</div>
				{/each}
			</div>

		</div>

	</div>


	<!--
	<section>
		<div class = 'header'>
			<h1 class = 'title'> Featured Projects </h1>
			<h2 class = 'subtitle'> This is all my stuff. </h2>
		</div>
		<div class = 'posts'>
			<Cards data={{posts: games}} />
		</div>
	</section>

	<section>
		<div class = 'header'>
			<h1 class = 'title'> Games </h1>
			<h2 class = 'subtitle'> This is all my stuff. </h2>
		</div>
		<div class = 'posts'>
			<Cards data={{posts: games}} />
		</div>
	</section>

	<section>
		<div class = 'header'>
			<h1 class = 'title'> Blog </h1>
			<h2 class = 'subtitle'> I write about tech, art, and world events. </h2>
		</div>
		<div class = 'posts'>
			<Cards data={{posts: blog}} />
		</div>
	</section>

	<section>
		<div class = 'header'>
			<h1 class = 'title'> Design & Art </h1>
			<h2 class = 'subtitle'> It's not a hobby, it's a lifestyle. </h2>
		</div>
		<div class = 'posts'>
			<Cards data={{posts: gallery}} />
		</div>
	</section>

	-->

	<section>
		<div class = 'header'>
			<h1 class = 'title'> Everything Else </h1>
			<h2 class = 'subtitle'> This is all my stuff. </h2>
		</div>
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
		margin: 0;
		gap: 0;
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
		//height: 80vh;
		//background: yellow;
		//background: rgba(yellow, 0.25);
		margin: 0;
		padding: 40px 0;
		.header{
			text-align: center;
			padding: 60px 0;
			.title{
				font-size: 40px;
				font-weight: 900;
				width: 100%;
				max-inline-size: 100%;
				margin-bottom: 12px;
			}
			.subtitle{
				font-size: 20px;
				font-weight: 400;
				width: 100%;
				max-inline-size: 100%;
			}
		}
		.posts{
			flex-wrap: wrap;
			justify-content: space-between;
			margin: auto;
			width: 1120px;
			max-width: 90%;
			padding: 0;
		}
	}

	#splash{
		margin: 0;

		height: 90vh;
		width: 100vw;

		position: relative;
		//top: 40px;

		/*
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		*/
	}

	.head{
		/*
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		*/

		#logo{
			display: none;
		}

		#ahw{
			display: flex;
			justify-content: center;
			align-items: flex-end;
			gap: 0;
			margin-bottom: 56px;
			filter: drop-shadow(2px 6px 8px rgba(#030025, 0.3));

			.letter{
				flex-shrink: 0;
				margin: 0 -4px;

				&.a{
					margin: 0px -8px -2px 0;
				}

				&.e{
					margin: 0 -1px;
				}

				&.w{
					margin: 0 -7px 1px -7px;
				}

				&.o{
					margin: 0 -3px -2px -5px;
				}

				&.n{
					margin: 0 -6px 0 -2px;
				}
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

		h3{
			//display: none;

			font-size: 24px;
			font-weight: 500;
			letter-spacing: -0.2px;

			margin-top: -10px;
			margin-bottom: 36px;
		}
	}


	.links{
		display: flex;
		gap: 24px;
		position: sticky !important;
		top: 10px;

		.link{
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 20px;
			border-radius: 60px;
			box-shadow: 0 20px 50px rgba(#030025, 0.15), inset 0 -4px 8px rgba(#030025, 0.02);
			//border: 2px solid white;
			background: rgba(white, 0.2);
			backdrop-filter: blur(5px);

			transition: 0.2s ease;
			cursor: pointer;

			span{
				font-size: 36px;
			}

			h3{
				font-size: 18px;
				font-weight: 700;
				//display: none;
				display: none;
			}

			&:hover{
				transform: scale(1.1);
				background: rgba(white, 0.1);
			}
		}
	}



	/* Blog */

	#posts {
		//display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: auto;
		width: 1150px;
		max-width: 90%;
		padding: 0;

		//width: 95%;
		//max-width: 95%;
		//border: 1px solid red;
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

	@media screen and (max-width: 800px){

		.head{
			#logo{
				display: block;
				height: auto;
				width: 90vw;
				margin-bottom: 32px;
			}
			#ahw{
				display: none;
			}
			.links{
				display: none;
			}
		}
	}


</style>
