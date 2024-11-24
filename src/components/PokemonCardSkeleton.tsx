export function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center relative h-44 overflow-hidden animate-pulse">
      <div className="absolute inset-0">
        <div className="h-2/3 bg-white"></div>
        <div className="h-1/3 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center w-full h-full">
        <div className="self-end w-12 h-4 bg-gray-200 rounded"></div>
        <div className="w-28 h-28 bg-gray-200 rounded-full -mt-2"></div>
        <div className="w-20 h-4 bg-gray-200 rounded mt-auto"></div>
      </div>
    </div>
  );
} 