import { ClerkProvider,SignUp } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css'

export const metadata = {
    title:"DocPoc",
    description: 'A doctor Application'
}
const inter = Inter({subsets:["latin"]})

export default function RootLayout({ children }: {children:React.ReactNode}){
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} text-center align-center bg-blue-300` }>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}