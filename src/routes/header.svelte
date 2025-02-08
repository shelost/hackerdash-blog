<script>
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { fly, scale } from 'svelte/transition';
	import { quintOut, cubicOut } from 'svelte/easing';
	import { showHeader } from '$lib/store.js'
	import "material-icons/iconfont/material-icons.css";

	let show = true;
	setTimeout(() => {
		show = true;
	}, 400);

	const links = [
		{ text: 'Design', route: '/design', icon: 'palette', color: '#F959FF' },
		{ text: 'Games', route: '/games', icon: 'sports_esports', color: '#6355FF' },
		{ text: 'Blog', route: '/blog', icon: 'article', color: '#FF2E65' },
		{ text: 'Comics', route: '/comics', icon: 'question_answer', color: '#FF7559' },
		{ text: 'Apps', route: '/apps', icon: 'apps', color: '#0C75ED' }
	];

	let buttons = [];
	let splashEffect = writable(null);

	function handleClick(event, index, route) {
		const rects = buttons.map((el) => el.getBoundingClientRect());
		const clickedRect = rects[index];

		const distances = rects.map((rect, i) => {
			const dx = rect.x - clickedRect.x;
			const dy = rect.y - clickedRect.y;
			return { index: i, distance: Math.sqrt(dx * dx + dy * dy) };
		});

		distances.sort((a, b) => a.distance - b.distance);
		splashEffect.set(distances);

		goto(route);
	}

	// Custom transition combining fly and scale
	function flyAndScale(node, { y = -200, scaleFactor = 1.2, delay = 0, duration = 800, easing: cubicOut }) {
		return {
			delay,
			easing,
			duration,
			css: (t) => `
				transform: translateY(${y * (1 - t)}px) scale(${1 + (scaleFactor - 1) * t});
				opacity: ${t};
			`
		};
	}
</script>


{#if $showHeader}
	<nav>
		<div class="title" on:click={() => { goto(`/`); }} transition:fly={{x: -30, delay: 0}}>
			<img src='smiley.png' class = 'smiley' alt = 'logo'>
			<img src='ahw.png' class = 'ahw' alt = 'logo'>
		</div>

		<ul class="links">
			{#if show}
				{#each links as link, index}
					<div
						bind:this={buttons[index]}
						class="link hoverable"
						on:click={(event) => handleClick(event, index, link.route)}
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
			{/if}
		</ul>

		<ul class="links" transition:fly={{x: 30, delay: 100}}>
			<div class = 'link' on:click={() => { goto(`/contact`); }}>
				<span class="material-icons">
					phone
				</span>
				<h3>
					Contact
				</h3>
			</div>
		</ul>
	</nav>
{/if}



<style lang="scss">
	@keyframes splash {
		0% { transform: scale(1); }
		30% { transform: scale(1.3); }
		60% { transform: scale(0.9); }
		100% { transform: scale(1); }
	}

	nav {
		position: fixed;
		top: 0px;
		padding: 10px 14px;
		left: 0px;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 3;

		background-image: linear-gradient(to bottom, rgba(white, 0.75), rgba(white, 0));
	}



	.title {
		background: white;
		border-radius: 12px;
		box-shadow: 0 10px 25px rgba(black, 0.1);
		padding: 8px 12px 8px 10px;

		display: flex;
		align-items: center;
		gap: 3px;

		transition: 0.2s ease;

		.smiley{
			height: 20px;
		}

		.ahw {
			height: 18px;
			border-radius: 0;
		}

		&:hover{
			transform: scale(1.03);
		}
	}

	.links {
		gap: 12px;
		display: flex;
		align-items: center;

		.link {
			background: rgba(white, 0.9);
			padding: 5px 10px;
			border-radius: 20px;
			margin: 0;
			transition: 0.2s ease;
			border: 2px solid white;
			box-shadow: 3px 6px 20px rgba(#030025, 0.15), inset 0 -3px 5px rgba(black, 0.03);
			backdrop-filter: blur(12px);
			display: flex;
			align-items: center;
			gap: 6px;
			// cursor: pointer;

			span{
				font-size: 16px;
			}

			h3{
				font-size: 14px;
				font-weight: 600;
			}

			&:hover {
				transform: scale(105%);
			}
		}
	}

	@media screen and (max-width: 800px){

		nav{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 60px;
			background: red;
		}

		.links{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 60px;
			background: white;
		}
	}


</style>
