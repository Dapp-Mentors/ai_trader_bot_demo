// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "QuantumPool Trader - AI-Powered Crypto Trading Platform",
  description: "Revolutionize your crypto trading with QuantumPool Trader. Leverage advanced AI algorithms for real-time market analysis and automated trading strategies. Secure, scalable, and blockchain-integrated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}