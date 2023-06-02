import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        width={100}
        height={100}
        alt="Logo"
        className="hidden cursor-pointer md:block"
        priority
      />
    </Link>
  );
};

export default Logo;
