#!/bin/bash
set -e

echo "====================================="
echo "🔍 DIAGNÓSTICO COMPLETO - VERCEL"
echo "====================================="
echo ""

echo "📂 Diretório atual:"
pwd
echo ""

echo "📂 Diretório pai:"
cd .. && pwd && cd -
echo ""

echo "📂 Listando tudo desde a raiz do projeto:"
find . -name "angular.json" -type f 2>/dev/null || echo "Procurando angular.json..."
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
  echo "✅ angular.json encontrado na raiz"
  echo "Conteúdo (primeiras linhas):"
  head -20 angular.json
else
  echo "❌ angular.json NÃO encontrado na raiz!"
  
  # Procurar angular.json em qualquer lugar
  echo "Procurando angular.json em subpastas..."
  find . -name "angular.json" -type f 2>/dev/null || echo "Não encontrado em lugar nenhum!"
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