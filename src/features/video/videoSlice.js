import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const getChannelImage = async (channelID) => {
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
        searched: false
    },
    reducers: {
        setVideos: (state, action) => {
            state.videos.length = 0;
            state.videos = action.payload
        },
        setChannelImageOnVideo: (state, action) => {
            const { video, channelImage } = action.payload;
            const updatedVideos = state.videos.map((item) => {
                if (item.id.videoId && item.id.videoId === video.id.videoId) {
                    return { ...item, channelImage };
                }else if(item.id === video.id){
                    return {...item, channelImage}
                }
                return item;
            })
            state.videos = updatedVideos;

        },
        setSearched: (state, action) => {
            state.searched = action.payload
        }
    },
});

export const { setVideos, setChannelImageOnVideo, setSearched} = videoSlice.actions;
export default videoSlice.reducer;
