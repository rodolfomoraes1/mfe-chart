/**
 * Interface que define as propriedades aceitas pelo componente BarChart
 * Corresponde exatamente aos @Input() do componente
 */
export interface BarChartProps {
  /** Dataset completo no formato do Chart.js */
  data?: any;
  
  /** Labels do eixo X */
  labels?: string[];
  
  /** Valores numéricos para série única */
  values?: number[];
  
  /** Múltiplas séries de dados */
  datasets?: any[];
  
  /** Título do gráfico */
  title?: string;
  
  /** Cores personalizadas para as barras */
  colors?: string[];
  
  /** Altura do canvas (ex: "300px") */
  height?: string;
  
  /** Largura do canvas (ex: "100%") */
  width?: string;
  
  /** Opções adicionais do Chart.js */
  options?: any;
}

/**
 * Tipo para os eventos do gráfico (opcional)
 */
export interface BarChartEvents {
  onChartReady?: () => void;
  onError?: (error: any) => void;
}

/**
 * Tipo completo incluindo eventos
 */
export type BarChartComponentProps = BarChartProps & BarChartEvents;

/**
 * Valores padrão para as props
 */
export const defaultBarChartProps: Partial<BarChartProps> = {
  title: 'Gráfico de Barras',
  height: '300px',
  width: '100%',
  labels: [],
  values: [],
  colors: [],
  datasets: [],
  options: {}
};