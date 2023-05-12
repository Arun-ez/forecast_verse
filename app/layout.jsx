import './globals.css'

export const metadata = {
  title: 'Forecast Verse',
  description: 'Get world wide weather',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
