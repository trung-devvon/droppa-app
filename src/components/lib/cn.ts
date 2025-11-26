// lib/utils.ts
export function cn(...classes: (any)[]) {
  return classes
    .flatMap(cls => cls?.trim().split(/\s+/) || [])
    .filter(Boolean)
    .join(" ");
}