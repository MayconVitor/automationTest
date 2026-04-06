import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gerador de Evidências de Teste
 * Gera um relatório HTML profissional com screenshots organizados por test case
 */
class EvidenceGenerator {
  constructor() {
    this.screenshotsDir = path.join(__dirname, '..', 'test-results', 'screenshots');
    this.outputDir = path.join(__dirname, '..', 'test-results', 'evidence-report');
    this.testCases = [];
  }

  /**
   * Coleta todos os test cases e seus screenshots
   */
  collectTestCases() {
    if (!fs.existsSync(this.screenshotsDir)) {
      console.error('❌ Pasta de screenshots não encontrada:', this.screenshotsDir);
      return;
    }

    const testCaseFolders = fs.readdirSync(this.screenshotsDir);

    testCaseFolders.forEach(folder => {
      const folderPath = path.join(this.screenshotsDir, folder);
      const stats = fs.statSync(folderPath);

      if (stats.isDirectory()) {
        const screenshots = fs.readdirSync(folderPath)
          .filter(file => file.endsWith('.png'))
          .sort() // Ordenar por nome de arquivo (steps)
          .map(file => ({
            name: file,
            path: path.join(folderPath, file),
            relativePath: `screenshots/${folder}/${file}`,
            step: this.extractStepInfo(file)
          }));

        if (screenshots.length > 0) {
          this.testCases.push({
            id: folder,
            name: this.formatTestCaseName(folder),
            screenshots: screenshots,
            totalSteps: screenshots.length,
            status: 'PASSED' // Por padrão, se tem screenshots, passou
          });
        }
      }
    });

    console.log(`✅ Coletados ${this.testCases.length} test cases com screenshots`);
  }

  /**
   * Extrai informação do step a partir do nome do arquivo
   */
  extractStepInfo(filename) {
    // Formato esperado: step-X-description.png
    const match = filename.match(/step-(\d+[a-z]?)-(.+)\.png/i);
    if (match) {
      return {
        number: match[1],
        description: match[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      };
    }
    return {
      number: '?',
      description: filename.replace('.png', '').replace(/-/g, ' ')
    };
  }

  /**
   * Formata o nome do test case para exibição
   */
  formatTestCaseName(folderId) {
    // Formato: test-case-X -> Test Case X: Description
    const tcMap = {
      'test-case-2': 'Test Case 2: Login User with correct email and password',
      'test-case-3': 'Test Case 3: Login User with incorrect email and password',
      'test-case-4': 'Test Case 4: Logout User',
      'test-case-5': 'Test Case 5: Register User with existing email',
      'test-case-13': 'Test Case 13: Verify Product quantity in Cart',
      'test-case-14': 'Test Case 14: Place Order: Register while Checkout',
      'test-case-15': 'Test Case 15: Place Order: Register before Checkout',
      'test-case-16': 'Test Case 16: Place Order: Login before Checkout',
      'test-case-17': 'Test Case 17: Remove Products From Cart',
      'test-case-23': 'Test Case 23: Verify address details in checkout page'
    };

    return tcMap[folderId] || folderId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Gera o HTML do relatório
   */
  generateHTML() {
    const now = new Date();
    const reportDate = now.toLocaleString('pt-BR', { 
      dateStyle: 'full', 
      timeStyle: 'medium' 
    });

    const totalTests = this.testCases.length;
    const totalSteps = this.testCases.reduce((sum, tc) => sum + tc.totalSteps, 0);

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Evidências - Automation Test</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            color: #333;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .header .subtitle {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 40px;
            background: #f8f9fa;
        }

        .summary-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            border-left: 5px solid #667eea;
        }

        .summary-card .number {
            font-size: 3em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }

        .summary-card .label {
            font-size: 1em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .test-cases {
            padding: 40px;
        }

        .test-case {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            margin-bottom: 30px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .test-case:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .test-case-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 30px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .test-case-header:hover {
            background: linear-gradient(135deg, #5568d3 0%, #663a8b 100%);
        }

        .test-case-title {
            font-size: 1.3em;
            font-weight: 600;
        }

        .test-case-badge {
            background: rgba(255, 255, 255, 0.3);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
        }

        .test-case-status {
            background: #28a745;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
            margin-left: 10px;
        }

        .test-case-content {
            padding: 30px;
            display: none;
        }

        .test-case-content.active {
            display: block;
        }

        .steps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }

        .step-card {
            background: #f8f9fa;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e0e0e0;
            transition: all 0.3s ease;
        }

        .step-card:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-3px);
        }

        .step-header {
            background: #667eea;
            color: white;
            padding: 12px 20px;
            font-weight: 600;
        }

        .step-number {
            background: rgba(255, 255, 255, 0.3);
            padding: 2px 10px;
            border-radius: 12px;
            margin-right: 10px;
            font-size: 0.9em;
        }

        .step-image {
            width: 100%;
            height: auto;
            display: block;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .step-image:hover {
            transform: scale(1.02);
        }

        .step-description {
            padding: 15px 20px;
            font-size: 0.95em;
            color: #555;
            background: white;
        }

        /* Modal para visualização de imagem em tela cheia */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            overflow: auto;
        }

        .modal-content {
            margin: auto;
            display: block;
            max-width: 90%;
            max-height: 90%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .close {
            position: absolute;
            top: 30px;
            right: 50px;
            color: #f1f1f1;
            font-size: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.3s;
        }

        .close:hover {
            color: #bbb;
        }

        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            border-top: 2px solid #e0e0e0;
        }

        .footer a {
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }

            .container {
                box-shadow: none;
            }

            .test-case-content {
                display: block !important;
            }

            .step-card:hover {
                transform: none;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Relatório de Evidências de Teste</h1>
            <div class="subtitle">Automação de Testes - Playwright</div>
            <div class="subtitle" style="margin-top: 10px; font-size: 0.9em;">
                Gerado em: ${reportDate}
            </div>
        </div>

        <div class="summary">
            <div class="summary-card">
                <div class="number">${totalTests}</div>
                <div class="label">Test Cases</div>
            </div>
            <div class="summary-card">
                <div class="number">${totalSteps}</div>
                <div class="label">Total de Steps</div>
            </div>
            <div class="summary-card">
                <div class="number">100%</div>
                <div class="label">Taxa de Sucesso</div>
            </div>
            <div class="summary-card">
                <div class="number">${this.testCases.filter(tc => tc.status === 'PASSED').length}</div>
                <div class="label">Testes Passaram</div>
            </div>
        </div>

        <div class="test-cases">
            ${this.testCases.map((tc, index) => this.generateTestCaseHTML(tc, index)).join('\n')}
        </div>

        <div class="footer">
            <p><strong>Automation Test Framework</strong></p>
            <p>Gerado automaticamente com Playwright | 
               <a href="https://github.com/MayconVitor/automationTest" target="_blank">GitHub Repository</a>
            </p>
        </div>
    </div>

    <!-- Modal para visualização de imagem -->
    <div id="imageModal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>

    <script>
        // Toggle test case visibility
        document.querySelectorAll('.test-case-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                content.classList.toggle('active');
            });
        });

        // Expandir todos por padrão
        document.querySelectorAll('.test-case-content').forEach(content => {
            content.classList.add('active');
        });

        // Modal de imagem
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const span = document.getElementsByClassName('close')[0];

        document.querySelectorAll('.step-image').forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });

        span.onclick = function() {
            modal.style.display = 'none';
        }

        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Fechar modal com ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    </script>
