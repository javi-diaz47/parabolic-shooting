export interface GetVelocity {
	vx: number[];
	vy: number[];
}

export interface GetAxisVelocity {
	vAxis: number[];
	v: number[];
	A: number;
	dt: number;
}

export interface GetPosition {
	x: number[];
	y: number[];
	vx: number[];
	vy: number[];
	dt: number;
}

export interface Params {
	dt: number;
	initialVelocity: number;
	initialHeight: number;
	alfa: number;
	m: number;
	airResistant?: boolean;
}

export interface Simulation {
	pos: {
		x: number;
		y: number;
		t: number;
	}[];
	vx: number[];
	vy: number[];
	t: number;
}

// Scatter
export interface Data {
	id: string;
	data: {
		x: number;
		y: number;
		t: number;
		[key: string]: number;
	}[];
}
