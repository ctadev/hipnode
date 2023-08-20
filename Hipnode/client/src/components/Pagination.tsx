import React from 'react';

const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <main>
      <article className="mt-4 mb-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mr-3 px-3 py-1 rounded-md ${
              currentPage === number
                ? 'bg-[#ff6934] text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {number}
          </button>
        ))}
      </article>
    </main>
  );
};

export default Pagination;
