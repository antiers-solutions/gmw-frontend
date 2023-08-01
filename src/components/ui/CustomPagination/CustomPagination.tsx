import Pagination from "react-bootstrap/Pagination";
import "./CustomPagination.scss";
import { LeftArrowIcon, RightArrowIcon } from "../../../assets/svg/SvgIcon";
import { useEffect, useMemo, useState } from "react";

const CustomPagination = ({
  handleNextClick,
  handlePrevClick,
  handlePageNumberClick,
  PageLimit,
  totalCount,
  pageNo,
}: {
  handleNextClick?: any;
  handlePrevClick?: any;
  handlePageNumberClick?: any;
  PageLimit?: any;
  totalCount?: any;
  pageNo?: number;
}) => {
  const [active, setActive] = useState(1);
  const totalPages = Math.ceil(totalCount / PageLimit);

  useEffect(() => {
    setActive(pageNo || 1);
  }, [pageNo]);

  const prevClick = () => {
    if (active > 1) {
      setActive(active - 1);
      handlePrevClick();
    }
  };

  const nextClick = () => {
    if (active < totalPages) {
      setActive(active + 1);
      handleNextClick();
    }
  };

  const pageNumberClick = (pn: any) => {
    handlePageNumberClick(pn);
    setActive(pn);
  };

  // pagination sorted array
  const getVisiblePages: number[] = useMemo(() => {
    const filterPages = (pages: number[], totalPages: number) => {
      return pages.filter((page: number) => page <= totalPages);
    };

    if (totalPages < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], totalPages);
    } else {
      if (active % 5 >= 0 && active > 4 && active + 2 < totalPages) {
        return [1, active - 1, active, active + 1, totalPages];
      } else if (active % 5 >= 0 && active > 4 && active + 2 >= totalPages) {
        return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [1, 2, 3, 4, 5, totalPages];
      }
    }
  }, [active, totalPages]);

  return (
    <Pagination className="custom-pagination justify-content-center">
      <Pagination.Prev onClick={prevClick}>
        <LeftArrowIcon />
      </Pagination.Prev>
      <>
        {getVisiblePages.map((item: any, index: any, array: any) => {
          return (
            <Pagination.Item
              key={item}
              active={item === active}
              onClick={() => {
                pageNumberClick(item);
              }}
            >
              {array[index - 1] + 2 < item ? `...${item}` : item}{" "}
            </Pagination.Item>
          );
        })}
      </>
      <Pagination.Next onClick={nextClick}>
        <RightArrowIcon />
      </Pagination.Next>
    </Pagination>
  );
};

export default CustomPagination;
