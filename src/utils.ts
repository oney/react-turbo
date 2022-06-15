import { ReactifiedKey } from "./constants";

export function reactified(f: any) {
  return typeof f === "function" && f != null && !!f[ReactifiedKey];
}
