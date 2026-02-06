import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react";
import { Pagination } from "antd";
import {
  SearchOutlined,
  CloseCircleFilled,
  DownOutlined,
} from "@ant-design/icons";
import { Genre } from "@/models/Genre";
import BookPage from "../BookPage/BookPage";

interface DashboardContentProps {
  opts: Genre[];
  totalBooks: number;
  numPage: number;
  searchBookName: string;
  isSearchBookName: boolean;
  chooseGenre: Genre;
  bookNotFound: boolean;
  handleChangePage: (page: number) => void;
  handleSearchBookName: (input: string) => void;
  handleRemoveInputSearchValue: () => void;
  handleChooseGenreChange: (genre: Genre) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  opts,
  totalBooks,
  numPage,
  searchBookName,
  isSearchBookName,
  chooseGenre,
  bookNotFound,
  handleChangePage,
  handleSearchBookName,
  handleRemoveInputSearchValue,
  handleChooseGenreChange,
}) => {
  const [inputValue, setInputValue] = useState(searchBookName);
  const searchBookNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(searchBookName);
  }, [searchBookName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClickSearch = () => {
    handleSearchBookName(inputValue);
  };
  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchBookName(inputValue);
    }
  };

  const handleChooseGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreName = e.target.value;
    const genre = opts.find((item) => item.name === genreName);
    if (genre) {
      handleChooseGenreChange(genre);
    }
  };
  const handleRemoveInputSearch = () => {
    setInputValue("");
    searchBookNameRef.current?.focus();
    handleRemoveInputSearchValue();
  };

  return (
    <section className="w-full bg-[var(--background-content)]">
      <div className="container pt-5 pb-5 w-full">
        <div className="h-[45px] flex justify-between mt-10 mb-2">
          <div className="group relative px-2 flex justify-between w-[350px] h-full  border border-[var(--accent-color)] rounded-[25px] hover:border-[var(--dark-color)]">
            <button type={"button"} onClick={handleClickSearch}>
              <SearchOutlined className="ml-3 text-[var(--accent-color)] hover:cursor-pointer group-hover:text-[var(--dark-color)]" />
            </button>
            <input
              className="h-full px-1 flex-1 outline-none bg-transparent"
              ref={searchBookNameRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
              type={"text"}
            />
            {inputValue && (
              <button
                onClick={handleRemoveInputSearch}
                className="mr-3 text-[var(--accent-color)] group-hover:text-[var(--dark-color)]"
              >
                <CloseCircleFilled />
              </button>
            )}
          </div>
          {!isSearchBookName && (
            <div className="flex items-center">
              <h2 className="h-fit font-bold pr-3">Genres</h2>
              <div className="relative group w-[150px] h-full">
                <select
                  name="select-genre"
                  id="select-genre"
                  value={chooseGenre.name}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChooseGenre(e)
                  }
                  className="appearance-none outline-none px-5 w-full h-full bg-transparent border border-[var(--accent-color)] rounded-[25px] group-hover:border-[var(--dark-color)] group-hover:cursor-pointer"
                >
                  {opts.map((item: Genre, index: number) => (
                    <option
                      className="min-h-[4.6rem] bg-[var(--background-content)] hover:bg-gray-200"
                      key={index}
                      value={item.name}
                    >
                      {item.value}
                    </option>
                  ))}
                </select>
                <DownOutlined className="absolute text-[var(--accent-color)] pointer-events-none right-0 pr-3 top-1/2 transform -translate-y-1/2 group-hover:text-[var(--dark-color)]" />
              </div>
            </div>
          )}
        </div>
        <span className="block w-full border-t opacity-70 border-[var(--accent-color)] "></span>
      </div>
      <div className="container">
        <BookPage />
        {!bookNotFound && (
          <div className="w-full flex justify-center pb-10">
            <Pagination
              className="w-fit"
              current={numPage}
              defaultCurrent={1}
              total={totalBooks}
              pageSize={12}
              defaultPageSize={12}
              showSizeChanger={false}
              onChange={handleChangePage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardContent;
