import React from 'react';
import styles from './GalleryMarquee.module.css';

// Re-implementing cn utility
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

// --- Media Items ---
// Copied from last time, you can edit this
const mediaItems = [
  { type: 'image', src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=400&h=300&fit=crop' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },

  { type: 'image', src: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=400&h=300&fit=crop' }, // Concert crowd lights
  { type: 'image', src: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=400&h=300&fit=crop' }, // Ballet dancer
  { type: 'image', src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop' }, // Neon sign theater
  
];

// Split items into 4 groups for the 4 tracks
const col1Items = mediaItems.slice(0, 24);
const row1Items = mediaItems.slice(0, 24);
const row2Items = mediaItems.slice(0, 24);
const col2Items = mediaItems.slice(0, 24);

// Helper component to render a media item
const MediaItem = ({ item }) => (
  <div className={styles.mediaItem}>
    {item.type === 'video' ? (
      <video
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        className={styles.mediaContent}
      />
    ) : (
      <img
        src={item.src}
        alt=""
        className={styles.mediaContent}
      />
    )}
  </div>
);

const GalleryMarquee = () => {
  return (
    <section id="gallery" className={styles.gallerySection}>
      <div className={styles.galleryContainer}>

        {/* --- Column 1 (Moves Up) --- */}
        <div className={cn(styles.marqueeTrack, styles.vertical, styles.moveUp)}>
          <div className={styles.trackContent}>
            {col1Items.map((item, index) => <MediaItem item={item} key={`c1-${index}`} />)}
            {col1Items.map((item, index) => <MediaItem item={item} key={`c1-dup-${index}`} />)}
          </div>
        </div>

        {/* --- Middle (Horizontal Rows) --- */}
        <div className={styles.horizontalContainer}>
          {/* Row 1 (Moves Left) */}
          <div className={cn(styles.marqueeTrack, styles.horizontal, styles.moveLeft)}>
            <div className={styles.trackContent}>
              {row1Items.map((item, index) => <MediaItem item={item} key={`r1-${index}`} />)}
              {row1Items.map((item, index) => <MediaItem item={item} key={`r1-dup-${index}`} />)}
            </div>
          </div>
          {/* Row 2 (Moves Right) */}
          <div className={cn(styles.marqueeTrack, styles.horizontal, styles.moveRight)}>
            <div className={styles.trackContent}>
              {row2Items.map((item, index) => <MediaItem item={item} key={`r2-${index}`} />)}
              {row2Items.map((item, index) => <MediaItem item={item} key={`r2-dup-${index}`} />)}
            </div>
          </div>
        </div>

        {/* --- Column 2 (Moves Down) --- */}
        <div className={cn(styles.marqueeTrack, styles.vertical, styles.moveDown)}>
          <div className={styles.trackContent}>
            {col2Items.map((item, index) => <MediaItem item={item} key={`c2-${index}`} />)}
            {col2Items.map((item, index) => <MediaItem item={item} key={`c2-dup-${index}`} />)}
          </div>
        </div>

      </div>
      <h2 className={styles.galleryTitle}>Gallery</h2>
    </section>
  );
};

export default GalleryMarquee;