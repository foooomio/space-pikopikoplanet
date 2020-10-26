import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if (navigator.userAgent.indexOf('Trident') !== -1) { location.href = 'https://www.microsoft.com/ja-jp/edge'; }`,
            }}
          />
          <link
            href="https://fonts.googleapis.com/earlyaccess/nicomoji.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
