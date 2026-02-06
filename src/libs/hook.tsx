import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Helper from "@/libs/helper";
import { Genre } from "@/models/Genre";
import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import { apiGetBooksList, apiSearchBookName } from "@/redux/slices/bookSlice";
import { useAppDispatch } from "@/redux/store";

const DEFAULT_PAGE = 1;

const GENRES: Genre[] = [
  { name: "love", value: "All Genres" },
  { name: "business", value: "Business" },
  { name: "science", value: "Science" },
  { name: "fiction", value: "Fiction" },
  { name: "philosophy", value: "Philosophy" },
  { name: "biography", value: "Biography" },
];

interface InitialDashboardState {
  page: number;
  search: string;
  genre: Genre;
}

const getInitialState = (genres: Genre[]): InitialDashboardState => {
  const searchParams = Helper.getSearchParams();

  const pageValue = Number(searchParams.get("page"));
  const page =
    Number.isFinite(pageValue) && pageValue > 0 ? pageValue : DEFAULT_PAGE;

  const search = searchParams.get("search") ?? "";

  const genreName = searchParams.get("genres") ?? genres[0].name;
  const genre = genres.find((item) => item.name === genreName) ?? genres[0];

  return { page, search, genre };
};

export const useDashboardBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const opts = useMemo(() => GENRES, []);
  const initialState = useMemo(() => getInitialState(opts), [opts]);

  const [numPage, setNumPage] = useState(initialState.page);
  const [searchBookName, setSearchBookName] = useState(initialState.search);
  const [chooseGenre, setChooseGenre] = useState(initialState.genre);

  const isSearchMode = searchBookName.trim().length > 0;

  useEffect(() => {
    if (isSearchMode) {
      dispatch(
        apiSearchBookName({
          searchBookName,
          numPage,
        })
      );
      return;
    }

    const req: BookListQueryGenre = {
      genres: chooseGenre.name === opts[0].name ? "" : chooseGenre.name,
      page: String(numPage),
    };
    dispatch(apiGetBooksList(req));
  }, [chooseGenre.name, dispatch, isSearchMode, numPage, opts, searchBookName]);

  const handleChangePage = (page: number) => {
    setNumPage(page);

    const urlWithNumberPage = Helper.toUrlParamNumPage(page);
    navigate(urlWithNumberPage);
  };

  const handleSearchBookName = (value: string) => {
    const nextValue = value.trim();
    if (!nextValue) return;

    setSearchBookName(nextValue);
    setNumPage(DEFAULT_PAGE);
    navigate(
      `/book-store-assignment/?search=${Helper.transferSearchBookNameData(nextValue)}`
    );
  };

  const handleRemoveInputSearchValue = () => {
    setSearchBookName("");
    setNumPage(DEFAULT_PAGE);
    const urlNext = Helper.toBookListPage({
      genres: chooseGenre.name === opts[0].name ? "" : chooseGenre.name,
      page: String(DEFAULT_PAGE),
    });
    navigate(urlNext);
  };

  const handleChooseGenreChange = (genre: Genre) => {
    setChooseGenre(genre);
    setNumPage(DEFAULT_PAGE);

    const urlNext = Helper.toBookListPage({
      genres: genre.name === opts[0].name ? "" : genre.name,
      page: String(DEFAULT_PAGE),
    });
    navigate(urlNext);
  };

  return {
    opts,
    numPage,
    searchBookName,
    isSearchBookName: isSearchMode,
    chooseGenre,
    handleChangePage,
    handleSearchBookName,
    handleRemoveInputSearchValue,
    handleChooseGenreChange,
  };
};
