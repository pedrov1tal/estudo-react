import { useState, useCallback } from 'react'
import { LoginFormData, LoginErrors } from '../types/login'
import { validateLoginForm } from '../utils/validators'

export const useLogin = () => {
  // Estado do formulário
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  // Estado dos erros de validação
  const [errors, setErrors] = useState<LoginErrors>({})

  // Estado de carregamento (útil para requisições)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Atualiza um campo do formulário e limpa o erro dele
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Remove o erro do campo quando o usuário começa a digitar
      if (errors[name as keyof LoginErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }))
      }
    },
    [errors]
  )

  // Valida o formulário antes de enviar
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Valida todos os campos
    const validationErrors = validateLoginForm(formData.email, formData.password)

    // Se houver erros, mostra na tela
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as LoginErrors)
      return
    }

    // Se não houver erros, simula envio
    setIsSubmitting(true)
    setErrors({})

    try {
      // Aqui você faria uma requisição para o backend
      console.log('Fazendo login com:', formData)
      
      // Simula delay de requisição
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Sucesso! Aqui você redirecionaria para a página principal
      alert(`Bem-vindo, ${formData.email}!`)
    } catch (error) {
      // Trata erro de login
      console.error('Erro ao fazer login:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset do formulário
  const reset = useCallback(() => {
    setFormData({ email: '', password: '' })
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  }
}
