'use client';

import { memo } from 'react';
import {
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';

export default memo(function AnimatedLightEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.4,
  });

  const animId = `light-${id}`;

  return (
    <>
      {/* Wide soft glow behind the line */}
      <path
        d={edgePath}
        stroke="rgba(59,130,246,0.12)"
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />

      {/* Main visible line */}
      <path
        d={edgePath}
        stroke="rgba(59,130,246,0.55)"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* Animated dashed overlay */}
      <path
        d={edgePath}
        stroke="rgba(147,197,253,0.7)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="6 8"
        style={{
          animation: `${animId}-dash 1.6s linear infinite`,
        }}
      />

      {/* Traveling particle 1 */}
      <circle r={4} fill="#60a5fa" filter="url(#glow1)">
        <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto">
          <mpath href={`#${animId}-mpath`} />
        </animateMotion>
      </circle>

      {/* Traveling particle 2 (offset) */}
      <circle r={2.5} fill="#93c5fd" filter="url(#glow2)">
        <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto" begin="-1.1s">
          <mpath href={`#${animId}-mpath`} />
        </animateMotion>
      </circle>

      {/* Hidden reference path for animateMotion */}
      <path id={`${animId}-mpath`} d={edgePath} fill="none" stroke="none" />

      <defs>
        <filter id="glow1" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>{`
          @keyframes ${animId}-dash {
            to { stroke-dashoffset: -28; }
          }
        `}</style>
      </defs>
    </>
  );
});
