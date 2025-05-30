import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import 'antd/dist/reset.css';
import ReduxProviders from "@/lib/store/ReduxProvider";
import TokenSyncProvider from "@/lib/store/TokenSyncProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liftup",
  description: "Liftup is an all-in-one gym management software that helps fitness centers streamline operations, manage memberships, track client progress, and deliver personalized workout plans. With powerful features like class scheduling, member management, billing automation, and progress tracking, Liftup empowers gym owners and trainers to provide an exceptional fitness experience to their clients.",
  icons: {
    icon: "/liftup.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}
      >
        <ReduxProviders>
          <TokenSyncProvider>
            {children}
          </TokenSyncProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
