interface HeaderProps {
    title: string;
  }
  
  export const Header = ({ title }: HeaderProps) => (
    <div className="text-white flex p-2 space-x-4 items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8571 12C14.8571 13.578 13.578 14.8571 12 14.8571C10.422 14.8571 9.14285 13.578 9.14285 12C9.14285 10.422 10.422 9.14286 12 9.14286C13.578 9.14286 14.8571 10.422 14.8571 12Z"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 24C18.0454 24 23.0467 19.5296 23.8785 13.7143H16.8502C16.1442 15.7118 14.2392 17.1429 12 17.1429C9.76077 17.1429 7.85578 15.7118 7.14978 13.7143H0.121521C0.953343 19.5296 5.95462 24 12 24ZM7.14978 10.2857H0.121521C0.953343 4.47035 5.95462 0 12 0C18.0454 0 23.0467 4.47035 23.8785 10.2857H16.8502C16.1442 8.28824 14.2392 6.85714 12 6.85714C9.76077 6.85714 7.85578 8.28824 7.14978 10.2857ZM14.8571 12C14.8571 13.578 13.578 14.8571 12 14.8571C10.422 14.8571 9.14285 13.578 9.14285 12C9.14285 10.422 10.422 9.14286 12 9.14286C13.578 9.14286 14.8571 10.422 14.8571 12Z"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
          />
        </svg>
      <span className="font-bold text-lg">{title}</span>
    </div>
  );