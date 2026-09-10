// export default function HeroBackground() {
//   return (
//     <div
//       className="pointer-events-none absolute inset-0"
//       style={{
//         background:
//           "radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.1), transparent 50%)",
//       }}
//     />
//   );
// }


export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Base purple glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.12), transparent 55%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(124, 58, 237, 0.20) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(124, 58, 237, 0.20) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "120px 120px",

          /* Makes the grid fade away around the edges */
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 35%, transparent 100%)",
        }}
      />

      {/* Extra central glow sitting above the grid */}
      <div
        className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124, 58, 237, 0.12), transparent 70%)",
        }}
      />

    </div>
  );

}