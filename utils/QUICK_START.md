# 🚀 Guia Rápido - Gerador de Evidências

## ⚡ Uso Rápido

### 1️⃣ Executar Testes e Gerar Evidências

```bash
npm run test:full
```

Este comando:
- ✅ Executa todos os testes
- ✅ Gera screenshots automaticamente
- ✅ Cria relatório HTML de evidências

### 2️⃣ Apenas Gerar Evidências (sem executar testes)

```bash
npm run generate:evidence
```

### 3️⃣ Visualizar Relatório

Abra o arquivo no navegador:

```
test-results/evidence-report/index.html
```

## 📸 Como Funciona

### Passo 1: Testes capturam screenshots

Cada teste captura screenshots em cada step:

```javascript
async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-X/${stepName}.png`,
    fullPage: true 
  });
}

test('Meu teste', async ({ page }) => {
  await page.goto('...');
  await takeScreenshot(page, 'step-2-navigate-homepage');
  
  // mais actions
  await takeScreenshot(page, 'step-3-verify-homepage');
});
```

### Passo 2: Gerador coleta screenshots

O script `utils/generate-evidence.js`:
- Busca pasta `test-results/screenshots/`
- Identifica todos os test cases
- Organiza screenshots por test case
- Extrai informações de cada step

### Passo 3: Gera HTML profissional

Cria um relatório com:
- 📊 Dashboard com estatísticas
- 📁 Test cases organizados
- 🖼️ Grid de screenshots
- 🔍 Modal para visualização ampliada

## 🎨 Recursos do Relatório

### Dashboard de Estatísticas
- Total de Test Cases
- Total de Steps
- Taxa de Sucesso
- Testes Aprovados

### Cards de Test Case
- Nome do cenário
- Quantidade de steps
- Status (PASSED/FAILED)
- Expansível/Colapsável

### Grid de Screenshots
- Layout responsivo (3 colunas)
- Numeração automática de steps
- Descrição de cada step
- Click para ampliar

### Modal Full Screen
- Visualização ampliada
- Fechar com X, ESC ou click fora
- Navegação suave

## 📁 Estrutura Esperada

```
test-results/
└── screenshots/
    ├── test-case-2/
    │   ├── step-2-navigate-homepage.png
    │   ├── step-3-verify-homepage.png
    │   ├── step-4-click-signup-login.png
    │   └── ...
    ├── test-case-3/
    │   └── ...
    └── test-case-X/
        └── ...
```

## 🎯 Padrão de Nomenclatura

**Formato obrigatório:**

```
step-{número}-{descrição}.png
```

**Exemplos válidos:**
- ✅ `step-2-navigate-homepage.png`
- ✅ `step-3-verify-homepage.png`
- ✅ `step-4a-add-first-product.png`
- ✅ `step-12-place-order.png`

**Exemplos inválidos:**
- ❌ `screenshot1.png`
- ❌ `home.png`
- ❌ `test-step-2.png`

## 🔧 Personalização

### Adicionar Novo Test Case

Edite `utils/generate-evidence.js`:

```javascript
const tcMap = {
  'test-case-2': 'Test Case 2: Login User with correct email and password',
  'test-case-24': 'Test Case 24: Seu novo test case',  // <-- Adicione aqui
};
```

### Alterar Cores do Tema

Edite os gradientes no CSS (dentro do HTML gerado):

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📊 Exemplo de Saída

O gerador exibe:

```
🚀 Iniciando geração de evidências...

✅ Coletados 10 test cases com screenshots

✅ Relatório de evidências gerado com sucesso!
📂 Localização: C:\...\test-results\evidence-report\index.html
🌐 Abra o arquivo no navegador para visualizar

📊 Estatísticas:
   - Total de Test Cases: 10
   - Total de Steps: 127
   - Taxa de Sucesso: 100%
```

## 🚀 CI/CD

O GitHub Actions está configurado para gerar evidências automaticamente:

```yaml
- name: Generate Evidence Report
  run: npm run generate:evidence

- name: Upload Evidence Report
  uses: actions/upload-artifact@v4
  with:
    name: evidence-report
    path: test-results/evidence-report/
```

Após cada execução no CI:
1. Acesse a aba "Actions" no GitHub
2. Clique no workflow executado
3. Baixe o artifact "evidence-report"
4. Extraia e abra `index.html`

## 💡 Dicas

1. **Screenshots de Qualidade**: Use `fullPage: true`
2. **Nomes Descritivos**: Use descrições claras nos steps
3. **Organização**: Mantenha 1 pasta por test case
4. **Consistência**: Siga sempre o padrão de nomenclatura
5. **Revisão**: Abra o relatório após gerar para verificar

## ❓ Problemas Comuns

### Relatório vazio ou sem test cases

**Causa:** Pasta de screenshots não existe ou está vazia

**Solução:**
```bash
# Executar testes primeiro para gerar screenshots
npm test

# Depois gerar evidências
npm run generate:evidence
```

### Screenshots não aparecem no relatório

**Causa:** Caminho relativo incorreto

**Solução:** Verifique se os screenshots estão em:
```
test-results/screenshots/test-case-X/
```

### Test case sem nome ou ID errado

**Causa:** Pasta não segue padrão `test-case-X`

**Solução:** Renomeie pastas para seguir o padrão ou adicione no mapa de nomes

## 📞 Suporte

Problemas ou sugestões? Abra uma issue no GitHub:

https://github.com/MayconVitor/automationTest/issues

---

**Desenvolvido com ❤️ para automação de testes profissional**
