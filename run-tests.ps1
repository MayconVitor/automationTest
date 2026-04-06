# Pipeline de Testes - Playwright

Write-Host "==========================================" 
Write-Host "Pipeline de Testes - Playwright"
Write-Host "==========================================" 

Write-Host ""
Write-Host "ETAPA 1: Executando suite de testes..."

npx playwright test --reporter=list

$testExitCode = $LASTEXITCODE

Write-Host ""
Write-Host "==========================================" 
Write-Host "RESULTADO DA EXECUCAO" 
Write-Host "==========================================" 

if ($testExitCode -eq 0) {
    Write-Host "TODOS OS TESTES PASSARAM!"
    exit 0
} else {
    Write-Host "ALGUNS TESTES FALHARAM."
    Write-Host "O Playwright ja faz retry automatico (retries: 2)"
}

Write-Host ""
Write-Host "==========================================" 
Write-Host "Pipeline concluido!" 

exit $testExitCode
