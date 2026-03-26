"use client";

import { useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

type FlowNode = {
  key: string;
  label: string;
  icon: ReactNode;
};

type CapabilityFlowProps = {
  centerIcon: ReactNode;
  centerLabel: string;
  leftNodes: readonly [FlowNode, FlowNode, FlowNode];
  rightNodes: readonly [FlowNode, FlowNode, FlowNode];
  className?: string;
};

function CapabilityNode({
  nodeRef,
  icon,
  label,
}: {
  nodeRef: RefObject<HTMLDivElement | null>;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div ref={nodeRef} className="capability-flow-node">
      <div className="capability-flow-node-icon">{icon}</div>
      <span className="capability-flow-node-label">{label}</span>
    </div>
  );
}

export default function CapabilityFlow({
  centerIcon,
  centerLabel,
  leftNodes,
  rightNodes,
  className,
}: CapabilityFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const leftTopRef = useRef<HTMLDivElement>(null);
  const leftMiddleRef = useRef<HTMLDivElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightMiddleRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  const leftRefs = [leftTopRef, leftMiddleRef, leftBottomRef] as const;
  const rightRefs = [rightTopRef, rightMiddleRef, rightBottomRef] as const;

  return (
    <div ref={containerRef} className={`capability-flow-shell ${className ?? ""}`.trim()}>
      <div className="capability-flow-layout">
        <div className="capability-flow-column capability-flow-column-left">
          {leftNodes.map((node, index) => (
            <CapabilityNode
              key={node.key}
              nodeRef={leftRefs[index]}
              icon={node.icon}
              label={node.label}
            />
          ))}
        </div>

        <div className="capability-flow-center-wrap">
          <div ref={centerRef} className="capability-flow-center">
            <div className="capability-flow-center-ring">{centerIcon}</div>
            <span className="capability-flow-center-label">{centerLabel}</span>
          </div>
        </div>

        <div className="capability-flow-column capability-flow-column-right">
          {rightNodes.map((node, index) => (
            <CapabilityNode
              key={node.key}
              nodeRef={rightRefs[index]}
              icon={node.icon}
              label={node.label}
            />
          ))}
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftTopRef}
        toRef={centerRef}
        curvature={30}
        pathColor="rgba(92, 108, 132, 0.34)"
        gradientStartColor="#3d93ff"
        gradientStopColor="#54c6b7"
        pathWidth={3}
        duration={5.6}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftMiddleRef}
        toRef={centerRef}
        curvature={0}
        pathColor="rgba(92, 108, 132, 0.34)"
        gradientStartColor="#ff8b5d"
        gradientStopColor="#54c6b7"
        pathWidth={3}
        duration={5.6}
        delay={0.14}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftBottomRef}
        toRef={centerRef}
        curvature={-30}
        pathColor="rgba(92, 108, 132, 0.34)"
        gradientStartColor="#ff8b5d"
        gradientStopColor="#3d93ff"
        pathWidth={3}
        duration={5.6}
        delay={0.28}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightTopRef}
        toRef={centerRef}
        curvature={-30}
        pathColor="rgba(92, 108, 132, 0.34)"
        gradientStartColor="#54c6b7"
        gradientStopColor="#3d93ff"
        pathWidth={3}
        duration={5.6}
        delay={0.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightMiddleRef}
        toRef={centerRef}
        curvature={0}
        pathColor="rgba(92, 108, 132, 0.34)"
        gradientStartColor="#ff8b5d"
        gradientStopColor="#54c6b7"
        pathWidth={3}
        duration={5.6}
        delay={0.24}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightBottomRef}
        toRef={centerRef}
        curvature={30}
        pathColor="rgba(92, 108, 132, 0.34)"
        gradientStartColor="#3d93ff"
        gradientStopColor="#ff8b5d"
        pathWidth={3}
        duration={5.6}
        delay={0.38}
      />
    </div>
  );
}
