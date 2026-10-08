import type { IconComponent } from "./icons/TreatmentIcons";

export function IconBadge({ icon: Icon }: { icon: IconComponent }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist">
      <Icon className="h-6 w-6 text-sage-dark" strokeWidth={1.25} aria-hidden="true" />
    </span>
  );
}
