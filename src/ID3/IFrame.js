"use strict";
/**
 * Interface for classes that represent a dataframe of an ID3Tag.
 * @interface
 * @memberOf ID3
 * @author Kerry Holz <k.holz@artforge.eu>.
 * @version 1.0.0.
 */
ID3.IFrame = class IFrame {
};
/**
 * Gets the ID of the IFrame.
 * @abstract
 * @type String
 */
ID3.IFrame.prototype.ID = "";
/**
 * Gets the data of the IFrame.
 * @abstract
 * @type String
 */
ID3.IFrame.prototype.Data = "";