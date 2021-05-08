import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: null,
    recommend: null,
    newDisney: null,
    original: null,
    trending: null,
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMovies: (state , action) => {
            state.recommend = action.payload.recommend;
            state.newDisney = action.payload.newDisney;
            state.original = action.payload.original;
            state.trending = action.payload.trending;
            state.movies = action.payload;
        },
    },
});

export const {setMovies} = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;
export const selectMovies = (state) => state.movie.movie; 

export default movieSlice.reducer;