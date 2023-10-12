import { GRAVITY } from './constants';
import { degToRad } from './utils';
import type { Params, Simulation } from '../types';

// Parameters
// const g: number = 9.8; // Acceleration due to gravity (m/s^2)
const k: number = 0; // Coefficient of air resistance

// Simulation
export const getParabolicShooting = ({
	dt,
	initialHeight,
	initialVelocity,
	m,
	alfa
}: Params): Simulation => {
	// Set initial conditions
	let x = 0;
	let y = initialHeight;
	const vx = [initialVelocity];
	const vy = [0];

	const pos = [{ x, y }];

	alfa = degToRad(alfa);
	let currVx = initialVelocity * Math.cos(alfa);
	let currVy = initialVelocity * Math.sin(alfa);

	// Perform the simulation
	let t = 0;
	while (y > 0 || t === 0) {
		t += dt;
		const totalVelocity: number = Math.sqrt(currVx ** 2 + currVy ** 2);

		// Calculate forces
		const gravitationalForce: number = -m * GRAVITY;
		const airResistanceForce: number = -k * totalVelocity;

		// Calculate accelerations
		const accelerationX: number = (airResistanceForce / m) * Math.cos(alfa);
		const accelerationY: number = (gravitationalForce + airResistanceForce) / m;

		// Update velocity and position using the Euler method
		currVx += accelerationX * dt;
		currVy += accelerationY * dt;
		x += currVx * dt;
		y += currVy * dt;

		pos.push({ x, y });
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
