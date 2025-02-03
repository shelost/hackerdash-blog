<script>
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { fly, scale } from 'svelte/transition';
	import { quintOut, cubicOut } from 'svelte/easing';

	let show = false;
	setTimeout(() => {
		show = true;
	}, 400);

	const links = [
		{ text: 'Design', route: '/design' },
		{ text: 'Games', route: '/games' },
		{ text: 'Blog', route: '/blog' },
		{ text: 'Comics', route: '/comics' },
		{ text: 'Apps', route: '/apps' }
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

<nav>
	<div class="title" on:click={() => { goto(`/`); }}>
		<img src='smiley.png' class = 'smiley' alt = 'logo'>
		<img src='ahw.png' class = 'ahw' alt = 'logo'>
	</div>

	<ul class="links">
		{#if show}
			{#each links as link, index}
				<li
					bind:this={buttons[index]}
					class="hoverable"
					on:click={(event) => handleClick(event, index, link.route)}
					transition:fly={{y: -30, delay: index*75}}
				>
					{link.text}
				</li>
			{/each}
		{/if}
	</ul>

	<ul class="links">
		<li on:click={() => { goto(`/contact`); }}>
			Contact
		</li>
	</ul>
</nav>



<style lang="scss">
	@keyframes splash {
		0% { transform: scale(1); }
		30% { transform: scale(1.3); }
		60% { transform: scale(0.9); }
		100% { transform: scale(1); }
	}

	nav {
		position: fixed;
		top: 10px;
		left: 16px;
		width: calc(100vw - 32px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 3;
	}

	.title {
		background: white;
		border-radius: 12px;
		box-shadow: 0 10px 25px rgba(black, 0.1);
		padding: 8px 12px 8px 10px;

		display: flex;
		align-items: center;
		gap: 3px;

		.smiley{
			height: 24px;
		}

		.ahw {
			height: 22px;
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

		li {
			background: rgba(white, 0.9);
			padding: 3px 12px;
			border-radius: 20px;
			font-size: 14px;
			font-weight: 600;
			margin: 0;
			transition: 0.2s ease;
			border: 2px solid white;
			box-shadow: 3px 6px 14px rgba(black, 0.1), inset 0 -3px 5px rgba(black, 0.03);
			backdrop-filter: blur(12px);
			// cursor: pointer;

			&:hover {
				transform: scale(105%);
			}
		}
	}
</style>
