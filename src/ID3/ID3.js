"use strict";
/**
 * Contains functions for reading ID3-tags of audiofiles.
 * @namespace ID3 
 */
let ID3 = {
    /**
     * Parses the ID3-tag of an audiofile.
     * @param {ArrayBuffer} Buffer The buffer of the data of the audiofile to parse.
     * @param {Boolean} [SkipEmptyFrames=false] Determines whether frames with empty data will be excluded from the ID3Tag.
     * @param {Number} [Version=2] The ID3 version to use.
     * @returns {ID3.Tag} An ID3Tag containing the information of the specified audiofile.
     */
    Parse: function (Buffer, SkipEmptyFrames = false, Version = 2) {

        if (!(Buffer instanceof ArrayBuffer)) {
            throw new TypeError("Argument for parameter 'Buffer' must be an instance of ArrayBuffer.");
        }

        let oView = new DataView(Buffer);

        switch (true) {
            //ID3v1.
            case Version <= 1 && ID3.ContainsTag(oView, 1):
                return ID3.V1.Parse(oView, SkipEmptyFrames);
                //ID3v2.
            case Version >= 2 && ID3.ContainsTag(oView, 2):
                return ID3.V2.Parse(oView, SkipEmptyFrames);
                //Empty tag.
            default:
                return new ID3.Tag();
    }
    },
    /**
     * Enumeration of default dataframes which are commonly used in audioplayers.
     * @readonly
     * @enum {String}
     */
    Frames: {
        APIC: "Attached picture",
        TIT2: "Title",
        TPE1: "Author",
        TALB: "Album",
        TYER: "Year of release",
        COMM: "Comment",
        TCON: "Genre",
        TCOM: "Componist",
        TRCK: "Tracknumber"
    },
    /**
     * Checks a file for the existance of an ID3 version-specific Tag-identifier.
     * @param {DataView} View A dataview of the file to check.
     * @param {Number} Version The ID3 version to check for.
     * @returns {Boolean} True if the specified file contains a valid Tag-identifier; otherwise, false.
     */
    ContainsTag: function (View, Version) {
        switch (Version) {
            case 1:
                //Check if the first 3 bytes at the end of the file, subtracting tag-size (128byte) contains the word 'TAG'.
                return (View.getUint8(View.byteLength - 128) === 84 && View.getUint8(View.byteLength - 127) === 65 && View.getUint8(View.byteLength - 126) === 71);
            case 2:
                //Check if the first 3 bytes contain the word 'ID3'.
                return (View.getUint8(0) === 73 && View.getUint8(1) === 68 && View.getUint8(2) === 51);
            default:
                return false;
        }
    }
};