import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'mfe-bar-chart',
  standalone: true,
  template: `<canvas></canvas>`,
})
export class BarChart implements OnInit, AfterViewInit, OnChanges {
  @Input() data: any;
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  @Input() datasets: any[] = [];
  @Input() title: string = 'Gráfico de Barras';
  @Input() colors: string[] = [];
  @Input() height: string = '300px';
  @Input() width: string = '100%';
  @Input() options: any = {};
  
  private chart: Chart | undefined;
  private canvas: HTMLCanvasElement | null = null;
  private isViewInitialized = false;
  private pendingChanges = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Aqui o componente foi criado mas o canvas ainda não existe
    console.log('BarChart initialized');
  }

  ngAfterViewInit(): void {
    // AFTER VIEW INIT é o momento correto para acessar o canvas
    this.canvas = this.el.nativeElement.querySelector('canvas');
    this.isViewInitialized = true;
    
    if (this.pendingChanges) {
      this.renderChart();
      this.pendingChanges = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isViewInitialized) {
      this.pendingChanges = true;
      return;
    }
    
    // Pequeno delay para garantir que o DOM está estável
    setTimeout(() => this.renderChart(), 0);
  }

  private renderChart(): void {
    if (!this.canvas) {
      console.warn('Canvas não disponível ainda');
      return;
    }

    // Destrói chart anterior se existir
    if (this.chart) {
      this.chart.destroy();
    }

    // Configura dimensões
    this.canvas.style.height = this.height;
    this.canvas.style.width = this.width;

    // Prepara os dados
    const chartData = this.prepareChartData();
    
    // Cores padrão
    const defaultColors = [
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)'
    ];

    // Aplica cores
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

    // Opções padrão
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

    const finalOptions = { ...defaultOptions, ...this.options };
    
    try {
      this.chart = new Chart(this.canvas, {
        type: 'bar',
        data: chartData,
        options: finalOptions
      });
      console.log('Chart rendered successfully');
    } catch (error) {
      console.error('Erro ao criar gráfico:', error);
    }
  }

  private prepareChartData(): any {
    if (this.data) return this.data;
    
    if (this.datasets && this.datasets.length > 0) {
      return {
        labels: this.labels,
        datasets: this.datasets
      };
    }

    if (this.values && this.values.length > 0) {
      const labels = this.labels.length > 0 ? this.labels : this.values.map((_, i) => `Item ${i + 1}`);
      return {
        labels: labels,
        datasets: [{
          label: this.title || 'Dados',
          data: this.values
        }]
      };
    }

    return {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
      datasets: [{
        label: 'Exemplo',
        data: [65, 59, 80, 81, 56]
      }]
    };
  }
}

export type { BarChartProps as BarChartPropsType } from './bar-chart.types';