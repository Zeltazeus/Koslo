import React, { useState, useEffect } from 'react';

const MarketData = () => {
    const [marketData, setMarketData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('global');
    const [timeframe, setTimeframe] = useState('daily');

    // Mock market data
    const mockMarketData = {
        global: {
            daily: [
                { id: 1, type: 'SBR', price: 2458.75, change: 1.2, volume: 1250000, region: 'Global' },
                { id: 2, type: 'PBR', price: 1875.20, change: -0.8, volume: 980000, region: 'Global' },
                { id: 3, type: 'NBR', price: 3120.50, change: 2.3, volume: 650000, region: 'Global' },
                { id: 4, type: 'EPDM', price: 4250.00, change: 0.5, volume: 420000, region: 'Global' }
            ],
            weekly: [
                { id: 1, type: 'SBR', price: 2458.75, change: 3.5, volume: 8750000, region: 'Global' },
                { id: 2, type: 'PBR', price: 1875.20, change: -2.1, volume: 6860000, region: 'Global' },
                { id: 3, type: 'NBR', price: 3120.50, change: 5.2, volume: 4550000, region: 'Global' },
                { id: 4, type: 'EPDM', price: 4250.00, change: 1.8, volume: 2940000, region: 'Global' }
            ]
        },
        asia: {
            daily: [
                { id: 1, type: 'SBR', price: 2475.50, change: 1.5, volume: 580000, region: 'Asia' },
                { id: 2, type: 'PBR', price: 1890.25, change: -0.3, volume: 420000, region: 'Asia' },
                { id: 3, type: 'NBR', price: 3150.75, change: 2.8, volume: 310000, region: 'Asia' },
                { id: 4, type: 'EPDM', price: 4280.50, change: 0.7, volume: 180000, region: 'Asia' }
            ],
            weekly: [
                { id: 1, type: 'SBR', price: 2475.50, change: 4.2, volume: 4060000, region: 'Asia' },
                { id: 2, type: 'PBR', price: 1890.25, change: -1.5, volume: 2940000, region: 'Asia' },
                { id: 3, type: 'NBR', price: 3150.75, change: 6.1, volume: 2170000, region: 'Asia' },
                { id: 4, type: 'EPDM', price: 4280.50, change: 2.3, volume: 1260000, region: 'Asia' }
            ]
        },
        europe: {
            daily: [
                { id: 1, type: 'SBR', price: 2490.25, change: 0.9, volume: 420000, region: 'Europe' },
                { id: 2, type: 'PBR', price: 1905.50, change: -1.2, volume: 350000, region: 'Europe' },
                { id: 3, type: 'NBR', price: 3180.00, change: 1.8, volume: 220000, region: 'Europe' },
                { id: 4, type: 'EPDM', price: 4320.75, change: 0.3, volume: 150000, region: 'Europe' }
            ],
            weekly: [
                { id: 1, type: 'SBR', price: 2490.25, change: 2.8, volume: 2940000, region: 'Europe' },
                { id: 2, type: 'PBR', price: 1905.50, change: -2.7, volume: 2450000, region: 'Europe' },
                { id: 3, type: 'NBR', price: 3180.00, change: 4.5, volume: 1540000, region: 'Europe' },
                { id: 4, type: 'EPDM', price: 4320.75, change: 1.2, volume: 1050000, region: 'Europe' }
            ]
        },
        americas: {
            daily: [
                { id: 1, type: 'SBR', price: 2445.00, change: 1.1, volume: 380000, region: 'Americas' },
                { id: 2, type: 'PBR', price: 1865.75, change: -0.5, volume: 320000, region: 'Americas' },
                { id: 3, type: 'NBR', price: 3110.25, change: 2.1, volume: 200000, region: 'Americas' },
                { id: 4, type: 'EPDM', price: 4235.50, change: 0.4, volume: 120000, region: 'Americas' }
            ],
            weekly: [
                { id: 1, type: 'SBR', price: 2445.00, change: 3.2, volume: 2660000, region: 'Americas' },
                { id: 2, type: 'PBR', price: 1865.75, change: -1.8, volume: 2240000, region: 'Americas' },
                { id: 3, type: 'NBR', price: 3110.25, change: 4.8, volume: 1400000, region: 'Americas' },
                { id: 4, type: 'EPDM', price: 4235.50, change: 1.5, volume: 840000, region: 'Americas' }
            ]
        }
    };

    // Market news
    const marketNews = [
        {
            id: 1,
            title: 'Global rubber supply tightens amid production constraints',
            date: '2025-03-20',
            source: 'Rubber Industry Journal',
            snippet: 'Production constraints in major rubber-producing countries have led to tightening global supply, pushing prices upward across all synthetic rubber categories.'
        },
        {
            id: 2,
            title: 'Automotive sector demand for synthetic rubber expected to grow by 5% in 2025',
            date: '2025-03-19',
            source: 'Auto Materials Weekly',
            snippet: 'The automotive sector\'s recovery is driving increased demand for synthetic rubber, with analysts projecting a 5% growth in consumption for 2025.'
        },
        {
            id: 3,
            title: 'New environmental regulations impact EPDM production costs',
            date: '2025-03-18',
            source: 'Chemical Industry Report',
            snippet: 'Recent environmental regulations in major manufacturing hubs have increased production costs for EPDM, potentially affecting market prices in the coming months.'
        },
        {
            id: 4,
            title: 'Innovation in NBR processing reduces manufacturing costs',
            date: '2025-03-17',
            source: 'Industrial Innovation Today',
            snippet: 'A breakthrough in NBR processing technology promises to reduce manufacturing costs by up to 15%, potentially affecting market dynamics later this year.'
        }
    ];

    useEffect(() => {
        // Simulate API call to fetch market data
        setIsLoading(true);
        setTimeout(() => {
            setMarketData(mockMarketData[selectedRegion][timeframe]);
            setIsLoading(false);
        }, 800);
    }, [selectedRegion, timeframe]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Market Data</h1>
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="region-select" className="sr-only">Select Region</label>
                        <select
                            id="region-select"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="input py-1 px-2 text-sm"
                        >
                            <option value="global">Global</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="americas">Americas</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timeframe-select" className="sr-only">Select Timeframe</label>
                        <select
                            id="timeframe-select"
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="input py-1 px-2 text-sm"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Market Data Table */}
            <div className="card">
                <h2 className="text-xl font-bold text-white mb-4">
                    {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Market Prices ({timeframe === 'daily' ? 'Daily' : 'Weekly'})
                </h2>
                
                {isLoading ? (
                    <div className="text-center py-8 text-gray-400">
                        Loading market data...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Price (USD/kg)</th>
                                    <th>Change</th>
                                    <th>Volume (kg)</th>
                                    <th>Region</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marketData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="font-medium">{item.type}</td>
                                        <td>${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                        <td>
                                            <span className={`flex items-center ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {item.change >= 0 ? (
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                )}
                                                {Math.abs(item.change)}%
                                            </span>
                                        </td>
                                        <td>{item.volume.toLocaleString()}</td>
                                        <td>{item.region}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Market Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Trends */}
                <div className="card">
                    <h2 className="text-lg font-bold text-white mb-3">Price Trends</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">SBR</span>
                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <span className="text-gray-300">Bullish</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">PBR</span>
                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                            <span className="text-gray-300">Bearish</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">NBR</span>
                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <span className="text-gray-300">Strong Bullish</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">EPDM</span>
                            <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
                                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                            </div>
                            <span className="text-gray-300">Neutral</span>
                        </div>
                    </div>
                </div>

                {/* Volume Distribution */}
                <div className="card">
                    <h2 className="text-lg font-bold text-white mb-3">Volume Distribution</h2>
                    <div className="flex flex-col h-full justify-center">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                        SBR
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-indigo-600">
                                        40%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                                <div style={{ width: "40%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                            </div>
                        </div>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                                        PBR
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-orange-600">
                                        30%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                                <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
                            </div>
                        </div>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                        NBR
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-green-600">
                                        20%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                                <div style={{ width: "20%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                            </div>
                        </div>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                                        EPDM
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-pink-600">
                                        10%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                                <div style={{ width: "10%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market News */}
                <div className="card">
                    <h2 className="text-lg font-bold text-white mb-3">Market News</h2>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {marketNews.map(news => (
                            <div key={news.id} className="border-b border-gray-700 pb-3 last:border-0">
                                <h3 className="font-medium text-white">{news.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{news.snippet}</p>
                                <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    <span>{news.source}</span>
                                    <span>{news.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketData;
