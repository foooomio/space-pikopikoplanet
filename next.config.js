// @ts-check
const {
  getCSP,
  SELF,
  NONE,
  DATA,
  UNSAFE_INLINE,
  UNSAFE_EVAL,
} = require('csp-header');

/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: getCSP({
              directives: {
                'default-src': [NONE],
                'script-src': [
                  SELF,
                  UNSAFE_INLINE,
                  UNSAFE_EVAL,
                  'https://apis.google.com',
                  'https://www.googletagmanager.com',
                ],
                'style-src': [
                  SELF,
                  UNSAFE_INLINE,
                  'https://fonts.googleapis.com',
                ],
                'img-src': [
                  SELF,
                  'https://www.gstatic.com',
                  'https://www.gravatar.com',
                ],
                'connect-src': [SELF, 'https:'],
                'font-src': [SELF, DATA, 'https://fonts.gstatic.com'],
                'object-src': [SELF, DATA],
                'frame-src': [
                  SELF,
                  'https://space-pikopikoplanet.firebaseapp.com',
                ],
                'frame-ancestors': [NONE],
              },
            }),
          },
        ],
      },
      {
        source: '/embed/:embedId*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: getCSP({
              directives: {
                'default-src': [NONE],
                'script-src': [SELF, UNSAFE_INLINE, UNSAFE_EVAL],
                'style-src': [
                  SELF,
                  UNSAFE_INLINE,
                  'https://fonts.googleapis.com',
                ],
                'connect-src': [SELF, 'https:'],
                'font-src': [SELF, DATA, 'https://fonts.gstatic.com'],
              },
            }),
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
};
