import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getChannelImage = async (channelID) => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'snippet',
                id: channelID,
                key: import.meta.env.VITE_YOUTUBE_API_KEY,
            }
        });
        if (response.data.items.length > 0) {
            return response.data.items[0].snippet.thumbnails.default.url; 
          } else {
            return null; 
          } 
    } catch (error) {
        console.log('Error fetching channel image', error);
        return null;
    }
};

const videoSlice = createSlice({

    name: "videos",
    initialState: {
        videos: [],
    },
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        
    },
});

export const { setVideos} = videoSlice.actions;
export default videoSlice.reducer;