import API from "@/libs/api";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import { BookDetail } from "@/models/BookDetail";
import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import { SearchBookNameReq } from "@/models/SearchBookNameReq";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BooksState {
  bookList: Book[];
  totalBooks: number;
  bookNotFound: boolean;
  authorDetail: Author;
  bookDetail: BookDetail;
  error: string | null;
}

const initialBookDetail: BookDetail = {
  description: {
    type: "",
    value: "",
  },
  title: "",
  covers: [],
  subject_places: [],
  subjects: [],
  subject_people: [],
  key: "",
  latest_revision: 0,
  revision: 0,
  created: {
    type: "",
    value: "",
  },
};

const initialAuthorDetail: Author = {
  key: "",
  name: "",
};

const initialState: BooksState = {
  bookList: [],
  totalBooks: 0,
  bookNotFound: false,
  authorDetail: initialAuthorDetail,
  bookDetail: initialBookDetail,
  error: null,
};

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};

export const apiGetBooksList = createAsyncThunk(
  "books/apiGetBooksList",
  async (data: BookListQueryGenre, thunkAPI) => {
    try {
      const res = await API.app.getListBook(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toErrorMessage(error));
    }
  }
);

export const apiSearchBookName = createAsyncThunk(
  "books/apiSearchBookName",
  async (data: SearchBookNameReq, thunkAPI) => {
    try {
      const res = await API.app.searchBookName(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toErrorMessage(error));
    }
  }
);

export const apiSearchAuthorName = createAsyncThunk(
  "books/apiSearchAuthorName",
  async (data: string, thunkAPI) => {
    try {
      const res = await API.app.searchAuthorName(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toErrorMessage(error));
    }
  }
);

export const apiGetBookItemDetail = createAsyncThunk(
  "books/apiGetBookItemDetail",
  async (data: string, thunkAPI) => {
    try {
      const res = await API.app.getBookItemDetail(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toErrorMessage(error));
    }
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiGetBooksList.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload && action.payload.work_count > 0) {
          state.bookList = action.payload.works;
          state.totalBooks = action.payload.work_count;
          state.bookNotFound = false;
        } else {
          state.bookNotFound = true;
        }
      })
      .addCase(apiGetBooksList.rejected, (state, action) => {
        state.bookNotFound = true;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to load books";
      })
      .addCase(apiSearchBookName.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload && action.payload.numFound > 0) {
          state.bookList = action.payload.docs;
          state.totalBooks = action.payload.numFound;
          state.bookNotFound = false;
        } else {
          state.bookNotFound = true;
        }
      })
      .addCase(apiSearchBookName.rejected, (state, action) => {
        state.bookNotFound = true;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to search books";
      })
      .addCase(apiSearchAuthorName.fulfilled, (state, action) => {
        const authorDetailRes = action.payload.docs?.[0];
        state.authorDetail = authorDetailRes
          ? {
              key: authorDetailRes.author_key,
              name: authorDetailRes.author_name,
            }
          : initialAuthorDetail;
      })
      .addCase(apiSearchAuthorName.rejected, (state, action) => {
        state.authorDetail = initialAuthorDetail;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to load author";
      })
      .addCase(apiGetBookItemDetail.fulfilled, (state, action) => {
        state.error = null;
        state.bookDetail = action.payload;
      })
      .addCase(apiGetBookItemDetail.rejected, (state, action) => {
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to load book detail";
      });
  },
});

export default bookSlice.reducer;
