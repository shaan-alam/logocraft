import { Card, Skeleton } from "@nextui-org/react";

const LogoSkeletonCard = () => {
  return (
    <div className="my-8 flex grid-cols-4 gap-4">
      {new Array(4).fill(4).map((_, index) => (
        <Card
          className="h-[400px] w-[400px] space-y-5 p-4"
          radius="lg"
          key={index}
        >
          <Skeleton className="rounded-lg">
            <div className="h-[360px] rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="flex space-x-3">
            <Skeleton className="w-[80%] rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-[20%] rounded-full">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LogoSkeletonCard;
