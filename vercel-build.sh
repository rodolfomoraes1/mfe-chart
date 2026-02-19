#!/bin/bash
set -e

echo "====================================="
echo "🔍 DIAGNÓSTICO COMPLETO - VERCEL"
echo "====================================="
echo ""

echo "📂 Diretório atual ANTES de qualquer coisa:"
pwd
echo ""

echo "📂 Procurando pela raiz do projeto (onde está angular.json)..."

# Função para encontrar a raiz do projeto
find_project_root() {
    local dir="$PWD"
    while [[ "$dir" != "/" ]]; do
        if [[ -f "$dir/angular.json" ]]; then
            echo "$dir"
            return 0
        fi
        dir="$(dirname "$dir")"
    done
    return 1
}

PROJECT_ROOT=$(find_project_root)

if [[ -n "$PROJECT_ROOT" ]]; then
    echo "✅ Raiz do projeto encontrada: $PROJECT_ROOT"
    echo "📂 Mudando para a raiz do projeto..."
    cd "$PROJECT_ROOT"
else
    echo "❌ Não foi possível encontrar a raiz do projeto!"
    echo "Procurando angular.json em todo o sistema de arquivos..."
    find / -name "angular.json" -type f 2>/dev/null | head -10 || echo "Nenhum angular.json encontrado"
fi

echo ""
echo "📂 Diretório atual APÓS busca:"
pwd
echo ""

echo "📋 Listando arquivos na raiz (completo):"
ls -la
echo ""

echo "📋 Listando arquivos em src/ (se existir):"
if [ -d "src" ]; then
  ls -la src/
else
  echo "src/ não encontrado!"
fi
echo ""

echo "📋 Verificando angular.json:"
if [ -f "angular.json" ]; then
  echo "✅ angular.json encontrado!"
  echo "Conteúdo (primeiras linhas):"
  head -20 angular.json
else
  echo "❌ angular.json NÃO encontrado!"
fi
echo ""

echo "📦 Versão do Node:"
node --version
echo ""

echo "📦 Versão do NPM:"
npm --version
echo ""

echo "🔧 Verificando Angular CLI local:"
if [ -f "node_modules/.bin/ng" ]; then
  echo "✅ Angular CLI encontrado em node_modules/.bin/ng"
  ./node_modules/.bin/ng version
else
  echo "❌ Angular CLI não encontrado em node_modules/.bin/ng"
fi
echo ""

echo "🏗️  Executando BUILD com caminho absoluto:"
./node_modules/.bin/ng build --configuration=production --output-hashing=none
echo ""

echo "📂 Verificando resultado do build:"
if [ -d "dist/mfe-chart/browser" ]; then
  echo "✅ Build gerado em dist/mfe-chart/browser"
  ls -la dist/mfe-chart/browser
else
  echo "❌ Build não gerado!"
fi

echo "====================================="
echo "✅ Script finalizado"
echo "====================================="