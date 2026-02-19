#!/bin/bash
set -e  # Para o script se qualquer comando falhar

echo "====================================="
echo "🔍 DIAGNÓSTICO COMPLETO - VERCEL"
echo "====================================="
echo ""

echo "📂 Diretório atual:"
pwd
echo ""

echo "📋 Listando arquivos na raiz:"
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
  echo "✅ angular.json encontrado"
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

echo "📦 Instalando dependências..."
npm install
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