<script lang="ts">
	import { formatDate } from '$lib/utils'
	export let data
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h3>{data.meta.series}</h3>
		<h1>{data.meta.title}</h1>

		<div class = 'profile'>
			<a href="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560" /> </a>
			<h2> {data.meta.author} </h2>
		</div>

		<p> {formatDate(data.meta.date)}</p>
	</hgroup>


	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>


	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<style>

	article {
		width: 900px;
		max-inline-size: 90%;
		margin-inline: auto;
		background: white;
		padding: 40px;
		border-radius: 12px;
	}

	.profile{
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 20px 0;
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

	h1 {
		text-transform: capitalize;
	}


	h1 + p {
		width: 100%;

		margin-top: var(--size-2);
		color: var(--text-2);
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
