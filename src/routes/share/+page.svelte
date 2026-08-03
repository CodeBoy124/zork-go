<script lang="ts">
	import ViewRolesScreen from '../../screens/ViewRolesScreen.svelte';
	import { insertPickedNamesIntoText } from '../../lib/generate_roles';
	import { page } from '$app/state';

	const picked_names: string[] = (page.url.searchParams.get('v') ?? '').split(',');
	const rolverdeling: { title: string; name: string; prayer: string }[] = insertPickedNamesIntoText(
		picked_names,
		''
	);
</script>

<ViewRolesScreen roles={rolverdeling} />
