<script lang="ts">
	import * as config from '$lib/config'
</script>

<footer>
	<p>{config.title} &copy {new Date().getFullYear()}</p>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-top: 1px solid var(--border);
		width: 100vw !important;
	}

	p {
		color: var(--text-2);
		font-size: 14px;
		font-weight: 200;
		letter-spacing: 0px;
		text-align: center;
		width: 100%;
		background: red;
	}
</style>
