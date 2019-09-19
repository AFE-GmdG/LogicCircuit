//#region Types for File/Directory Drag&Drop
export type FileSystemEntry = DirectoryEntry | FileEntry;

export type DirectoryEntry = {
	isFile: false;
	isDirectory: true;
	name: string;
	fullPath: string;
	filesystem: DOMFileSystem;
	createReader(): FileSystemDirectoryReader;
	getDirectory(): void;
	getFile(): void;
};

export type FileEntry = {
	isFile: true;
	isDirectory: false;
	name: string;
	fullPath: string;
	file(successCallback: (file: File) => void, errorCallback?: (error: FileError) => void): void;
};

export type DOMFileSystem = {
	readonly name: string;
	readonly root: DirectoryEntry;
};

export type FileSystemDirectoryReader = {
	readEntries(successCallback: (entries: FileSystemEntry[]) => void, errorCallback?: (error: FileError) => void): void;
	getDirectory(path: string, options: FileSystemFlags, successCallback: () => void, errorCallback?: (error: FileError) => void): void;
	getFile(path: string, options: FileSystemFlags, successCallback: () => void, errorCallback?: (error: FileError) => void): void;
};

export type FileSystemFlags = {
	create?: boolean;
	exclusive?: boolean;
};

export type FileError = {
	code: NOT_FOUND_ERR | SECURITY_ERR | NOT_READABLE_ERR | ENCODING_ERR | NO_MODIFICATION_ALLOWED_ERR | INVALID_STATE_ERR | INVALID_MODIFICATION_ERR | QUOTA_EXCEEDED_ERR | TYPE_MISMATCH_ERR | PATH_EXISTS_ERR;
};

export type NOT_FOUND_ERR = 1;
export type SECURITY_ERR = 2;
export type NOT_READABLE_ERR = 4;
export type ENCODING_ERR = 5;
export type NO_MODIFICATION_ALLOWED_ERR = 6;
export type INVALID_STATE_ERR = 7;
export type INVALID_MODIFICATION_ERR = 9;
export type QUOTA_EXCEEDED_ERR = 10;
export type TYPE_MISMATCH_ERR = 11;
export type PATH_EXISTS_ERR = 12;
//#endregion

//#region Helper Methods for File/Directory Drag&Drop

//#endregion
