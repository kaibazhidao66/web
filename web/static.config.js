import React from 'react';
import path from 'path'

export default {
  Document: ({
              Html,
              Head,
              Body,
              children,
              state: {siteData, renderMeta},
            }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>XKの自定义</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <script src="baiduAnalyze.js"></script>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  silent: true,
  getRoutes: async () => {
    return [
      {
        path: 'search',
        template: 'src/pages/search/index',
      }
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
