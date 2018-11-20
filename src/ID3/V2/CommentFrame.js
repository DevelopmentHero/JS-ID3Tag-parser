"use strict";
/**
 * @class Represents a text-based commentary dataframe of ID3v2.x-Tags.
 * @see http://id3.org/id3v2.3.0#Comments
 * @property {String} ID Gets or sets the ID of the CommentFrame.
 * @property {Number} StatusFlags Gets or sets the statusflags of the CommentFrame.
 * @property {Number} EncodingFlags Gets or sets the encodingflags of the CommentFrame.
 * @property {String} Data Gets the data of the CommentFrame.
 * @property {String} Encoding Gets the encoding of the data of the CommentFrame.
 * @property {String} Language Gets the language of the data of the CommentFrame.
 * @property {String} ShortDescription Gets the shortdescription of the CommentFrame.
 * @memberOf ID3.V2
 * @augments ID3.V2.Frame
 * @author Kerry Holz <developmenthero@gmail.com>.
 * @version 1.0.0.
 */
ID3.V2.CommentFrame = class CommentFrame extends ID3.V2.Frame {

    /**
     * Initializes a new instance of the CommentFrame class.
     * @param {String} [ID=""] The ID of the CommentFrame.
     * @param {Number} [StatusFlags=0] The statusflags of the CommentFrame.
     * @param {Number} [EncodingFlags=0] The encodingflags of the CommentFrame.
     * @param {Uint8Array} Data The data of the CommentFrame.
     */
    constructor(ID, StatusFlags, EncodingFlags, Data) {

        super(ID, StatusFlags, EncodingFlags);

        /**
         * The textdecoder of the CommentFrame.
         * @type TextDecoder
         * @ignore
         */
        let _oDecoder = null;

        /**
         * The descriptionindex of the CommentFrame.
         * @type Number
         * @ignore
         */
        let _iDescriptionIndex = null;

        //Get encoding.
        this.Encoding = (Data[0] === 0x00)
                ? ID3.V2.Frame.Encoding.LATIN1
                : ID3.V2.Frame.Encoding.UTF16;
        _oDecoder = new TextDecoder(this.Encoding);

        //Parse language.
        this.Language = String.fromCharCode(Data[1]) + String.fromCharCode(Data[2]) + String.fromCharCode(Data[3]);

        //Parse shortdescription.
        _iDescriptionIndex = Data.indexOf(0x00, 4);
        this.ShortDescription = _oDecoder.decode(Data.slice(4, _iDescriptionIndex));

        //Check if the description is a 'null-terminated null-string'.
        if (this.ShortDescription === "" && Data[_iDescriptionIndex + 1] === 0x00) {
            ++_iDescriptionIndex;
        }

        //Parse comment.
        this.Data = _oDecoder.decode(Data.slice(_iDescriptionIndex + 1));
    }
};