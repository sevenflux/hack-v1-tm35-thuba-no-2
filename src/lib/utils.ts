import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function returns the merge result of a list of classNames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBigNum(input: string): string {
  let intPlaceInput: string = input.substring(0, input.indexOf("."));
  let len = intPlaceInput.length;
  if (len > 18) {
    return intPlaceInput.substring(0, len - 17) + "E";
  } else if (len > 15) {
    return intPlaceInput.substring(0, len - 14) + "P";
  } else if (len > 12) {
    return intPlaceInput.substring(0, len - 11) + "T";
  } else if (len > 9) {
    return intPlaceInput.substring(0, len - 8) + "B";
  } else if (len > 6) {
    return intPlaceInput.substring(0, len - 5) + "M";
  } else if (len > 3) {
    return intPlaceInput.substring(0, len - 2) + "K";
  } else {
    return intPlaceInput;
  }
}