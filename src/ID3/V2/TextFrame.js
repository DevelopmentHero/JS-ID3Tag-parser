"use strict";
/**
 * @class Represents a text-based dataframe of ID3v2.x-Tags.
 * @see http://id3.org/id3v2.3.0#Text_information_frames
 * @property {String} ID Gets or sets the ID of the TextFrame.
 * @property {Number} StatusFlags Gets or sets the statusflags of the TextFrame.
 * @property {Number} EncodingFlags Gets or sets the encodingflags of the TextFrame.
 * @property {String} Data Gets the data of the TextFrame.
 * @property {String} Encoding Gets the encoding of the data of the TextFrame.
 * @memberOf ID3.V2
 * @augments ID3.V2.Frame
 * @author Kerry Holz <developmenthero@gmail.com>.
 * @version 1.0.0.
 */
ID3.V2.TextFrame = class TextFrame extends ID3.V2.Frame {

    /**
     * Initializes a new instance of the TextFrame class.
     * @param {String} [ID=""] The ID of the TextFrame.
     * @param {Number} [StatusFlags=0] The statusflags of the TextFrame.
     * @param {Number} [EncodingFlags=0] The encodingflags of the TextFrame.
     * @param {Uint8Array} Data The data of the TextFrame.
     */
    constructor(ID, StatusFlags, EncodingFlags, Data) {

        super(ID, StatusFlags, EncodingFlags);

        //Get encoding.
        this.Encoding = (Data[0] === 0x00)
                ? ID3.V2.Frame.Encoding.LATIN1
                : ID3.V2.Frame.Encoding.UTF16;

        //Decode bytesequence.
        this.Data = new TextDecoder(this.Encoding).decode(Data.slice(1));
    }

};