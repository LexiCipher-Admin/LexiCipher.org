'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  phase: 'setup' | 'calibration' | 'testing' | 'optimization' | 'results';
}

export default function ProgressBar({ current, total, phase }: ProgressBarProps) {
  const percentage = (phase === 'testing' || phase === 'optimization') ? (current / total) * 100 : 0;

  const phases = [
    { id: 'setup', label: 'Setup', icon: '⚙️' },
    { id: 'calibration', label: 'Calibrate', icon: '📐' },
    { id: 'testing', label: 'Testing', icon: '📖' },
    { id: 'optimization', label: 'Optimize', icon: '🎯' },
    { id: 'results', label: 'Results', icon: '✨' },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === phase);

  // Milestone markers at 25%, 50%, 75%
  const milestones = [
    { position: 25, label: '¼' },
    { position: 50, label: '½' },
    { position: 75, label: '¾' },
  ];

  // Motivational messages based on progress
  const getMotivationalMessage = () => {
    if (current === 1) return "Let's get started! 🚀";
    if (current <= 4) return "Great start! Keep going.";
    if (current <= 8) return "You're making progress! 💪";
    if (current === 9) return "Halfway there! You're doing amazing!";
    if (current <= 12) return "Over halfway done! 🌟";
    if (current <= 14) return "Almost there! Just a few more.";
    if (current === 15) return "Final stretch! One more to go!";
    if (current === 16) return "Last one! You've got this! 🎉";
    return "";
  };

  return (
    <div className="w-full space-y-4">
      {/* Phase indicators */}
      <div className="flex justify-between items-center">
        {phases.map((p, index) => (
          <div
            key={p.id}
            className="flex flex-col items-center flex-1"
          >
            {/* Connector line (not for first item) */}
            {index > 0 && (
              <div
                className={`absolute h-0.5 w-full -z-10 ${index <= currentPhaseIndex ? 'bg-dark-blue' : 'bg-gray-200'
                  }`}
                style={{ left: '-50%', top: '14px' }}
              />
            )}

            {/* Phase circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${index < currentPhaseIndex
                  ? 'bg-dark-blue text-cream'
                  : index === currentPhaseIndex
                    ? 'bg-dark-blue text-cream ring-4 ring-blue-100'
                    : 'bg-gray-200 text-gray-500'
                }`}
            >
              {index < currentPhaseIndex ? '✓' : p.icon}
            </div>

            {/* Phase label */}
            <span className={`text-xs mt-1 ${index <= currentPhaseIndex ? 'text-dark-blue font-medium' : 'text-gray-400'
              }`}>
              {p.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar (shown during testing and optimization phases) */}
      {(phase === 'testing' || phase === 'optimization') && (
        <div className="space-y-2">
          {/* Motivational message */}
          <div className="text-center">
            <span className="text-sm font-medium text-blue-600">
              {getMotivationalMessage()}
            </span>
          </div>

          {/* Progress bar with milestones */}
          <div className="relative">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-dark-blue transition-all duration-500 ease-out rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Milestone markers */}
            {milestones.map((milestone) => (
              <div
                key={milestone.position}
                className="absolute top-0 h-4 flex items-center"
                style={{ left: `${milestone.position}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className={`w-1 h-4 ${percentage >= milestone.position ? 'bg-white' : 'bg-gray-400'
                    }`}
                />
              </div>
            ))}
          </div>

          {/* Progress text with milestone labels */}
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-medium">Test {current} of {total}</span>
            <span className={`${percentage >= 50 ? 'text-green-600 font-medium' : ''}`}>
              {Math.round(percentage)}% complete
            </span>
          </div>

          {/* Milestone badges */}
          <div className="flex justify-center gap-4 text-xs">
            <span className={`px-2 py-1 rounded ${current >= 4 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              ¼ done {current >= 4 ? '✓' : ''}
            </span>
            <span className={`px-2 py-1 rounded ${current >= 8 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              ½ done {current >= 8 ? '✓' : ''}
            </span>
            <span className={`px-2 py-1 rounded ${current >= 12 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              ¾ done {current >= 12 ? '✓' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}