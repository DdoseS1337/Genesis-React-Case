import { CourseItem } from "./CourseItem";
import { useState } from "react";
function CourseList({ catalog = [], totalCourses }) {
  const [coursesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentCourses = catalog.slice(startIndex, endIndex);

  return (
    <>
      <div className="list">
        {currentCourses.map((el) => (
          <CourseItem key={el.id} {...el} />
        ))}
      </div>
      <nav className="green darken-1">
        <div className="pagination-container">
          <ul className="paginationMy">
            {pageNumbers.map((number) => (
              <li 
                key={number}
                onClick={() => setCurrentPage(number)}
                href="#"
                className={`page-link ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export { CourseList };
