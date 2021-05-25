import md5 from 'blueimp-md5';

const GRAVATAR_BASE_URL = 'https://www.gravatar.com/avatar/';

export const generateAvatar = (email: string): string =>
  GRAVATAR_BASE_URL + md5(email);

export const getAvatar = (baseUrl: string): string =>
  baseUrl + '?default=identicon';

export const getUserAvatar = (email: string | null | undefined): string =>
  email ? getAvatar(generateAvatar(email)) : GRAVATAR_BASE_URL + '?default=mp';
