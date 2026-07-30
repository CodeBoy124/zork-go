<script lang="ts">
	const { roles }: { roles: { title: string; name: string; prayer: string }[] } = $props();

	let sheet_id = $state(0);

	$effect(() => {
		if (sheet_id > roles.length) {
			sheet_id = roles.length - 1;
		}
	});
</script>

<div class="screen">
	<div class="current bg-paper">
		<button onclick={() => sheet_id++}>
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
		max-width: 500px;
		margin: auto;
		width: 100vw;
		height: 100vh;
		font-size: 24px;
	}

	.title {
		font-size: 32px;
	}

	.current {
		border-radius: 0 0 8vw 8vw;
		padding: 8vw;
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
		padding: 0 8vw;
		display: flex;
		align-items: center;
		font-size: 32px;
	}

	.linebreaks {
		white-space: pre-line;
	}
</style>
