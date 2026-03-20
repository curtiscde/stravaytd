import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  years: number[];
  currentYear: number;
}

export default function Header({ years, currentYear }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yearsOpen, setYearsOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setYearsOpen(false);
  };

  const reversedYears = [...years].reverse();

  return (
    <header className="container w-full max-w-3xl px-6 mx-auto xl:max-w-5xl">
      <div className="flex items-center justify-between py-10">
        <Link href="/">
          <a rel="noopener noreferrer" className="block h-6 text-2xl font-semibold">Strava Year-To-Date Stats</a>
        </Link>

        {/* Desktop nav */}
        <div className="hidden space-x-2 font-medium sm:flex sm:items-center">
          <Link href="#distance"><a rel="noopener noreferrer" className="p-1">🏃‍♂️ Distance</a></Link>
          <Link href="#runs"><a rel="noopener noreferrer" className="p-1">💯 Runs</a></Link>
          <Link href="#time"><a rel="noopener noreferrer" className="p-1">⏱ Time</a></Link>
          <Link href="#elevation"><a rel="noopener noreferrer" className="p-1">🏔 Elevation</a></Link>
          <div className="relative inline-block group p-1">
            <span className="cursor-pointer select-none">📅 Years</span>
            <div className="absolute right-0 z-10 hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg py-1 mt-1">
              {reversedYears.map((year) => (
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

        {/* Mobile burger button */}
        <button
          type="button"
          className="text-2xl sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="pb-6 font-medium sm:hidden">
          <Link href="#distance">
            <a href="#distance" rel="noopener noreferrer" className="block py-2" onClick={closeMenu}>🏃‍♂️ Distance</a>
          </Link>
          <Link href="#runs">
            <a href="#runs" rel="noopener noreferrer" className="block py-2" onClick={closeMenu}>💯 Runs</a>
          </Link>
          <Link href="#time">
            <a href="#time" rel="noopener noreferrer" className="block py-2" onClick={closeMenu}>⏱ Time</a>
          </Link>
          <Link href="#elevation">
            <a href="#elevation" rel="noopener noreferrer" className="block py-2" onClick={closeMenu}>🏔 Elevation</a>
          </Link>

          <button
            type="button"
            className="flex items-center gap-1 py-2 w-full text-left"
            onClick={() => setYearsOpen((o) => !o)}
          >
            <span>📅 Years</span>
            <span className="text-sm">{yearsOpen ? '▴' : '▾'}</span>
          </button>

          {yearsOpen && (
            <div className="pl-4">
              {reversedYears.map((year) => (
                <Link key={year} href={year === currentYear ? '/' : `/year/${year}`}>
                  <a
                    href={year === currentYear ? '/' : `/year/${year}`}
                    rel="noopener noreferrer"
                    className={`block py-2${year === currentYear ? ' font-bold' : ''}`}
                    onClick={closeMenu}
                  >
                    {year}
                    {year === currentYear && ' ✓'}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
