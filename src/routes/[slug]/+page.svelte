<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { expandedPost } from '$lib/store';
	import { formatDate } from '$lib/utils';
	export let data;

	// Reactive variables for bounding box and transition
	let boundingBox = { x: 0, y: 0, width: 0, height: 0 };
	expandedPost.subscribe((value) => {
		if (value?.boundingBox) {
			boundingBox = value.boundingBox;
			console.log('yo')
		}
	});




	// Tweened values for smooth transitions
	const position = tweened(boundingBox, { duration: 500 });


	console.log($expandedPost);
	console.log(boundingBox)
	setTimeout(() => {
		console.log(boundingBox)
	}, 600);
</script>


<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>



<div
  class="expanded-container"
  style="
    position: absolute;
    top: {position?.y || 50}px;
    left: {position?.x || 0}px;
    width: {position?.width || '100%'}px;
    height: {position?.height || 'auto'}px;
    transition: all 0.5s ease;
  "
>
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

</div>

<style>

	.expanded-container{
		border: 1px solid red;
	}

	article {
		width: 900px;
		max-inline-size: 90%;
		margin-inline: auto;
		padding: 40px;
		border-radius: 12px;

		cursor: default;
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



	:global(.gallery){
		display: grid;
		grid-column: 2;
	}

</style>
