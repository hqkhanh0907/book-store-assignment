import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import API from "./api";
import { Book } from "@/models/Book";

export function generateBookListUrl(data: BookListQueryGenre): string {
  const transferPageToOffset = String((Number(data.page) - 1) * 12);
  const url = `${API.API_PATH.APP.BOOKS.SUBJECT}/${data.genres === "" ? "love" : data.genres}${API.API_PATH.APP.BOOKS.ENDPOINT}?offset=${transferPageToOffset}`;
  return url;
}

export function toBookListPage(data: BookListQueryGenre): string {
  const url = `/book-store-assignment/?genres=${data.genres}&page=${data.page}`;
  return url;
}

export const getBookListInput = (
  searchParams: URLSearchParams,
  bookListQuery: BookListQueryGenre
) => {
  if (searchParams.size > 0) {
    Object.keys(bookListQuery).forEach((element: string) => {
      const param = searchParams.get(element);
      if (searchParams.has(element) && !!param) {
        bookListQuery[element] = param;
      }
    });
  }
  return bookListQuery;
};
export const toUrlParamNumPage = (pageNum: number) => {
  const searchParams = new URLSearchParams(window.location.search);
  const baseUrl = window.location.origin;
  const url = window.location.href.replace(baseUrl, "");
  if (searchParams.size === 0) {
    return url + `?page=${pageNum}`;
  } else if (url.includes("page=")) {
    return url.replace(/(page=)\d+/, `$1${pageNum}`);
  } else {
    return url + `&page=${pageNum}`;
  }
};
export const getSearchParams = () => {
  return new URLSearchParams(window.location.search);
};
export function searchBookNameUrl(title: string, numPage: number) {
  const url = API.API_PATH.APP.BOOKS.SEARCH_BOOK_NAME.replace(
    "$title",
    transferSearchBookNameData(title)
  ).replace("$page", numPage.toString());
  return url;
}
export function searchAuthorNameUrl(authorName: string) {
  const url = API.API_PATH.APP.BOOKS.SEARCH_AUTHOR_NAME.replace(
    "$author_name",
    transferSearchBookNameData(authorName)
  );
  return url;
}
export function transferSearchBookNameData(data: string): string {
  return encodeURIComponent(data.trim());
}
export function transferSearchAuthorNameData(data: string): string {
  return encodeURIComponent(data.trim());
}
export function getBookId(data: string): string {
  return data.replace("/works/", "");
}
export function getBooksInPageNum(pageNum: number, books: Book[]) {
  const limit = 12;
  const start = (pageNum - 1) * limit;
  const end = pageNum * limit;
  return books.slice(start, end);
}

export function getBookItemDetailUrl(bookWorkId: string) {
  return `${API.API_PATH.APP.BOOKS.BOOK_DETAIL}/${bookWorkId}${API.API_PATH.APP.BOOKS.ENDPOINT}`;
}
export function gotoBookItemDetailPage(bookId: string, authorName: string) {
  return `/book-store-assignment/books/?key=${bookId}&author=${authorName}`;
}
