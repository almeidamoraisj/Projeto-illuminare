'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="font-bold text-lg">Clínica de Psicologia</div>
        <nav className="space-x-6">
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/servicos">Serviços</Link>
          <Link href="/contato">Contato</Link>
        </nav>
        <Link href="/login" className="px-4 py-2 bg-blue-900 text-white rounded-lg">Login</Link>
      </div>
    </header>
  )
}
