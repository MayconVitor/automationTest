import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  // Self-Healing Nativo - Retry automático
  retries: 2,              // Retry 2x automaticamente
  workers: 3,             // Execução paralela
  
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  timeout: 60000,          // Timeout por teste (60s para testes complexos)
  expect: {
    timeout: 10000         // Timeout por assertion
  },
  
  use: {
    baseURL: 'http://automationexercise.com',
    trace: 'on-first-retry',     // Grava trace no primeiro retry
    video: 'on-first-retry',    // Grava vídeo no primeiro retry
    screenshot: 'only-on-failure',  // Screenshot só quando falha
    headless: true,
    actionTimeout: 15000,       // Timeout para ações
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  // Hook para logging automatico
  reporter: [
    ['list'],
    ['html', { 
      open: 'never',
      outputFolder: 'playwright-report'
    }],
  ],
});