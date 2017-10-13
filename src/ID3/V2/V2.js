"use strict";
/**
 * Contains functions for reading ID3v2-tags of audiofiles.
 * @namespace V2 
 * @memberOf ID3
 */
ID3.V2 = {

    /**
     * Parses the ID3v2-tag of an audiofile.
     * @param {DataView} DataView The view on the data of the audiofile to parse.
     * @param {Boolean} [SkipEmptyFrames=false] Determines whether frames with empty data will be excluded from the ID3Tag.
     * @returns {ID3.Tag} An ID3Tag containing the information of the specified audiofile.
     */
    Parse: function (DataView, SkipEmptyFrames) {

        SkipEmptyFrames = (typeof SkipEmptyFrames !== "undefined") ? SkipEmptyFrames : false;

        let iMajorVersion = DataView.getUint8(3);
        let iRevision = DataView.getUint8(4);
        let iFlags = DataView.getUint8(5);
        let bUnsynchronisation = iFlags & 1;
        let bExtendedHeader = iFlags & 2;
        let bExperimental = iFlags & 4;
        let iSize = DataView.getUint32(6);
        let aoFrames = [];

        //Loop through the audiofile and parse dataframes.
        for (let iOffset = 10; iOffset < iSize; ) {

            //Check if the end of frames has been reached.
            if (DataView.getUint32(iOffset) === 0x00) {
                break;
            }

            //Get frame ID.
            let sFrameID = "";
            for (let i = 0; i < 4; i++) {
                sFrameID = sFrameID.concat(String.fromCharCode(DataView.getUint8(iOffset++)));
            }

            //Get framesize.
            let iFrameSize = DataView.getUint32(iOffset);
            iOffset += 4;

            //Get framheader-flags.
            let iStatusFlags = DataView.getUint8(iOffset++);
            let iEncodingFlags = DataView.getUint8(iOffset++);

            //Get frame.
            let fnFrameType = null;
            switch (true) {
                case sFrameID === "APIC": //Attached picture frame.
                    fnFrameType = ID3.V2.PictureFrame;
                    break;
                case sFrameID[0] === "T": //Text frame.
                    fnFrameType = ID3.V2.TextFrame;
                    break;
                case sFrameID === "PRIV": //Private frame.
                    fnFrameType = ID3.V2.PrivateFrame;
                    break;
                case sFrameID[0] === "W": //URL frame.
                    fnFrameType = ID3.V2.URLFrame;
                    break;
                case sFrameID === "COMM": //Comment frame.
                    fnFrameType = ID3.V2.CommentFrame;
                    break;
                default:
                    //Skip unknown frame.
                    iOffset += iFrameSize;
                    continue;
            }

            //Create frame.
            let oFrame = new fnFrameType(
                    sFrameID,
                    iStatusFlags,
                    iEncodingFlags,
                    new Uint8Array(DataView.buffer, iOffset, iFrameSize)
                    );

            //Increase offset to next frame.
            iOffset += iFrameSize;

            //Check if empty frames should get skipped and if the frame has no data.
            if (SkipEmptyFrames && (oFrame.Data.length || oFrame.Data.size) === 0) {
                continue;
            }

            //Append frame.
            aoFrames.push(oFrame);
        }

        return new ID3.Tag(
                `2.${iMajorVersion}.${iRevision}`,
                {
                    Unsynchronisation: bUnsynchronisation,
                    ExtendedHeader: bExtendedHeader,
                    Experimental: bExperimental
                },
                aoFrames);
    }
};