import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import 'antd/dist/reset.css';
import { ThemeProvider } from "@/context/ThemeContext";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../lib/store';
import ReduxProviders from "@/lib/store/ReduxProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liftup",
  description: "Liftup is an all-in-one gym management software that helps fitness centers streamline operations, manage memberships, track client progress, and deliver personalized workout plans. With powerful features like class scheduling, member management, billing automation, and progress tracking, Liftup empowers gym owners and trainers to provide an exceptional fitness experience to their clients."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <ReduxProviders>
          {children}
        </ReduxProviders>
      </body>
    </html>
  );
}
