import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AppLayout>{children}</AppLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
