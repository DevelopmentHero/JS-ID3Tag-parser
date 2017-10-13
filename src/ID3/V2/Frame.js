"use strict";
/**
 * @class Represents a baseclass for dataframes of ID3v2.x-Tags.
 * @see http://id3.org/id3v2.3.0#ID3v2_frame_overview
 * @property {String} ID Gets or sets the ID of the Frame.
 * @property {Number} StatusFlags Gets or sets the statusflags of the Frame. @see http://id3.org/id3v2.3.0#Frame_header_flags
 * @property {Number} EncodingFlags Gets or sets the encodingflags of the Frame. @see http://id3.org/id3v2.3.0#Frame_header_flags
 * @property {Boolean} TagAlterPreservation Gets a value indicating whether the Frame should be preserved if the ID3tag is being altered.
 * @property {Boolean} FileAlterPreservation Gets a value indicating whether the Frame should be preserved if the file which contains the ID3tag is being altered.
 * @property {Boolean} ReadOnly Gets a value indicating whether the contents of the Frame is intended to be read only.
 * @property {Boolean} Compression Gets a value indicating whether the Frame is compressed.
 * @property {Boolean} Encryption Gets a value indicating whether the Frame is encrypted.
 * @property {Boolean} GroupingIdentity Gets a value indicating whether the frame belongs in a group with other frames.
 * @implements ID3.IFrame
 * @memberOf ID3.V2
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
ID3.V2.Frame = class Frame extends ID3.IFrame {

    /**
     * Gets a value indicating whether the frame should be preserved if the ID3tag is being altered.
     * @returns {Boolean}
     */
    get TagAlterPreservation() {
        return this.StatusFlags & 1;
    }

    /**
     * Gets a value indicating whether the frame should be preserved if the file which contains the ID3tag is being altered.
     * @returns {Boolean}
     */
    get FileAlterPreservation() {
        return this.StatusFlags & 2;
    }

    /**
     * Gets a value indicating whether the contents of the frame is intended to be read only.
     * @returns {Boolean}
     */
    get ReadOnly() {
        return this.StatusFlags & 4;
    }

    /**
     * Gets a value indicating whether the frame is compressed.
     * @returns {Boolean}
     */
    get Compression() {
        return this.EncodingFlags & 1;
    }

    /**
     * Gets a value indicating whether the frame is encrypted.
     * @returns {Boolean}
     */
    get Encryption() {
        return this.EncodingFlags & 2;
    }

    /**
     * Gets a value indicating whether the frame belongs in a group with other frames.
     * @returns {Boolean}
     */
    get GroupingIdentity() {
        return this.EncodingFlags & 4;
    }

    /**
     * Initializes a new instance of the Frame class.
     * @param {String} [ID=""] The ID of the Frame.
     * @param {Number} [StatusFlags=0] The statusflags of the Frame.
     * @param {Number} [EncodingFlags=0] The encodingflags of the Frame.
     * @param {Uint8Array} Data The data of the Frame.
     */
    constructor(ID = "", StatusFlags = 0x00, EncodingFlags = 0x00, Data) {
        
        super();
        
        this.ID = ID;
        this.Data = Data;
        this.StatusFlags = StatusFlags;
        this.EncodingFlags = EncodingFlags;
    }

};

/**
 * Enumeration of possible encodings of textual-content of ID3v2.x-frames.
 * @readonly
 * @enum {String}
 */
ID3.V2.Frame.Encoding = {
    /**
     * UTF-8 encoding.
     * @type String
     */
    UTF8: "utf-8",
    /**
     * UTF-16 encoding.
     * @type String
     */
    UTF16: "utf-16",
    /**
     * Latin-1/ISO 8859-1 encoding.
     * @type String
     */
    LATIN1: "windows-1252"
};