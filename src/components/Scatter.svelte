<script lang="ts">
	import {
		insetLeft,
		marginLeft,
		colors,
		filled,
		height,
		marginBottom,
		marginRight,
		marginTop,
		r,
		tooltipBackground,
		tooltipTextColor,
		width,
		xFormat,
		xLabel,
		yFormat,
		yLabel
	} from '$lib/d3Constants';

	import '../Scatter.css';
	import { storeScatterChart } from '../store/storeScatterChart';
	import type { Data } from '../types';

	// type Point = [number, number, number];
	export let data: Data[];

	// Hover points
	let selectedDot: number | null;
	let dotInfo: [number[], number, FocusEvent | MouseEvent];

	$: storeScatterChart.updateChart(data);

	// .filter((el) => reactiveFilters.includes(colors[el[2]]));
</script>

<h2>{data[0].id} - {data[0].data[2].y}</h2>

<div class="scatter_plot_container">
	<svg
		{width}
		{height}
		viewBox="0 0 {width} {height}"
		on:mouseout={() => {
			dotInfo = null;
			selectedDot = null;
		}}
		on:blur={() => {
			dotInfo = null;
			selectedDot = null;
		}}
	>
		{#if $storeScatterChart}
			<g class="y-axis" transform="translate({marginLeft}, 0)">
				<path class="domain" stroke="black" d="M{insetLeft}, {marginTop} V{height}" />
				{#each $storeScatterChart.reactiveYTicks as tick}
					<g class="tick" transform="translate(0, {$storeScatterChart.yScale(tick)})">
						<line class="tick-start" x1={insetLeft - 6} x2={insetLeft} />
						<line class="tick-grid" x1={insetLeft} x2={width - marginLeft - marginRight} />
						<text x={-marginLeft} y="10">{tick + yFormat}</text>
					</g>
				{/each}
				<text x="-{marginLeft}" y={marginTop - 5}>{yLabel}</text>
			</g>

			<g class="x-axis" transform="translate(0,{height - marginBottom})">
				<path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
				{#each $storeScatterChart.reactiveXTicks as tick}
					<g class="tick" transform="translate({$storeScatterChart.xScale(tick)}, 0)">
						<line class="tick-start" stroke="black" y2="6" />
						<line class="tick-grid" y2="-{height - marginTop}" />
						<text x={-marginLeft} y="20">{tick + xFormat}</text>
					</g>
				{/each}
				<text x={width - marginLeft - marginRight - 40} y={marginBottom}>{xLabel}</text>
			</g>

			{#each $storeScatterChart.scaledPoints as dot, i}
				{#if i === selectedDot}
					<circle
						cx={dot[0]}
						cy={dot[1]}
						r={r + 2}
						stroke={colors[dot[2]]}
						fill={filled ? colors[dot[2]] : 'none'}
					/>
				{:else}
					<circle
						cx={dot[0]}
						cy={dot[1]}
						{r}
						stroke={colors[dot[2]]}
						fill={filled ? colors[dot[2]] : 'none'}
					/>
				{/if}
			{/each}
			{#each $storeScatterChart.scaledPoints as dot, i}
				<g class="dot" opacity="1">
					{#if $storeScatterChart.reactiveFilters.includes(colors[dot[2]])}
						{#if i === selectedDot}
							<circle
								cx={dot[0]}
								cy={dot[1]}
								r={r + 2}
								stroke={colors[dot[2]]}
								fill={filled ? colors[dot[2]] : 'none'}
							/>
						{:else}
							<circle
								cx={dot[0]}
								cy={dot[1]}
								{r}
								stroke={colors[dot[2]]}
								fill={filled ? colors[dot[2]] : 'none'}
							/>
						{/if}
						<path
							stroke="none"
							fill-opacity="0"
							class="voronoi-cell"
							d={$storeScatterChart.reactiveVoronoi.renderCell(i)}
							on:mouseover={(e) => {
								selectedDot = i;
								dotInfo = [dot, i, e];
							}}
							on:focus={(e) => {
								selectedDot = i;
								dotInfo = [dot, i, e];
								e.target.classList.add('selectedDot');
							}}
						/>
					{/if}
				</g>
			{/each}
		{/if}
	</svg>

	<!-- Tooltip -->
	{#if dotInfo}
		<div
			class="dot_info"
			style="left:{dotInfo[2].clientX - (2 / 3) * width + 12}px; 
      top:{dotInfo[2].clientY -
				height / 3 +
				12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}"
		>
			<span
				class="scatter_legend_span"
				style="background-color: {colors[$storeScatterChart.points[dotInfo[1]][2]]}; height:{width /
					100}px; width:{width / 100}px; "
			/>
			{$storeScatterChart.subsets
				? $storeScatterChart.subsets[$storeScatterChart.points[dotInfo[1]][2]]
				: ''}
			{'x'}: {$storeScatterChart.points[dotInfo[1]][0].toFixed(3)},
			{'y'}: {$storeScatterChart.points[dotInfo[1]][1].toFixed(3)}
		</div>
	{/if}

	<!-- Legend/Filters -->
	<section class="scatter_legend" style="width:{width / 10}px; font-size: {width / 75}px">
		{#if $storeScatterChart.subsets}
			<h1 class="legend_title"><b>Legend</b></h1>
			<h5 class="legend_note">Click to Filter</h5>
			{#each $storeScatterChart.subsets as subset, i}
				<div
					class="scatter_legend_info"
					on:click={() => $storeScatterChart.reactiveFilter(colors[i])}
				>
					<span
						class="scatter_legend_span"
						style="background-color: {colors[i]}; height:{width / 50}px; width:{width / 50}px; "
					/>
					{subset}
				</div>
			{/each}
		{/if}
	</section>
</div>
