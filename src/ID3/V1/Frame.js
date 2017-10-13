"use strict";
/**
 * @class Represents dataframe of ID3v1.x-Tags acting like dataframes specified for the 2.x version.
 * @property {String} ID Gets or sets the ID of the frame.
 * @property {String} Data Gets or sets the data of the frame.
 * @implements ID3.IFrame
 * @memberOf ID3.V1
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
ID3.V1.Frame = class Frame extends ID3.IFrame {
    /**
     * Initializes a new instance of the Frame class.
     * @param {String} [ID=""] The ID of the frame.
     * @param {String} [Data=""] The data of the frame.
     */
    constructor(ID = "", Data = "") {
        
        super();
        
        this.ID = ID;
        this.Data = Data;
    }
};