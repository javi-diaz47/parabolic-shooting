export interface GetVelocity {
  vx:  number[] 
  vy:  number[] 
}

export interface GetAxisVelocity {
  vAxis: number[],
  v: number[],
  A: number,
  dt: number
}

export interface GetPosition {
  x: number[],
  y: number[],
  vx: number[],
  vy: number[],
  dt: number
}

