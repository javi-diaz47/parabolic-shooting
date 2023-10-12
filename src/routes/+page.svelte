<script lang="ts">
	import { getParabolicShootingWithAir } from '$lib/parabolicShootingWithAir';
	import Form from '../components/Form.svelte';
	import Input from '../components/FormInput.svelte';
	import type { Data } from '../types';
	import Scatter from '../components/Scatter.svelte';
	import { getParabolicShooting } from '$lib/parabolicShooting';
	import DownloadIcon from '../components/DownloadIcon.svelte';
	import { downloadSpreadsheet } from '$lib/downloadSpreadsheet';

	let inputValues = {
		alfa: 45,
		m: 13.7,
		dt: 0.05,
		initialHeight: 1,
		initialVelocity: 127
	};

	const runSimulation = () => {
		const parabolicWithAir = getParabolicShootingWithAir(inputValues);
		const parabolicIdeal = getParabolicShooting(inputValues);

		return [
			{
				id: 'Sin resistencia del aire',
				data: parabolicIdeal.pos
			},
			{
				id: 'Con resistencia del aire',
				data: parabolicWithAir.pos
			}
		];
	};

	let simulation: Data[] = runSimulation();

	const handleSubmit = () => {
		simulation = runSimulation();
	};

	const handleDownload = () => {
		downloadSpreadsheet([
			{
				points: simulation[1].data,
				alfa: inputValues.alfa,
				m: inputValues.m,
				v: inputValues.initialVelocity,
				dt: inputValues.dt
			},
			{
				points: simulation[0].data,
				alfa: inputValues.alfa,
				m: inputValues.m,
				v: inputValues.initialVelocity,
				dt: inputValues.dt
			}
		]);
	};
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
				max="500"
			/>
			<Input
				bind:value={inputValues.alfa}
				label={'Angulo de disparo (en grados)'}
				unit="°"
				min="0"
				max="89"
			/>
			<Input
				bind:value={inputValues.initialVelocity}
				label={'Velocidad de lanzamiento (en m/s)'}
				unit="m/s"
				min="0"
				max="154"
			/>
			<Input
				bind:value={inputValues.m}
				label={'Masa del proyectil (en kg)'}
				unit="kg"
				min="4"
				max="20"
			/>
		</Form>
		<div class="w-2/3 grid gap-4 bg-slate-200 p-6 rounded-lg shadow-xl">
			<h2 class="text-2xl font-bold text-center">Simulacion</h2>
			{#if simulation}
				<Scatter data={simulation} />
			{/if}
		</div>
	</div>
	{#if simulation}
		<div class="mt-4">
			<button
				on:click={handleDownload}
				class="flex items-center gap-2 px-6 py-4 text-white font-semibold text-xl bg-green-600 rounded-xl
					active:scale-95 transition-all duration-200 shadow-md"
			>
				Descargar datos
				<DownloadIcon className="w-6 h-6 " />
			</button>
		</div>
	{/if}
</main>
