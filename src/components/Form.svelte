<script lang="ts">
	export let handleSubmit: () => void;
	export let btnText: string;
</script>

<div class=" grid gap-4 w-1/4 max-w-md bg-slate-200 p-6 rounded-lg shadow-xl">
	<slot />
	<div class="flex justify-center">
		<button
			on:click={handleSubmit}
			class="font-bold text-lg w-2/3 h-14 bg-purple-600 p-4 text-middle active:scale-95 duration-125 transition-all ease-in-out text-white rounded-xl"
			>{btnText}</button
		>
	</div>
</div>
