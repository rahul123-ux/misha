// app/layout.tsx
import "./globals.css";
import MotionProvider from "./motion-provider";

export const metadata = {
  title: "Misha 💖",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
