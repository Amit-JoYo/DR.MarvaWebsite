import type { ComponentType } from "react";

export interface IconProps {
  className?: string;
  strokeWidth?: number | string;
  "aria-hidden"?: boolean | "true" | "false";
}

export type IconComponent = ComponentType<IconProps>;

/** Builds a 24x24 single-line drawing with the same stroke conventions as lucide-react. */
function lineDrawing(paths: string[]): IconComponent {
  function Icon({ className, strokeWidth = 1.25, ...rest }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...rest}
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  return Icon;
}

// Thin-line anatomical sketches of the treated area, one per clinical treatment.
export const PlasmaIcon = lineDrawing([
  "M12 3.5c-3.2 4.2-5.6 7-5.6 10.2a5.6 5.6 0 0 0 11.2 0c0-3.2-2.4-6-5.6-10.2z",
  "M9.4 14.2a2.7 2.7 0 0 0 2.1 2.5",
]);

export const LipsIcon = lineDrawing([
  "M3 12c2.6-1.9 5-2.9 6.6-2.5 1 .3 1.5 1 2.4 1s1.4-.7 2.4-1c1.6-.4 4 .6 6.6 2.5",
  "M3 12c2.4 1.1 5.4 1.5 9 1.5s6.6-.4 9-1.5",
  "M3 12c2.7 4.7 5.8 6 9 6s6.3-1.3 9-6",
]);

export const JawlineIcon = lineDrawing([
  "M4 6c0 5.6 2.5 10.2 6.6 12.7.8.5 2 .5 2.8 0C17.5 16.2 20 11.6 20 6",
]);

export const SkinRadianceIcon = lineDrawing([
  "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z",
  "M7.2 10.2a5 5 0 0 1 3.2-3.4",
  "M16.8 13.8a5 5 0 0 1-3.2 3.4",
]);

export const ExpressionLinesIcon = lineDrawing([
  "M5.5 5.5c4-1.3 9-1.3 13 0",
  "M5 9.2c4.3-1.4 9.7-1.4 14 0",
  "M4 17c2.3-2.4 5-3.1 7-1.6",
  "M13 15.4c2-1.5 4.7-.8 7 1.6",
]);

export const UnderEyeIcon = lineDrawing([
  "M3 10.5C6 6.3 9 5 12 5s6 1.3 9 5.5c-3 4.2-6 5.5-9 5.5s-6-1.3-9-5.5z",
  "M14.4 10.5a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0z",
  "M7 19c3.2 2.2 6.8 2.2 10 0",
]);

export const NoseProfileIcon = lineDrawing([
  "M9 3c.1 4 .8 7 2.4 9.6 1.1 1.8 2.7 3 4.6 3.6.3.7-.1 1.4-1 1.6-1.3.3-2.6.2-3.8-.3",
]);
