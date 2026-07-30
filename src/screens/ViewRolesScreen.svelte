<script lang="ts">
	const { roles }: { roles: { title: string; name: string; prayer: string }[] } = $props();

	let sheet_id = $state(0);

	$effect(() => {
		if (sheet_id > roles.length) {
			sheet_id = roles.length - 1;
		}
	});

	function toNextScreen() {
		sheet_id++;
		if (sheet_id >= roles.length) {
			document.exitFullscreen();
			sheet_id = roles.length - 1;
		}
	}
</script>

<div class="screen bg-wood">
	<div class="current bg-paper">
		<button onclick={toNextScreen}>
			<h1 class="title">{roles[sheet_id].title}: {roles[sheet_id].name}</h1>
		</button>
		<p class="scrollable linebreaks">{roles[sheet_id].prayer.replace(/\n/g, '\n\n')}</p>
	</div>
	<h2 class="upcomming">Zo: {sheet_id + 1 >= roles.length ? '-' : roles[sheet_id + 1].name}</h2>
</div>

<style>
	button {
		background-color: transparent;
		border: none;
		outline: none;
		padding: 0;
		margin: 0;
	}

	.screen {
		max-width: var(--max-screen-width);
		margin: auto;
		width: 100vw;
		height: 100vh;
		font-size: var(--base-font-size);
	}

	.title {
		font-size: var(--heading-font-size);
	}

	.current {
		border-radius: 0 0 var(--padding) var(--padding);
		padding: var(--padding);
		width: 100%;
		height: 85vh;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.scrollable {
		flex: 1 1 auto;
		overflow-y: scroll;
	}

	.upcomming {
		width: 100%;
		height: 15vh;
		color: white;
		padding: 0 var(--padding);
		display: flex;
		align-items: center;
		font-size: var(--heading-font-size);
	}

	.linebreaks {
		white-space: pre-line;
	}
</style>
