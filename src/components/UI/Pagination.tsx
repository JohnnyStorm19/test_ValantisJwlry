import { useState } from "react"

const MAX_PAGES = 5;
const MIN_PAGES = 1;

type TPaginationProps = {
  handleOffset: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  isError: boolean;
}

const Pagination = ({handleOffset, isLoading, isError}: TPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPageHandler = () => {
    console.log('next is clicked')
    setCurrentPage(prev => prev += 1);
    handleOffset(prev => prev += 50)
  }
  const prevPageHandler = () => {
    console.log('prev is clicked')
    setCurrentPage(prev => prev -= 1);
    handleOffset(prev => prev -= 50)
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <button disabled={currentPage <= MIN_PAGES || isLoading || isError} className="paginate-btn" onClick={prevPageHandler}>Prev</button>
      <span>{currentPage}</span>
      <button disabled={currentPage >= MAX_PAGES || isLoading || isError} className="paginate-btn" onClick={nextPageHandler}>Next</button>
    </div>
  )
}

export default Pagination
