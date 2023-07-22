<script lang="ts">
	import Toggle from './toggle.svelte'
	import * as config from '$lib/config'
</script>

<nav>
	<a href="/" class="title">
		<img src = 'Hackerdash-text.svg'>
	</a>

	<ul class="links">
		<li>
			<a href="/"> Home </a>
		</li>
		<li>
			<a href="/blog"> Blog </a>
		</li>
		<li>
			<a href="/about"> About </a>
		</li>
		<!--
		<li>
			<a href="/contact">Contact</a>
		</li>
		<li>
			<a href="/rss.xml" target="_blank">RSS</a>
		</li>
		-->
	</ul>

	<Toggle />
</nav>

<style lang = "scss">

	img{
		height: 32px;
	}

	nav {
		position: fixed;
		top: 20px;
		left: 20px;
		width: calc(100vw - 40px);
		padding: 15px 30px;
		border-radius: 5px;
		background: #ff0051;
		display: flex;
		align-items: center;
	}

	.links {
		margin-block: var(--size-7);
	}

	a {
		color: inherit;
		text-decoration: none;
		color: rgba(255,255,255,0.5);
		font-weight: 500;
		font-size: 16px;
		transition: 0.2s ease;
	}

	a:hover{
		color: rgba(255,255,255,0.8);
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-between;
		}

		.links {
			display: flex;
			gap: var(--size-7);
			margin-block: 0;
		}
	}
</style>
