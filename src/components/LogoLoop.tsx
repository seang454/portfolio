"use client"
import LogoLoop from "@/component/LogoLoop";
import { techLogos } from "@/lib/loop";

export function LoopLogo() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="right"
        logoHeight={55}
        gap={60}
        hoverSpeed={80}
        scaleOnHover={false}
        fadeOut={false}
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
      
      {/* Vertical loop with deceleration on hover */}
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="right"
        logoHeight={55}
        gap={60}
        hoverSpeed={80}
        fadeOut={false}
/>
    </div>
  );
}
