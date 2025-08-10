import './CardKpi.css';
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

const CardKpi = ({ title, amount, icon, trend, trendValue, color = "blue", indice }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-[#1A73E8]/10 to-[#2E8DF7]/5',
      icon: 'text-[#1A73E8]',
      iconBg: 'bg-[#1A73E8]/10',
      border: 'border-[#1A73E8]/20'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500/10 to-green-400/5',
      icon: 'text-green-500',
      iconBg: 'bg-green-500/10',
      border: 'border-green-500/20'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/10 to-purple-400/5',
      icon: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500/10 to-orange-400/5',
      icon: 'text-orange-500',
      iconBg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    }
  };

  const currentColors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`
      p-6 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg
      ${currentColors.bg} ${currentColors.border} 
      bg-[#1f242e] shadow-md w-full
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-md ${currentColors.iconBg}`}>
          <div className={`text-xl ${currentColors.icon}`}>
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className={`
            text-xs font-medium px-3 py-1 rounded-full
            ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}
          `}>
            {trend === 'up' ? <IoMdTrendingUp className="inline mr-1" /> : <IoMdTrendingDown className="inline mr-1" />} {trendValue}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-[#A0A0A0] text-sm font-medium tracking-wide">
          {title}
        </h3>
        <p className="text-2xl font-bold text-[#F9FAFB]">
          {amount} {indice}
        </p>
      </div>
    </div>
  );
};

export default CardKpi;
