export function StepIndicator({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: total }, (_, i) => (
                <span
                    key={i}
                    className={`
            w-3 h-3 rounded-full
            ${i + 1 === current ? "bg-white" : "bg-white/50"}
          `}
                />
            ))}
        </div>
    );
}
