export const returnVideObject = (video, id, channelImage) => {
    return {
        videoId: video.id.videoId ? video.id.videoId : video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnailUrl: video.snippet.thumbnails.medium.url,
        publishedAt: video.snippet.publishedAt,
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
        channelImage: channelImage,
        user: id
    }

}