"use client";

import { useState } from "react";
import { Play, Pause, Volume2, FileText, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface AudioGuidePlayerProps {
  title: string;
  artistName: string;
  durationString: string;
  transcript: string;
}

export function AudioGuidePlayer({
  title,
  artistName,
  durationString,
  transcript,
}: AudioGuidePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(25); // Simulated progress

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white border border-brand-sand/80 rounded-xs p-5 shadow-xs max-w-xl mx-auto my-8">
      <div className="flex items-center justify-between gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-brand-clay text-white flex items-center justify-center hover:bg-brand-terracotta transition-colors flex-shrink-0 shadow-xs"
          aria-label={isPlaying ? "Pause audio commentary" : "Play audio commentary"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        {/* Audio Meta & Progress Bar */}
        <div className="flex-grow space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-serif font-bold text-[#2d2a26] flex items-center space-x-1.5">
              <Volume2 size={13} className="text-brand-clay" />
              <span>{title}</span>
            </span>
            <span className="text-[10px] text-gray-500 font-sans tracking-wide">
              {isPlaying ? "0:45" : "0:00"} / {durationString}
            </span>
          </div>

          {/* Interactive Progress Bar */}
          <div className="w-full bg-brand-sand/40 h-1.5 rounded-full overflow-hidden cursor-pointer">
            <div
              className={clsx(
                "h-full bg-brand-clay transition-all duration-300",
                isPlaying ? "w-1/2 animate-pulse" : "w-0"
              )}
            />
          </div>

          <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-sans">
            Curatorial Voice: {artistName}
          </span>
        </div>

        {/* Transcript Toggle */}
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs uppercase tracking-wider text-brand-clay hover:text-brand-terracotta flex items-center space-x-1 flex-shrink-0"
          aria-expanded={showTranscript}
        >
          <FileText size={14} />
          <span className="hidden sm:inline">Notes</span>
          {showTranscript ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Accessible Text Transcript */}
      {showTranscript && (
        <div className="mt-4 pt-4 border-t border-brand-sand/60 text-xs text-gray-700 font-sans leading-relaxed bg-brand-sand/15 p-4 rounded-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-clay block mb-1">
            Audio Transcript:
          </span>
          <p className="italic font-serif text-[#2d2a26]">"{transcript}"</p>
        </div>
      )}
    </div>
  );
}

