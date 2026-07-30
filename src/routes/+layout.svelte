<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		--max-screen-width: 500px;
		--base-font-size: 24px;
		--heading-font-size: 32px;
		--padding: min(30px, 5vh);
	}

	:global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Courier New', Courier, monospace;
	}

	:global(body),
	:global(.bg-wood) {
		background-image: url('/images/wood.png');
	}

	:global(.bg-paper) {
		background-image: url('/images/paper.png');
	}
</style>
