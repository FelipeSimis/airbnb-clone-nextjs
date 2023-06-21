'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Link href="/" aria-label="Go to homepage">
      <Image
        src="/images/logo.png"
        width={100}
        height={31.25}
        alt="Logo"
        className="hidden cursor-pointer md:block"
        priority={isDesktop}
      />
    </Link>
  );
};

export default Logo;
