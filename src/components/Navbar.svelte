<script lang="ts">
	import { page } from '$app/stores';
</script>

<navbar>
	<ul class="flex gap-8">
		<a
			href="/"
			aria-current={$page.url.pathname === '/'}
			class:text-purple-600={$page.url.pathname === '/'}
			class:font-semibold={$page.url.pathname === '/'}
		>
			Simulador
		</a>
		<a
			href="/docs"
			aria-current={$page.url.pathname === '/docs'}
			class:text-purple-600={$page.url.pathname === '/docs'}
			class:font-semibold={$page.url.pathname === '/docs'}>Documentacion</a
		>
	</ul>
</navbar>
