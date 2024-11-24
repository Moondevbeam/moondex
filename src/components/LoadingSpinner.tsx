import { PulseLoader } from "react-spinners";

interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

export function LoadingSpinner({ color = "#DC0A2D", size = 15 }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 bg-pokedex-red flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl p-8">
        <PulseLoader color={color} size={size} />
      </div>
    </div>
  );
} 