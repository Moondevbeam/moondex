interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export const SearchBar = ({ value, onChange }: SearchBarProps) => (
    <div className="px-2">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-full bg-white text-black placeholder-black border-none focus:outline-none focus:ring-2 focus:ring-white/50"
        placeholder="Cerca un Pokemon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );