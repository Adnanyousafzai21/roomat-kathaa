import "./globals.css"

export const metadata = {
  title: "Roommate Kaatha App",
  description: "Track expenses with your roommates",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <h1 className="text-3xl font-bold text-center my-6 text-primary">Roommate Kaatha App</h1>
          {children}
        </main>
      </body>
    </html>
  )
}
