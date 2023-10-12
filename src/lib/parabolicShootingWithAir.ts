import type { Params, Simulation } from '../types';
import { C, P_A, S } from './constants';
import { getPosition } from './getPosition';
import { getVelocity, getVelocityX, getVelocityY } from './getVelocity';
import { degToRad, isFlying } from './utils';

export const getParabolicShootingWithAir = (params: Params): Simulation => {
	const { dt, initialVelocity, initialHeight, m } = params;

	// FD: magnitud de la resistencia del aire
	// A: FD / 2m
	const A = (C * S * P_A) / (2 * m);

	console.log(A);

	const alfa = degToRad(params.alfa);

	let t = 0;

	const vx = [initialVelocity * Math.cos(alfa)];
	const vy = [initialVelocity * Math.sin(alfa)];

	const v = [getVelocity({ vx, vy })];

	const x = [0];
	const y = [initialHeight];

	const pos = [{ x: x[0], y: y[0] }];

	while (isFlying(y) || y.length === 1) {
		t += dt;

		vx.push(getVelocityX({ vAxis: vx, v, A, dt }));

		vy.push(getVelocityY({ vAxis: vy, v, A, dt }));

		v.push(getVelocity({ vx, vy }));

		const currPos = getPosition({ x, y, vx, vy, dt });

		x.push(currPos.x);

		y.push(currPos.y);

		pos.push(currPos);
	}

	return {
		pos,
		vx,
		vy,
		t
	};
};
