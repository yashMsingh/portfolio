export default function TornEdgeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-10 -mt-10 z-10 ${className}`}>
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full fill-current"
        style={{ color: "var(--color-wall-dark)" }}
      >
        <path d="M1200 120H0V73.9719C0 73.9719 80 33 160 55C240 77 320 20 400 45C480 70 560 30 640 45C720 60 800 20 880 55C960 90 1040 40 1120 60C1200 80 1200 73.9719 1200 73.9719V120Z" />
      </svg>
    </div>
  );
}
