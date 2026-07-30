<script lang="ts">
	import InputNamesScreen from '../screens/InputNamesScreen.svelte';
	import ViewRolesScreen from '../screens/ViewRolesScreen.svelte';

	let showInputScreen = $state(true);
	let rolverdeling = $state<{ title: string; name: string; prayer: string }[]>([]);

	const goToRoleScreen = (roles: { title: string; name: string; prayer: string }[]) => {
		showInputScreen = false;
		rolverdeling = roles;
	};
</script>

{#if showInputScreen}
	<InputNamesScreen onNext={goToRoleScreen} />
{:else}
	<ViewRolesScreen roles={rolverdeling} />
{/if}
