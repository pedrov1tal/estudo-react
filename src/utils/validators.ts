// Funções de validação reutilizáveis
// Cada função retorna uma mensagem de erro ou undefined (válido)

// Valida o email com regex
export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email é obrigatório'
  }
  
  // Regex simples para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Email inválido'
  }
  
  return undefined
}

// Valida a senha
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Senha é obrigatória'
  }
  
  // Senha deve ter no mínimo 6 caracteres
  if (password.length < 6) {
    return 'Senha deve ter no mínimo 6 caracteres'
  }
  
  return undefined
}

// Valida todos os campos
export const validateLoginForm = (
  email: string,
  password: string
): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError
  
  return errors
}
