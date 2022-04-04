import React from "react";
import ReactPaginate from "react-paginate";


export const Pagination = () => {
    const handlePageClick = (data:any) =>{
        console.log(data.selected)

    }

  return (
    <div>
        <ReactPaginate
              previousLabel={'previous'} 
              nextLabel={'next'}      
              breakLabel={'...'}
              pageCount={5}
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}

                 />
                 
    </div>
  )
}

