import React from 'react';

interface HeadingProps {
  title: string;
  subtitle: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <section className="dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl dark:text-coolGray-50">{title}</h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-coolGray-400">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
