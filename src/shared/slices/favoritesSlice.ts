import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define local RootState type to avoid circular dependency
interface RootStateType {
  favorites: FavoritesState;
  auth: {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  };
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: string[];
}

interface FavoritesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

// Async thunks for loading favorites from localStorage
export const loadFavorites = createAsyncThunk('favorites/load', async () => {
  const favoritesString = localStorage.getItem('favorites');
  if (favoritesString) {
    try {
      return JSON.parse(favoritesString) as Movie[];
    } catch (e) {
      localStorage.removeItem('favorites');
    }
  }
  return [] as Movie[];
});

// Save favorites to localStorage
const saveFavoritesToStorage = (movies: Movie[]) => {
  localStorage.setItem('favorites', JSON.stringify(movies));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: [],
    loading: false,
    error: null
  } as FavoritesState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      // Check if movie already exists in favorites
      if (!state.movies.some(movie => movie.id === action.payload.id)) {
        state.movies.push(action.payload);
        saveFavoritesToStorage(state.movies);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
      saveFavoritesToStorage(state.movies);
    },
    clearFavorites: (state) => {
      state.movies = [];
      localStorage.removeItem('favorites');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load favorites';
      });
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state: RootStateType) => state.favorites.movies;
export const selectIsFavorite = (id: number) => (state: RootStateType) => 
  state.favorites.movies.some(movie => movie.id === id);

export default favoritesSlice.reducer;