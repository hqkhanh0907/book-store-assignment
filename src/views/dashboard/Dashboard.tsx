import DashboardContent from "@/components/DashboardContent/DashboardContent";
import DashboardTop from "@/components/DashboardTop/DashboardTop";
import { useDashboardBooks } from "@/libs/hook";
import { RootState, useAppSelector } from "@/redux/store";

const Dashboard: React.FC = () => {
  const totalBooks = useAppSelector(
    (state: RootState) => state.book.totalBooks
  );
  const bookNotFound = useAppSelector(
    (state: RootState) => state.book.bookNotFound
  );

  const {
    opts,
    numPage,
    searchBookName,
    isSearchBookName,
    chooseGenre,
    handleChangePage,
    handleSearchBookName,
    handleRemoveInputSearchValue,
    handleChooseGenreChange,
  } = useDashboardBooks();

  return (
    <>
      <DashboardTop />
      <DashboardContent
        opts={opts}
        totalBooks={totalBooks}
        numPage={numPage}
        searchBookName={searchBookName}
        isSearchBookName={isSearchBookName}
        chooseGenre={chooseGenre}
        bookNotFound={bookNotFound}
        handleChangePage={handleChangePage}
        handleSearchBookName={handleSearchBookName}
        handleRemoveInputSearchValue={handleRemoveInputSearchValue}
        handleChooseGenreChange={handleChooseGenreChange}
      />
    </>
  );
};

export default Dashboard;
