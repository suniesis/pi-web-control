type PiLogoProps = {
  className?: string;
};

export function PiLogo({ className }: PiLogoProps) {
  return (
    <img
      className={["pi-logo", className].filter(Boolean).join(" ")}
      src="/pi-logo.svg"
      alt=""
      aria-hidden="true"
    />
  );
}
