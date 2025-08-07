import * as FileSystem from "expo-file-system";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  resource_type: string;
  [key: string]: any;
}

interface UploadOptions {
  folder?: string;
  resourceType?: "image" | "raw" | "video" | "auto";
  publicId?: string;
}

class CloudinaryService {
  private cloudName: string;
  private apiKey: string;
  private uploadPreset: string;

  constructor() {
    this.cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
    this.apiKey = process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY;
    this.uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  }

  async uploadFile(
    fileUri: string,
    options: UploadOptions = {}
  ): Promise<CloudinaryResponse> {
    try {
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      // Determine resource type based on file extension
      const fileName = fileUri.split("/").pop() || "";
      const fileExtension = fileName.split(".").pop()?.toLowerCase();

      let resourceType = options.resourceType || "auto";
      if (!options.resourceType) {
        if (
          ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension || "")
        ) {
          resourceType = "image";
        } else if (fileExtension === "pdf") {
          resourceType = "raw";
        }
      }

      // Prepare form data
      const formData = new FormData();

      // Add file
      formData.append("file", {
        uri: fileUri,
        type: this.getMimeType(fileExtension || ""),
        name: fileName,
      } as any);

      // Add other parameters
      formData.append("upload_preset", this.uploadPreset);
      formData.append("resource_type", resourceType);

      if (options.folder) {
        formData.append("folder", options.folder);
      }

      if (options.publicId) {
        formData.append("public_id", options.publicId);
      }

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Upload failed: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  }

  private getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      pdf: "application/pdf",
    };
    return mimeTypes[extension] || "application/octet-stream";
  }
}

export default new CloudinaryService();
