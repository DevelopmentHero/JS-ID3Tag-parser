"use strict";
/**
 * @class Represents a text-based dataframe of ID3v2.x-Tags.
 * @see http://id3.org/id3v2.3.0#Text_information_frames
 * @property {String} ID Gets or sets the ID of the PrivateFrame.
 * @property {Number} StatusFlags Gets or sets the statusflags of the PrivateFrame.
 * @property {Number} EncodingFlags Gets or sets the encodingflags of the PrivateFrame.
 * @property {String} Data Gets the data of the PrivateFrame.
 * @property {String} OwnerIdentifier Gets the owneridentifier of the data of the PrivateFrame.
 * @memberOf ID3.V2
 * @augments ID3.V2.Frame
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
ID3.V2.PrivateFrame = class PrivateFrame extends ID3.V2.Frame {

    /**
     * Initializes a new instance of the PrivateFrame class.
     * @param {String} [ID=""] The ID of the PrivateFrame.
     * @param {Number} [StatusFlags=0] The statusflags of the PrivateFrame.
     * @param {Number} [EncodingFlags=0] The encodingflags of the PrivateFrame.
     * @param {Uint8Array} Data The data of the PrivateFrame.
     * @returns {PrivateFrame}
     */
    constructor(ID, StatusFlags, EncodingFlags, Data) {

        super(ID, StatusFlags, EncodingFlags);

        /**
         * The TextDecoder of the PrivateFrame.
         * @type TextDecoder
         * @ignore
         */
        let _oDecoder = null;
        /**
         * The index of the termination null-byte of the owner identifier of the PrivateFrame.
         * @type Number
         * @ignore
         */
        let _iOwnerIndex = null;

        _oDecoder = new TextDecoder(ID3.V2.Frame.Encoding.LATIN1);

        //Get the index of the null-byte termination of the mimetype.
        _iOwnerIndex = Data.indexOf(0x00);

        //Parse owneridentifier.
        this.OwnerIdentifier = _oDecoder.decode(Data.slice(0, _iOwnerIndex));

        //Decode bytesequence.
        this.Data = _oDecoder.decode(Data.slice(_iOwnerIndex + 1));
    }

};