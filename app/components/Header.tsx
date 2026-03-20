import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  years: number[];
  currentYear: number;
}

export default function Header({ years, currentYear }: HeaderProps) {
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
          <div className="relative inline-block group p-1">
            <span className="cursor-pointer select-none">📅 Years</span>
            <div className="absolute right-0 z-10 hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg py-1 mt-1">
              {[...years].reverse().map((year) => (
                <Link key={year} href={year === currentYear ? '/' : `/year/${year}`}>
                  <a
                    rel="noopener noreferrer"
                    className={`block px-4 py-1 hover:bg-gray-100 whitespace-nowrap${year === currentYear ? ' font-bold' : ''}`}
                  >
                    {year}
                    {year === currentYear && ' ✓'}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
