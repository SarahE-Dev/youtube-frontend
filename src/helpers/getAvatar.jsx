import axios from "axios";

export default async function getChannelAvatar(channelID){
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'snippet',
                id: channelID,
                key: import.meta.env.VITE_YOUTUBE_API_KEY
            }
        });
        return response.data.items[0].snippet.thumbnails.default.url;
    } catch (error) {
        console.log(error);
    }
}