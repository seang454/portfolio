"use client";

import {
  BadgeCheck,
  Boxes,
  Container,
  GitBranch,
  Rocket,
  ScanSearch,
  Waypoints,
} from "lucide-react";
import CapabilityFlow from "@/components/capability-flow";

export default function WorkflowBeam({
  locale,
}: {
  locale: "en" | "kh";
}) {
  const labels =
    locale === "kh"
      ? {
          leftTop: "Code",
          leftMiddle: "Build",
          leftBottom: "Test",
          rightTop: "Image",
          rightMiddle: "Deploy",
          rightBottom: "Monitor",
          center: "CI/CD",
        }
      : {
          leftTop: "Code",
          leftMiddle: "Build",
          leftBottom: "Test",
          rightTop: "Image",
          rightMiddle: "Deploy",
          rightBottom: "Monitor",
          center: "CI/CD",
        };

  return (
    <CapabilityFlow
      centerIcon={<Waypoints className="h-7 w-7 text-foreground" />}
      centerLabel={labels.center}
      leftNodes={[
        {
          key: "code",
          label: labels.leftTop,
          icon: <GitBranch className="h-5 w-5 text-[var(--accent-strong)]" />,
        },
        {
          key: "build",
          label: labels.leftMiddle,
          icon: <Boxes className="h-5 w-5 text-[var(--accent-strong)]" />,
        },
        {
          key: "test",
          label: labels.leftBottom,
          icon: <BadgeCheck className="h-5 w-5 text-[var(--accent-strong)]" />,
        },
      ]}
      rightNodes={[
        {
          key: "image",
          label: labels.rightTop,
          icon: <Container className="h-5 w-5 text-[var(--accent-strong)]" />,
        },
        {
          key: "deploy",
          label: labels.rightMiddle,
          icon: <Rocket className="h-5 w-5 text-[var(--accent-strong)]" />,
        },
        {
          key: "monitor",
          label: labels.rightBottom,
          icon: <ScanSearch className="h-5 w-5 text-[var(--accent-strong)]" />,
        },
      ]}
    />
  );
}
