type ImageSize =
  | 'cover_small'
  | 'cover_big'
  | 'screenshot_med'
  | 'screenshot_big'
  | 'screenshot_huge'
  | 'thumb'
  | 'micro'
  | '720p'
  | '1080p'
  | 'logo_med';

export function buildImageLink(imageId: string, imageSize: ImageSize, fileExtension = 'png') {
  return `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imageId}.${fileExtension}`;
}
