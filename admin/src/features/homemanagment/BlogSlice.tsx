import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from 'src/constants/axiosInstance';

/* ================= TYPES ================= */

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface BlogState {
  loading: boolean;
  error: string | null;
  blogs: Blog[];
}

interface UpdateBlogPayload {
  id: number | string;
  data: FormData;
}

/* ================= INITIAL STATE ================= */

const initialState: BlogState = {
  loading: false,
  error: null,
  blogs: [],
};

/* ================= THUNKS ================= */

// CREATE BLOG
export const createBlog = createAsyncThunk<Blog, FormData, { rejectValue: string }>(
  'blog/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/blog/create', data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Blog creation failed');
    }
  },
);

// GET BLOGS
export const getBlogs = createAsyncThunk<Blog[], void, { rejectValue: string }>(
  'blog/find',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/blog/find');
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  },
);

// DELETE BLOG
export const deleteBlog = createAsyncThunk<any, number | string, { rejectValue: string }>(
  'blog/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/blog/delete/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Blog delete failed');
    }
  },
);

// UPDATE BLOG
export const updateBlog = createAsyncThunk<Blog, UpdateBlogPayload, { rejectValue: string }>(
  'blog/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/blog/update/${id}`, data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(error.response?.data?.message || 'Blog update failed');
    }
  },
);

/* ================= SLICE ================= */

const BlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.blogs.unshift(action.payload);
      })

      .addCase(getBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.blogs = action.payload;
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.blogs = state.blogs.filter((item) => item.id !== deletedId);
      })

      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        const index = state.blogs.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      });
  },
});

export default BlogSlice.reducer;
