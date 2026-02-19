import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'mfe-bar-chart',
  standalone: true,
  template: `<canvas></canvas>`,
})
export class BarChart implements OnChanges {
  @Input() data: any;                    // Dataset completo
  @Input() labels: string[] = [];         // Labels do eixo X
  @Input() values: number[] = [];          // Valores (para série única)
  @Input() datasets: any[] = [];           // Múltiplas séries
  @Input() title: string = 'Gráfico de Barras';
  @Input() colors: string[] = [];          // Cores personalizadas
  @Input() height: string = '300px';       // Altura do canvas
  @Input() width: string = '100%';         // Largura do canvas
  @Input() options: any = {};               // Opções adicionais do Chart.js
  
  private chart: Chart | undefined;
  private canvas: HTMLCanvasElement;

  constructor(private el: ElementRef) {
    this.canvas = this.el.nativeElement.querySelector('canvas');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Pequeno delay para garantir que o canvas existe
    setTimeout(() => {
      if (this.canvas) {
        this.renderChart();
      } else {
        this.canvas = this.el.nativeElement.querySelector('canvas');
        this.renderChart();
      }
    }, 0);
  }

  private renderChart(): void {
    if (!this.canvas) {
      console.error('Canvas não encontrado');
      return;
    }

    // Destrói chart anterior se existir
    if (this.chart) {
      this.chart.destroy();
    }

    // Configura dimensões do canvas
    this.canvas.style.height = this.height;
    this.canvas.style.width = this.width;

    // Prepara os dados do gráfico
    const chartData = this.prepareChartData();
    
    // Cores padrão caso não sejam fornecidas
    const defaultColors = [
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)'
    ];

    // Aplica cores aos datasets se necessário
    if (chartData.datasets) {
      chartData.datasets.forEach((dataset: any, index: number) => {
        if (!dataset.backgroundColor) {
          dataset.backgroundColor = this.colors[index] || defaultColors[index % defaultColors.length];
        }
        if (!dataset.borderColor) {
          dataset.borderColor = dataset.backgroundColor.replace('0.7', '1');
        }
      });
    }

    // Opções padrão + customizações
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!this.title,
          text: this.title,
          font: { size: 16 }
        },
        legend: {
          display: chartData.datasets && chartData.datasets.length > 1,
          position: 'top' as const
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.1)' }
        },
        x: {
          grid: { display: false }
        }
      }
    };

    // Merge das opções customizadas
    const finalOptions = { ...defaultOptions, ...this.options };
    
    // Cria o gráfico
    try {
      this.chart = new Chart(this.canvas, {
        type: 'bar',
        data: chartData,
        options: finalOptions
      });
    } catch (error) {
      console.error('Erro ao criar gráfico:', error);
    }
  }

  private prepareChartData(): any {
    // Prioridade 1: data completo foi fornecido
    if (this.data) {
      return this.data;
    }

    // Prioridade 2: datasets foram fornecidos
    if (this.datasets && this.datasets.length > 0) {
      return {
        labels: this.labels,
        datasets: this.datasets
      };
    }

    // Prioridade 3: values foram fornecidos (série única)
    if (this.values && this.values.length > 0) {
      // Se não tem labels, cria automático
      const labels = this.labels.length > 0 ? this.labels : this.values.map((_, i) => `Item ${i + 1}`);
      
      return {
        labels: labels,
        datasets: [{
          label: this.title || 'Dados',
          data: this.values
        }]
      };
    }

    // Fallback: dados de exemplo
    return {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
      datasets: [{
        label: 'Exemplo',
        data: [65, 59, 80, 81, 56]
      }]
    };
  }
}