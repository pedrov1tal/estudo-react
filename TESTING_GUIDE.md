# 🧪 Testando a Tela de Login

## Testes Manuais (No Navegador)

### ✅ Teste 1: Validação de Email Vazio
1. Deixe o campo de email vazio
2. Clique em "Entrar"
3. **Resultado esperado:** Mensagem de erro "Email é obrigatório"

### ✅ Teste 2: Email Inválido
1. Digite "email-invalido" (sem @)
2. Clique em "Entrar"
3. **Resultado esperado:** Mensagem de erro "Email inválido"

### ✅ Teste 3: Senha Vazia
1. Digite um email válido: "teste@email.com"
2. Deixe a senha vazia
3. Clique em "Entrar"
4. **Resultado esperado:** Mensagem de erro "Senha é obrigatória"

### ✅ Teste 4: Senha Muito Curta
1. Digite um email válido: "teste@email.com"
2. Digite uma senha curta: "123"
3. Clique em "Entrar"
4. **Resultado esperado:** Mensagem de erro "Senha deve ter no mínimo 6 caracteres"

### ✅ Teste 5: Login Bem-Sucedido
1. Digite um email válido: "seu@email.com"
2. Digite uma senha válida: "senha123"
3. Clique em "Entrar"
4. **Resultado esperado:**
   - Botão fica "Carregando..."
   - Inputs ficam desabilitados
   - Após 1.5s, recebe alerta: "Bem-vindo, seu@email.com!"

### ✅ Teste 6: Limpeza de Erros
1. Digite um email inválido: "invalido"
2. Clique em "Entrar" (receberá erro)
3. Comece a digitar um email válido
4. **Resultado esperado:** A mensagem de erro desaparece conforme você digita

---

## 🎨 Testes Visuais

- [ ] A tela está centralizada e bem formatada?
- [ ] A animação de entrada (slideUp) funciona?
- [ ] Os campos ganham borda vermelha com erro?
- [ ] O botão muda de cor ao passar o mouse?
- [ ] Os inputs ficam acinzentados ao serem desabilitados?
- [ ] A tela é responsiva em mobile (teste redimensionando a janela)?

---

## 💾 Dados de Teste Que Você Pode Usar

```
Email Válido:        usuario@email.com
Email Válido:        seu.nome@empresa.com.br
Email Inválido:      usuario@
Email Inválido:      usuario.email.com

Senha Válida:        senha123
Senha Válida:        minhasenha456
Senha Inválida:      123    (muito curta)
Senha Inválida:      ab     (muito curta)
```

---

## 🐛 Problemas Comuns e Como Debugar

### Erro: "O campo não está limpando o erro"
- Abra o DevTools (F12)
- Vá para a aba "Console"
- Procure por mensagens de erro em vermelho

### Erro: "Não consigo ver a tela de login"
- Verifique se o servidor está rodando: `npm run dev`
- Acesse http://localhost:5173/
- Se não funcionar, abra o console (F12) e veja os erros

### Erro: "Os inputs não estão respondendo"
- Verifique se o atributo `onChange` está no input
- Verifique se o atributo `name` corresponde ao campo em `formData`

---

## 📊 Verificando o Estado (DevTools)

1. Abra o DevTools (F12)
2. Vá para "Console"
3. Quando você clica em "Entrar", o console mostra:
   ```
   Fazendo login com: { email: '...', password: '...' }
   ```

Isso prova que os dados estão sendo capturados corretamente!

---

## ⚙️ Como Adicionar Console.log para Debugar

Se quiser ver o que está acontecendo em cada etapa:

```typescript
// Em useLogin.ts, adicione no handleChange:
const handleChange = useCallback((e) => {
  console.log('Campo mudou:', e.target.name, '=', e.target.value)
  // resto do código...
}, [])

// E no handleSubmit:
const handleSubmit = async (e) => {
  console.log('Validando formulário:', formData)
  console.log('Erros encontrados:', validationErrors)
  // resto do código...
}
```

Abrindo o DevTools (F12), você verá todas essas mensagens na Console!
