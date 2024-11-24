interface PokemonAboutProps {
  weight: number;
  height: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export function PokemonAbout({ weight, height, abilities }: PokemonAboutProps) {
  const stats = [
    {
      value: `${(weight / 10).toFixed(1)} kg`,
      label: 'Weight'
    },
    {
      value: `${(height / 10).toFixed(1)} m`,
      label: 'Height'
    },
    {
      value: abilities[0]?.ability.name,
      label: 'Ability'
    }
  ];

  return (
    <div className="flex justify-between items-center">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={`flex flex-col items-center py-2 w-64 ${
            index !== stats.length - 1 
              ? 'relative after:content-[""] after:absolute after:right-0 after:h-12 after:w-[1px] after:bg-gray-200' 
              : ''
          }`}
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-base capitalize">{stat.value}</span>
          </div>
          <span className="text-sm text-gray-400 mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
  );
} 