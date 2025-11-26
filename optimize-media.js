/**
 * Media Optimization Script
 * Optimizes images and videos for web performance
 * 
 * Requirements:
 * - npm install sharp (for images)
 * - FFmpeg installed on system (for videos)
 * 
 * Usage: node optimize-media.js
 */

const sharp = require('sharp');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  images: {
    input: 'src/assets',
    output: 'src/assets',
    formats: ['webp', 'png'],
    quality: {
      webp: 85,
      png: 85,
      jpg: 85
    }
  },
  videos: {
    input: 'public/videos',
    output: 'public/videos',
    formats: ['mp4', 'webm'],
    resolutions: [
      { name: 'hd', width: 1280 },
      { name: 'sd', width: 960 }
    ]
  }
};

// Check if FFmpeg is installed
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ FFmpeg not found. Please install FFmpeg first.');
    console.log('   Download from: https://ffmpeg.org/download.html');
    return false;
  }
}

// Optimize a single image
async function optimizeImage(inputPath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  const outputDir = config.images.output;

  console.log(`\n📸 Optimizing ${filename}...`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const originalSize = fs.statSync(inputPath).size;

    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB (${metadata.width}x${metadata.height})`);

    // Create WebP version
    const webpPath = path.join(outputDir, `${basename}.webp`);
    await image
      .webp({ quality: config.images.quality.webp, effort: 6 })
      .toFile(webpPath);
    
    const webpSize = fs.statSync(webpPath).size;
    console.log(`   ✅ WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / originalSize) * 100).toFixed(1)}% smaller)`);

    // Optimize original format
    if (ext === '.png') {
      const optimizedPath = path.join(outputDir, `${basename}-optimized.png`);
      await image
        .png({ quality: config.images.quality.png, compressionLevel: 9 })
        .toFile(optimizedPath);
      
      const optimizedSize = fs.statSync(optimizedPath).size;
      console.log(`   ✅ PNG: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize / originalSize) * 100).toFixed(1)}% smaller)`);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      const optimizedPath = path.join(outputDir, `${basename}-optimized.jpg`);
      await image
        .jpeg({ quality: config.images.quality.jpg, progressive: true })
        .toFile(optimizedPath);
      
      const optimizedSize = fs.statSync(optimizedPath).size;
      console.log(`   ✅ JPG: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize / originalSize) * 100).toFixed(1)}% smaller)`);
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

// Optimize all images in directory
async function optimizeImages() {
  console.log('\n🎨 === IMAGE OPTIMIZATION ===\n');

  const inputDir = config.images.input;
  
  if (!fs.existsSync(inputDir)) {
    console.log(`⚠️  Directory not found: ${inputDir}`);
    return;
  }

  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to optimize`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    await optimizeImage(inputPath, file);
  }
}

// Optimize a single video
function optimizeVideo(inputPath, filename) {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  const outputDir = config.videos.output;
  const originalSize = fs.statSync(inputPath).size;

  console.log(`\n🎬 Optimizing ${filename}...`);
  console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

  try {
    // Create optimized MP4 (HD)
    const mp4Path = path.join(outputDir, `${basename}-optimized.mp4`);
    console.log('   Creating optimized MP4...');
    execSync(
      `ffmpeg -i "${inputPath}" -c:v libx264 -crf 28 -preset slow -vf "scale=1280:-2" -movflags +faststart -an "${mp4Path}" -y`,
      { stdio: 'ignore' }
    );
    const mp4Size = fs.statSync(mp4Path).size;
    console.log(`   ✅ MP4 (HD): ${(mp4Size / 1024 / 1024).toFixed(2)} MB (${((1 - mp4Size / originalSize) * 100).toFixed(1)}% smaller)`);

    // Create WebM version
    const webmPath = path.join(outputDir, `${basename}.webm`);
    console.log('   Creating WebM version...');
    execSync(
      `ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -crf 35 -b:v 0 -vf "scale=1280:-2" -an "${webmPath}" -y`,
      { stdio: 'ignore' }
    );
    const webmSize = fs.statSync(webmPath).size;
    console.log(`   ✅ WebM: ${(webmSize / 1024 / 1024).toFixed(2)} MB (${((1 - webmSize / originalSize) * 100).toFixed(1)}% smaller)`);

    // Create poster image
    const posterPath = path.join(outputDir.replace('videos', 'images'), `${basename}-poster.jpg`);
    const posterDir = path.dirname(posterPath);
    if (!fs.existsSync(posterDir)) {
      fs.mkdirSync(posterDir, { recursive: true });
    }
    
    console.log('   Creating poster image...');
    execSync(
      `ffmpeg -i "${inputPath}" -ss 00:00:00 -vframes 1 -vf "scale=1280:-2" -q:v 5 "${posterPath}" -y`,
      { stdio: 'ignore' }
    );
    const posterSize = fs.statSync(posterPath).size;
    console.log(`   ✅ Poster: ${(posterSize / 1024).toFixed(2)} KB`);

    // Create WebP poster
    const posterWebPPath = posterPath.replace('.jpg', '.webp');
    execSync(
      `ffmpeg -i "${posterPath}" -quality 80 "${posterWebPPath}" -y`,
      { stdio: 'ignore' }
    );
    const posterWebPSize = fs.statSync(posterWebPPath).size;
    console.log(`   ✅ Poster WebP: ${(posterWebPSize / 1024).toFixed(2)} KB`);

    return true;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

// Optimize all videos in directory
function optimizeVideos() {
  console.log('\n🎬 === VIDEO OPTIMIZATION ===\n');

  const inputDir = config.videos.input;
  
  if (!fs.existsSync(inputDir)) {
    console.log(`⚠️  Directory not found: ${inputDir}`);
    return;
  }

  const files = fs.readdirSync(inputDir);
  const videoFiles = files.filter(f => /\.(mp4|mov|avi)$/i.test(f) && !f.includes('optimized'));

  if (videoFiles.length === 0) {
    console.log('No videos found to optimize.');
    return;
  }

  console.log(`Found ${videoFiles.length} video(s) to optimize`);

  for (const file of videoFiles) {
    const inputPath = path.join(inputDir, file);
    optimizeVideo(inputPath, file);
  }
}

// Main execution
async function main() {
  console.log('🚀 === MEDIA OPTIMIZATION TOOL ===\n');
  console.log('This will optimize images and videos for web performance.\n');

  // Check dependencies
  console.log('Checking dependencies...');
  
  let hasSharp = false;
  try {
    require.resolve('sharp');
    hasSharp = true;
    console.log('✅ Sharp installed');
  } catch (e) {
    console.log('❌ Sharp not installed');
    console.log('   Install with: npm install sharp');
  }

  const hasFFmpeg = checkFFmpeg();
  if (hasFFmpeg) {
    console.log('✅ FFmpeg installed');
  }

  if (!hasSharp && !hasFFmpeg) {
    console.log('\n❌ Missing required dependencies. Please install them first.');
    process.exit(1);
  }

  console.log('\n' + '='.repeat(50));

  // Optimize images
  if (hasSharp) {
    await optimizeImages();
  }

  // Optimize videos
  if (hasFFmpeg) {
    optimizeVideos();
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n✅ Optimization complete!\n');
  console.log('Next steps:');
  console.log('1. Review optimized files');
  console.log('2. Replace original files if satisfied');
  console.log('3. Update code to use new formats (WebP, WebM)');
  console.log('4. Test on different devices and networks\n');
}

// Run the script
main().catch(console.error);
