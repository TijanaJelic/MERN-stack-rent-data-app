export interface ChartDatasets {
    label: string,
    data: number[],
    backgroundColor: string,
    fill: boolean,
  }

export interface BarChartProps {
    labels: number[],
    datasets: ChartDatasets[]
}