<script lang="ts">
	import { getParabolicShootingWithAir } from '$lib/parabolicShooting';
	import Form from '../components/Form.svelte';
	import Input from '../components/FormInput.svelte';
	import ScatterChar from '../components/ScatterChar.svelte';
	import type { Simulation } from '../types';

	let inputValues = {
		alfa: 45,
		m: 4.08,
		dt: 0.01,
		initialHeight: 1,
		initialVelocity: 270
	};

	let simulation: Simulation;

	const handleSubmit = () => {
		simulation = { ...simulation, ...getParabolicShootingWithAir(inputValues) };
	};
</script>

<main class="w-fit h-full px-8 py-4 rounded-xl">
	<h1 class="mb-8 h-fit text-4xl">
		Taller 1. Simulacion de un Disparo parabolico con resistencia del aire
	</h1>
	<div class="flex gap-4">
		<Form {handleSubmit} btnText="Simular">
			<h2 class="text-2xl font-bold">Entradas</h2>
			<Input bind:value={inputValues.initialHeight} label={'Altura inicial (en m)'} />
			<Input bind:value={inputValues.alfa} label={'Angulo de disparo (en grados)'} />
			<Input bind:value={inputValues.initialVelocity} label={'Velocidad de lanzamiento (en m/s)'} />
			<Input bind:value={inputValues.m} label={'Masa del proyectil (en kg)'} />
		</Form>
		<div class="w-2/3 grid gap-4 bg-slate-200 p-6 rounded-lg shadow-xl">
			<h2 class="text-2xl font-bold text-center">Simulacion</h2>
			{#if simulation && simulation?.pos}
				{simulation.t}
			{/if}
		</div>
	</div>
</main>
