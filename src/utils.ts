export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const takeRandom = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];