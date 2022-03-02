import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="container flex items-center justify-between w-full max-w-3xl px-6 py-10 mx-auto xl:max-w-5xl">
      <Link href="/">
        <a rel="noopener noreferrer" className="block h-6 text-2xl font-semibold">Strava Year-To-Date Stats</a>
      </Link>
      <div className="flex items-center">
        <div className="hidden space-x-2 font-medium sm:block">
          <Link href="#distance"><a rel="noopener noreferrer" className="p-1">🏃‍♂️ Distance</a></Link>
          <Link href="#runs"><a rel="noopener noreferrer" className="p-1">💯 Runs</a></Link>
          <Link href="#time"><a rel="noopener noreferrer" className="p-1">⏱ Time</a></Link>
          <Link href="#elevation"><a rel="noopener noreferrer" className="p-1">🏔 Elevation</a></Link>
        </div>
      </div>
    </header>
  );
}
