import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Clock, CheckCircle, Heart } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Sobre a 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Synchro
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Somos uma empresa inovadora dedicada a transformar a forma como equipes 
            gerenciam seus projetos, proporcionando eficiência, colaboração e resultados excepcionais.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Nossa História</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Fundada em 2020 por uma equipe de especialistas em gestão de projetos e tecnologia, 
                  a Synchro nasceu da necessidade de simplificar os processos complexos que 
                  envolvem o gerenciamento de projetos corporativos.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Durante anos trabalhando em grandes corporações, nossos fundadores identificaram 
                  as principais dificuldades enfrentadas pelas equipes: comunicação fragmentada, 
                  falta de visibilidade do progresso e dificuldade em manter prazos.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Com essa experiência, desenvolvemos uma plataforma que não apenas resolve esses 
                  problemas, mas também potencializa a produtividade e a colaboração entre equipes.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">50+</div>
                  <div className="text-slate-600">Especialistas</div>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">15+</div>
                  <div className="text-slate-600">Prêmios</div>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">5</div>
                  <div className="text-slate-600">Anos de Mercado</div>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">99%</div>
                  <div className="text-slate-600">Satisfação</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Nossos Princípios
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Os valores que guiam nosso trabalho e definem quem somos como empresa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Missão */}
            <Card className="p-8 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Missão</h3>
                <p className="text-slate-600 leading-relaxed">
                  Capacitar equipes ao redor do mundo com ferramentas intuitivas e poderosas 
                  para gerenciar projetos de forma eficiente, promovendo colaboração e 
                  entregando resultados excepcionais.
                </p>
              </CardContent>
            </Card>

            {/* Visão */}
            <Card className="p-8 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Visão</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ser a plataforma de gestão de projetos mais confiável e inovadora do mundo, 
                  reconhecida pela simplicidade, eficiência e capacidade de transformar 
                  a forma como as empresas trabalham.
                </p>
              </CardContent>
            </Card>

            {/* Valores */}
            <Card className="p-8 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Valores</h3>
                <div className="text-slate-600 leading-relaxed text-left">
                  <ul className="space-y-2">
                    <li>• <strong>Inovação:</strong> Sempre buscando soluções criativas</li>
                    <li>• <strong>Transparência:</strong> Comunicação clara e honesta</li>
                    <li>• <strong>Excelência:</strong> Qualidade em tudo que fazemos</li>
                    <li>• <strong>Colaboração:</strong> Trabalho em equipe e parceria</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Nossa Equipe</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Conheça os profissionais apaixonados que tornam tudo isso possível.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CEO */}
            <Card className="p-8 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  AJ
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ana Julia Santos</h3>
                <p className="text-blue-600 font-semibold mb-4">CEO & Fundadora</p>
                <p className="text-slate-600 leading-relaxed">
                  15 anos de experiência em gestão de projetos em grandes corporações. 
                  MBA em Administração pela USP.
                </p>
              </CardContent>
            </Card>

            {/* CTO */}
            <Card className="p-8 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  RS
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ricardo Silva</h3>
                <p className="text-green-600 font-semibold mb-4">CTO & Co-fundador</p>
                <p className="text-slate-600 leading-relaxed">
                  Especialista em arquitetura de software e desenvolvimento ágil. 
                  12 anos criando soluções tecnológicas inovadoras.
                </p>
              </CardContent>
            </Card>

            {/* Head of Product */}
            <Card className="p-8 text-center border-0 shadow-clean hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  MF
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Marina Ferreira</h3>
                <p className="text-purple-600 font-semibold mb-4">Head of Product</p>
                <p className="text-slate-600 leading-relaxed">
                  Especialista em UX/UI e design thinking. Responsável por transformar 
                  ideias complexas em experiências simples e intuitivas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}