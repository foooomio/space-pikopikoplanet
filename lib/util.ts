export const likeId = (uid: string, queryId: string): string =>
  `${uid}-${queryId}`;

export const generateId = (): string => Math.random().toString(16).slice(-10);

export const doubleEscape = (str: string): string =>
  encodeURIComponent(encodeURIComponent(str));

export const isUrl = (str: string): boolean =>
  str.startsWith('http://') || str.startsWith('https://');
