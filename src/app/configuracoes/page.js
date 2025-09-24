'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ErrorDisplay, InlineError } from '@/components/ui/error-states';
import { useApi, useAsyncAction } from '@/hooks/useApi';
import { userService } from '@/services';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  Trash2
} from 'lucide-react';

function ConfiguracoesPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('perfil');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile form
  const [profileData, setProfileData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    telefone: user?.telefone || '',
    bio: user?.bio || ''
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    taskAssignments: true,
    deadlineReminders: true,
    weeklyReports: false
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'team',
    showEmail: false,
    showPhone: false,
    activityTracking: true
  });

  const { loading: profileLoading, error: profileError, execute: updateProfile } = useAsyncAction();
  const { loading: passwordLoading, error: passwordError, execute: updatePassword } = useAsyncAction();
  const { loading: settingsLoading, execute: updateSettings } = useAsyncAction();

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const result = await updateProfile(userService.updateProfile, profileData);
    if (result.success) {
      updateUser(result.data);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      return;
    }

    const result = await updatePassword(userService.updatePassword, {
      senhaAtual: passwordData.senhaAtual,
      novaSenha: passwordData.novaSenha
    });

    if (result.success) {
      setPasswordData({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
    }
  };

  const handleNotificationUpdate = async (key, value) => {
    const newSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(newSettings);

    await updateSettings(userService.updateNotificationSettings, newSettings);
  };

  const handlePrivacyUpdate = async (key, value) => {
    const newSettings = { ...privacySettings, [key]: value };
    setPrivacySettings(newSettings);

    await updateSettings(userService.updatePrivacySettings, newSettings);
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'privacidade', label: 'Privacidade', icon: Shield },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
            <p className="text-gray-600">Gerencie suas preferências e configurações da conta</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'perfil' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>Atualize suas informações pessoais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nome">Nome completo</Label>
                          <Input
                            id="nome"
                            value={profileData.nome}
                            onChange={(e) => setProfileData({...profileData, nome: e.target.value})}
                            placeholder="Seu nome completo"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            placeholder="seu@email.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input
                            id="telefone"
                            value={profileData.telefone}
                            onChange={(e) => setProfileData({...profileData, telefone: e.target.value})}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          placeholder="Conte um pouco sobre você..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={4}
                        />
                      </div>

                      {profileError && <InlineError error={{ message: profileError }} />}

                      <Button type="submit" disabled={profileLoading}>
                        {profileLoading ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Salvando...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Save className="w-4 h-4 mr-2" />
                            Salvar alterações
                          </div>
                        )}
                      </Button>
                    </form>

                    {/* Password Section */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Alterar Senha</h3>

                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="senhaAtual">Senha atual</Label>
                          <div className="relative">
                            <Input
                              id="senhaAtual"
                              type={showCurrentPassword ? 'text' : 'password'}
                              value={passwordData.senhaAtual}
                              onChange={(e) => setPasswordData({...passwordData, senhaAtual: e.target.value})}
                              placeholder="Digite sua senha atual"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="novaSenha">Nova senha</Label>
                            <div className="relative">
                              <Input
                                id="novaSenha"
                                type={showNewPassword ? 'text' : 'password'}
                                value={passwordData.novaSenha}
                                onChange={(e) => setPasswordData({...passwordData, novaSenha: e.target.value})}
                                placeholder="Digite a nova senha"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                              >
                                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
                            <Input
                              id="confirmarSenha"
                              type="password"
                              value={passwordData.confirmarSenha}
                              onChange={(e) => setPasswordData({...passwordData, confirmarSenha: e.target.value})}
                              placeholder="Confirme a nova senha"
                            />
                          </div>
                        </div>

                        {passwordError && <InlineError error={{ message: passwordError }} />}

                        <Button type="submit" disabled={passwordLoading} variant="outline">
                          {passwordLoading ? 'Alterando...' : 'Alterar senha'}
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notificacoes' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Notificação</CardTitle>
                    <CardDescription>Gerencie como você recebe notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações por email</p>
                          <p className="text-sm text-gray-600">Receba notificações no seu email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notificações push</p>
                          <p className="text-sm text-gray-600">Receba notificações no navegador</p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => handleNotificationUpdate('pushNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações de projetos</p>
                          <p className="text-sm text-gray-600">Mudanças em projetos que você participa</p>
                        </div>
                        <Switch
                          checked={notificationSettings.projectUpdates}
                          onCheckedChange={(checked) => handleNotificationUpdate('projectUpdates', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atribuição de tarefas</p>
                          <p className="text-sm text-gray-600">Quando uma tarefa for atribuída a você</p>
                        </div>
                        <Switch
                          checked={notificationSettings.taskAssignments}
                          onCheckedChange={(checked) => handleNotificationUpdate('taskAssignments', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Lembretes de prazo</p>
                          <p className="text-sm text-gray-600">Avisos sobre deadlines próximos</p>
                        </div>
                        <Switch
                          checked={notificationSettings.deadlineReminders}
                          onCheckedChange={(checked) => handleNotificationUpdate('deadlineReminders', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Relatórios semanais</p>
                          <p className="text-sm text-gray-600">Resumo semanal das suas atividades</p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onCheckedChange={(checked) => handleNotificationUpdate('weeklyReports', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacidade' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Privacidade</CardTitle>
                    <CardDescription>Controle como suas informações são compartilhadas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Visibilidade do perfil</Label>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => handlePrivacyUpdate('profileVisibility', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="public">Público</option>
                          <option value="team">Apenas equipe</option>
                          <option value="private">Privado</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mostrar email no perfil</p>
                          <p className="text-sm text-gray-600">Outros usuários podem ver seu email</p>
                        </div>
                        <Switch
                          checked={privacySettings.showEmail}
                          onCheckedChange={(checked) => handlePrivacyUpdate('showEmail', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mostrar telefone no perfil</p>
                          <p className="text-sm text-gray-600">Outros usuários podem ver seu telefone</p>
                        </div>
                        <Switch
                          checked={privacySettings.showPhone}
                          onCheckedChange={(checked) => handlePrivacyUpdate('showPhone', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Rastreamento de atividade</p>
                          <p className="text-sm text-gray-600">Permite coleta de dados para melhorar a experiência</p>
                        </div>
                        <Switch
                          checked={privacySettings.activityTracking}
                          onCheckedChange={(checked) => handlePrivacyUpdate('activityTracking', checked)}
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-red-600 mb-2">Zona de Perigo</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Estas ações são irreversíveis. Tenha cuidado.
                      </p>

                      <Button variant="destructive" className="flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir conta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Appearance Tab */}
              {activeTab === 'aparencia' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>Personalize a interface do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Tema</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="w-full h-16 bg-white border rounded mb-2"></div>
                          <p className="text-sm text-center">Claro</p>
                        </div>
                        <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="w-full h-16 bg-gray-800 border rounded mb-2"></div>
                          <p className="text-sm text-center">Escuro</p>
                        </div>
                        <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="w-full h-16 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
                          <p className="text-sm text-center">Automático</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Idioma</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>

                    <div>
                      <Label>Fuso horário</Label>
                      <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                        <option value="America/New_York">New York (GMT-5)</option>
                        <option value="Europe/London">London (GMT+0)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ConfiguracoesPageWithAuth() {
  return (
    <ProtectedRoute requireAuth={true}>
      <ConfiguracoesPage />
    </ProtectedRoute>
  );
}