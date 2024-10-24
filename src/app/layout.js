import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./components/StoreProvider";
import UserProvider from "./components/UserProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import the CSS styles
import Head from "next/head";

import CrispChat from "./components/CrispChat";
const ginto = localFont({
  src: "./fonts/ABCGintoNord-Regular-Trial-BF651b7b7309b43.woff",
  variable: "--font-ginto-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SnagShack",
  description: "Snag A Deal At The Shack!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={` hide-scrollbar ${ginto.variable} antialiased`}>
        <StoreProvider>
          <UserProvider>
            <ToastContainer />
            <CrispChat/>
        {children}
        </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
