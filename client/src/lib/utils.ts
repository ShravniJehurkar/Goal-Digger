import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSakuraLeaves(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 15 + 10, // Size between 10-25px
    duration: Math.random() * 15 + 10, // Duration between 10-25s
    delay: Math.random() * 10, // Delay between 0-10s
    rotation: Math.random() * 360 // Random rotation angle
  }));
}
