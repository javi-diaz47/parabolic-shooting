import type { GetPosition } from '../types';
import { lastIndex } from './utils';

export const getPosition = ({ x, y, vx, vy, dt }: GetPosition) => {
	return {
		x: lastIndex(x) + lastIndex(vx) * dt,
		y: lastIndex(y) + lastIndex(vy) * dt
	};
};
