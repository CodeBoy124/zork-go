<script lang="ts">
	const { action }: { action: () => void } = $props();
</script>

<button onclick={action} class="bookmark shadow" aria-label="Volgende">Next</button>

<style>
	.bookmark {
		position: relative;
		background-color: rgb(198, 0, 0);
		background: linear-gradient(rgb(198, 0, 0) 0%, rgb(118, 0, 0) 100%);
		width: 30px;
		height: 66%;
		border: none;
		outline: none;
		cursor: pointer;
		border-radius: 0 0 3px 3px;

		writing-mode: vertical-lr;
		text-orientation: upright;
		font-weight: bold;
		color: rgba(255, 255, 255, 0.7);
	}
</style>
