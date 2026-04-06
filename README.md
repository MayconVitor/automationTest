# 🎭 Automation Test Framework

[![Playwright Tests](https://github.com/MayconVitor/automationTest/actions/workflows/playwright.yml/badge.svg)](https://github.com/MayconVitor/automationTest/actions/workflows/playwright.yml)

Framework de automação de testes end-to-end com Playwright, focado em boas práticas, self-healing e geração automática de evidências.

## 🚀 Características

- ✅ **10 Test Cases** automatizados
- ✅ **Self-Healing** nativo do Playwright (retries, traces, vídeos)
- ✅ **Execução Paralela** com 3 workers
- ✅ **Screenshots** automáticos em cada step
- ✅ **Gerador de Evidências** HTML profissional
- ✅ **CI/CD** integrado com GitHub Actions
- ✅ **Actions Reutilizáveis** (Click, Fill, etc.)

## 📋 Test Cases Implementados

| ID | Descrição | Status |
|----|-----------|--------|
| TC2 | Login com credenciais corretas | ✅ |
| TC3 | Login com credenciais incorretas | ✅ |
| TC4 | Logout | ✅ |
| TC5 | Registro com email existente | ✅ |
| TC13 | Verificar quantidade no carrinho | ✅ |
| TC14 | Place Order: Registro durante checkout | ✅ |
| TC15 | Place Order: Registro antes do checkout | ✅ |
| TC16 | Place Order: Login antes do checkout | ✅ |
| TC17 | Remover produtos do carrinho | ✅ |
| TC23 | Verificar detalhes de endereço no checkout | ✅ |

## 🎯 Performance

- ⏱️ **Tempo de execução**: ~1.4 minutos para 10 testes
- 🔄 **Workers paralelos**: 3
- 🔁 **Retries**: 2 (self-healing)
- ✅ **Taxa de sucesso**: 100%

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/MayconVitor/automationTest.git
cd automationTest

# Instalar dependências
npm install

# Instalar browsers do Playwright
npx playwright install
```

## 🎬 Execução

### Executar todos os testes

```bash
npm test
```

### Executar com browser visível

```bash
npm run test:headed
```

### Gerar relatório de evidências

```bash
npm run generate:evidence
```

### Executar testes + gerar evidências

```bash
npm run test:full
```

### Ver relatório Playwright

```bash
npm run test:report
```

## 📊 Gerador de Evidências

O framework inclui um **gerador automático de evidências** que cria um relatório HTML profissional com:

- 📸 Screenshots organizados por test case
- 📈 Estatísticas e métricas
- 🎨 Interface moderna e responsiva
- 🔍 Visualização em tela cheia
- 📄 Pronto para impressão

### Exemplo de Uso

```bash
# Executar testes
npm test

# Gerar evidências
npm run generate:evidence

# Abrir relatório
# Localização: test-results/evidence-report/index.html
```

[Ver documentação completa do gerador](./utils/README.md)

## 🏗️ Estrutura do Projeto

```
automationTest/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD GitHub Actions
├── actions/
│   └── web/
│       ├── BaseAction.js           # Action base
│       ├── ClickAction.js          # Click action
│       └── FillAction.js           # Fill action
├── tests/
│   └── e2e/
│       ├── login.spec.js           # TC2
│       ├── login-incorrect.spec.js # TC3
│       ├── logout.spec.js          # TC4
│       └── ...                     # Outros test cases
├── utils/
│   ├── generate-evidence.js        # Gerador de evidências
│   └── README.md                   # Documentação do gerador
├── test-results/
│   ├── screenshots/                # Screenshots dos testes
│   └── evidence-report/            # Relatório HTML gerado
├── playwright.config.js            # Configuração Playwright
├── package.json
└── README.md
```

## ⚙️ Configuração

### Playwright Config

```javascript
{
  retries: 2,           // Self-healing
  workers: 3,           // Paralelização
  timeout: 60000,       // 60s timeout
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
}
```

### Scripts NPM

| Script | Descrição |
|--------|-----------|
| `npm test` | Executa todos os testes |
| `npm run test:headed` | Executa com browser visível |
| `npm run test:report` | Abre relatório Playwright |
| `npm run generate:evidence` | Gera relatório de evidências |
| `npm run test:full` | Executa testes + gera evidências |

## 🔄 CI/CD

O projeto está configurado com **GitHub Actions** para execução automática dos testes:

- ✅ Executa em todos os pushes e PRs
- ✅ Gera evidências automaticamente
- ✅ Upload de artifacts (evidências, traces, vídeos)
- ✅ Execução em paralelo com sharding

[Ver workflow](./.github/workflows/playwright.yml)

## 📸 Screenshots

Os testes capturam screenshots automaticamente em cada step:

```javascript
async function takeScreenshot(page, stepName) {
  await page.screenshot({ 
    path: `test-results/screenshots/test-case-X/${stepName}.png`,
    fullPage: true 
  });
}
```

## 🧪 Exemplo de Teste

```javascript
import { test, expect } from '@playwright/test';

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  await page.goto('http://automationexercise.com');
  await takeScreenshot(page, 'step-2-navigate-homepage');
  
  await expect(page).toHaveURL(/automationexercise/);
  await takeScreenshot(page, 'step-3-verify-homepage');
  
  // ... mais steps
});
```

## 🎯 Boas Práticas Implementadas

- ✅ **Actions Reutilizáveis**: DRY (Don't Repeat Yourself)
- ✅ **Screenshots em Todos os Steps**: Rastreabilidade completa
- ✅ **Dados Únicos**: Timestamp para evitar conflitos
- ✅ **Seletores Robustos**: Uso de locators específicos
- ✅ **Waiters Explícitos**: Evita flakiness
- ✅ **Self-Healing**: Retries automáticos
- ✅ **Paralelização**: Execução mais rápida

## 🛠️ Tecnologias

- [Playwright](https://playwright.dev/) - Framework de automação
- [Node.js](https://nodejs.org/) - Runtime
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📝 Próximos Passos

- [ ] Adicionar mais test cases
- [ ] Implementar Page Object Model (POM)
- [ ] Adicionar testes de API
- [ ] Integrar com ferramentas de monitoramento
- [ ] Adicionar testes de acessibilidade

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE).

## 👤 Autor

**Maycon Vitor**

- GitHub: [@MayconVitor](https://github.com/MayconVitor)
- Projeto: [automationTest](https://github.com/MayconVitor/automationTest)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
