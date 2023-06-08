type SkeletonProps = {
  width?: string;
  height?: string;
  fullRounded?: boolean;
};

export const Skeleton = ({
  width = 'w-full',
  height = 'h-[35vh]',
  fullRounded,
}: SkeletonProps) => {
  return (
    <div
      className={`before:bg-gradient relative ${width} ${height} overflow-hidden ${
        fullRounded ? 'rounded-full' : 'rounded-lg'
      } bg-[#eaeaea] before:absolute before:h-full before:w-full before:animate-skeleton before:bg-gradient-to-r before:from-transparent before:via-[#f2f2f2] before:to-transparent before:content-['']`}
    />
  );
};
