import BookItem from "../BookItem/BookItem";

import { RootState, useAppSelector } from "@/redux/store";

const BookPage: React.FC = () => {
  const { bookList, bookNotFound, error } = useAppSelector(
    (state: RootState) => state.book
  );

  return (
    <div className="flex flex-row flex-wrap justify-around gap-x-24 gap-y-10 py-5">
      {!bookNotFound &&
        bookList.map((item) => <BookItem key={item.key} bookItem={item} />)}
      {bookNotFound && (
        <div className="text-center">
          <p>no data display</p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default BookPage;
