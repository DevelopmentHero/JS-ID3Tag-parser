"use strict";
/**
 * @class Represents a text-based dataframe containing URLs of ID3v2.x-Tags.
 * @see http://id3.org/id3v2.3.0#URL_link_frames
 * @property {String} ID Gets or sets the ID of the URLFrame.
 * @property {Number} StatusFlags Gets or sets the statusflags of the URLFrame.
 * @property {Number} EncodingFlags Gets or sets the encodingflags of the URLFrame.
 * @property {String} Data Gets the data of the URLFrame.
 * @memberOf ID3.V2
 * @augments ID3.V2.Frame
 * @author Kerry Holz <developmenthero@gmail.com>.
 * @version 1.0.0.
 */
ID3.V2.URLFrame = class URLFrame extends ID3.V2.Frame {

    /**
     * Initializes a new instance of the URLFrame class.
     * @param {String} [ID=""] The ID of the URLFrame.
     * @param {Number} [StatusFlags=0] The statusflags of the URLFrame.
     * @param {Number} [EncodingFlags=0] The encodingflags of the URLFrame.
     * @param {Uint8Array} Data The data of the URLFrame.
     */
    constructor(ID, StatusFlags, EncodingFlags, Data) {

        super(ID, StatusFlags, EncodingFlags);

        //Decode bytesequence until terminating null-byte.
        this.Data = new TextDecoder(ID3.V2.Frame.Encoding.LATIN1).decode(Data.slice(1, Data.indexOf(0x00)));
    }

};