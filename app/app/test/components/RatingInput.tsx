'use client';

import { Rating } from '@/lib/types/session';

interface RatingInputProps {
  onRate: (rating: Rating) => void;
  disabled?: boolean;
}

export default function RatingInput({ onRate, disabled = false }: RatingInputProps) {
  const buttons: { rating: Rating; label: string; emoji: string; color: string }[] = [
    { rating: -1, label: 'Worse', emoji: '👎', color: 'bg-red-100 hover:bg-red-200 border-red-300 text-red-800' },
    { rating: 0, label: 'Same', emoji: '🤷', color: 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-800' },
    { rating: 1, label: 'Better', emoji: '👍', color: 'bg-green-100 hover:bg-green-200 border-green-300 text-green-800' },
  ];

  return (
    <div className="w-full space-y-4">
      <p className="text-center text-lg font-medium text-dark-blue">
        Compared to the first sample, this feels...
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        {buttons.map(({ rating, label, emoji, color }) => (
          <button
            key={rating}
            type="button"
            onClick={() => onRate(rating)}
            disabled={disabled}
            className={`p-6 rounded-lg border-2 transition-all ${color} ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            <div className="text-3xl mb-2">{emoji}</div>
            <div className="text-lg font-semibold">{label}</div>
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">
        Trust your first impression — there&apos;s no wrong answer!
      </p>
    </div>
  );
}