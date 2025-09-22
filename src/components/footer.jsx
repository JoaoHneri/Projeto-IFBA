import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold">ProjetoHub</span>
            </div>
            <p className="text-gray-300 mb-4">
              Sua solução completa para gerenciamento de projetos. 
              Organize, colabore e entregue projetos com eficiência.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                📷
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-300 hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📧 contato@projetohub.com</li>
              <li>📱 (75) 99999-9999</li>
              <li>💬 WhatsApp: (75) 99999-9999</li>
              <li>📍 Salvador, BA - Brasil</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 ProjetoHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}