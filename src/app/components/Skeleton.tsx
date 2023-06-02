type SkeletonProps = {
  width?: string;
  height?: string;
};

export const Skeleton = ({
  width = 'w-full',
  height = 'h-[35vh]',
}: SkeletonProps) => {
  return (
    <div
      className={`before:bg-gradient relative ${width} ${height} overflow-hidden rounded-lg bg-slate-200 before:absolute before:h-full before:w-full before:animate-skeleton before:bg-gradient-to-r before:from-transparent before:via-slate-100 before:to-transparent before:content-['']`}
    />
  );
};
