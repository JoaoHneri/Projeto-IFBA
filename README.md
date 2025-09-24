# 🚀 Synchro - Sistema de Gerenciamento de Projetos

Este é um projeto desenvolvido para a disciplina de **Programação Web** do curso de **Bacharelado em Sistemas de Informação** do IFBA.

## 📋 Sobre o Projeto

O **Synchro** é uma plataforma completa para gerenciamento de projetos que oferece soluções para empresas de todos os tamanhos. O sistema foi desenvolvido seguindo os requisitos específicos do projeto acadêmico, implementando todas as funcionalidades obrigatórias para frontend.

## 🎯 Tema Escolhido

**Sistema de Gerenciamento de Projetos** - Uma empresa fictícia especializada em oferecer soluções tecnológicas para gestão de projetos, equipes e recursos.

## 📄 Páginas Implementadas

### Páginas Obrigatórias:
- **🏠 Página Inicial** (`/`)
  - Apresentação geral da empresa
  - Recursos principais em destaque
  - Slideshow interativo
  - Galeria de funcionalidades
  - Estatísticas da empresa
  - FAQ com painéis recolhíveis

- **ℹ️ Página Sobre** (`/sobre`)
  - História e missão da empresa
  - Apresentação da equipe
  - Valores e conquistas
  - Informações detalhadas sobre a organização

- **🛠️ Página Serviços** (`/servicos`)
  - Lista completa de serviços oferecidos
  - Sistema de filtros e ordenação
  - Calendário para agendamento
  - Planos e preços
  - Páginas de detalhes individuais dos serviços

- **📞 Página Contato** (`/contato`)
  - Formulário de contato funcional com validação
  - Informações de contato completas
  - Horários de atendimento
  - FAQ
  - Redes sociais

### Páginas de Detalhes dos Serviços:
- **📊 Gestão de Projetos** (`/servicos/gestao-projetos`)
- **👥 Gestão de Equipes** (`/servicos/gestao-equipes`)
- **⚡ Automação** (`/servicos/automacao`)
- **📈 Analytics** (`/servicos/analytics`)
- **🔧 Consultoria** (`/servicos/consultoria`)
- **🔒 Segurança** (`/servicos/seguranca`)

## ⚡ Funcionalidades JavaScript Implementadas

### ✅ Obrigatórias:
- **Validação de Formulários**: Formulário de contato com validação completa usando React Hook Form e Zod

### 🎁 Funcionalidades Adicionais:
- **📡 Ajax/JSON**: Submissão e recuperação de dados via Ajax
- **🎬 Slideshow**: Carrossel automático com controles manuais
- **🖼️ Galeria de Fotos**: Modal com navegação por teclado e filtros
- **📅 Calendário**: Seletor de datas personalizado
- **🔄 Ordenação**: Sistema de filtros e ordenação para serviços
- **📂 Painéis Recolhíveis**: Accordion animado para FAQ

## 🛠️ Tecnologias Utilizadas

### Frontend:
- **Next.js 15.5.3** - Framework React para desenvolvimento web
- **React 19.1.0** - Biblioteca JavaScript para interfaces
- **Tailwind CSS 4** - Framework CSS para estilização
- **shadcn/ui** - Biblioteca de componentes
- **TypeScript/JavaScript** - Linguagem de programação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Bibliotecas Adicionais:
- **Lucide React** - Ícones
- **Radix UI** - Componentes primitivos
- **Class Variance Authority** - Utilitário para classes CSS
- **Clsx & Tailwind Merge** - Manipulação de classes

## 🎨 Design e UI/UX

- **Layout Responsivo**: Adaptável para desktop, tablet e mobile
- **Design System**: Componentes reutilizáveis e consistentes
- **Acessibilidade**: Navegação por teclado e screen readers
- **Animações**: Transições suaves e efeitos visuais
- **Cores**: Paleta profissional azul/roxo com acentos

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints para:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- Node.js 18+ instalado
- npm ou yarn

### Instalação:
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd -gerenciador-de-projetos

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação (App Router)
│   ├── page.js            # Página inicial
│   ├── sobre/page.js      # Página sobre
│   ├── servicos/          # Páginas de serviços
│   ├── contato/page.js    # Página de contato
│   ├── layout.js          # Layout principal
│   └── globals.css        # Estilos globais
├── components/             # Componentes reutilizáveis
│   ├── ui/                # Componentes da UI
│   ├── navigation.jsx     # Navegação principal
│   ├── footer.jsx         # Rodapé
│   ├── slideshow.jsx      # Carrossel de imagens
│   ├── photo-gallery.jsx  # Galeria de fotos
│   ├── calendar.jsx       # Calendário
│   └── ...               # Outros componentes
└── lib/                   # Utilitários
    └── utils.js           # Funções auxiliares
```

## ✅ Checklist de Requisitos Atendidos

### Frontend Técnico:
- ✅ HTML estruturado e semântico
- ✅ CSS externo reutilizável (Tailwind CSS)
- ✅ JavaScript externo para comportamento
- ✅ Layout responsivo
- ✅ Código bem indentado e organizado
- ✅ Navegação intuitiva e usabilidade

### Funcionalidades JavaScript:
- ✅ Validação de formulários (obrigatório)
- ✅ Submissão/Recuperação via Ajax/JSON
- ✅ Animação Slideshow
- ✅ Galeria de fotos com modal
- ✅ Calendário para seleção
- ✅ Ordenação de elementos
- ✅ Painéis recolhíveis

### Estruturação:
- ✅ Layout tableless
- ✅ Separação de camadas (HTML/CSS/JS)
- ✅ Usabilidade e navegação intuitiva

## 🎯 Pontos Fortes do Projeto

1. **Design Moderno**: Interface clean e profissional
2. **Performance**: Otimizado com Next.js e componentes reutilizáveis
3. **Acessibilidade**: Navegação por teclado e semântica adequada
4. **Responsividade**: Funciona perfeitamente em todos os dispositivos
5. **Interatividade**: Rica em funcionalidades JavaScript
6. **Organização**: Código bem estruturado e documentado

## 👥 Equipe

- **João Silva** - Desenvolvedor Full Stack
- **Maria Santos** - UI/UX Designer  
- **Pedro Costa** - Frontend Developer

## 📞 Contato

- **Email**: contato@projetohub.com
- **Telefone**: (75) 3333-4444
- **WhatsApp**: (75) 99999-9999
- **Endereço**: Salvador, BA - Brasil

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso de Sistemas de Informação do IFBA.

---

🚀 **ProjetoHub** - Transformando a gestão de projetos através da tecnologia!
