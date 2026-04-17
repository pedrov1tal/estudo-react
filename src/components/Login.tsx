import { useLogin } from '../hooks/useLogin'
import '../styles/Login.css'

export const Login = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useLogin()

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          {/* Campo de Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Campo de Senha */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
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
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para recuperar senha */}
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
