import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import ApiRequest from '../../api/ApiRequest';
import ApiRoutes from '../../config/ApiRoutes';

export interface NewsState {
  news: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

// 🔁 Async Thunk to fetch all news
export const fetchNews = createAsyncThunk(
  'news/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllNews,
        method: 'GET',
      });
      return response?.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNews: state => {
      state.news = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearNews} = newsSlice.actions;
export default newsSlice.reducer;
