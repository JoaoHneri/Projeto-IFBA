'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
            <p className="text-gray-600">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <Card>
            <CardContent className="p-8 prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
                  <p className="text-gray-700">
                    Ao acessar e usar o Synchro Project Manager, você aceita e concorda em cumprir estes Termos de Uso.
                    Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Descrição do Serviço</h2>
                  <p className="text-gray-700">
                    O Synchro Project Manager é uma plataforma de gerenciamento de projetos que permite aos usuários:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Criar e gerenciar projetos</li>
                    <li>Organizar tarefas em formato Kanban</li>
                    <li>Colaborar com equipes</li>
                    <li>Acompanhar progresso e deadlines</li>
                    <li>Gerar relatórios de desempenho</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Conta de Usuário</h2>
                  <p className="text-gray-700 mb-3">
                    Para usar nosso serviço, você deve:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Fornecer informações precisas e atualizadas</li>
                    <li>Manter a segurança de sua conta e senha</li>
                    <li>Ser responsável por todas as atividades em sua conta</li>
                    <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Uso Aceitável</h2>
                  <p className="text-gray-700 mb-3">
                    Você concorda em não usar o serviço para:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Atividades ilegais ou não autorizadas</li>
                    <li>Violar direitos de propriedade intelectual</li>
                    <li>Transmitir conteúdo prejudicial ou ofensivo</li>
                    <li>Interferir na operação do serviço</li>
                    <li>Coletar dados de outros usuários sem consentimento</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Propriedade Intelectual</h2>
                  <p className="text-gray-700">
                    O serviço e todo o seu conteúdo original, recursos e funcionalidades são de propriedade do
                    Synchro Project Manager e são protegidos por direitos autorais, marcas registradas e outras leis.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Privacidade dos Dados</h2>
                  <p className="text-gray-700">
                    Sua privacidade é importante para nós. Nossa coleta e uso de informações pessoais são governados
                    por nossa Política de Privacidade, que faz parte destes termos.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitação de Responsabilidade</h2>
                  <p className="text-gray-700">
                    O Synchro Project Manager não será responsável por danos indiretos, incidentais, especiais,
                    consequenciais ou punitivos resultantes do uso ou incapacidade de usar o serviço.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Modificações dos Termos</h2>
                  <p className="text-gray-700">
                    Reservamo-nos o direito de modificar estes termos a qualquer momento. As mudanças entrarão em vigor
                    imediatamente após a publicação. É sua responsabilidade revisar os termos periodicamente.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Rescisão</h2>
                  <p className="text-gray-700">
                    Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio, por qualquer motivo,
                    incluindo violação destes Termos de Uso.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contato</h2>
                  <p className="text-gray-700">
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail:
                    <a href="mailto:contato@synchro.com" className="text-blue-600 hover:text-blue-800">contato@synchro.com</a>
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}