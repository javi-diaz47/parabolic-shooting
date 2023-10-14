<script>
	import Katex from 'svelte-katex';
</script>

<div class="flex justify-center p-4">
	<div
		class="text-black flex flex-col gap-8 text-xl w-full max-w-[96rem] bg-slate-50 p-4 rounded-lg shadow-xl"
	>
		<h2 class="text-4xl font-semibold text-center">Documentación</h2>
		<div
			class="text-black gap-8 text-xl w-full max-w-[96rem] grid grid-flow-row lg:grid-cols-3 bg-slate-50 p-4 rounded-lg shadow-xl"
		>
			<div class="col-span-1 flex flex-col gap-4">
				<h2 class="text-3xl font-semibold">Ecuaciones del Movimiento Parabolico</h2>
				<p>
					Las ecuaciones básicas del movimiento parabólico en ausencia de resistencia del aire son:
				</p>
				<ul>
					<li class="flex flex-col">
						<div class="font-bold">
							Posición Horizontal x:
							<div class="ml-4">
								<Katex>x(t) = x_0 + v_0 \cdot \cos(\theta) t</Katex>
							</div>
						</div>
					</li>
					<li class="flex flex-col">
						<div class="font-bold">
							Posición Horizontal x:
							<div class="ml-4">
								<Katex>y(t) = y_0 + v_0 \cdot \sin(\theta) t - \frac{1}{2}gt^2</Katex>
							</div>
						</div>
					</li>
				</ul>
				<div class="mt-2">
					<p class="font-semibold">Donde:</p>
					<ul class="ml-8 grid gap-2">
						<li>
							<Katex>x(t)</Katex> y <Katex>y(t)</Katex> son las posiciones horizontal y vertical en el
							tiempo t,
						</li>
						<li>
							<Katex>x_0=0</Katex> y<Katex>y_0</Katex> son las posiciones iniciales en dirección horizontal
							y vertical,
						</li>
						<li>
							<Katex>v_0</Katex> es la velocidad inicial
						</li>
						<li>
							<Katex>\theta</Katex> es el ángulo de lanzamiento,
						</li>
						<li>
							<Katex>g</Katex> es la aceleración debida a la gravedad.
						</li>
					</ul>
				</div>
			</div>

			<div class="col-span-1 flex flex-col gap-4">
				<h3 class="text-3xl font-semibold">Fuerza de Resistencia del Aire</h3>
				<p>
					La fuerza de resistencia del aire
					<Katex>{'F_{drag}'}</Katex>
					se calcula utilizando la fórmula de resistencia del aire:
				</p>
				<Katex>
					F_{'{drag}'} = \frac{1}{2} \rho v^2 C_d A
				</Katex>
				<div class="mt-2">
					<p class="font-semibold">Donde:</p>
					<ul class="ml-8 grid gap-2">
						<li>
							<Katex>\rho</Katex> es la densidad del aire,
						</li>
						<li>
							<Katex>v</Katex> es la velocidad del objeto,
						</li>
						<li>
							<Katex>C_d</Katex> es el coeficiente de arrastre,
						</li>
						<li>
							<Katex>A</Katex> es el area trasnversal del objeto
						</li>
					</ul>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<h3 class="text-3xl font-semibold">
					Integración de la Resistencia del Aire en el Movimiento Parabólico
				</h3>
				<p>
					La fuerza de resistencia del aire afecta tanto a la posición horizontal como a la vertical
					del objeto. Para integrar esto en las ecuaciones del movimiento parabólico, se deben
					agregar términos que representen la aceleración debida a la resistencia del aire en ambas
					direcciones.
				</p>
				<ul class="flex flex-col gap-2">
					<li class="flex flex-col">
						<div class="font-bold">
							Posición Horizontal con Resistencia del Aire
							<div class="ml-4">
								<Katex>
									x(t) = x_0 + v_0 \cdot \cos(\theta) t - \frac{1}{2} \frac{'{F_{drag}}{m}'} t^2
								</Katex>
							</div>
						</div>
					</li>
					<li class="flex flex-col">
						<div class="font-bold">
							Posición Vertical con Resistencia del Aire
							<div class="ml-4">
								<Katex>
									y(t) = y_0 + v_0 \cdot \sin(\theta) t - \frac{1}{2}gt^2 - \frac{1}{2} \frac{'{F_{drag}}{m}'}
									t^2
								</Katex>
							</div>
						</div>
					</li>
				</ul>
				<div>
					<p class="font-semibold">Donde:</p>
					<ul class="ml-8">
						<li>
							<Katex>m</Katex> es la masa del cuerpo {'(misil)'}.
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
