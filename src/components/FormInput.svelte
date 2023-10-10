<script lang="ts">
	export let label: string;
	export let value: number | null;
</script>

<label class="text-black grid gap-2">
	<span>{label}</span>
	<input bind:value type="number" class="bg-white rounded-lg border-2 border-purple-600 p-2" />
</label>
