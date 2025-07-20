import { create } from "zustand";

interface FileData {
  file: any;
  uri: string;
  name: string;
  type: string;
  size: number;
}
interface FolderData {
  name: string;
}

export interface StoredFile extends FileData {
  id: string;
  folderName: string;
  uploadedAt: string;
}
export interface StoredFolder extends FolderData {
  id: string;
}

interface FileState {
  selectedFile: StoredFile | null;
  files: StoredFile[];
  folders: StoredFolder[];
  currentFolder: string;
  uploadProgress: Record<string, number>;
  isUploading: boolean;
}

interface FileActions {
  setSelectedFile: (fileData: FileData) => void;
  clearSelectedFile: () => void;
  updateSelectedFile: (updates: Partial<StoredFile>) => void;
  addFile: (fileData: FileData) => StoredFile;
  addFolder: (folderData: FolderData) => StoredFolder;
  addMultipleFiles: (filesData: FileData[]) => StoredFile[];
  removeFile: (fileId: string) => void;
  removeFileByUri: (uri: string) => void;
  updateFile: (fileId: string, updates: Partial<StoredFile>) => void;
  clearAllFiles: () => void;
  setCurrentFolder: (folderName: string) => void;
  moveFileToFolder: (fileId: string, folderName: string) => void;
  moveSelectedFileToFolder: (folderName: string) => void;
  setUploadProgress: (fileId: string, progress: number) => void;
  setIsUploading: (isUploading: boolean) => void;
  clearUploadProgress: (fileId: string) => void;
  getFilesByFolder: (folderName?: string) => StoredFile[];
  getFileById: (fileId: string) => StoredFile | undefined;
  getFileByUri: (uri: string) => StoredFile | undefined;
  getTotalFiles: () => number;
  getTotalSize: () => number;
  getFilesByType: (type: string) => StoredFile[];
  getFolders: () => string[];
  getImages: () => StoredFile[];
  getVideos: () => StoredFile[];
  getDocuments: () => StoredFile[];
  searchFiles: (query: string) => StoredFile[];
  isValidFile: (fileData: any) => boolean;
  exportFiles: () => { files: StoredFile[]; exportedAt: string };
  importFiles: (importData: any) => boolean;
}

type FileStore = FileState & FileActions;

const createFile = (
  file: File,
  uri: string,
  name: string,
  type: string,
  size: number,
  folderName = ""
) => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  file,
  uri,
  name,
  type,
  size,
  folderName,
  uploadedAt: new Date().toISOString(),
});
const createFolder = (name: string) => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  name,
});

