<script lang="ts">
	// import { getParabolicShootingWithAir } from '$lib/parabolicShootingWithAir';
	import Form from '../components/Form.svelte';
	import Input from '../components/FormInput.svelte';
	import type { Data, Params } from '../types';
	import Scatter from '../components/Scatter.svelte';
	import { getParabolicShooting } from '$lib/parabolicShooting';
	import DownloadIcon from '../components/DownloadIcon.svelte';
	import { downloadSpreadsheet } from '$lib/downloadSpreadsheet';

	let inputValues: Params = {
		alfa: 45,
		m: 40,
		dt: 0.05,
		initialHeight: 1,
		initialVelocity: 200
	};

	const runSimulation = () => {
		// const parabolicWithAir = getParabolicShootingWithAir(inputValues);
		const parabolicIdeal = getParabolicShooting(inputValues);
		const parabolicWithAir = getParabolicShooting({ ...inputValues, airResistant: true });

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

<main class="w-full h-full items-center flex flex-col rounded-xl">
	<h1 class="mb-8 h-fit text-5xl font-semibold">
		Taller 1. Simulacion de un Disparo parabolico con
		<span
			class="bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-purple-500 to-pink-500"
		>
			resistencia del aire
		</span>
	</h1>
	<div>
		<div class="flex flex-col gap-4 lg:flex-row lg:gap-12">
			<Form {handleSubmit} btnText="Simular">
				<h2 class="text-3xl text-center font-bold">Entradas</h2>
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
					max="300"
				/>
				<Input
					bind:value={inputValues.m}
					label={'Masa del proyectil (en kg)'}
					unit="kg"
					min="10"
					max="80"
				/>
			</Form>
			<div class="w-full grid gap-4 bg-slate-200 p-6 rounded-lg shadow-xl">
				<h2 class="text-3xl font-bold text-center">Simulacion</h2>
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
	</div>
</main>
