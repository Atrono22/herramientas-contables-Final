import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <nav className="nav-container">
          <div className="nav-content">
            <div className="nav-links">
              <a href="/herramientas-contables-Final" className="nav-link">
                Buscador de Sumas
              </a>
              <a href="/herramientas-contables-Final/integracion" className="nav-link">
                Integración de Cuentas
              </a>
            </div>
            <Image
              src="/herramientas-contables-Final/images/c3a82c05257e48fd3ddad5ed6d437da0.png"
              alt="Logo"
              width={40}
              height={40}
              className="logo"
              priority
            />
          </div>
        </nav>

        <main className="min-h-screen pb-20">
          {children}
        </main>

        <footer className="footer">
          <p className="text-sm font-medium">
            Creado por{' '}
            <span className="text-blue-400 font-semibold">
              Ari Flores
            </span>
          </p>
        </footer>
      </body>
    </html>
  )
}