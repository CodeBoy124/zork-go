<script lang="ts">
	import BookmarkButton from '../components/BookmarkButton.svelte';
	import { generateRoles, rolesToCopyMessage } from '$lib/generate_roles';
	import { persistedState } from 'svelte-persisted-state';

	let props: { onNext: (roles: { title: string; name: string; prayer: string }[]) => void } =
		$props();
	let names_input = persistedState(
		'names_input',
		'opening\n\ngebedsintenties\n\nmysteries\n\nafsluitingsgebeden\n\nsalveregina'
	);
	let gebedsintenties = $state('');

	function generateRolesAndGoNext() {
		const rolverdeling = generateRoles(names_input.current, gebedsintenties);
		navigator.clipboard.writeText(rolesToCopyMessage(rolverdeling));
		props.onNext(rolverdeling);
	}
</script>

<div class="screen bg-wood">
	<div class="insert-area bg-paper">
		<textarea bind:value={names_input.current} class="input" placeholder="Mogelijke mensen per rol"
		></textarea>
		<textarea bind:value={gebedsintenties} class="input" placeholder="Gebedsintenties"></textarea>
	</div>
	<div class="nav-area">
		<BookmarkButton action={generateRolesAndGoNext} />
	</div>
</div>

<style>
	.screen {
		max-width: var(--max-screen-width);
		margin: auto;
		width: 100dvw;
		height: 100dvh;
	}

	.insert-area {
		border-radius: 0 0 var(--padding) var(--padding);
		padding: var(--padding);
		width: 100%;
		height: 85dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--padding);
	}

	.input {
		width: 100%;
		height: 100%;
		background-color: transparent;
		outline: none;
		border: 1px solid black;
		padding: 10px;
	}

	.nav-area {
		width: 100%;
		height: 15dvh;
		color: white;
		padding: 0 var(--padding);
		display: flex;
		align-items: start;
		justify-content: end;
	}
</style>
