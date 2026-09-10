"use client";

import { Compass, ShieldCheck } from "lucide-react";
import Link from "next/link";

import Button from "~/components/ui/buttton";
import Card from "~/components/ui/cardd";
import Container from "~/components/ui/container";
import { useLogin } from "~/hooks/api/auth";

export default function LoginPage() {
  const { getGoogleAuthUrlAsync } = useLogin();

  const handleGoogleLogin = async () => {
    try {
      const { authUrl } = await getGoogleAuthUrlAsync();

      window.location.href = authUrl;
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-zinc-100">
      <Container>
        <div className="flex min-h-screen items-center justify-center py-10">
          <div className="w-full max-w-md">

            {/* PuzzleQuest Logo */}
            <div className="mb-8 flex justify-center">
              <Link
                href="/"
                className="group flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition-all duration-300 group-hover:rotate-6 group-hover:border-violet-400/40 group-hover:bg-violet-500/15 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                  <Compass size={23} />
                </div>

                <div className="text-left">
                  <p className="text-base font-bold text-white">
                    PuzzleQuest
                  </p>

                  <p className="text-[10px] text-zinc-600">
                    Your adventure awaits
                  </p>
                </div>
              </Link>
            </div>

            {/* Login Card */}
            <Card className="overflow-hidden border border-zinc-800 bg-[#0D0D14] p-8 shadow-2xl shadow-black/20 sm:p-10">

              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                  <Compass size={28} />
                </div>
              </div>

              {/* Heading */}
              <div className="mt-6 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Welcome back
                </h1>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
                  Sign in to continue your adventures,
                  create hunts, and discover hidden
                  treasures.
                </p>
              </div>

              {/* Google Login */}
              <div className="mt-8">
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  leftIcon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.21Z"
                      />

                      <path
                        fill="#34A853"
                        d="M12 21.8c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.8Z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M6.54 13.9A5.86 5.86 0 0 1 6.23 12c0-.66.11-1.3.31-1.9V7.58H3.3A9.8 9.8 0 0 0 2.25 12c0 1.58.38 3.07 1.05 4.42l3.24-2.52Z"
                      />

                      <path
                        fill="#EA4335"
                        d="M12 6.08c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.17 14.63 2.2 12 2.2a9.75 9.75 0 0 0-8.7 5.38l3.24 2.52C7.31 7.8 9.46 6.08 12 6.08Z"
                      />
                    </svg>
                  }
                  onClick={handleGoogleLogin}
                >
                  Continue with Google
                </Button>
              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-zinc-800" />

                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-700">
                  Secure login
                </span>

                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Security */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
                <div className="flex items-start gap-3">

                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-zinc-300">
                      Secure authentication
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                      Continue securely with your Google
                      account. Your credentials are never
                      stored by PuzzleQuest.
                    </p>
                  </div>

                </div>
              </div>

              {/* Terms */}
              <p className="mt-6 text-center text-[11px] leading-5 text-zinc-700">
                By continuing, you agree to use
                PuzzleQuest responsibly and keep your
                account secure.
              </p>
            </Card>

          </div>
        </div>
      </Container>
    </main>
  );
}