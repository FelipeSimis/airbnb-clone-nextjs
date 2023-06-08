import Container from '@components/Container';
import { Skeleton } from '@components/Skeleton';

const Loading = () => {
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Skeleton height="h-[15px]" width="w-[170px]" />
            <Skeleton height="h-[15px]" width="w-[250px]" />

            <Skeleton />

            <Skeleton height="h-[50px]" />
            <Skeleton height="h-[50px]" />
            <Skeleton height="h-[50px]" />

            <div className="grid grid-cols-1 gap-3 overflow-y-auto scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md scrollbar-w-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
              <Skeleton height="h-[100px]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton height="h-[15px]" width="w-[100px]" />
                <Skeleton height="h-[15px]" width="w-[150px]" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton height="h-[40px]" width="w-[40px]" fullRounded />
                <Skeleton height="h-[30px]" width="w-[40px]" />
                <Skeleton height="h-[40px]" width="w-[40px]" fullRounded />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton height="h-[15px]" width="w-[100px]" />
                <Skeleton height="h-[15px]" width="w-[150px]" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton height="h-[40px]" width="w-[40px]" fullRounded />
                <Skeleton height="h-[30px]" width="w-[40px]" />
                <Skeleton height="h-[40px]" width="w-[40px]" fullRounded />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton height="h-[15px]" width="w-[100px]" />
                <Skeleton height="h-[15px]" width="w-[150px]" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton height="h-[40px]" width="w-[40px]" fullRounded />
                <Skeleton height="h-[30px]" width="w-[40px]" />
                <Skeleton height="h-[40px]" width="w-[40px]" fullRounded />
              </div>
            </div>

            <Skeleton height="h-[50px]" />

            <Skeleton />

            <Skeleton height="h-[50px]" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
