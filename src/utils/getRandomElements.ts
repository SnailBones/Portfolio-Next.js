export function getRandomElements<T>(arr: T[], numElements: number): T[] {
  const length = arr.length;

  if (numElements > length) {
    throw new Error("numElements cannot be greater than the array length");
  }

  const indices = new Set<number>();
  while (indices.size < numElements) {
    const randomIndex = Math.floor(Math.random() * length);
    indices.add(randomIndex);
  }

  return Array.from(indices).map((index) => arr[index]);
}
