import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './BarChar.css';

const BarChart = ({ title, data, height = 400 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
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
          left: '20px',
          top: '20px'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(31, 36, 46, 0.95)',
          borderColor: '#2a2f3a',
          borderWidth: 1,
          textStyle: {
            color: '#F9FAFB',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif'
          },
          formatter: function(params) {
            const value = params[0].value;
            return `
              <div style="padding: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <div style="width: 12px; height: 12px; background: linear-gradient(135deg, #1A73E8, #2E8DF7); border-radius: 3px; margin-right: 8px;"></div>
                  <span style="font-weight: 600;">${params[0].name}</span>
                </div>
                <div style="color: #A0A0A0; font-size: 11px;">
                  ${value} ${data.seriesName || 'produits'}
                </div>
              </div>
            `;
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(26, 115, 232, 0.15)',
              shadowBlur: 8
            }
          },
          extraCssText: 'border-radius: 8px; backdrop-filter: blur(10px);'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.categories || [],
          axisLine: {
            lineStyle: {
              color: '#2a2f3a',
              width: 2
            }
          },
          axisTick: {
            lineStyle: {
              color: '#2a2f3a',
              width: 1
            },
            length: 6
          },
          axisLabel: {
            color: '#A0A0A0',
            fontSize: 11,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            margin: 12,
            rotate: 0,
            interval: 0,
            formatter: function(value) {
              // Tronquer si le nom est trop long
              return value.length > 8 ? value.substring(0, 8) + '...' : value;
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#A0A0A0',
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(42, 47, 58, 0.6)',
              type: 'dashed',
              width: 1
            }
          }
        },
        series: [
          {
            name: data.seriesName || 'Valeurs',
            type: 'bar',
            data: data.values || [],
            barWidth: '60%',
            itemStyle: {
              color: function(params) {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#1A73E8' },
                  { offset: 0.5, color: '#2E8DF7' },
                  { offset: 1, color: '#4FC3F7' }
                ]);
              },
              borderRadius: [6, 6, 0, 0],
              shadowColor: 'rgba(26, 115, 232, 0.4)',
              shadowBlur: 10,
              shadowOffsetY: 4
            },
            emphasis: {
              itemStyle: {
                color: function(params) {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2E8DF7' },
                    { offset: 0.5, color: '#4FC3F7' },
                    { offset: 1, color: '#81D4FA' }
                  ]);
                },
                shadowColor: 'rgba(46, 141, 247, 0.6)',
                shadowBlur: 15,
                shadowOffsetY: 6
              }
            },
            animationDelay: (idx) => idx * 100,
            animationDuration: 1200,
            animationEasing: 'elasticOut'
          }
        ]
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

  if (!data) {
    return (
      <div className="bar-chart-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bar-chart-container">
      <div 
        ref={chartRef} 
        style={{ width: '100%', height: `${height}px` }}
        className="chart-content"
      />
    </div>
  );
};

export default BarChart;
