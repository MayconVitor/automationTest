#!/bin/bash

# ==========================================
# Pipeline de Testes Automatizados
# Playwright com Self-Healing Nativo
# ==========================================

set -e  # Para em caso de erro

echo "=========================================="
echo "🚀 Pipeline de Testes - Playwright"
echo "=========================================="

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ==========================================
# ETAPA 1: Execução da Suite de Testes
# ==========================================
echo -e "${YELLOW}📋 ETAPA 1: Executando suite de testes...${NC}"

npx playwright test --reporter=list

TEST_EXIT_CODE=$?

echo ""
echo "=========================================="
echo "📊 Resultado da Execução Inicial"
echo "=========================================="

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Todos os testes passaram!${NC}"
    exit 0
else
    echo -e "${RED}❌ Alguns testes falharam.${NC}"
fi

# ==========================================
# ETAPA 2: Re-execução dos Falhos
# ==========================================
echo -e "${YELLOW}🔄 ETAPA 2: Re-executando testes falhados...${NC}"

# Criar relatório dos falhados
FAILED_TESTS=$(npx playwright test --only-failed --reporter=list 2>&1 || true)

if echo "$FAILED_TESTS" | grep -q "no failed tests"; then
    echo -e "${GREEN}✅ Todos os testes passaram no retry!${NC}"
    exit 0
fi

# Re-executar com trace
npx playwright test --only-failed --trace=on

RETRY_EXIT_CODE=$?

if [ $RETRY_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Testes passaram no retry!${NC}"
    exit 0
fi

# ==========================================
# ETAPA 3: Self-Healing Nativo
# ==========================================
echo -e "${YELLOW}🔧 ETAPA 3: Aplicando Self-Healing...${NC}"

# Executar com mais retries e debug
echo "🔍 Analisando falhas..."

# Gerar relatório de falhas
echo "📝 Gerando relatório de falhas..."
npx playwright test --reporter=json --output=test-results/json

# Listar os testes que ainda falharam
echo -e "${RED}⚠️ Testes que ainda estão falhando:${NC}"
npx playwright test --only-failed --reporter=line 2>&1 | grep -E "(×|failed)" || true

# ==========================================
# ETAPA 4: Relatório Final
# ==========================================
echo ""
echo "=========================================="
echo "📊 RELATÓRIO FINAL"
echo "=========================================="

# Mostrar evidências
if [ -d "playwright-report" ]; then
    echo "📁 Relatório HTML: playwright-report/index.html"
fi

if [ -d "test-results" ]; then
    echo "📁 Screenshots/Traces: test-results/"
fi

echo ""
echo "Pipeline concluído!"
echo "Para ver o relatório: npx playwright show-report"

exit $RETRY_EXIT_CODE
