import type { Metadata } from 'next';
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import { ThemeProvider } from '@/components/theme-provider'; // ThemeProvider 가져옴

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Plants Ventory',
    description: 'Inventory for Plants',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            ><StackProvider app={stackServerApp}><StackTheme>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                    <h1>Footer</h1>
                </ThemeProvider>
            </StackTheme></StackProvider></body>
        </html>
    );
}
