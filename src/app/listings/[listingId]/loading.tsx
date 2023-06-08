import Container from '@components/Container';
import { Skeleton } from '@components/Skeleton';

const Loading = () => {
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <Skeleton height="h-[15px]" width="w-[170px]" />
          <Skeleton height="h-[18px]" width="w-[250px]" />
          <Skeleton height="h-[15px]" width="w-[170px]" />

          <div className="w-full sm:h-[60vh]">
            <Skeleton height="h-full" />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton height="h-[14px]" width="w-[150px]" />
                  <Skeleton height="h-[30px]" width="w-[30px]" fullRounded />
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <Skeleton height="h-[14px]" width="w-[60px]" />
                  <Skeleton height="h-[14px]" width="w-[60px]" />
                  <Skeleton height="h-[14px]" width="w-[60px]" />
                </div>
              </div>

              <hr />

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Skeleton height="h-[40px]" width="w-[40px]" />

                  <div className="flex flex-col gap-2">
                    <Skeleton height="h-[14px]" width="w-[70px]" />

                    <Skeleton height="h-[14px]" width="w-[150px]" />
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex flex-col gap-3">
                <Skeleton height="h-[14px]" />
                <Skeleton height="h-[14px]" />
                <Skeleton height="h-[14px]" />
                <Skeleton height="h-[14px]" />
                <Skeleton height="h-[14px]" />
              </div>

              <hr />

              <Skeleton />
            </div>

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <div className="rounded-xl border-[1px] border-neutral-200">
                <div className="flex items-center gap-1 p-4">
                  <Skeleton height="h-[18px]" width="w-[100px]" />
                </div>

                <hr />

                <div className="p-4">
                  <Skeleton height="h-[40vh]" />
                </div>

                <hr />

                <div className="p-4">
                  <Skeleton height="h-[50px]" />
                </div>

                <hr />

                <div className="flex items-center justify-between p-4">
                  <Skeleton height="h-[14px]" width="w-[70px]" />

                  <Skeleton height="h-[14px]" width="w-[70px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
