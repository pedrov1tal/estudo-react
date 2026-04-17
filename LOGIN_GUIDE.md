# 📚 Guia Completo: Tela de Login com Validações

## 📋 O que foi criado?

Você agora tem uma tela de login profissional com validações completas. Vamos aprender como funciona:

---

## 🏗️ Estrutura dos Arquivos

### 1. **Tipos TypeScript** (`src/types/login.ts`)
```typescript
interface LoginFormData {
  email: string
  password: string
}
```
- Define o **contrato** dos dados que o formulário vai usar
- TypeScript vai alertar se você tentar acessar propriedades que não existem
- Garante segurança de tipos durante o desenvolvimento

### 2. **Validações** (`src/utils/validators.ts`)
- Funções **reutilizáveis** para validar email e senha
- Cada função retorna uma mensagem de erro ou `undefined` (válido)
- Você pode usar essas funções em outros componentes também

**Validações implementadas:**
- ✅ Email obrigatório e em formato válido
- ✅ Senha obrigatória com mínimo de 6 caracteres

### 3. **Hook Customizado** (`src/hooks/useLogin.ts`)

Um hook é uma função especial do React que gerencia **lógica reutilizável**.

```typescript
const { formData, errors, isSubmitting, handleChange, handleSubmit } = useLogin()
```

**O que o hook faz:**
- **formData**: Armazena os valores dos inputs
- **errors**: Armazena as mensagens de erro
- **isSubmitting**: Controla se está enviando dados
- **handleChange**: Atualiza o formulário quando o usuário digita
- **handleSubmit**: Valida e envia os dados

**Recursos importantes:**
- Limpa erros conforme o usuário digita
- Desabilita inputs durante o envio
- Simula requisição ao servidor (com delay de 1.5s)

### 4. **Componente de Login** (`src/components/Login.tsx`)

- Usa o hook `useLogin()`
- Renderiza o formulário com os campos de email e senha
- Mostra mensagens de erro próximas aos campos
- Links para recuperar senha e cadastro

### 5. **Estilos** (`src/styles/Login.css`)

**Destaques do design:**
- Fundo com gradiente bonito
- Animação de entrada (slideUp)
- Efeitos ao focar nos inputs
- Estados diferentes para inputs com erro
- Responsivo para mobile
- Cores consistentes e profissionais

---

## 🎯 Como o Formulário Funciona

### Fluxo Completo:

1. **Usuário digita no input**
   - `handleChange` atualiza o estado `formData`
   - Limpa erro se existir

2. **Usuário clica em "Entrar"**
   - `handleSubmit` é chamado
   - Valida todos os campos
   - Se houver erros, mostra na tela
   - Se OK, simula envio

3. **Durante o envio**
   - Botão fica desabilitado
   - Inputs ficam desabilitados
   - Texto muda para "Carregando..."
   - Após 1.5s, mostra alerta de sucesso

---

## 🔧 Como Estender

### Adicionar validação de força de senha:

```typescript
// Em src/utils/validators.ts
const validatePasswordStrength = (password: string) => {
  if (!/[A-Z]/.test(password)) {
    return 'Deve conter letra maiúscula'
  }
  if (!/[0-9]/.test(password)) {
    return 'Deve conter número'
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return 'Deve conter caractere especial'
  }
  return undefined
}
```

### Conectar a um backend real:

```typescript
// Em src/hooks/useLogin.ts
try {
  const response = await fetch('https://seu-api.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  
  if (!response.ok) throw new Error('Login falhou')
  
  const data = await response.json()
  console.log('Token recebido:', data.token)
} catch (error) {
  setErrors({ email: 'Email ou senha incorretos' })
}
```

### Adicionar campo de "Lembrar-me":

```typescript
// 1. Atualizar tipo
interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

// 2. Adicionar input no componente
<input
  type="checkbox"
  id="rememberMe"
  name="rememberMe"
  checked={formData.rememberMe}
  onChange={handleChange}
/>
```

---

## 📱 Conceitos Aprendidos

### 1. **useState** - Estado do React
Armazena dados que mudam com o tempo (input, erros, loading)

### 2. **useCallback** - Otimização
Evita recriar funções desnecessariamente

### 3. **TypeScript**
Segurança de tipos durante o desenvolvimento

### 4. **CSS Responsivo**
Tela adapta para mobile, tablet e desktop

### 5. **Validação de Formulário**
Padrão profissional de validar antes de enviar

### 6. **Hooks Customizados**
Lógica reutilizável que você pode usar em vários componentes

---

## ✅ Próximos Passos

1. Teste o formulário digitando valores inválidos
2. Veja as mensagens de erro aparecerem
3. Tente adicionar uma nova validação
4. Conecte a um backend real

Você está aprendendo React da forma correta! 🚀
