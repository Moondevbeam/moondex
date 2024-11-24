interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showOnlyFavorites: boolean;
  onFavoritesChange: (checked: boolean) => void;
}

export const SearchBar = ({
  value,
  onChange,
  showOnlyFavorites,
  onFavoritesChange,
}: SearchBarProps) => (
  <div className="px-2 space-y-2">
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50">
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9 13.6166L8.88333 9.59994C8.55 9.88883 8.16111 10.1138 7.71667 10.2749C7.27222 10.4361 6.8 10.5166 6.3 10.5166C5.1 10.5166 4.08333 10.0999 3.25 9.26661C2.41667 8.43328 2 7.42772 2 6.24994C2 5.07217 2.41667 4.06661 3.25 3.23328C4.08333 2.39994 5.09444 1.98328 6.28333 1.98328C7.46111 1.98328 8.46389 2.39994 9.29167 3.23328C10.1194 4.06661 10.5333 5.07217 10.5333 6.24994C10.5333 6.72772 10.4556 7.18883 10.3 7.63328C10.1444 8.07772 9.91111 8.49439 9.6 8.88328L13.65 12.8999C13.75 12.9888 13.8 13.1027 13.8 13.2416C13.8 13.3805 13.7444 13.5055 13.6333 13.6166C13.5333 13.7166 13.4111 13.7666 13.2667 13.7666C13.1222 13.7666 13 13.7166 12.9 13.6166ZM6.28333 9.51661C7.18333 9.51661 7.95 9.19717 8.58333 8.55828C9.21667 7.91939 9.53333 7.14994 9.53333 6.24994C9.53333 5.34994 9.21667 4.5805 8.58333 3.94161C7.95 3.30272 7.18333 2.98328 6.28333 2.98328C5.37222 2.98328 4.59722 3.30272 3.95833 3.94161C3.31944 4.5805 3 5.34994 3 6.24994C3 7.14994 3.31944 7.91939 3.95833 8.55828C4.59722 9.19717 5.37222 9.51661 6.28333 9.51661Z"
            fill="#DC0A2D"
            style={{
              fill: "#DC0A2D",
              fillOpacity: 1
            }}
          />
        </svg>
      </div>
      <input
        type="text"
        className="w-full px-10 py-2 rounded-full bg-white text-black placeholder-black border-none focus:outline-none focus:ring-2 focus:ring-white/50"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <button
          onClick={() => onFavoritesChange(!showOnlyFavorites)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Mostra solo preferiti"
        >
          {showOnlyFavorites ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#DC0A2D"
              stroke="#DC0A2D"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC0A2D"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  </div>
);
