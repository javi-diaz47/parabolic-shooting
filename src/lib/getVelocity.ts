import { GetAxisVelocity, GetPosition, GetVelocity } from "../types";
import { GRAVITY } from "./constants";
import { lastIndex } from "./utils";


export const getVelocity = ({vx , vy }: GetVelocity) => {
  return Math.sqrt(lastIndex(vx) ** 2 + lastIndex(vy) ** 2)
}


export const getVelocityY = ({vAxis: vy, v, A, dt}: GetAxisVelocity) => 
  lastIndex(vy) - (GRAVITY + A * lastIndex(vy) * lastIndex(v))*dt


export const getVelocityX = ({vAxis: vx, v, A, dt}: GetAxisVelocity) => 
  lastIndex(vx) - A * lastIndex(vx) * lastIndex(v) * dt;


