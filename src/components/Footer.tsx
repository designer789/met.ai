'use client';

import { type FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="w-full py-8 border-t border-zinc-800">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Met.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 