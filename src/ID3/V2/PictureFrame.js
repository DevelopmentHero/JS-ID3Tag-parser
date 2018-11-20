"use strict";
/**
 * @class Represents an image-containing dataframe of ID3v2.x-Tags.
 * @see http://id3.org/id3v2.3.0#Attached_picture
 * @property {String} ID Gets or sets the ID of the PictureFrame.
 * @property {Number} StatusFlags Gets or sets the statusflags of the PictureFrame.
 * @property {Number} EncodingFlags Gets or sets the encodingflags of the PictureFrame.
 * @property {Blob} Data Gets the data of the PictureFrame.
 * @property {String} Encoding Gets the encoding of the data of the PictureFrame.
 * @property {String} MimeType Gets the MIMEType of the data of the PictureFrame.
 * @property {Number} ImageType Gets the type of the image of the PictureFrame.
 * @property {String} Description Gets the description-text of the PictureFrame.
 * @memberOf ID3.V2
 * @augments ID3.V2.Frame
 * @author Kerry Holz <developmenthero@gmail.com>.
 * @version 1.0.0.
 */
ID3.V2.PictureFrame = class PictureFrame extends ID3.V2.Frame {

    /**
     * Initializes a new instance of the PictureFrame class.
     * @param {String} [ID=""] The ID of the PictureFrame.
     * @param {Number} [StatusFlags=0] The statusflags of the PictureFrame.
     * @param {Number} [EncodingFlags=0] The encodingflags of the PictureFrame.
     * @param {Uint8Array} Data The data of the PictureFrame.
     */
    constructor(ID, StatusFlags, EncodingFlags, Data) {

        super(ID, StatusFlags, EncodingFlags);

        /**
         * The textdecoder of the PictureFrame.
         * @type TextDecoder
         * @ignore
         */
        let _oDecoder = null;
        /**
         * The mimeindex of the PictureFrame.
         * @type Number
         * @ignore
         */
        let _iMimeIndex = null;
        /**
         * The descriptionindex of the PictureFrame.
         * @type Number
         * @ignore
         */
        let _iDescriptionIndex = null;

        //Get encoding.
        this.Encoding = (Data[0] === 0x00)
                ? ID3.V2.Frame.Encoding.LATIN1
                : ID3.V2.Frame.Encoding.UTF16;

        //Create decoder according the encoding.
        _oDecoder = new TextDecoder(this.Encoding);

        //Get the index of the null-byte termination of the mimetype.
        _iMimeIndex = Data.indexOf(0x00, 1);

        //Get the mimetype.
        this.MimeType = _oDecoder.decode(Data.slice(1, _iMimeIndex));

        //Get the image type.
        this.ImageType = Data[_iMimeIndex + 1];

        //Get the index of the null-byte termination of the description.
        _iDescriptionIndex = Data.indexOf(0x00, _iMimeIndex + 2);

        //Get the description.
        this.Description = _oDecoder.decode(Data.slice(_iMimeIndex + 2, _iDescriptionIndex));

        //Fetch a blob of the remaining data.(the image).
        this.Data = new Blob([Data.slice(_iDescriptionIndex + 1)], {type: this.MimeType});
    }
};