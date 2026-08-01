'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  ReactFlowProvider,
} from '@xyflow/react';
import LegalCaseNode, { type LegalCaseNodeData } from '@/components/LegalCaseNode';
import AnimatedLightEdge from '@/components/AnimatedLightEdge';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface CaseNode {
  id: number;
  title: string;
  description: string;
  laws: string[];
  actors: string[];
  date: string;
}

interface CaseGraphProps {
  nodes: CaseNode[];
  highlightActor?: string | null;
  onActorClick?: (actor: string) => void;
}

/* ─────────────────────────────────────────────
   Node type & Edge type registrations
───────────────────────────────────────────── */
const nodeTypes: NodeTypes = {
  legalCase: LegalCaseNode,
};

const edgeTypes: EdgeTypes = {
  animatedLight: AnimatedLightEdge,
};

/* ─────────────────────────────────────────────
   Layout positions: single column, slight
   zigzag offset so curved edges are visible.
───────────────────────────────────────────── */
const ZIGZAG_X = [40, 120, 40, 120, 40, 120];
const NODE_Y_GAP = 160;

/* ─────────────────────────────────────────────
   Inner graph component
───────────────────────────────────────────── */
function GraphInner({ nodes: caseNodes, highlightActor, onActorClick }: CaseGraphProps) {
  // Build React Flow nodes
  const rfNodes: Node[] = useMemo(
    () =>
      caseNodes.map((cn, i) => ({
        id: String(cn.id),
        type: 'legalCase',
        position: {
          x: ZIGZAG_X[i % ZIGZAG_X.length],
          y: i * NODE_Y_GAP,
        },
        data: {
          ...cn,
          highlighted: highlightActor ? cn.actors.includes(highlightActor) : false,
          onActorClick: (actor: string) => {
            onActorClick?.(actor);
          },
        } satisfies LegalCaseNodeData,
        draggable: false,
        selectable: false,
      })),
    [caseNodes, highlightActor, onActorClick]
  );

  // Build edges between consecutive nodes
  const rfEdges: Edge[] = useMemo(
    () =>
      caseNodes.slice(0, -1).map((_, i) => ({
        id: `e${i + 1}-${i + 2}`,
        source: String(i + 1),
        target: String(i + 2),
        type: 'animatedLight',
        animated: false,
      })),
    [caseNodes]
  );

  // Canvas height
  const canvasHeight = caseNodes.length * NODE_Y_GAP + 200;

  return (
    <div className="relative w-full">
      <div style={{ height: canvasHeight, width: '100%' }}>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, includeHiddenNodes: false }}
          minZoom={0.5}
          maxZoom={1.4}
          zoomOnScroll={false}
          panOnDrag={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
          style={{ background: 'transparent' }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={28}
            size={1}
            color="rgba(148,163,184,0.06)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Public export — wraps with ReactFlowProvider
───────────────────────────────────────────── */
export default function CaseGraphVisualization(props: CaseGraphProps) {
  return (
    <ReactFlowProvider>
      <GraphInner {...props} />
    </ReactFlowProvider>
  );
}
