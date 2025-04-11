import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function returns the merge result of a list of classNames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}