'use client';

import "./globals.css";
import { useEffect, useState } from "react";
import localFont from "next/font/local";

const orbitron = localFont({
  src: '../../public/fonts/Orbitron-VariableFont_wght.ttf',
  variable: '--font-orbitron',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true); 
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} font-sans antialiased`}
        style={{ visibility: fontsLoaded ? 'visible' : 'hidden' }}
      >
        {children}
      </body>
    </html>
  );
}
