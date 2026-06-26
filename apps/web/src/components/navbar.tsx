import { Menu } from "lucide-react";

import type { NavigationData } from "@/types";

const DUVINE_LOGO_URL =
  "https://cdn.sanity.io/images/gv1qmwsq/production/5d1241304dfae7bb4617d22deb6b848ff865e733-160x35.png";

function HeaderShell() {
  return (
    <header className="sticky top-0 z-40 w-full border-zinc-800 border-b bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a aria-label="DuVine home" className="block" href="/">
          <img
            alt="DuVine"
            src={DUVINE_LOGO_URL}
            style={{
              height: "35px",
              maxWidth: "none",
              objectFit: "contain",
              width: "160px",
            }}
          />
        </a>
        <button
          aria-label="Open menu"
          className="flex size-10 items-center justify-center border border-zinc-700 text-zinc-100 transition-colors hover:border-zinc-500 hover:text-white"
          type="button"
        >
          <Menu aria-hidden className="size-5" />
        </button>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return <HeaderShell />;
}

export function Navbar(_props: NavigationData) {
  return <HeaderShell />;
}
