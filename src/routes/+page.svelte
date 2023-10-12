<script lang="ts">
	import { getParabolicShootingWithAir } from '$lib/parabolicShooting';
	import Form from '../components/Form.svelte';
	import Input from '../components/FormInput.svelte';
	import type { Simulation } from '../types';
	import Scatter from '../components/Scatter.svelte';

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

	let width;
	let height;
</script>

<main class="w-full h-full px-8 py-4 rounded-xl">
	<h1 class="mb-8 h-fit text-4xl">
		Taller 1. Simulacion de un Disparo parabolico con resistencia del aire
	</h1>
	<div class="flex gap-4">
		<Form {handleSubmit} btnText="Simular">
			<h2 class="text-2xl font-bold">Entradas</h2>
			<Input
				bind:value={inputValues.initialHeight}
				label={'Altura inicial (en m)'}
				unit="m"
				min="0"
				max="1000"
			/>
			<Input
				bind:value={inputValues.alfa}
				label={'Angulo de disparo (en grados)'}
				unit="°"
				min="0"
				max="90"
			/>
			<Input
				bind:value={inputValues.initialVelocity}
				label={'Velocidad de lanzamiento (en m/s)'}
				unit="m/s"
				min="300"
				max="1500"
			/>
			<Input
				bind:value={inputValues.m}
				label={'Masa del proyectil (en kg)'}
				unit="kg"
				min="4"
				max="100"
			/>
		</Form>
		<div
			bind:clientWidth={width}
			bind:clientHeight={height}
			class="w-2/3 grid gap-4 bg-slate-200 p-6 rounded-lg shadow-xl"
		>
			{width}
			{height}
			<h2 class="text-2xl font-bold text-center">Simulacion</h2>
			{#if simulation && simulation?.pos}
				<!-- <ScatterChart data={simulation.pos} /> -->
				<Scatter data={[{ id: 'Air Resistance', data: simulation.pos }]} />
			{/if}

			<!-- {#if simulation && simulation?.pos}
				{simulation.t}
				<svg {width} height={500} class="bg-pink-300">
					<g>
						{#each simulation.pos as { x, y }}
							<circle cx={xScale(x)} cy={yScale(y)} r="4" fill="blue" stroke="black" />
						{/each}
					</g>
				</svg>
			{/if} -->
		</div>
	</div>
</main>
