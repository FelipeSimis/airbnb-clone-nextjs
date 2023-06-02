import Link from 'next/link';
import { FaHome } from '@react-icons/all-files/fa/FaHome';

type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
  showBackLink?: boolean;
};

const Heading = ({
  title,
  subtitle,
  center,
  showBackLink = false,
}: HeadingProps) => {
  return (
    <div className="flex flex-col">
      {showBackLink && (
        <Link
          href="/"
          className="mb-4 flex w-fit items-center gap-2 text-sm text-neutral-500 hover:underline"
        >
          <FaHome size={16} /> Go to homepage
        </Link>
      )}

      <div className={center ? 'text-center' : undefined}>
        <div className="text-2xl font-bold">{title}</div>

        {subtitle && (
          <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
        )}
      </div>
    </div>
  );
};

export default Heading;
