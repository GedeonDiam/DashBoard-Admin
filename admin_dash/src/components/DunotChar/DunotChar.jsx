import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './DunotChar.css';

const DonutChart = ({ title, data, height = 400 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data && data.values) {
      chartInstance.current = echarts.init(chartRef.current);
      
      const option = {
        title: {
          text: title,
          textStyle: { 
            color: '#F9FAFB', 
            fontSize: 20, 
            fontWeight: 'bold',
            fontFamily: 'Inter, sans-serif'
          },
          left: '24px', 
          top: '24px'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(17, 25, 40, 0.98)',
          borderWidth: 0,
          textStyle: { 
            color: '#F9FAFB',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif'
          },
          formatter: function(params) {
            return `
              <div style="padding: 16px; border-radius: 12px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <div style="width: 12px; height: 12px; background: ${params.color}; border-radius: 50%; margin-right: 10px; box-shadow: 0 2px 8px ${params.color}40;"></div>
                  <span style="font-weight: 700; font-size: 15px;">${params.name}</span>
                </div>
                <div style="color: #A0A0A0; font-size: 13px; margin-left: 22px;">
                  <span style="color: #F9FAFB; font-weight: 600;">${params.value}</span> produits 
                  <span style="color: #4FC3F7; font-weight: 600;">(${params.percent}%)</span>
                </div>
              </div>
            `;
          },
          extraCssText: 'border-radius: 16px; backdrop-filter: blur(20px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);'
        },
        legend: {
          orient: 'vertical',
          right: '24px',
          top: 'center',
          textStyle: { 
            color: '#E5E7EB', 
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          },
          itemWidth: 14, 
          itemHeight: 14, 
          itemGap: 20,
          formatter: function(name) {
            const item = data.values.find(v => v.name === name);
            return `{name|${name}} {value|${item ? item.value : 0}}`;
          },
          rich: {
            name: {
              color: '#F9FAFB',
              fontWeight: '600',
              width: 120
            },
            value: {
              color: '#4FC3F7',
              fontWeight: '700',
              align: 'right'
            }
          }
        },
        series: [{
          name: data.seriesName || 'Répartition',
          type: 'pie',
          radius: ['45%', '75%'],
          center: ['40%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: data.values.map((item, index) => ({
            ...item,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: item.colors[0] },
                { offset: 1, color: item.colors[1] }
              ]),
              borderWidth: 3,
              borderColor: '#1a202c',
              shadowColor: `${item.colors[0]}30`,
              shadowBlur: 12,
              shadowOffsetY: 4
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowColor: `${item.colors[0]}60`,
                shadowOffsetY: 6,
                borderWidth: 4,
                scale: true,
                scaleSize: 5
              }
            }
          })),
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx) => idx * 120,
          animationDuration: 1000
        }]
      };

      chartInstance.current.setOption(option);

      const handleResize = () => chartInstance.current?.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, [data, title]);

  if (!data || !data.values) {
    return (
      <div className="donut-chart-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donut-chart-container">
      <div 
        ref={chartRef} 
        style={{ width: '100%', height: `${height}px` }}
        className="chart-content"
      />
    </div>
  );
};

export default DonutChart;
