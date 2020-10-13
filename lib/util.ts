export const likeId = (uid: string, queryId: string): string =>
  `${uid}-${queryId}`;

export const generateId = (): string => Math.random().toString(16).slice(-10);

export const doubleEscape = (str: string): string =>
  encodeURIComponent(encodeURIComponent(str));

export const formatDate = (date: Date): string =>
  date
    .toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Tokyo',
    })
    .replace(/-/g, '/');

export const tally = (array: string[]): { [key: string]: number } =>
  array.reduce(
    (acc, curr) => ((acc[curr] = (acc[curr] ?? 0) + 1), acc),
    {} as { [key: string]: number }
  );
