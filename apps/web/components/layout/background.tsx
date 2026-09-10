export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#05060A]">
      {/* Soft gradients instead of heavy blur filters (blur-[180px] freezes many GPUs) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% -10%, rgba(124, 58, 237, 0.14), transparent 55%), radial-gradient(circle at 100% 35%, rgba(6, 182, 212, 0.07), transparent 45%), radial-gradient(circle at 0% 100%, rgba(217, 70, 239, 0.07), transparent 45%)",
        }}
      />

      {/* Grid */}
      <div
        className="
          absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />
    </div>
  );
}
