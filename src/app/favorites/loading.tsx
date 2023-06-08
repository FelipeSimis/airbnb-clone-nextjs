import Container from '@components/Container';
import { Skeleton } from '@components/Skeleton';

const Loading = () => {
  return (
    <Container>
      <div className="flex flex-col gap-3">
        <Skeleton height="h-[15px]" width="w-[170px]" />
        <Skeleton height="h-[15px]" width="w-[170px]" />
        <Skeleton height="h-[15px]" width="w-[250px]" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>

        <div className="flex flex-col gap-3 sm:aspect-square">
          <Skeleton height="h-[45vh] sm:h-[35vh]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[15px]" width="w-[60px]" />
          <Skeleton height="h-[15px]" width="w-[110px]" />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
