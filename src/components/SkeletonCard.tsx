import React from 'react';
export function SkeletonCard() {
  return (
    <div className="glass-card rounded-xl p-6 animate-pulse">
      <div className="w-1/3 h-6 bg-slate-300 dark:bg-slate-700 rounded mb-4"></div>
      <div className="w-full h-4 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
      <div className="w-full h-4 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
      <div className="w-2/3 h-4 bg-slate-300 dark:bg-slate-700 rounded mb-6"></div>
      <div className="flex gap-2">
        <div className="w-16 h-6 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        <div className="w-16 h-6 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>);

}