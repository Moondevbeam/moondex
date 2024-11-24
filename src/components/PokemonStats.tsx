interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonStatsProps {
  stats: Stat[];
  color: string;
}

export function PokemonStats({ stats, color }: PokemonStatsProps) {
  return (
    <>
      <h2 style={{ color }} className="text-2xl font-bold text-center mb-4">Base Stats</h2>
      
      <div className="flex justify-between space-x-4">
        <div className="w-10">
          {stats.map((stat) => (
            <div key={stat.stat.name} className="h-8 flex items-center justify-end">
              <span style={{ color }} className="font-bold w-full text-right">
                {stat.stat.name === 'hp' ? 'HP' :
                 stat.stat.name === 'attack' ? 'ATK' :
                 stat.stat.name === 'defense' ? 'DEF' :
                 stat.stat.name === 'special-attack' ? 'SATK' :
                 stat.stat.name === 'special-defense' ? 'SDEF' :
                 'SPD'}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[1px] bg-gray-300 mx-8"></div>

        <div className="flex-1 ml-8">
          {stats.map((stat) => (
            <div key={stat.stat.name} className="h-8 flex items-center gap-4">
              <span className="font-bold w-12 text-right">{stat.base_stat.toString().padStart(3, '0')}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: color,
                    width: `${(stat.base_stat / 255) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 