# MfeChart

Este projeto foi criado usando [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Propósito

Este projeto tem como propósito servir um webcomponent para ser consumido por outras aplicações seguindo uma arquitetura de microfrontend.

## Funcionalidade

Este projeto exporta um gráfico de barras customizável.

## Executar localmente

`npm run stat`

Acesse: `http://localhost:4200/`

Cole no console: `document.body.innerHTML = '<mfe-bar-chart title="Vendas 2024" values="[45,78,92,51,63]" labels=\'["Jan","Fev","Mar","Abr","Mai"]\'></mfe-bar-chart>';`

## Fazer alterações

Ao realizar alterações executar: `npm run build:mfe`

Copie o conteúdo da pasta `dist/mfe-chart/browser` para o projeto de distribuição `mfe-chart-static`