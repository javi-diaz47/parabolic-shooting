import { EQUIV_RAD_DEG } from "./constants"

export const degToRad = (alfa: number) => (alfa * Math.PI) / EQUIV_RAD_DEG

export const lastIndex = (arr: number[]) => arr[arr.length-1]

export const isFlying = (y: number[]) => lastIndex(y) > 0