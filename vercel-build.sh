#!/bin/bash
# Removemos o set -e para não parar em erros de busca

echo "====================================="
echo "🔍 DIAGNÓSTICO COMPLETO - VERCEL"
echo "====================================="
echo ""

echo "📂 Diretório atual ANTES de qualquer coisa:"
pwd
echo ""

echo "📂 Listando arquivos no diretório atual:"
ls -la
echo ""

echo "📂 Procurando angular.json em subdiretórios..."
find . -name "angular.json" -type f 2>/dev/null || echo "Nenhum angular.json encontrado"
echo ""

echo "📂 Verificando se angular.json existe na raiz:"
if [ -f "angular.json" ]; then
  echo "✅ angular.json encontrado na raiz!"
  echo "Conteúdo (primeiras linhas):"
  head -20 angular.json
else
  echo "❌ angular.json NÃO encontrado na raiz"
  
  # Procurar em qualquer lugar
  echo "Procurando em toda a árvore do projeto..."
  find /vercel -name "angular.json" -type f 2>/dev/null | head -5 || echo "Nada encontrado"
fi
echo ""

echo "📋 Listando tudo que tem na pasta /vercel:"
ls -la /vercel/ 2>/dev/null || echo "Não foi possível listar /vercel"
echo ""

echo "📋 Listando tudo que tem na pasta /vercel/path0:"
ls -la /vercel/path0/ 2>/dev/null || echo "Não foi possível listar /vercel/path0"
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

echo "🏗️  Tentando BUILD no diretório atual:"
if [ -f "angular.json" ]; then
  ./node_modules/.bin/ng build --configuration=production --output-hashing=none
else
  echo "⚠️ angular.json não encontrado, não é possível fazer build aqui"
  
  # Tentar encontrar e entrar na pasta correta
  ANGULAR_PATH=$(find . -name "angular.json" -type f | head -1)
  if [ -n "$ANGULAR_PATH" ]; then
    ANGULAR_DIR=$(dirname "$ANGULAR_PATH")
    echo "✅ Encontrado angular.json em: $ANGULAR_DIR"
    echo "📂 Mudando para: $ANGULAR_DIR"
    cd "$ANGULAR_DIR"
    echo "📂 Novo diretório: $(pwd)"
    echo "🏗️  Executando build agora..."
    ./node_modules/.bin/ng build --configuration=production --output-hashing=none
  else
    echo "❌ Não foi possível encontrar angular.json em lugar nenhum!"
    exit 1
  fi
fi
echo ""

echo "📂 Verificando resultado do build:"
if [ -d "dist/mfe-chart/browser" ]; then
  echo "✅ Build gerado em dist/mfe-chart/browser"
  ls -la dist/mfe-chart/browser
else
  echo "❌ Build não gerado!"
  echo "Procurando por pasta dist em qualquer lugar:"
  find . -name "dist" -type d 2>/dev/null || echo "Nenhuma pasta dist encontrada"
fi

echo "====================================="
echo "✅ Script finalizado"
echo "====================================="