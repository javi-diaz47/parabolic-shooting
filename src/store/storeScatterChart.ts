import { writable } from 'svelte/store';
import type { Data } from '../types';
import { Delaunay, type ScaleLinear } from 'd3';
import {
	colors,
	height,
	width,
	xRange,
	xScalefactor,
	xType,
	yRange,
	yScalefactor,
	yType
} from '$lib/d3Constants';

type Scale = ScaleLinear<number, number, never>;

interface StoreScatterChart {
	xVals: number[];
	yVals: number[];
	scaledPoints: number[][];
	reactiveDelaunay: any;
	reactiveVoronoi: any;
	reactiveXTicks: number[];
	reactiveYTicks: number[];
	xScale: Scale;
	yScale: Scale;
	subsets: string[];
	points: number[][];
	reactiveFilter: (color: string) => void;
	reactiveFilters: string[];
}

const createStoreScatterChart = () => {
	const { subscribe, set, update } = writable<StoreScatterChart>();

	const updateChart = (data: Data[]) => {
		update(() => {
			const points: number[][] = [];
			const xVals: number[] = [];
			const yVals: number[] = [];
			const subsets: string[] = [];

			data.forEach((subset, i) => {
				subset.data.forEach((coor) => {
					xVals.push(coor['x']);
					yVals.push(coor['y']);
					points.push([coor['x'], coor['y'], i, coor['t']]);
				});
				subsets.push(subset.id);
			});

			// Scaling the values
			const xDomain = [0, Math.max(...xVals)];
			const yDomain = [0, Math.max(...yVals)];

			const xScale = xType(xDomain, xRange);
			const yScale = yType(yDomain, yRange);

			let reactiveFilters = [...colors];
			const reactiveFilter = (color: string) => {
				if (reactiveFilters.includes(color))
					reactiveFilters = reactiveFilters.filter((col) => col !== color);
				else reactiveFilters = [...reactiveFilters, color];
			};

			const scaledPoints = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]]);

			const reactiveDelaunay = Delaunay.from(scaledPoints);
			const reactiveVoronoi = reactiveDelaunay.voronoi([0, 0, width, height]);

			const reactiveXTicks: number[] = [];
			let reactiveUnit = Math.round((xDomain[1] - xDomain[0]) / xScalefactor);

			for (let i = 1; i < xScalefactor + 1; i++) {
				reactiveXTicks.push(i * reactiveUnit);
			}

			const reactiveYTicks: number[] = [];
			reactiveUnit = Math.round((yDomain[1] - yDomain[0]) / yScalefactor);

			for (let i = 1; i < yScalefactor + 1; i++) {
				reactiveYTicks.push(i * reactiveUnit); // TODO make adjustable and account for optional %
			}

			return {
				xVals,
				yVals,
				scaledPoints,
				reactiveXTicks,
				reactiveYTicks,
				reactiveDelaunay,
				reactiveVoronoi,
				xScale,
				yScale,
				points,
				subsets,
				reactiveFilter,
				reactiveFilters
			};
		});
	};

	return {
		subscribe,
		set,
		update,
		updateChart
	};
};

export const storeScatterChart = createStoreScatterChart();
