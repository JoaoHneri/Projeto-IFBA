'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
            <p className="text-gray-600">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <Card>
            <CardContent className="p-8 prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Informações que Coletamos</h2>
                  <p className="text-gray-700 mb-3">
                    Coletamos informações que você nos fornece diretamente, incluindo:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Nome completo e endereço de e-mail</li>
                    <li>Informações de perfil e preferências</li>
                    <li>Conteúdo que você cria (projetos, tarefas, comentários)</li>
                    <li>Dados de uso e navegação</li>
                    <li>Informações técnicas do dispositivo e navegador</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Como Usamos suas Informações</h2>
                  <p className="text-gray-700 mb-3">
                    Utilizamos suas informações para:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Fornecer e manter nosso serviço</li>
                    <li>Personalizar sua experiência</li>
                    <li>Comunicar-nos com você sobre atualizações</li>
                    <li>Melhorar nossos serviços</li>
                    <li>Detectar e prevenir fraudes</li>
                    <li>Cumprir obrigações legais</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Compartilhamento de Informações</h2>
                  <p className="text-gray-700 mb-3">
                    Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Com sua permissão explícita</li>
                    <li>Com membros da sua equipe nos projetos compartilhados</li>
                    <li>Para cumprir obrigações legais</li>
                    <li>Com provedores de serviços terceirizados (com contratos de confidencialidade)</li>
                    <li>Em caso de fusão, aquisição ou venda de ativos</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Segurança dos Dados</h2>
                  <p className="text-gray-700">
                    Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Criptografia SSL/TLS para transmissão de dados</li>
                    <li>Criptografia de dados sensíveis em repouso</li>
                    <li>Controles de acesso rigorosos</li>
                    <li>Monitoramento regular de segurança</li>
                    <li>Backups seguros e regulares</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Seus Direitos</h2>
                  <p className="text-gray-700 mb-3">
                    Você tem os seguintes direitos sobre suas informações pessoais:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li>Acessar suas informações pessoais</li>
                    <li>Corrigir informações incorretas</li>
                    <li>Excluir suas informações pessoais</li>
                    <li>Restringir o processamento de seus dados</li>
                    <li>Portabilidade dos dados</li>
                    <li>Retirar consentimento a qualquer momento</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies e Tecnologias Similares</h2>
                  <p className="text-gray-700">
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site
                    e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Retenção de Dados</h2>
                  <p className="text-gray-700">
                    Mantemos suas informações pessoais pelo tempo necessário para fornecer nossos serviços e cumprir
                    obrigações legais. Quando você excluir sua conta, removeremos suas informações pessoais dentro de 30 dias.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Transferências Internacionais</h2>
                  <p className="text-gray-700">
                    Seus dados podem ser transferidos para servidores localizados fora do seu país. Garantimos que
                    essas transferências cumpram as leis de proteção de dados aplicáveis.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Menores de Idade</h2>
                  <p className="text-gray-700">
                    Nosso serviço não se destina a menores de 18 anos. Não coletamos intencionalmente informações
                    pessoais de menores de idade.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Alterações nesta Política</h2>
                  <p className="text-gray-700">
                    Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças significativas
                    através do e-mail ou de um aviso em nosso serviço.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contato</h2>
                  <p className="text-gray-700">
                    Para questões sobre esta Política de Privacidade ou seus dados pessoais, entre em contato:
                  </p>
                  <ul className="list-none text-gray-700 ml-4">
                    <li>E-mail: <a href="mailto:privacidade@synchro.com" className="text-blue-600 hover:text-blue-800">privacidade@synchro.com</a></li>
                    <li>Telefone: (11) 1234-5678</li>
                    <li>Endereço: Rua Exemplo, 123 - São Paulo, SP</li>
                  </ul>
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