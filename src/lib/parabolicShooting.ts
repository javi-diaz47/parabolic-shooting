import { getPosition } from './getPosition';
import { getVelocity, getVelocityX, getVelocityY } from './getVelocity';
import { degToRad, isFlying } from './utils';

export interface Params {
	dt: number;
	initialVelocity: number;
	initialHeight: number;
	alfa: number;
	A: number;
}

export const getParabolicShootingWithAir = (params: Params) => {
	const { dt, initialVelocity, initialHeight, A } = params;

	const alfa = degToRad(params.alfa);

	let t = 0;

	const vx = [initialVelocity * Math.cos(alfa)];
	const vy = [initialVelocity * Math.sin(alfa)];

	const v = [getVelocity({ vx, vy })];

	const x = [0];
	const y = [initialHeight];

	const pos = [{ x: x[0], y: y[0] }];

	while (isFlying(y)) {
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
