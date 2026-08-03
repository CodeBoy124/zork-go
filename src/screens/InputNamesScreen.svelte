<script lang="ts">
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
		<button class="next-btn shadow" onclick={generateRolesAndGoNext} aria-label="Volgende">
			<div class="next-btn-highlight"></div>
			<div class="next-btn-icon"></div>
			<div class="next-btn-wires shadow"></div>
		</button>
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
		padding: var(--padding);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.next-btn {
		position: relative;
		width: 75px;
		height: 75px;
		border-radius: 50%;
		border: 10px solid gray;
		cursor: pointer;
		background: #2fff00;
		background: radial-gradient(circle, #2fff00 0%, #308f00 100%);
		overflow-y: visible;
	}

	.next-btn-highlight {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 30%;
		height: 30%;
		background: rgba(255, 255, 255, 0.5);
		background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
		border-radius: 50%;
		transform: translate(0, -100%);
	}

	.next-btn-icon {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
		transform: translate(-50%, -50%);

		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;

		border-left: 15px solid rgba(0, 0, 0, 0.7);
	}

	.next-btn-wires {
		position: absolute;
		left: 50%;
		top: calc(100% + 10px);
		transform: translate(-50%, 0);
		width: 0;
		height: calc(var(--padding) - 15px);
		border-left: 5px solid red;
		border-right: 5px solid blue;
		filter: brightness(75%);
	}
</style>
