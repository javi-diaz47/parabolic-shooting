<script lang="ts">
	export let label: string;
	export let value: number | null;
	export let unit: string;
	export let max: string;
	export let min: string;
</script>

<!-- <label class="text-black grid gap-2 h-12">
	<span>{label}</span>
	<input bind:value type="number" class="bg-white rounded-lg border-2 border-purple-600 p-2" />
</label> -->

<label for="customRange1" class="text-black text-lg mb-2 inline-block">
	<span>{label}: {value}{unit}</span>
	<input
		bind:value
		{max}
		{min}
		step="0.1"
		type="range"
		class="h-2 w-full cursor-pointer accent-purple-600
	"
	/>
</label>
