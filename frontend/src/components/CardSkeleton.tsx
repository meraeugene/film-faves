import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";

interface CardSkeletonProps {
  filmsPerPage: number;
}

const CardSkeleton = ({ filmsPerPage }: CardSkeletonProps) => {
  const [deviceSize, setDeviceSize] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 468) {
        setDeviceSize("mobile");
      } else if (width <= 768) {
        setDeviceSize("tablet");
      } else {
        setDeviceSize("desktop");
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial device size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return Array(filmsPerPage)
    .fill(0)
    .map((_, index) => (
      <div className="flex flex-col" key={index}>
        <div className="card-skeleton">
          <div className="left-col">
            {deviceSize === "mobile" ? (
              <Skeleton width={112} height={196} />
            ) : (
              <Skeleton
                width={deviceSize === "tablet" ? 160 : 210}
                height={310}
              />
            )}
          </div>

          <div className="right-col">
            <Skeleton width={50} />
            <Skeleton
              width={deviceSize === "tablet" ? 100 : 125}
              className={deviceSize === "mobile" ? "" : "my-2"}
            />
            <Skeleton width={50} />
            <Skeleton
              width={100}
              className={deviceSize === "mobile" ? "" : "my-2"}
            />
            <Skeleton width={deviceSize === "tablet" ? 100 : 125} />
            <Skeleton
              height={deviceSize === "mobile" ? 30 : 40}
              className={deviceSize === "mobile" ? "my-4" : "my-6"}
            />
          </div>
        </div>
        <div className="bottom-col mt-4">
          <Skeleton count={3} />
        </div>
      </div>
    ));
};

export default CardSkeleton;
