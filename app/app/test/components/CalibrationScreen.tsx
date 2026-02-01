'use client';

import { useState, useRef, useEffect } from 'react';
import { CalibrationData } from '@/lib/types/session';

interface CalibrationScreenProps {
  onComplete: (calibrationData: CalibrationData) => void;
  onSkip: () => void;
}

// Standard credit card dimensions (ISO/IEC 7810 ID-1)
const CARD_WIDTH_MM = 85.6;
const CARD_HEIGHT_MM = 53.98;

export default function CalibrationScreen({ onComplete, onSkip }: CalibrationScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(300); // Initial width in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [dragCorner, setDragCorner] = useState<'right' | 'bottom' | null>(null);

  // Calculate PPI from card dimensions
  const calculateCalibration = (): CalibrationData => {
    const pxPerMm_width = cardWidth / CARD_WIDTH_MM;
    const cardHeight = (cardWidth / CARD_WIDTH_MM) * CARD_HEIGHT_MM;
    const pxPerMm_height = cardHeight / CARD_HEIGHT_MM;
    const pxPerMm = (pxPerMm_width + pxPerMm_height) / 2;
    
    const ppi = pxPerMm * 25.4; // Convert mm to inches
    
    return {
      screenDiagonalInches: Math.sqrt(
        Math.pow(window.innerWidth / ppi, 2) + 
        Math.pow(window.innerHeight / ppi, 2)
      ),
      ppi: Math.round(ppi),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      calibratedAt: new Date().toISOString(),
    };
  };

  // Handle mouse/touch drag for resizing
  const handleMouseDown = (corner: 'right' | 'bottom') => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragCorner(corner);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      
      if (dragCorner === 'right') {
        const newWidth = Math.max(150, Math.min(600, clientX - rect.left));
        setCardWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragCorner(null);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragCorner]);

  const handleComplete = () => {
    const calibration = calculateCalibration();
    onComplete(calibration);
  };

  const cardHeight = (cardWidth / CARD_WIDTH_MM) * CARD_HEIGHT_MM;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-dark-blue">Screen Calibration</h1>
        <p className="text-gray-600">
          This helps us display text at the correct physical size on your screen.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Instructions:</strong> Hold a credit card, ID card, or any standard-sized 
          card (85.6mm × 54mm) against your screen. Drag the rectangle below until it 
          matches the size of your card exactly.
        </p>
      </div>

      {/* Calibration Area */}
      <div 
        ref={containerRef}
        className="flex items-center justify-center py-8 bg-gray-50 rounded-lg"
      >
        <div className="relative">
          {/* The resizable card rectangle */}
          <div
            className="bg-white border-2 border-dark-blue rounded-lg shadow-lg relative select-none"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }}
          >
            {/* Card visual guides */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 text-xs text-center">
                <div>📇</div>
                <div>Resize to match</div>
                <div>your card</div>
              </div>
            </div>

            {/* Resize handle - right edge */}
            <div
              onMouseDown={handleMouseDown('right')}
              onTouchStart={handleMouseDown('right')}
              className="absolute right-0 top-0 bottom-0 w-4 cursor-ew-resize flex items-center justify-center hover:bg-blue-100 transition-colors rounded-r-lg"
            >
              <div className="w-1 h-8 bg-dark-blue rounded opacity-50"></div>
            </div>
          </div>

          {/* Dimension display */}
          <div className="absolute -bottom-8 left-0 right-0 text-center text-sm text-gray-500">
            {Math.round(cardWidth)}px × {Math.round(cardHeight)}px
          </div>
        </div>
      </div>

      {/* Calculated info */}
      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Calculated PPI:</span>{' '}
            {Math.round((cardWidth / CARD_WIDTH_MM) * 25.4)}
          </div>
          <div>
            <span className="font-medium">Screen diagonal:</span>{' '}
            {calculateCalibration().screenDiagonalInches.toFixed(1)}&quot;
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onSkip}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Skip (use defaults)
        </button>
        <button
          type="button"
          onClick={handleComplete}
          className="flex-1 bg-dark-blue text-cream py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Continue →
        </button>
      </div>

      {/* Help text */}
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have a card? You can skip this step. Results will still be useful, 
        but physical sizing may be less accurate.
      </p>
    </div>
  );
}