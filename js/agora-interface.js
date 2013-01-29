/**
 * An N-ary tree that maps the file system through folders and files.
 *
 * @class FileSystemItem
 * @constructor
 */
function FileSystemItem() {
	/**
	 * The file or folder name.
	 *
	 * @property name
	 * @type String
	 * @default ""
	 */
	this.name = "";

	/**
	 * Indicating if the contents represent a folder
	 *
	 * @property isFolder
	 * @type Boolean
	 * @default false
	 */
	this.isFolder = false;

	/**
	 * The contents of the file or folder.  If isFolder
	 * is set, it contains other FileSystemItems representing
	 * the files/folders inside this folder.  If isMetadata
	 * is set, the contents are irrelevant.  Otherwise, it
	 * contains a bit stream of the file contents.
	 *
	 * @property contents
	 * @type Array
	 * @default null
	 */
	this.contents = null;

	/**
	 * The timestamp is an integer representation of when the
	 * file was last modified.
	 *
	 * @property timestamp
	 * @type Integer
	 * @default 0
	 */
	this.timestamp = 0;

	/**
	 * Indicates if this file was deleted.
	 *
	 * @property isDeleted
	 * @type Boolean
	 * @default false
	 */
	this.isDeleted = false;

	/**
	 * Indicates if this is just a metadata object or if
	 * it actually contains information.
	 *
	 * @property isMetadata
	 * @type Boolean
	 * @default false
	 */
	this.isMetadata = false;
}
