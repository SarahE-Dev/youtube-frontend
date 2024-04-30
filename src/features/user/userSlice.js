import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
        state.user = action.payload;
        },
        logout: (state) => {
        state.user = null;
        },
        addFavorite: (state, action) => {
            state.user.favorites.push(action.payload)
        },
        removeFavorite: (state, action) => {
            state.user.favorites = state.user.favorites.filter(favorite => favorite.videoId !== action.payload)
        },
        addPlaylist: (state, action) => {
            state.user.playlists.push(action.payload)
        },
        removePlaylist: (state, action) => {
            state.user.playlists = state.user.playlists.filter(playlist => playlist !== action.payload)
        },
        addWatchLater: (state, action) => {
            state.user.watchLater.push(action.payload)
        },
        removeWatchLater: (state, action) => {
            state.user.watchLater = state.user.watchLater.filter(video => video !== action.payload)
        },
        addHistory: (state, action) => {
            state.user.history.push(action.payload)
        },
        removeHistory: (state, action) => {
            state.user.history = state.user.history.filter(video => video !== action.payload)
        },
        addVideoToPlaylist: (state, action) => {
            state.user.playlists[action.payload.playlistIndex].videos.push(action.payload.video)
        },
        removeVideoFromPlaylist: (state, action) => {
            state.user.playlists[action.payload.playlistIndex].videos = state.user.playlists[action.payload.playlistIndex].videos.filter(video => video !== action.payload.video)
        },
        addComment: (state, action) => {
            state.user.comments.push(action.payload)
        }

    },
    });

export const { login, logout, addHistory, addFavorite, addPlaylist, addVideoToPlaylist, addWatchLater, removeFavorite, removeHistory, removePlaylist, removeVideoFromPlaylist, removeWatchLater, addComment } = userSlice.actions;
export default userSlice.reducer;