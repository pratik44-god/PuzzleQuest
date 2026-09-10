// export default function Reveal({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="animate-[huntReveal_0.7s_ease-out_both]">
//       {children}
//     </div>
//   );
// }

export default function Reveal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        will-change-[transform,opacity]
        animate-[huntReveal_0.5s_cubic-bezier(0.22,1,0.36,1)_both]
      "
    >
      {children}
    </div>
  );
}