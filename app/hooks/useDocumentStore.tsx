import { create } from "zustand";

interface FileData {
  // file: any;
  resource_type: string;
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
  currentFolder: { name: string; id: string };
  uploadProgress: Record<string, number>;
  isUploading: boolean;
  viewUrl: string;
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
  setCurrentFolder: ({ name, id }: { name: string; id: string }) => void;
  setViewUrl: (url: string) => void;
}

type FileStore = FileState & FileActions;

const createFile = (
  uri: string,
  name: string,
  type: string,
  size: number,
  resource_type: string,
  folderName = ""
) => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  uri,
  name,
  type,
  size,
  folderName,
  resource_type,
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
  currentFolder: { name: "", id: "" },
  uploadProgress: {},
  isUploading: false,
  viewUrl: "",

  // Actions for selected file
  setSelectedFile: (fileData) => {
    const { uri, name, type, size, resource_type } = fileData;
    const selectedFile = createFile(
      uri,
      name,
      type,
      size,
      resource_type,
      get().currentFolder.name
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
    const { uri, name, type, size } = fileData;
    const newFile = createFile(
      // file,
      uri,
      name,
      type,
      size,
      get().currentFolder.name
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
      const { uri, name, type, size } = fileData;
      return createFile(uri, name, type, size, get().currentFolder.name);
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
  setCurrentFolder: ({ name, id }) => set({ currentFolder: { name, id } }),
  setViewUrl: (url) => set({ viewUrl: url }),
}));

export default useFileStore;
