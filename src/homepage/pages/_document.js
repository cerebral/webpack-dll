import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

import { injectGlobal } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head } = renderPage();
    const styles = flush();
    return { html, head, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <title>NPM Packager Service</title>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
            html {
              font-family: 'Open Sans', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
              font-smooth: always;
              -webkit-tap-highlight-color: transparent;
              -webkit-touch-callout: none;

              display: flex;
              align-items: center;
              justify-content: center;

              line-height: 1.8;
            }

            body {
              margin: 0;
              background-color: #F4F4F4;
              max-width: 800px;
            }

            p, code, div {
              color: #5F6F86;
            }

            a {
              color: rgba(52, 152, 219,1.0);
              font-weight: 600;
              text-decoration: none;
            }
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}