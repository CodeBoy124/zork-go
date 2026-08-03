<script lang="ts">
	import BookmarkButton from '../components/BookmarkButton.svelte';
	const { roles }: { roles: { title: string; name: string; prayer: string }[] } = $props();

	let sheet_id = $state(0);
	let prayer_text_el: HTMLElement | null = null;
	let is_last_sheet = $derived(sheet_id == roles.length - 1);

	$effect(() => {
		if (sheet_id > roles.length) {
			sheet_id = roles.length - 1;
		}
	});

	function toNextScreen() {
		sheet_id++;
		if (sheet_id >= roles.length) {
			sheet_id = roles.length - 1;
		}

		if (prayer_text_el != null) {
			prayer_text_el.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	}
</script>

<div class="screen bg-wood">
	<div class="current bg-paper">
		<h1 class="title">{roles[sheet_id].title}: {roles[sheet_id].name}</h1>
		<p class="prayer" bind:this={prayer_text_el}>{roles[sheet_id].prayer.replace(/\n/g, '\n\n')}</p>
	</div>
	{#if !is_last_sheet}
		<div class="upcomming">
			<h2 class="upcomming-txt">
				Zo: {sheet_id + 1 >= roles.length ? '-' : roles[sheet_id + 1].name}
			</h2>
			<BookmarkButton action={toNextScreen} />
		</div>
	{/if}
</div>

<style>
	.screen {
		max-width: var(--max-screen-width);
		margin: auto;
		width: 100dvw;
		height: 100dvh;
		font-size: var(--base-font-size);
	}

	.title {
		font-size: var(--heading-font-size);
	}

	.current {
		border-radius: 0 0 var(--padding) var(--padding);
		padding: var(--padding);
		width: 100%;
		height: 85dvh;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.prayer {
		flex: 1 1 auto;
		overflow-y: scroll;
		white-space: pre-line;
	}

	.upcomming {
		width: 100%;
		height: 15dvh;
		padding: 0 var(--padding);
		display: flex;
		justify-content: space-between;
		align-items: start;
	}

	.upcomming-txt {
		color: rgba(255, 255, 255, 0.5);
		font-size: var(--heading-font-size);
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
