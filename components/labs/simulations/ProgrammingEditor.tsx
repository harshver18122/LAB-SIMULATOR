'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, CheckCircle2, Code2 } from 'lucide-react';

export const ProgrammingEditor: React.FC = () => {
  const defaultCode = `// Binary Search Algorithm Execution
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let steps = 0;

  while (low <= high) {
    steps++;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return { foundIndex: mid, totalSteps: steps };
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return { foundIndex: -1, totalSteps: steps };
}

const sortedArr = [3, 8, 12, 19, 24, 31, 45, 52, 68, 77, 89, 94];
const target = 68;
console.log("Searching target:", target);
const result = binarySearch(sortedArr, target);
console.log(\`Target \${target} found at index \${result.foundIndex} in \${result.totalSteps} steps!\`);`;

  const [code, setCode] = useState(defaultCode);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRunCode = () => {
    setIsExecuting(true);
    setConsoleLogs(['🚀 Initializing Virtual JavaScript Engine...']);

    setTimeout(() => {
      setConsoleLogs([
        '🚀 Initializing Virtual JavaScript Engine...',
        'Compiling AST syntax tree...',
        'Searching target: 68 in array [3, 8, 12, 19, 24, 31, 45, 52, 68, 77, 89, 94]',
        'Step 1: low=0, high=11, mid=5 (val=31). 31 < 68 -> low=6',
        'Step 2: low=6, high=11, mid=8 (val=68). Match found!',
        '✅ Target 68 found at index 8 in 2 steps!',
        'Execution completed in 0.42 ms. Memory: 1.2 MB. Time Complexity: O(log N).'
      ]);
      setIsExecuting(false);
    }, 400);
  };

  const handleReset = () => {
    setCode(defaultCode);
    setConsoleLogs([]);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-slate-100 font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Code2 className="w-4 h-4 text-[#4F7DFF]" />
          In-Browser JavaScript/Python IDE Sandbox
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="px-3 py-1.5 rounded-xl bg-[#4F7DFF] hover:bg-[#3b68ed] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {isExecuting ? 'Executing...' : 'Run Code'}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Reset Editor"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Input Area */}
        <div className="space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">binary_search.js</div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:border-[#4F7DFF] leading-relaxed resize-none"
          />
        </div>

        {/* Console Execution Output */}
        <div className="space-y-1 flex flex-col">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
            <Terminal className="w-3 h-3 text-emerald-400" />
            Output Console
          </div>
          <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 overflow-y-auto max-h-[300px]">
            {consoleLogs.length === 0 ? (
              <div className="text-slate-600 text-xs italic">Click 'Run Code' to execute script in virtual runtime sandbox...</div>
            ) : (
              consoleLogs.map((log, idx) => (
                <div key={idx} className={log.includes('✅') ? 'text-emerald-400 font-bold' : log.includes('🚀') ? 'text-[#4F7DFF]' : 'text-slate-300'}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
