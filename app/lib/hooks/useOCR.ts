'use client';

import { useState, useCallback, useRef } from 'react';
import Tesseract, { createWorker, Worker } from 'tesseract.js';

export interface OCRProgress {
    status: string;
    progress: number;
}

export interface OCRResult {
    text: string;
    confidence: number;
    words: Array<{
        text: string;
        confidence: number;
        bbox: { x0: number; y0: number; x1: number; y1: number };
    }>;
}

export function useOCR() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState<OCRProgress>({ status: '', progress: 0 });
    const [result, setResult] = useState<OCRResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const workerRef = useRef<Worker | null>(null);

    const processImage = useCallback(async (imageSource: File | string) => {
        setIsProcessing(true);
        setError(null);
        setProgress({ status: 'Initializing OCR...', progress: 0 });

        try {
            // Create worker if not exists
            if (!workerRef.current) {
                workerRef.current = await createWorker('eng', 1, {
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            setProgress({
                                status: 'Recognizing text...',
                                progress: Math.round(m.progress * 100)
                            });
                        } else {
                            setProgress({
                                status: m.status,
                                progress: Math.round(m.progress * 100)
                            });
                        }
                    }
                });
            }

            // Convert File to data URL if needed
            let imageData: string;
            if (imageSource instanceof File) {
                imageData = await fileToDataURL(imageSource);
            } else {
                imageData = imageSource;
            }

            setProgress({ status: 'Recognizing text...', progress: 0 });

            const { data } = await workerRef.current.recognize(imageData);

            // Cast to any to handle Tesseract.js output structure variations
            const ocrData = data as any;

            // Extract words from paragraphs/lines structure
            const words: OCRResult['words'] = [];
            if (ocrData.paragraphs) {
                for (const para of ocrData.paragraphs) {
                    if (para.lines) {
                        for (const line of para.lines) {
                            if (line.words) {
                                for (const word of line.words) {
                                    words.push({
                                        text: word.text,
                                        confidence: word.confidence,
                                        bbox: word.bbox
                                    });
                                }
                            }
                        }
                    }
                }
            }

            const ocrResult: OCRResult = {
                text: ocrData.text,
                confidence: ocrData.confidence,
                words
            };

            setResult(ocrResult);
            setProgress({ status: 'Complete', progress: 100 });
            return ocrResult;

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'OCR processing failed';
            setError(errorMessage);
            setProgress({ status: 'Error', progress: 0 });
            return null;
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const clearResult = useCallback(() => {
        setResult(null);
        setError(null);
        setProgress({ status: '', progress: 0 });
    }, []);

    const terminateWorker = useCallback(async () => {
        if (workerRef.current) {
            await workerRef.current.terminate();
            workerRef.current = null;
        }
    }, []);

    return {
        processImage,
        clearResult,
        terminateWorker,
        isProcessing,
        progress,
        result,
        error
    };
}

// Helper function to convert File to data URL
function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}