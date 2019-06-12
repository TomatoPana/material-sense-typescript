import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Theme } from '@material-ui/core';
import { withTheme } from '@material-ui/core';

interface SimpleLineChartProps {
    theme: Theme;
    data: any[];
}

function SimpleLineChart(props: SimpleLineChartProps) : JSX.Element {
    const { theme, data } = props;
    return (
        <ResponsiveContainer width="99%" height={225}>
            <BarChart data={data}>
                <XAxis dataKey="name"/>
                <Tooltip/>
                <Bar dataKey="Type" stackId="a" fill={theme.palette.primary.main} />
                <Bar dataKey="OtherType" stackId="a" fill={theme.palette.secondary.light} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default withTheme(SimpleLineChart);