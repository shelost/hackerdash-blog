<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>

                <div class = 'profile'>
                    <a href="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AITFw-xPEYrPxiy026fqjw7Rjxen5nkMMpx8rP8_gYRhj4f1kkcUhXKJyhTE55n1MXPaQz-cKjTs_EuXD7whMajZsdR0HAn29A=s2560" /> </a>
                    <h2> {post.author} </h2>
                </div>

				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
		gap: var(--size-7);
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



	ul{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 90vw;
	}

	.post {
		width: 900px;
		max-inline-size: 90%;
		color: white;

		border-radius: 20px;

		padding: 20px;


	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: 40px;
		font-weight: 700;
		text-transform: capitalize;
        color: white;
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
