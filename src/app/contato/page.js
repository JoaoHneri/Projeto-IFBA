"use client"

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    assunto: "",
    mensagem: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.assunto.trim()) newErrors.assunto = "Assunto é obrigatório";
    if (!formData.mensagem.trim()) newErrors.mensagem = "Mensagem é obrigatória";
    else if (formData.mensagem.length < 10) newErrors.mensagem = "Mensagem deve ter pelo menos 10 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitMessage("");
    
    try {
      // Simulação de envio - aqui você integraria com o backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        assunto: "",
        mensagem: ""
      });
    } catch (error) {
      setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Entre em 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Contato
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Estamos aqui para ajudar você a transformar a gestão dos seus projetos. 
            Entre em contato e descubra como podemos ser seu parceiro de sucesso.
          </p>
        </div>
      </section>

      {/* Contato Principal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Formulário */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome" className="text-slate-700 font-semibold">Nome *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className={`mt-2 ${errors.nome ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"}`}
                      placeholder="Seu nome completo"
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-semibold">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-2 ${errors.email ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"}`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="telefone" className="text-slate-700 font-semibold">Telefone *</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className={`mt-2 ${errors.telefone ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"}`}
                      placeholder="(75) 99999-9999"
                    />
                    {errors.telefone && (
                      <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="empresa" className="text-slate-700 font-semibold">Empresa</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="mt-2 border-slate-300 focus:border-blue-500"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="assunto" className="text-slate-700 font-semibold">Assunto *</Label>
                  <Input
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className={`mt-2 ${errors.assunto ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"}`}
                    placeholder="Como podemos ajudar?"
                  />
                  {errors.assunto && (
                    <p className="text-red-500 text-sm mt-1">{errors.assunto}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-slate-700 font-semibold">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    className={`mt-2 ${errors.mensagem ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-500"}`}
                    placeholder="Descreva detalhadamente sua necessidade..."
                    rows={5}
                  />
                  {errors.mensagem && (
                    <p className="text-red-500 text-sm mt-1">{errors.mensagem}</p>
                  )}
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.includes("sucesso") 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-8">
              <Card className="border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Informações de Contato</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                        <p className="text-slate-600">contato@synchro.com</p>
                        <p className="text-slate-600">suporte@synchro.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Telefone</h4>
                        <p className="text-slate-600">(75) 3333-4444</p>
                        <p className="text-slate-600">(75) 99999-9999</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">WhatsApp</h4>
                        <p className="text-slate-600">(75) 99999-9999</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 border-green-500 text-green-600 hover:bg-green-50"
                        >
                          Iniciar Conversa
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Endereço</h4>
                        <p className="text-slate-600">
                          Av. Paralela, 1000<br />
                          Salvador, BA - 40070-110<br />
                          Brasil
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-clean hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Horário de Atendimento</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Segunda a Sexta</span>
                      <span className="font-semibold text-slate-900">8h às 18h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Sábado</span>
                      <span className="font-semibold text-slate-900">8h às 12h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Domingo</span>
                      <span className="text-slate-500">Fechado</span>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        💡 <strong>Suporte 24/7</strong> disponível para clientes Enterprise
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}