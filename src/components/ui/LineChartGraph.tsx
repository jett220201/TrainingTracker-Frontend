import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartProps {
    height: number;
    width: number;
    data: Array<any>;
    labels: Array<string>;
    labelX?: string;
    labelY?: string;
    color?: string;
}

function LineChartGraph({height, width, data, labels, labelX, labelY, color}: LineChartProps) {
    return (
        <LineChart 
            height={height}
            width={width}
            series={[{ data, connectNulls: true, color: color || '#3b82f6' }]}
            xAxis={[{ data: labels, scaleType: 'point', label: labelX || '' }]}
            yAxis={[{ scaleType: 'linear', label: labelY || '' }]}
            margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
        />
    );
}

export default LineChartGraph;