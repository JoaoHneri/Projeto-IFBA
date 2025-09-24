'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  User,
  Settings,
  LogOut,
  BarChart3,
  FolderOpen,
  Calendar,
  Users,
  Shield,
  Bell,
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/toaster';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated, canManage, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const publicNavigation = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Projetos', href: '/projetos' },
    { name: 'Contato', href: '/contato' },
  ];

  const authenticatedNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Projetos', href: '/projetos', icon: FolderOpen },
    { name: 'Kanban', href: '/kanban', icon: Calendar },
    ...(canManage ? [{ name: 'Relatórios', href: '/relatorios', icon: BarChart3 }] : []),
    ...(isAdmin ? [
      { name: 'Usuários', href: '/admin/usuarios', icon: Users },
      { name: 'Admin', href: '/admin', icon: Shield }
    ] : [])
  ];

  const navigation = isAuthenticated ? authenticatedNavigation : publicNavigation;
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Logout realizado com sucesso!');
      router.push('/');
    } else {
      toast.error('Erro ao fazer logout');
    }
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-xl text-gray-900">Synchro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Search */}
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <Search className="w-4 h-4" />
                </Button>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                    3
                  </Badge>
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.nome?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{user?.nome}</span>
                  </Button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.nome}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <Badge className="mt-1 text-xs">
                          {user?.tipo_usuario === 'admin' ? 'Administrador' :
                           user?.tipo_usuario === 'gerente' ? 'Gerente' : 'Usuário'}
                        </Badge>
                      </div>

                      <div className="py-2">
                        <Link href="/perfil" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="w-4 h-4 mr-3" />
                          Perfil
                        </Link>
                        <Link href="/configuracoes" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Settings className="w-4 h-4 mr-3" />
                          Configurações
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-light">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-gray-100 bg-white">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 space-y-2 border-t border-gray-100 mt-4 ">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-600">
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-light">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}