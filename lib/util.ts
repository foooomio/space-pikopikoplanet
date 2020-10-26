export const likeId = (uid: string, queryId: string): string =>
  `${uid}-${queryId}`;

export const generateId = (): string => Math.random().toString(16).slice(-10);

export const doubleEscape = (str: string): string =>
  encodeURIComponent(encodeURIComponent(str));

export const formatDateTime = (timestamp: number): string =>
  new Date(timestamp)
    .toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Tokyo',
    })
    .replace(/-/g, '/');

export const tally = (array: string[]): Record<string, number> =>
  array.reduce(
    (acc, curr) => ((acc[curr] = (acc[curr] ?? 0) + 1), acc),
    {} as Record<string, number>
  );
