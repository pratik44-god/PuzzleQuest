// export default function Floating({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="animate-[gentleFloat_6s_ease-in-out_infinite]">
//       {children}
//     </div>
//   );
// }


export default function Floating({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        will-change-transform
        animate-[gentleFloat_6s_ease-in-out_infinite]
      "
    >
      {children}
    </div>
  );
}