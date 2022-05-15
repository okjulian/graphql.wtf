import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from "next/document";

export default class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism.min.css"
          />
        </Head>

        <body className="antialiased bg-haiti">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