const useFileStore = create<FileStore>()((set, get) => ({
  selectedFile: null,
  files: [],
  folders: [],
  currentFolder: "",
  uploadProgress: {},
  isUploading: false,

  // Actions for selected file
  setSelectedFile: (fileData) => {
    const { file, uri, name, type, size } = fileData;
    const selectedFile = createFile(
      file,
      uri,
      name,
      type,
      size,
      get().currentFolder
    );
    set({ selectedFile: selectedFile });
  },

  clearSelectedFile: () => set({ selectedFile: null }),

  updateSelectedFile: (updates) => {
    const currentFile = get().selectedFile;
    if (currentFile) {
      set({
        selectedFile: { ...currentFile, ...updates },
      });
    }
  },

  addFile: (fileData) => {
    const { file, uri, name, type, size } = fileData;
    const newFile = createFile(
      file,
      uri,
      name,
      type,
      size,
      get().currentFolder
    );
    set((state) => ({
      files: [...state.files, newFile],
      selectedFile: newFile,
    }));
    return newFile;
  },
  addFolder: (folderData) => {
    const { name } = folderData;
    const newFolder = createFolder(name);
    set((state) => ({
      folders: [...state.folders, newFolder],
    }));
    return newFolder;
  },

  addMultipleFiles: (filesData) => {
    const newFiles = filesData.map((fileData) => {
      const { file, uri, name, type, size } = fileData;
      return createFile(file, uri, name, type, size, get().currentFolder);
    });

    set((state) => ({
      files: [...state.files, ...newFiles],
      selectedFile: newFiles[0] || state.selectedFile,
    }));
    return newFiles;
  },

  removeFile: (fileId) => {
    set((state) => ({
      files: state.files.filter((file) => file.id !== fileId),
      selectedFile:
        state.selectedFile?.id === fileId ? null : state.selectedFile,
    }));
  },

  removeFileByUri: (uri) => {
    set((state) => ({
      files: state.files.filter((file) => file.uri !== uri),
      selectedFile: state.selectedFile?.uri === uri ? null : state.selectedFile,
    }));
  },

  updateFile: (fileId, updates) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === fileId ? { ...file, ...updates } : file
      ),
      selectedFile:
        state.selectedFile?.id === fileId
          ? { ...state.selectedFile, ...updates }
          : state.selectedFile,
    }));
  },

  clearAllFiles: () =>
    set({
      files: [],
      selectedFile: null,
      uploadProgress: {},
    }),

  // Folder management
  setCurrentFolder: (folderName) => set({ currentFolder: folderName }),

  moveFileToFolder: (fileId, folderName) => {
    const updates = { folderName };
    get().updateFile(fileId, updates);
  },

  moveSelectedFileToFolder: (folderName) => {
    get().updateSelectedFile({ folderName });
    get().setCurrentFolder(folderName);
  },

  // Upload progress tracking
  setUploadProgress: (fileId, progress) => {
    set((state) => ({
      uploadProgress: {
        ...state.uploadProgress,
        [fileId]: progress,
      },
    }));
  },

  setIsUploading: (isUploading) => set({ isUploading }),

  clearUploadProgress: (fileId) => {
    set((state) => {
      const newProgress = { ...state.uploadProgress };
      delete newProgress[fileId];
      return { uploadProgress: newProgress };
    });
  },

  // Computed values / getters
  getFilesByFolder: (folderName = "") => {
    return get().files.filter((file) => file.folderName === folderName);
  },

  getFileById: (fileId) => {
    return get().files.find((file) => file.id === fileId);
  },

  getFileByUri: (uri) => {
    return get().files.find((file) => file.uri === uri);
  },

  getTotalFiles: () => get().files.length,

  getTotalSize: () => {
    return get().files.reduce((total, file) => total + (file.size || 0), 0);
  },

  getFilesByType: (type) => {
    return get().files.filter((file) => file.type.includes(type));
  },

  getFolders: () => {
    const folders = new Set(
      get()
        .files.map((file) => file.folderName)
        .filter(Boolean)
    );
    return Array.from(folders);
  },

  // File type helpers
  getImages: () => get().getFilesByType("image"),
  getVideos: () => get().getFilesByType("video"),
  getDocuments: () =>
    get().files.filter(
      (file) =>
        file.type.includes("pdf") ||
        file.type.includes("doc") ||
        file.type.includes("txt")
    ),

  // Search functionality
  searchFiles: (query) => {
    const lowerQuery = query.toLowerCase();
    return get().files.filter(
      (file) =>
        file.name.toLowerCase().includes(lowerQuery) ||
        file.folderName.toLowerCase().includes(lowerQuery)
    );
  },

  // Validation
  isValidFile: (fileData) => {
    return (
      fileData &&
      typeof fileData.uri === "string" &&
      typeof fileData.name === "string" &&
      typeof fileData.type === "string" &&
      typeof fileData.size === "number"
    );
  },

  // Export/Import functionality
  exportFiles: () => {
    return {
      files: get().files,
      exportedAt: new Date().toISOString(),
    };
  },

  importFiles: (importData) => {
    if (importData && Array.isArray(importData.files)) {
      set({ files: importData.files });
      return true;
    }
    return false;
  },
}));

export default useFileStore;
