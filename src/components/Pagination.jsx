import React from "react";
import { useNavigate } from "react-router";

const Pagination = ({ page, totalPages }) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    navigate(`/recettes?page=${newPage}`);
  };
  return (
    <div className="pagination">
      {page > 1 && (
        <>
          <button
            onClick={() => {
              handlePageChange(page - 1);
            }}
          >
            {page - 1}
          </button>
        </>
      )}
      <button className="btn btn-primary" disabled>
        {page}
      </button>
      {totalPages > Number(page) + 3 ? (
        <>
          <button
            className="btn btn-primary"
            onClick={() => {
              handlePageChange(page + 1);
            }}
          >
            {Number(page) + 1}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              handlePageChange(page + 2);
            }}
          >
            {Number(page) + 2}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              handlePageChange(page + 3);
            }}
          >
            {Number(page) + 3}
          </button>
          <div className="suspension-dots">...</div>
        </>
      ) : (
        Array.from({ length: totalPages - Number(page) }, (_, idx) => (
          <button className="btn btn-primary" key={Number(page) + idx + 1}>
            {Number(page) + idx + 1}
          </button>
        ))
      )}
      <button
        className="btn btn-primary"
        onClick={() => {
          handlePageChange(totalPages);
        }}
      >
        {totalPages}
      </button>
    </div>
  );
};

export default Pagination;
