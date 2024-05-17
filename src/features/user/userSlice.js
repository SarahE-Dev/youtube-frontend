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
            state.user.playlists = [...state.user.playlists, action.payload]
        },
        removePlaylist: (state, action) => {
            state.user.playlists = state.user.playlists.filter(playlist => playlist._id !== action.payload)
        },
        addWatchLater: (state, action) => {
            state.user.watchLater.push(action.payload)
        },
        removeWatchLater: (state, action) => {
            state.user.watchLater = state.user.watchLater.filter(video => video !== action.payload)
        },
        addHistory: (state, action) => {
            state.user.history = [...state.user.history.filter(video => video.videoId !== action.payload.videoId), action.payload]
        },
        removeHistory: (state, action) => {
            state.user.history = state.user.history.filter(video => video !== action.payload)
        },
        addVideoToPlaylist: (state, action) => {
            const {playlistId, video} = action.payload
            const playlistIndex = state.user.playlists.findIndex(playlist => playlist._id === playlistId)
            const playlist = {...state.user.playlists[playlistIndex], videos: [...state.user.playlists[playlistIndex].videos, video]}
            
            state.user.playlists = [...state.user.playlists.slice(0, playlistIndex), playlist, ...state.user.playlists.slice(playlistIndex + 1)]


        },
        removeVideoFromPlaylist: (state, action) => {
            const {playlistId, videoId}= action.payload
            const playlistIndex = state.user.playlists.findIndex(playlist => playlist._id === playlistId)
            const updatedPlaylist = {
                ...state.user.playlists[playlistIndex],
                videos: state.user.playlists[playlistIndex].videos.filter(video => video.videoId !== videoId)
            }
            state.user.playlists = [...state.user.playlists.slice(0, playlistIndex), updatedPlaylist, ...state.user.playlists.slice(playlistIndex + 1)]
        },
        addComment: (state, action) => {
            state.user.comments.push(action.payload)
        },
        clearHistory: (state) => {
            state.user.history = []
        },

    },
    });

export const { login, logout, addHistory, addFavorite, addPlaylist, addVideoToPlaylist, addWatchLater, removeFavorite, removeHistory, removePlaylist, removeVideoFromPlaylist, removeWatchLater, addComment, clearHistory } = userSlice.actions;
export default userSlice.reducer;