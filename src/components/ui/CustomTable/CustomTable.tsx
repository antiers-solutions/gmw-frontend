import React, { ReactNode } from "react";
import { Table } from "react-bootstrap";
import { NoRecord } from "../../../assets/svg/SvgIcon";
import CustomPagination from "../CustomPagination/CustomPagination";
import "./CustomTable.scss";

const CustomTable = ({
  className,
  fields,
  children,
  noRecordFound,
  pagination,
  handleNextClick,
  handlePrevClick,
  handlePageNumberClick,
  PageLimit,
  totalCount,
  pageNo,
}: {
  className?: string;
  fields?: any[];
  children?: ReactNode;
  noRecordFound?: ReactNode;
  pagination?: boolean;
  handleNextClick?: any;
  handlePrevClick?: any;
  handlePageNumberClick?: any;
  PageLimit?: any;
  totalCount?: number;
  pageNo?: number;
}) => {
  return (
    <>
      <Table bordered striped className={`common_table ${className}`}>
        {fields && (
          <thead>
            <tr>
              {fields?.map((item, index) => (
                <th data-th={item} key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {children || noRecordFound || (
            <tr className="no_record text-center">
              <td colSpan={fields?.length}>
                {noRecordFound || (
                  <div className="no_record_box">
                    <NoRecord />
                    <h4>No Record Found</h4>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {pagination && (
        <CustomPagination
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          PageLimit={PageLimit}
          handlePageNumberClick={handlePageNumberClick}
          totalCount={totalCount || 0}
          pageNo={pageNo}
        />
      )}
    </>
  );
};

export default CustomTable;
