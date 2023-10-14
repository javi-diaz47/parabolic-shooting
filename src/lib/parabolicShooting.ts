import { C, GRAVITY, P_A, S } from './constants';
import { degToRad } from './utils';
import type { Params, Simulation } from '../types';

// Parameters
// const g: number = 9.8; // Acceleration due to gravity (m/s^2)
// const k: number = 0; // Coefficient of air resistance

// Simulation
export const getParabolicShooting = ({
	dt,
	initialHeight,
	initialVelocity,
	m,
	alfa,
	airResistant = false
}: Params): Simulation => {
	// Set initial conditions
	let t = 0;
	let x = 0;
	let y = initialHeight;
	const vx = [initialVelocity];
	const vy = [0];

	const pos = [{ x, y, t }];

	alfa = degToRad(alfa);
	let currVx = initialVelocity * Math.cos(alfa);
	let currVy = initialVelocity * Math.sin(alfa);

	// Perform the simulation
	while (y > 0 || t === 0) {
		t += dt;
		const currV: number = Math.sqrt(currVx ** 2 + currVy ** 2);

		let Fd = 0;

		// Calculate forces
		if (airResistant) {
			Fd = 0.5 * P_A * C * S * currV ** 2;
		}

		// Calculate accelerations
		const currAccX = -(Fd / m) * (currVx / currV);
		const currAccY = -GRAVITY - (Fd / m) * (currVy / currV);

		// Update velocity and position using the Euler method
		currVx += currAccX * dt;
		currVy += currAccY * dt;
		x += currVx * dt;
		y += currVy * dt;

		pos.push({ x, y, t });
		vx.push(currVx);
		vy.push(currVy);
	}

	return {
		pos,
		vx,
		vy,
		t
	};
};
