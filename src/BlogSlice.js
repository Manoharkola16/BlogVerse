import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://robo-1-qqhu.onrender.com";

/* -----------------------------------------------
   ✅ GET ALL BLOGS 
------------------------------------------------ */
export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (_, { getState, rejectWithValue }) => { 
    try {
      const token = getState().user.token;
      console.log(_)

      const { data } = await axios.get(`${BASE_URL}/api/articles`, {
        headers: {
          Authorization: `Bearer ${_}`,
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch blogs");
    }
  }
);

/* -----------------------------------------------
   ✅ CREATE BLOG 
------------------------------------------------ */
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async ({ title, content }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;

      const { data } = await axios.post(
        `${BASE_URL}/api/articles`,
        { title, content },
        {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create blog");
    }
  }
);

/* -----------------------------------------------
   👍 LIKE / UNLIKE BLOG
------------------------------------------------ */
export const toggleLike = createAsyncThunk(
  "blogs/toggleLike",
  async (articleId, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;

      const { data } = await axios.put(
        `${BASE_URL}/api/articles/${articleId}/like`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to like article");
    }
  }
);

/* -----------------------------------------------
   💬 ADD COMMENT
------------------------------------------------ */
export const addComment = createAsyncThunk(
  "blogs/addComment",
  async ({ articleId, comment }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;

      const { data } = await axios.post(
        `${BASE_URL}/api/articles/${articleId}/comment`,
        { content: comment },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add comment");
    }
  }
);

/* -----------------------------------------------
   SLICE
------------------------------------------------ */
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* GET ALL BLOGS */
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE BLOG */
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })

      /* LIKE BLOG */
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updated = action.payload;
        state.blogs = state.blogs.map((b) =>
          b._id === updated._id ? updated : b
        );
      })

      /* ADD COMMENT */
      .addCase(addComment.fulfilled, (state, action) => {
        const updated = action.payload;
        state.blogs = state.blogs.map((b) =>
          b._id === updated._id ? updated : b
        );
      });
  },
});

export default blogSlice.reducer;
