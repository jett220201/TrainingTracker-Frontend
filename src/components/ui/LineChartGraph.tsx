import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { LineChart } from '@mui/x-charts/LineChart';
import type { Theme } from '../../types/general/ThemeType';

interface LineChartProps {
    height: number;
    width: number;
    data: Array<any>;
    labels: Array<string>;
    theme: Theme;
    labelX?: string;
    labelY?: string;
    color?: string;
}

function LineChartGraph({height, width, data, labels, labelX, labelY, color, theme}: LineChartProps) {
    return (
        <LineChart
            sx={(() => ({
                [`.${axisClasses.root}`]: {
                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                        stroke: theme === "dark" ? '#f3f4f6' : '#1f2937',
                        strokeWidth: 3,
                    }
                },
            }))}
            height={height}
            width={width}
            series={[{ data, connectNulls: true, color: color || '#3b82f6' }]}
            xAxis={[{ data: labels, scaleType: 'point', label: labelX || '', labelStyle: { fill: theme === "dark" ? '#f3f4f6' : '#1f2937' }, tickLabelStyle: { fill: theme === "dark" ? '#f3f4f6' : '#1f2937' } }]}
            yAxis={[{ scaleType: 'linear', label: labelY || '', labelStyle: { fill: theme === "dark" ? '#f3f4f6' : '#1f2937' }, tickLabelStyle: { fill: theme === "dark" ? '#f3f4f6' : '#1f2937' } }]}
            margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
        />
    );
}

export default LineChartGraph;