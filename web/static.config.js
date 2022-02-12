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
        <title>XKの导航</title>
        <meta name="description" content="XK的自定义编程导航界面" />
        <meta name="keywords" content="XKの导航,导航,资源,主页" />
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
