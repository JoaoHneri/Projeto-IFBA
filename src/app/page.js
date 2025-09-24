'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reportService } from "@/services";
import { ArrowRight, CheckCircle, Users, Target, TrendingUp, Star } from "lucide-react";

export default function HomePage() {
  const [stats, setStats] = useState({
    projectsCompleted: '10k+',
    satisfactionRate: '98%',
    companiesTrust: '500+',
    supportAvailable: '24/7'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await reportService.getPublicStats();
        setStats({
          projectsCompleted: `${Math.floor(data.projectsCompleted / 1000)}k+`,
          satisfactionRate: data.satisfactionRate,
          companiesTrust: `${data.companiesTrust}+`,
          supportAvailable: data.supportAvailable
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        // Manter dados padrão em caso de erro
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Gerencie seus projetos com
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block mt-2">
              máxima eficiência
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Uma plataforma completa para organizar, acompanhar e entregar seus projetos 
            com qualidade e no prazo. Simplifique sua gestão e potencialize seus resultados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="text-lg px-8 py-4 bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projetos">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200"
              >
                Ver exemplos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para elevar a gestão de projetos 
              da sua equipe ao próximo nível.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-clean group">
              <CardContent className="p-0">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Planejamento Estratégico</h3>
                <p className="text-slate-600 leading-relaxed">
                  Defina objetivos claros, crie cronogramas realistas e acompanhe o progresso 
                  de cada etapa do projeto em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-clean group">
              <CardContent className="p-0">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Colaboração em Equipe</h3>
                <p className="text-slate-600 leading-relaxed">
                  Facilite a comunicação, distribua tarefas de forma eficiente e mantenha 
                  todos os membros da equipe alinhados e produtivos.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-clean group">
              <CardContent className="p-0">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Análise de Desempenho</h3>
                <p className="text-slate-600 leading-relaxed">
                  Obtenha insights valiosos com relatórios detalhados e métricas que 
                  ajudam a otimizar processos e melhorar resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {loading ? '...' : stats.projectsCompleted}
              </div>
              <div className="text-slate-600">Projetos concluídos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {loading ? '...' : stats.satisfactionRate}
              </div>
              <div className="text-slate-600">Taxa de satisfação</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {loading ? '...' : stats.companiesTrust}
              </div>
              <div className="text-slate-600">Empresas confiam</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {loading ? '...' : stats.supportAvailable}
              </div>
              <div className="text-slate-600">Suporte dedicado</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar sua gestão de projetos?
          </h2>
          <p className="text-xl text-emerald-100 mb-10">
            Junte-se a milhares de equipes que já descobriram uma forma mais 
            inteligente de gerenciar projetos.
          </p>
          <Link href="/cadastro">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-emerald-600 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Comece seu teste gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