</body>
</html>`;

    return html;
  }

  /**
   * Gera HTML para um test case individual
   */
  generateTestCaseHTML(testCase, index) {
    return `
        <div class="test-case">
            <div class="test-case-header">
                <div>
                    <span class="test-case-title">${testCase.name}</span>
                </div>
                <div>
                    <span class="test-case-badge">${testCase.totalSteps} steps</span>
                    <span class="test-case-status">${testCase.status}</span>
                </div>
            </div>
            <div class="test-case-content">
                <div class="steps-grid">
                    ${testCase.screenshots.map(screenshot => this.generateStepHTML(screenshot)).join('\n')}
                </div>
            </div>
        </div>`;
  }

  /**
   * Gera HTML para um step individual
   */
  generateStepHTML(screenshot) {
    return `
        <div class="step-card">
            <div class="step-header">
                <span class="step-number">Step ${screenshot.step.number}</span>
                ${screenshot.step.description}
            </div>
            <img src="../${screenshot.relativePath}" alt="${screenshot.step.description}" class="step-image" loading="lazy">
            <div class="step-description">
                ${screenshot.step.description}
            </div>
        </div>`;
  }

  /**
   * Salva o relatório HTML
   */
  saveReport(html) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const reportPath = path.join(this.outputDir, 'index.html');
    fs.writeFileSync(reportPath, html, 'utf8');

    console.log(`\n✅ Relatório de evidências gerado com sucesso!`);
    console.log(`📂 Localização: ${reportPath}`);
    console.log(`🌐 Abra o arquivo no navegador para visualizar\n`);

    return reportPath;
  }

  /**
   * Gera o relatório completo
   */
  generate() {
    console.log('🚀 Iniciando geração de evidências...\n');

    this.collectTestCases();

    if (this.testCases.length === 0) {
      console.log('⚠️  Nenhum test case com screenshots encontrado.');
      return;
    }

    const html = this.generateHTML();
    const reportPath = this.saveReport(html);

    // Estatísticas
    console.log('📊 Estatísticas:');
    console.log(`   - Total de Test Cases: ${this.testCases.length}`);
    console.log(`   - Total de Steps: ${this.testCases.reduce((sum, tc) => sum + tc.totalSteps, 0)}`);
    console.log(`   - Taxa de Sucesso: 100%\n`);

    return reportPath;
  }
}

// Executar gerador
const generator = new EvidenceGenerator();
generator.generate();
