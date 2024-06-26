import axios, { AxiosResponse } from "axios";
import { setLoading } from "@/redux/slices/loadingSlice"; // Import action setLoading từ slice của Redux
import * as Helper from "@/libs/helper";
import store from "@/redux/store"; // Import store Redux
import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import { Subjects } from "@/models/Subject";
import { SearchBookResults } from "@/models/SearchBookResults";
import { SearchAuthorResults } from "@/models/SearchAuthorResults";
import { BookDetail } from "@/models/BookDetail";
import { SearchBookNameReq } from "@/models/SearchBookNameReq";

const API = {
  apiInstance: axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      "Content-Type": "application/json",
    },
  }),

  API_PATH: {
    APP: {
      LOGIN: "/example/login",
      BOOKS: {
        SUBJECT: "/subjects",
        SEARCH_BOOK_NAME:
          "/search.json?title=$title&fields=key,title,author_name,cover_i,first_publish_year&page=$page&limit=12",
        SEARCH_AUTHOR_NAME:
          "/search.json?q=$author_name&fields=author_name&page=1&limit=6",
        BOOK_DETAIL: "/works",
        ENDPOINT: ".json",
      },
    },
  },
  app: {
    login: (): Promise<AxiosResponse<void>> => {
      return API.apiInstance.post(API.API_PATH.APP.LOGIN);
    },
    getListBook(data: BookListQueryGenre): Promise<AxiosResponse<Subjects>> {
      const url = Helper.generateBookListUrl(data);
      return API.apiInstance.get(url);
    },
    searchBookName(
      searchBookNameReq: SearchBookNameReq
    ): Promise<AxiosResponse<SearchBookResults>> {
      const url = Helper.searchBookNameUrl(
        searchBookNameReq.searchBookName,
        searchBookNameReq.numPage
      );
      return API.apiInstance.get(url);
    },
    searchAuthorName(
      authorName: string
    ): Promise<AxiosResponse<SearchAuthorResults>> {
      const url = Helper.searchAuthorNameUrl(authorName);
      return API.apiInstance.get(url);
    },
    getBookItemDetail(bookWorkId: string): Promise<AxiosResponse<BookDetail>> {
      const url = Helper.getBookItemDetailUrl(bookWorkId);
      return API.apiInstance.get(url);
    },
  },
};

API.apiInstance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

API.apiInstance.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.dispatch(setLoading(false));
    }, 500);
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export default API;
