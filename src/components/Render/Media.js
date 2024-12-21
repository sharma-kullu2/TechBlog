import React from 'react';
import { Card, CardMedia, Box } from '@mui/material';

// Helper function to determine the media type
const getMediaType = (url) => {
  const videoPlatforms = [
    { name: 'YouTube', regex: /youtube\.com|youtu\.be/, embedUrl: url => url.replace('/watch?v=', '/embed/') },
    { name: 'Vimeo', regex: /vimeo\.com/, embedUrl: url => `https://player.vimeo.com/video/${url.split('/').pop()}` },
    { name: 'Dailymotion', regex: /dailymotion\.com|dai\.ly/, embedUrl: url => url.replace('/video/', '/embed/video/') },
  ];

  for (let platform of videoPlatforms) {
    if (platform.regex.test(url)) {
      return { type: 'embed', embedUrl: platform.embedUrl(url) };
    }
  }

  const videoExtensions = ['mp4', 'webm', 'ogg'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  const extension = url.split('.').pop().toLowerCase();

  if (videoExtensions.includes(extension)) {
    return { type: 'video', src: url };
  }

  if (imageExtensions.includes(extension)) {
    return { type: 'image', src: url };
  }

  return { type: 'unknown' };
};

// Component to render media based on type
const MediaRenderer = ({ mediaUrl }) => {
  const mediaType = getMediaType(mediaUrl);

  if (mediaType.type === 'embed') {
    //console.log("mediaType.embedUrl :",mediaType.embedUrl);
    return (
      <Card>
        <Box
          sx={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
          }}
        >
            <iframe 
                width="560" 
                height="315" 
                src={mediaType.embedUrl}
                title="Online Video Player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
            </iframe>
        </Box>
      </Card>
    );
  } else if (mediaType.type === 'video') {
    return (
      <CardMedia
        component="video"
        src={mediaType.src}
        controls
        sx={{ width: '100%', height: 'auto' }}
      />
    );
  } else if (mediaType.type === 'image') {
    return (
      <CardMedia
        component="img"
        image={mediaType.src}
        alt="Media content"
        sx={{ width: '100%', height: 'auto' }}
      />
    );
  } else {
    return <p>Unsupported media type</p>;
  }
};

// Example Usage
export default function Media(props) {
  const mediaUrl = props.url; // Example URL
  console.log('URL-> ',mediaUrl);

  return (
    <Box sx={{ boxShadow: '1',maxWidth: 600, margin: '0 auto' }}>
      <MediaRenderer mediaUrl={mediaUrl} />
    </Box>
  );
}
