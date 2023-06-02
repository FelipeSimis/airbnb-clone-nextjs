import Image from 'next/image';

type AvatarProps = {
  src?: string | null;
};

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src || '/images/user-placeholder.jpg'}
      referrerPolicy="no-referrer"
      alt="User image"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
