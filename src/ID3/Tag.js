"use strict";
/**
 * 
 * @class Represents the information of an ID3-Tag of an audiofile.
 * @property {String} Version Gets or sets the version of the Tag.
 * @property {Object} Flags Gets or sets the flags of the Tag.
 * @property {Array<ID3.IFrame>} Frames Gets or sets the dataframes of the Tag.
 * @memberOf ID3
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
ID3.Tag = class Tag {

    /**
     * Initializes a new instance of the Tag class.
     * @param {String} [Version="0.0.0"] The version of the tag.
     * @param {Object} [Flags={}] The flags of the tag.
     * @param {Array<ID3.IFrame>} [Frames=[]] The dataframes of the tag.
     */
    constructor(Version = "0.0.0", Flags = {}, Frames = []) {


        this.Version = Version;
        this.Flags = Flags;
        this.Frames = Frames;
    }
};
