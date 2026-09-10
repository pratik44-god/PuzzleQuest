// // "use client";

// // import Link from "next/link";
// // import { useEffect, useState } from "react";
// // import { Menu } from "lucide-react";

// // import Button from "~/components/ui/buttton";
// // import Container from "~/components/ui/container";
// // import MobileMenu from "./mobile-menu";

// // import { useLogin } from "~/hooks/api/auth";

// // export default function Navbar() {
// //   const [scrolled, setScrolled] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const {
// //     loginWithGoogleIdAsync,
// //     status,
// //   } = useLogin();

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 15);
// //     };

// //     window.addEventListener("scroll", handleScroll);

// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   const handleOpenMenu = () => {
// //     setMobileMenuOpen(true);
// //   };

// //   const handleCloseMenu = () => {
// //     setMobileMenuOpen(false);
// //   };

// //   const handleGetStarted = async () => {
// //     // try {
// //     //   await loginWithGoogleIdAsync();

// //     //   // Later
// //     //   // router.push("/dashboard");
// //     // } catch (error) {
// //     //   console.error(error);
// //     // }
// //   };

// //   return (
// //     <header
// //       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
// //         scrolled
// //           ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
// //           : "bg-transparent"
// //       }`}
// //     >
// //       <Container>
// //         <div className="flex h-20 items-center justify-between">
// //           {/* Logo */}
// //           <Link
// //             href="/"
// //             className="flex items-center gap-3"
// //           >
// //             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-bold text-white">
// //               P
// //             </div>

// //             <div>
// //               <h1 className="text-xl font-bold text-white">
// //                 PuzzleQuest
// //               </h1>

// //               <p className="text-xs text-zinc-500">
// //                 Treasure Hunt
// //               </p>
// //             </div>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden items-center gap-10 lg:flex">
// //             <Link
// //               href="/"
// //               className="text-zinc-300 transition hover:text-white"
// //             >
// //               Home
// //             </Link>

// //             <Link
// //               href="/discover"
// //               className="text-zinc-300 transition hover:text-white"
// //             >
// //               Discover
// //             </Link>

// //             <Link
// //               href="/leaderboard"
// //               className="text-zinc-300 transition hover:text-white"
// //             >
// //               Leaderboard
// //             </Link>

// //             <Link
// //               href="/about"
// //               className="text-zinc-300 transition hover:text-white"
// //             >
// //               About
// //             </Link>
// //           </nav>

// //           {/* Actions */}
// //           <div className="flex items-center gap-3">
// //             <Button
// //               variant="primary"
// //               size="md"
// //               loading={status === "pending"}
// //               onClick={handleGetStarted}
// //               className="hidden lg:flex"
// //             >
// //               Get Started
// //             </Button>

// //             <button
// //               onClick={handleOpenMenu}
// //               className="rounded-xl p-2 transition hover:bg-white/10 lg:hidden"
// //               aria-label="Open menu"
// //             >
// //               <Menu size={24} />
// //             </button>
// //           </div>
// //         </div>
// //       </Container>

// //       <MobileMenu
// //         open={mobileMenuOpen}
// //         onClose={handleCloseMenu}
// //       />
// //     </header>
// //   );
// // }
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu } from "lucide-react";

// import Button from "~/components/ui/buttton";
// import Container from "~/components/ui/container";
// import MobileMenu from "./mobile-menu";

// import { useLogin } from "~/hooks/api/auth";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const {
//     loginWithGoogleIdAsync,
//     status,
//   } = useLogin();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 15);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleOpenMenu = () => {
//     setMobileMenuOpen(true);
//   };

//   const handleCloseMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   const handleGetStarted = async () => {
//     try {
//       // await loginWithGoogleIdAsync();

//       // After successful login:
//       // window.location.href = "/dashboard";
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
//           ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
//           : "bg-transparent"
//         }`}
//     >
//       <Container>
//         <div className="flex h-20 items-center justify-between">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-3"
//           >
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-bold text-white">
//               P
//             </div>

//             <div>
//               <h1 className="text-xl font-bold text-white">
//                 PuzzleQuest
//               </h1>

//               <p className="text-xs text-zinc-500">
//                 Treasure Hunt
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden items-center gap-10 lg:flex">
//             <Link
//               href="/"
//               className="text-zinc-300 transition hover:text-white"
//             >
//               Home
//             </Link>

//             <Link
//               href="/discover"
//               className="text-zinc-300 transition hover:text-white"
//             >
//               Discover
//             </Link>

//             <Link
//               href="/leaderboard"
//               className="text-zinc-300 transition hover:text-white"
//             >
//               Leaderboard
//             </Link>

//             <Link
//               href="/about"
//               className="text-zinc-300 transition hover:text-white"
//             >
//               About
//             </Link>
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center gap-3">
      
//             <Link href="/login" className="hidden lg:block">
//               <Button
//                 variant="primary"
//                 size="md"
//               >
//                 Get Started
//               </Button>
//             </Link>

//             <button
//               type="button"
//               onClick={handleOpenMenu}
//               className="rounded-xl p-2 text-white transition hover:bg-white/10 lg:hidden"
//               aria-label="Open menu"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </Container>

//       <MobileMenu
//         open={mobileMenuOpen}
//         onClose={handleCloseMenu}
//       />
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import Button from "~/components/ui/buttton";
import Container from "~/components/ui/container";
import MobileMenu from "./mobile-menu";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Discover",
    href: "/discover",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#09090B]/75 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-bold text-white shadow-lg shadow-violet-500/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-violet-500/30">
              P
            </div>

            <div>
              <h1 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-violet-200">
                PuzzleQuest
              </h1>

              <p className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                Treasure Hunt
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-2"
                >
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-300 ${
                      isActive
                        ? "w-5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                    }`}
                  />

                  {/* Very subtle glow */}
                  <span
                    className={`pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-5 rounded-full bg-violet-500/20 blur-xl transition-opacity duration-300 ${
                      isActive
                        ? "opacity-70"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* Get Started */}
            <Link
              href="/login"
              className="hidden lg:block"
            >
              <Button
                variant="primary"
                size="md"
                className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/20"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white active:scale-95 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}