import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

const PriceChart = ({ rubberType = 'SBR', timeRange = '1M' }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    
    // Generate mock data based on rubber type and time range
    const generateMockData = () => {
      const labels = [];
      const prices = [];
      let days = 30; // Default to 1 month
      
      // Set number of days based on time range
      if (timeRange === '1W') days = 7;
      if (timeRange === '1M') days = 30;
      if (timeRange === '3M') days = 90;
      if (timeRange === '1Y') days = 365;
      
      // Base price varies by rubber type
      let basePrice = 2500; // SBR default
      if (rubberType === 'PBR') basePrice = 1800;
      if (rubberType === 'NBR') basePrice = 3100;
      if (rubberType === 'EPDM') basePrice = 4200;
      
      // Generate dates and prices
      const today = new Date();
      for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Add some randomness to prices
        const volatility = 0.02; // 2% daily volatility
        const randomChange = (Math.random() - 0.5) * volatility * basePrice;
        
        if (i === days) {
          prices.push(basePrice);
        } else {
          // Add some trend based on rubber type
          let trend = 0;
          if (rubberType === 'SBR') trend = 0.001; // Slight uptrend
          if (rubberType === 'PBR') trend = -0.0005; // Slight downtrend
          if (rubberType === 'NBR') trend = 0.0008; // Slight uptrend
          if (rubberType === 'EPDM') trend = 0.002; // Stronger uptrend
          
          const prevPrice = prices[prices.length - 1];
          const newPrice = prevPrice * (1 + trend) + randomChange;
          prices.push(Math.max(newPrice, basePrice * 0.7)); // Ensure price doesn't drop too much
        }
      }
      
      return { labels, prices };
    };
    
    // Simulate API delay
    setTimeout(() => {
      const { labels, prices } = generateMockData();
      
      setChartData({
        labels,
        datasets: [
          {
            label: `${rubberType} Price (USD)`,
            data: prices,
            borderColor: getChartColor(rubberType),
            backgroundColor: getChartBackgroundColor(rubberType),
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHitRadius: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: getChartColor(rubberType),
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }
        ]
      });
      
      setIsLoading(false);
    }, 500);
  }, [rubberType, timeRange]);

  // Get chart color based on rubber type
  const getChartColor = (type) => {
    switch (type) {
      case 'SBR': return '#6366f1'; // Indigo
      case 'PBR': return '#f97316'; // Orange
      case 'NBR': return '#10b981'; // Green
      case 'EPDM': return '#ec4899'; // Pink
      default: return '#6366f1'; // Default to indigo
    }
  };
  
  // Get chart background gradient based on rubber type
  const getChartBackgroundColor = (type) => {
    const ctx = document.createElement('canvas').getContext('2d');
    let gradient;
    
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 400);
      
      switch (type) {
        case 'SBR':
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
          break;
        case 'PBR':
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0.0)');
          break;
        case 'NBR':
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
          break;
        case 'EPDM':
          gradient.addColorStop(0, 'rgba(236, 72, 153, 0.4)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.0)');
          break;
        default:
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
      }
    }
    
    return gradient;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#d1d5db', // text-gray-300
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1f2937', // bg-gray-800
        titleColor: '#f9fafb', // text-gray-50
        bodyColor: '#d1d5db', // text-gray-300
        borderColor: '#374151', // border-gray-700
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 'bold'
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 2
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(55, 65, 81, 0.3)', // border-gray-700 with opacity
          drawBorder: false
        },
        ticks: {
          color: '#9ca3af', // text-gray-400
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          maxRotation: 0,
          callback: function(val, index) {
            // Show fewer labels on small screens
            return index % 3 === 0 ? this.getLabelForValue(val) : '';
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(55, 65, 81, 0.3)', // border-gray-700 with opacity
          drawBorder: false
        },
        ticks: {
          color: '#9ca3af', // text-gray-400
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{rubberType} Price Chart</h2>
        <div className="flex space-x-2">
          <button className={`px-2 py-1 text-xs rounded-md ${timeRange === '1W' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>1W</button>
          <button className={`px-2 py-1 text-xs rounded-md ${timeRange === '1M' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>1M</button>
          <button className={`px-2 py-1 text-xs rounded-md ${timeRange === '3M' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>3M</button>
          <button className={`px-2 py-1 text-xs rounded-md ${timeRange === '1Y' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>1Y</button>
        </div>
      </div>
      
      <div className="h-80 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">Loading chart data...</div>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">No data available</div>
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-gray-800 p-3 rounded-md">
          <div className="text-xs text-gray-400">Current Price</div>
          <div className="text-lg font-bold text-white">
            {chartData ? `$${chartData.datasets[0].data[chartData.datasets[0].data.length - 1].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-'}
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-md">
          <div className="text-xs text-gray-400">24h Change</div>
          {chartData && (
            <div className={`text-lg font-bold ${getPriceChangeColor(chartData.datasets[0].data)}`}>
              {getPriceChange(chartData.datasets[0].data)}
            </div>
          )}
          {!chartData && <div className="text-lg font-bold text-white">-</div>}
        </div>
        <div className="bg-gray-800 p-3 rounded-md">
          <div className="text-xs text-gray-400">High (30d)</div>
          <div className="text-lg font-bold text-white">
            {chartData ? `$${Math.max(...chartData.datasets[0].data).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-'}
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-md">
          <div className="text-xs text-gray-400">Low (30d)</div>
          <div className="text-lg font-bold text-white">
            {chartData ? `$${Math.min(...chartData.datasets[0].data).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate price change
const getPriceChange = (data) => {
  if (!data || data.length < 2) return '-';
  
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  const change = ((current - previous) / previous) * 100;
  
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
};

// Helper function to get color based on price change
const getPriceChangeColor = (data) => {
  if (!data || data.length < 2) return 'text-white';
  
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  
  return current >= previous ? 'text-green-400' : 'text-red-400';
};

export default PriceChart;
