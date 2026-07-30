<script lang="ts">
	import { generateRoles, rolesToCopyMessage } from '$lib/generate_roles';

	let props: { onNext: (roles: { title: string; name: string; prayer: string }[]) => void } =
		$props();
	let names_input = $state(
		'opening\n\ngebedsintenties\n\nmysteries\n\nafsluitingsgebeden\n\nsalveregina'
	);

	function generateRolesAndGoNext() {
		const rolverdeling = generateRoles(names_input);
		navigator.clipboard.writeText(rolesToCopyMessage(rolverdeling));
		props.onNext(rolverdeling);
	}
</script>

<div class="screen">
	<div class="insert-area bg-paper">
		<textarea bind:value={names_input} class="input"></textarea>
	</div>
	<div class="nav-area">
		<button class="next-btn" onclick={generateRolesAndGoNext}>Next</button>
	</div>
</div>

<style>
	.screen {
		max-width: 500px;
		margin: auto;
		width: 100vw;
		height: 100vh;
	}

	.insert-area {
		border-radius: 0 0 8vw 8vw;
		padding: 8vw;
		width: 100%;
		height: 85vh;
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
		height: 15vh;
		color: white;
		padding: min(8vw, 3vh) 8vw;
		display: flex;
		align-items: center;
	}

	.next-btn {
		width: 100%;
		height: 100%;
		background-color: red;
		color: black;
		border: 5px solid black;
		border-radius: 5px;
		font-size: large;
	}
</style>
