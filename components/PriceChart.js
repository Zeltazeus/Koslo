import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceChart = () => {
    const [timeRange, setTimeRange] = useState('1d');
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'SBR',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
            {
                label: 'PBR',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            },
            {
                label: 'NBR',
                data: [12, 30, 45, 67, 80, 90, 100],
                fill: false,
                borderColor: 'rgba(54,162,235,1)',
                tension: 0.1,
            },
            {
                label: 'EPDM',
                data: [40, 60, 70, 80, 90, 100, 110],
                fill: false,
                borderColor: 'rgba(255,206,86,1)',
                tension: 0.1,
            },
        ],
    };

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
        // Here you can add logic to fetch new data based on the selected time range
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Price Chart</h2>
            <select value={timeRange} onChange={handleTimeRangeChange} className="mt-2 mb-4">
                <option value="1d">1 Day</option>
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
            </select>
            <Line data={data} />
        </div>
    );
};

export default PriceChart;
