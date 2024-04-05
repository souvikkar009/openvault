import NavBar from "@/components/NavBar/NavBar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "OpenVault",
  description: "A platform to showcase projects of college/university students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand.1">
        <Providers>
          <div>
            <NavBar />
          </div>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
