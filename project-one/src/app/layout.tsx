import Theme from "@/styles/theme";
import "@/styles/globals.css";

export const metadata = {
  title: "Unii Testing | Project One",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
