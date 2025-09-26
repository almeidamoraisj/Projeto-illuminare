import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-6">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Clínica de Psicologia</h1>
          <p className="text-gray-700 mb-6">Oferecemos suporte psicológico de qualidade para ajudar você a enfrentar os desafios da vida.</p>
          <Link href="/contato" className="px-6 py-3 bg-blue-900 text-white rounded-lg">Agendar consulta</Link>
        </div>
        <Image src="https://images.pexels.com/photos/4098226/pexels-photo-4098226.jpeg" alt="Psicóloga atendendo paciente" width={400} height={300} className="rounded-lg mt-8 md:mt-0"/>
      </section>

      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-2xl font-bold mb-10">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold">Terapia Individual</h3>
            <p className="text-gray-600">Apoio personalizado</p>
          </div>
          <div>
            <h3 className="font-semibold">Terapia de Casal</h3>
            <p className="text-gray-600">Fortaleça seus relacionamentos</p>
          </div>
          <div>
            <h3 className="font-semibold">Terapia Infantil</h3>
            <p className="text-gray-600">Cuidado especial para crianças</p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Está enfrentando dificuldades?</h2>
        <p className="text-gray-700 mb-6">Nossa equipe de psicólogos está aqui para ajudar. Entre em contato para agendar uma consulta.</p>
        <Link href="/contato" className="px-6 py-3 bg-blue-900 text-white rounded-lg">Entre em contato</Link>
      </section>
    </div>
  )
}
