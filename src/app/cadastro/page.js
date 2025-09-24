'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle, CheckCircle, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmSenha: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato inválido. Use (xx) xxxxx-xxxx';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 8) {
      newErrors.senha = 'Senha deve ter pelo menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.senha)) {
      newErrors.senha = 'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número';
    }

    if (!formData.confirmSenha) {
      newErrors.confirmSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmSenha) {
      newErrors.confirmSenha = 'As senhas não coincidem';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value) => {
    // Remove todos os caracteres não numéricos
    const digits = value.replace(/\D/g, '');
    
    // Aplica a máscara (xx) xxxxx-xxxx
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await register({
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      senha: formData.senha
    });

    if (result.success) {
      router.push('/login');
    } else {
      setErrors({ submit: result.error || 'Erro ao criar conta' });
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let finalValue = value;
    
    // Aplicar máscara no telefone
    if (name === 'telefone') {
      finalValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : finalValue
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getPasswordStrength = () => {
    const password = formData.senha;
    if (!password) return { strength: 0, text: '' };
    
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    const levels = {
      0: { text: '', color: '' },
      1: { text: 'Muito fraca', color: 'bg-red-500' },
      2: { text: 'Fraca', color: 'bg-orange-500' },
      3: { text: 'Média', color: 'bg-yellow-500' },
      4: { text: 'Forte', color: 'bg-green-500' },
      5: { text: 'Muito forte', color: 'bg-green-600' }
    };
    
    return { strength, ...levels[strength], checks };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Criar conta</h1>
          <p className="text-gray-600">Preencha os dados para começar</p>
        </div>


        {/* Register Form */}
        <Card className="shadow-clean-lg border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Cadastro</CardTitle>
            <CardDescription>
              Crie sua conta para acessar todos os recursos
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Nome completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className={`h-11 ${errors.nome ? 'border-red-300 focus:border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.nome && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nome}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={`h-11 ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(xx) xxxxx-xxxx"
                  className={`h-11 ${errors.telefone ? 'border-red-300 focus:border-red-500' : ''}`}
                  disabled={isLoading}
                  maxLength={15}
                />
                {errors.telefone && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.telefone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    name="senha"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="Digite uma senha forte"
                    className={`h-11 pr-12 ${errors.senha ? 'border-red-300 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {formData.senha && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{passwordStrength.text}</span>
                    </div>
                    
                    <div className="text-xs space-y-1">
                      {passwordStrength.checks && (
                        <div className="grid grid-cols-1 gap-1">
                          <div className={`flex items-center ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3 mr-1" />
                            Pelo menos 8 caracteres
                          </div>
                          <div className={`flex items-center ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3 mr-1" />
                            Letra minúscula
                          </div>
                          <div className={`flex items-center ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3 mr-1" />
                            Letra maiúscula
                          </div>
                          <div className={`flex items-center ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3 mr-1" />
                            Número
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {errors.senha && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.senha}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmSenha" className="text-sm font-medium text-gray-700">
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmSenha"
                    name="confirmSenha"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmSenha}
                    onChange={handleInputChange}
                    placeholder="Digite a senha novamente"
                    className={`h-11 pr-12 ${errors.confirmSenha ? 'border-red-300 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmSenha && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmSenha}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 ${errors.acceptTerms ? 'border-red-300' : ''}`}
                    disabled={isLoading}
                  />
                  <Label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600 leading-relaxed">
                    Eu aceito os{' '}
                    <Link href="/termos" className="text-blue-600 hover:text-blue-700 underline">
                      termos de uso
                    </Link>{' '}
                    e{' '}
                    <Link href="/privacidade" className="text-blue-600 hover:text-blue-700 underline">
                      política de privacidade
                    </Link>
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Criando conta...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Criar conta
                  </div>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}