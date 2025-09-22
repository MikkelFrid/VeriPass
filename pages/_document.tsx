// pages/_document.tsx
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // Default to light theme on first load
    <Html lang="en" className="h-full" data-theme="corporate">
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}