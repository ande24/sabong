import { Orbitron  } from "next/font/google";
import "./globals.css";


const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
