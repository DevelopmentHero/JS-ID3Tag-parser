"use strict";
/**
 * Contains functions for reading ID3v1-tags of audiofiles.
 * @namespace V1 
 * @memberOf ID3
 */
ID3.V1 = {

    /**
     * Parses the ID3v1-tag of an audiofile.
     * @param {DataView} DataView The view on the data of the audiofile to parse.
     * @param {Boolean} [SkipEmptyFrames=false] Determines whether frames with empty data will be excluded from the ID3Tag.
     * @returns {ID3.Tag} An ID3Tag containing the information of the specified audiofile.
     */
    Parse: function (DataView, SkipEmptyFrames = false) {

        const OffsetTag = DataView.byteLength - 128;
        const OffsetTitle = OffsetTag + 3;
        const OffsetAuthor = OffsetTag + 33;
        const OffsetAlbum = OffsetTag + 63;
        const OffsetReleaseYear = OffsetTag + 93;
        const OffsetComment = OffsetTag + 97;
        const OffsetGenre = OffsetTag + 127;

        let oDecoder = new TextDecoder(ID3.V2.Frame.Encoding.LATIN1);
        let iCommentlength = 30;
        let aoFrames = [];
        let FilterNullBytes = Value => Value !== 0x00;

        //Get title.
        aoFrames.push(new ID3.V1.Frame("TIT2", oDecoder.decode(new Uint8Array(DataView.buffer, OffsetTitle, 30).filter(FilterNullBytes))));

        //Get author.
        aoFrames.push(new ID3.V1.Frame("TPE1", oDecoder.decode(new Uint8Array(DataView.buffer, OffsetAuthor, 30).filter(FilterNullBytes))));

        //Get album.
        aoFrames.push(new ID3.V1.Frame("TALB", oDecoder.decode(new Uint8Array(DataView.buffer, OffsetAlbum, 30).filter(FilterNullBytes))));

        //Get year of release.
        aoFrames.push(new ID3.V1.Frame("TYER", oDecoder.decode(new Uint8Array(DataView.buffer, OffsetReleaseYear, 4).filter(FilterNullBytes))));

        //Check if a tracknumber exists (ID3v1.1).
        if (DataView.getUint8(OffsetComment + 29) === 0x00) {
            aoFrames.push(new ID3.V1.Frame("TRCK", DataView.getUint8(OffsetComment + 30)));
            iCommentlength = 28;
        }

        //Get comment.
        aoFrames.push(new ID3.V1.Frame("COMM", oDecoder.decode(new Uint8Array(DataView.buffer, OffsetComment, iCommentlength).filter(FilterNullBytes))));

        //Check if empty frames should get skipped.
        if (SkipEmptyFrames) {
            aoFrames = aoFrames.filter(Frame => {
                if (typeof Frame.Data === "String" && Frame.Data.length === 0) {
                    return false;
                }
                return true;
            });
        }

        //Get genre.
        aoFrames.push(new ID3.V1.Frame("TCON", this.Genres[DataView.getUint8(OffsetGenre)]));

        return new ID3.Tag(`1.${iCommentlength < 30 ? "1" : "0"}.0`, {}, aoFrames);
    },
    /**
     * Enumeration of all possible music-genres of the ID3v1-specification.
     * @see https://de.wikipedia.org/wiki/Liste_der_ID3v1-Genres
     * @readonly
     * @enum {String}
     */
    Genres: [
        "Blues",
        "Classic Rock",
        "Country",
        "Dance",
        "Disco",
        "Funk",
        "Grunge",
        "Hip-Hop",
        "Jazz",
        "Metal",
        "New Age",
        "Oldies",
        "Other",
        "Pop",
        "Rhythm and Blues",
        "Rap",
        "Reggae",
        "Rock",
        "Techno",
        "Industrial",

        "Alternative",
        "Ska",
        "Death Metal",
        "Pranks",
        "Soundtrack",
        "Euro-Techno",
        "Ambient",
        "Trip-Hop",
        "Vocal",
        "Jazz & Funk",
        "Fusion",
        "Trance",
        "Classical",
        "Instrumental",
        "Acid",
        "House",
        "Game",
        "Sound Clip",
        "Gospel",
        "Noise",

        "Alternative Rock",
        "Bass",
        "Soul",
        "Punk",
        "Space",
        "Meditative",
        "Instrumental Pop",
        "Instrumental Rock",
        "Ethnic",
        "Gothic",
        "Darkwave",
        "Techno-Industrial",
        "Electronic",
        "Pop-Folk",
        "Eurodance",
        "Dream",
        "Southern Rock",
        "Comedy",
        "Cult",
        "Gangsta",

        "Top 40",
        "Christian Rap",
        "Pop/Funk",
        "Jungle",
        "Native US",
        "Cabaret",
        "New Wave",
        "Psychedelic",
        "Rave",
        "Showtunes",
        "Trailer",
        "Lo-Fi",
        "Tribal",
        "Acid Punk",
        "Acid Jazz",
        "Polka",
        "Retro",
        "Musical",
        "Rock ’n’ Roll",
        "Hard Rock"
    ]
};