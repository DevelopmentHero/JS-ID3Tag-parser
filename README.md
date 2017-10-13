# JavaScript ID3Tag parser
A lightweight ID3Tag parser written entirely in vanilla JavaScript
capable of parsing ID3v1 and ID3v2.x tags.

## Usage:
```JavaScript

let Tag = ID3.Parse(ArrayBuffer, SkipEmptyFrames, Version);

```

## Currently supported types of ID3v2Tag frames:
* [Pictureframe](http://id3.org/id3v2.3.0#Attached_picture)
* [Commentframe](http://id3.org/id3v2.3.0#Comments)
* [Text- and Privateframe](http://id3.org/id3v2.3.0#Text_information_frames)
* [URLframe](http://id3.org/id3v2.3.0#URL_link_frames)

Note: This version currently does not support unsynchronisation!