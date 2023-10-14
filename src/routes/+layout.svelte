<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<svelte:head>
	<title>Taller 1. Tanque</title>
</svelte:head>
<div class="min-h-screen grid">
	<header
		class="row-span-1 h-fit flex flex-col md:flex-row items-center w-full text-2xl bg-slate-50 text-black p-4"
	>
		<Navbar />
	</header>
	<div class="row-span-2 justify-center p-4 h-full">
		<slot />
	</div>
	<footer
		class="self-end flex flex-col md:flex-row items-center w-full text-2xl bg-purple-800 text-white p-4"
	>
		<div class="self-end">
			<div class="flex">
				<h3 class="font-bold">Integrantes:</h3>
				<ul class="grid grid-flow-col gap-2">
					<li class="ml-2">Andrea Orozco,</li>
					<li>Jhon Garcia,</li>
					<li>Javier Diaz</li>
				</ul>
			</div>
		</div>
	</footer>
</div>
