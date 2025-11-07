// Client-side type (after JSON serialization)
export interface BlobImage {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  contentType?: string;
  contentDisposition?: string;
}
