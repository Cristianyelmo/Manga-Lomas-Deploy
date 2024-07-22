import localFont from "next/font/local";
import "./globals.css";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";
const MangaLomas = localFont({
  src: [
    {
      path: "../../public/font/mangat.ttf",
      weight: "400",
    }
  ],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <AdminProvider>
        <UserProvider>
      <ProductProvider>
      <body className={`${MangaLomas.className}  `}>{children}</body>
      </ProductProvider>
      </UserProvider>
      </AdminProvider>
    </html>
  );
}
