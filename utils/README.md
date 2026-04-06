# 📊 Gerador de Evidências de Teste

Gerador automático de relatórios HTML com evidências visuais de testes automatizados.

## 🎯 Características

✅ **Design Profissional**: Interface moderna e responsiva
✅ **Organização por Test Cases**: Evidências agrupadas por cenário
✅ **Screenshots em Grid**: Visualização organizada de todos os steps
✅ **Modal Full Screen**: Clique nas imagens para ampliar
✅ **Estatísticas**: Resumo executivo com métricas
✅ **Expansível/Colapsável**: Navegação fácil entre test cases
✅ **Print-Friendly**: Otimizado para impressão
✅ **Auto-Numeração**: Steps numerados automaticamente

## 🚀 Como Usar

### Gerar Evidências Após os Testes

```bash
# Executar testes
npm test

# Gerar relatório de evidências
npm run generate:evidence
```

### Executar Testes e Gerar Evidências Automaticamente

```bash
# Executa testes + gera evidências em um único comando
npm run test:full
```

## 📁 Estrutura de Screenshots

O gerador espera que os screenshots estejam organizados assim:

```
test-results/
└── screenshots/
    ├── test-case-2/
    │   ├── step-2-navigate-homepage.png
    │   ├── step-3-verify-homepage.png
    │   └── ...
    ├── test-case-3/
    │   └── ...
    └── test-case-X/
        └── ...
```

### Padrão de Nomenclatura

Os screenshots devem seguir o padrão:

```
step-{número}-{descrição}.png
```

Exemplos:
- `step-2-navigate-homepage.png`
- `step-3-verify-homepage.png`
- `step-4a-add-first-product.png`

## 📊 Relatório Gerado

O relatório HTML é salvo em:

```
test-results/evidence-report/index.html
```

### Conteúdo do Relatório

1. **Header**: Título, data/hora de geração
2. **Resumo**: Cards com estatísticas (total de testes, steps, taxa de sucesso)
3. **Test Cases**: Lista de todos os cenários testados
   - Nome do test case
   - Quantidade de steps
   - Status (PASSED/FAILED)
   - Grid com screenshots de cada step
4. **Footer**: Informações do projeto e links

## 🎨 Recursos Visuais

### Cards de Resumo
- Total de Test Cases
- Total de Steps
- Taxa de Sucesso
- Testes que Passaram

### Grid de Screenshots
- Layout responsivo (3 colunas em desktop)
- Hover effect para destaque
- Click para visualizar em tela cheia

### Modal de Imagem
- Ampliação de screenshot
- Fechar com X, clique fora ou ESC
- Navegação suave

## 🔧 Personalização

Para personalizar os nomes dos test cases, edite o mapa em `utils/generate-evidence.js`:

```javascript
const tcMap = {
  'test-case-2': 'Test Case 2: Login User with correct email and password',
  'test-case-3': 'Test Case 3: Login User with incorrect email and password',
  // Adicione mais test cases aqui
};
```

## 📝 Boas Práticas

1. **Screenshots Descritivos**: Use nomes claros para os steps
2. **Organização**: Mantenha screenshots em pastas separadas por test case
3. **Qualidade**: Use `fullPage: true` para capturas completas
4. **Consistência**: Siga o padrão de numeração de steps

## 🎯 Exemplo de Uso em Testes

```javascript
async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-X/${stepName}.png`,
    fullPage: true 
  });
}

test('Test Case X: Description', async ({ page }) => {
  await page.goto('http://example.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
  
  // ... mais steps
});
```

## 📦 Scripts NPM Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm test` | Executa todos os testes |
| `npm run test:headed` | Executa testes com browser visível |
| `npm run test:report` | Abre relatório Playwright |
| `npm run generate:evidence` | Gera relatório de evidências |
| `npm run test:full` | Executa testes + gera evidências |

## 🌟 Benefícios

- ✅ Documentação visual automática
- ✅ Rastreabilidade completa dos testes
- ✅ Facilita revisão e auditoria
- ✅ Profissional para apresentações
- ✅ Economiza tempo na documentação manual
- ✅ Integra com CI/CD

## 🔗 Integração CI/CD

O gerador pode ser integrado ao GitHub Actions para gerar evidências automaticamente:

```yaml
- name: Generate Evidence Report
  run: npm run generate:evidence
  
- name: Upload Evidence Report
  uses: actions/upload-artifact@v4
  with:
    name: evidence-report
    path: test-results/evidence-report/
```

## 📄 Licença

Este gerador faz parte do projeto Automation Test Framework.
