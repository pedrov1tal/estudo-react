// Define o tipo de dados que o formulário vai trabalhar
export interface LoginFormData {
  email: string
  password: string
}

// Define os erros de validação para cada campo
export interface LoginErrors {
  email?: string
  password?: string
}

// Define o estado do formulário
export interface LoginFormState {
  data: LoginFormData
  errors: LoginErrors
  isSubmitting: boolean
  isValid: boolean
}
