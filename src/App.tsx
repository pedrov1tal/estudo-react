import { useState } from 'react'
import { validateLoginForm } from './utils/validators'
import './styles/Login.css'

function App() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Limpa erro conforme digita
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const validationErrors = validateLoginForm(formData.email, formData.password)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert(`✅ Bem-vindo, ${formData.email}!`)
      setFormData({ email: '', password: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">❌ {errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.password && <span className="error-message">❌ {errors.password}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '⏳ Carregando...' : '✉️ Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem conta? <a href="#signup">Cadastre-se aqui</a>
          </p>
          <p>
            <a href="#forgot">Esqueceu a senha?</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
