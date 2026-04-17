# 🚀 Recursos Avançados para Expandir o Login

## 1. Validação em Tempo Real (Debounce)

Validar enquanto o usuário está digitando, mas sem sobrecarregar:

```typescript
// Em src/hooks/useLogin.ts
import { useEffect, useRef } from 'react'

const useLogin = () => {
  const [formData, setFormData] = useState<LoginFormData>(...)
  const debounceTimer = useRef<NodeJS.Timeout>()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpa o timer anterior
    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    // Valida apenas após 500ms de inatividade
    debounceTimer.current = setTimeout(() => {
      const error = name === 'email' 
        ? validateEmail(value)
        : validatePassword(value)
      
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }))
      }
    }, 500)
  }, [])

  return { /* ... */ }
}
```

---

## 2. Mostrar/Esconder Senha

Adicione um botão para alternar a visibilidade:

```typescript
// Em src/hooks/useLogin.ts
const [showPassword, setShowPassword] = useState(false)

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword)
}

// Em src/components/Login.tsx
<div className="password-field">
  <input
    type={showPassword ? 'text' : 'password'}
    // ... resto do código
  />
  <button 
    type="button"
    onClick={togglePasswordVisibility}
    className="toggle-password"
  >
    {showPassword ? '👁️ Esconder' : '👁️ Mostrar'}
  </button>
</div>
```

---

## 3. Persistência de Dados com localStorage

Salvar o email do usuário:

```typescript
// Em src/hooks/useLogin.ts
useEffect(() => {
  // Carrega email salvo ao montar o componente
  const savedEmail = localStorage.getItem('lastEmail')
  if (savedEmail) {
    setFormData((prev) => ({ ...prev, email: savedEmail }))
  }
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()
  
  // ... validações ...
  
  // Salva o email
  localStorage.setItem('lastEmail', formData.email)
  
  // ... resto do envio ...
}
```

---

## 4. Integração com Backend Real

Exemplo com fetch:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  const validationErrors = validateLoginForm(formData.email, formData.password)
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors as LoginErrors)
    return
  }

  setIsSubmitting(true)

  try {
    const response = await fetch('https://sua-api.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Falha na autenticação')
    }

    const data = await response.json()
    
    // Salva o token
    localStorage.setItem('authToken', data.token)
    
    // Redireciona para página principal
    window.location.href = '/dashboard'
  } catch (error) {
    setErrors({
      email: 'Email ou senha incorretos',
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 5. Roteamento com React Router

Estrutura completa com rotas:

```typescript
// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../components/Login'
import { Dashboard } from '../components/Dashboard'
import { ProtectedRoute } from '../components/ProtectedRoute'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

// src/components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('authToken')
  
  if (!token) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
```

Para usar, instale: `npm install react-router-dom`

---

## 6. Feedback Visual com Toast Notifications

Mostrar mensagens temporárias:

```typescript
// src/components/Toast.tsx
import { useEffect, useState } from 'react'
import '../styles/Toast.css'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

export function Toast({ message, type, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  )
}

// Usar no componente:
const [toast, setToast] = useState<ToastProps | null>(null)

const handleSubmit = async (e) => {
  // ... validações ...
  
  try {
    // ... fazer login ...
    setToast({ message: 'Login bem-sucedido!', type: 'success' })
  } catch (error) {
    setToast({ message: 'Erro ao fazer login', type: 'error' })
  }
}

// No JSX:
{toast && <Toast {...toast} />}
```

---

## 7. Validação no Servidor

Sempre validar no backend também (não confiar apenas no frontend):

```typescript
// Backend (Node.js/Express)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  // Validações do backend (OBRIGATÓRIO!)
  if (!email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios' })
  }

  // Verificar no banco de dados
  const user = findUserByEmail(email)
  
  if (!user || !isPasswordValid(user.password, password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  // Gerar token JWT
  const token = generateToken(user)
  
  res.json({ token, user })
})
```

---

## 8. Testes Unitários (Jest + React Testing Library)

```typescript
// src/hooks/__tests__/useLogin.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLogin } from '../useLogin'

describe('useLogin', () => {
  it('deve validar email vazio', () => {
    const { result } = renderHook(() => useLogin())

    act(() => {
      const form = new FormData()
      form.set('email', '')
      form.set('password', 'senha123')
      // simular submit...
    })

    expect(result.current.errors.email).toBe('Email é obrigatório')
  })
})
```

Para usar, instale: `npm install --save-dev @testing-library/react @testing-library/jest-dom`

---

## 📚 Próximas Leituras Recomendadas

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Authentication](https://jwt.io/introduction)
- [Form Validation Patterns](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux)

---

Boa sorte no seu aprendizado! 🚀
