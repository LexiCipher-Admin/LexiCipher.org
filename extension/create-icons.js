// Simple script to create placeholder PNG icons for Chrome extension
// Run with: node create-icons.js

const fs = require('fs');
const path = require('path');

// Simple PNG file generator (creates solid colored squares)
function createMinimalPNG(width, height, r, g, b) {
    // PNG signature
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR chunk
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData[8] = 8; // bit depth
    ihdrData[9] = 2; // color type (RGB)
    ihdrData[10] = 0; // compression
    ihdrData[11] = 0; // filter
    ihdrData[12] = 0; // interlace
    const ihdrChunk = createChunk('IHDR', ihdrData);

    // IDAT chunk (image data - uncompressed for simplicity)
    // Create raw image data with filter byte per row
    const rawData = [];
    for (let y = 0; y < height; y++) {
        rawData.push(0); // filter byte (none)
        for (let x = 0; x < width; x++) {
            rawData.push(r, g, b);
        }
    }

    // Use zlib to compress
    const zlib = require('zlib');
    const compressed = zlib.deflateSync(Buffer.from(rawData));
    const idatChunk = createChunk('IDAT', compressed);

    // IEND chunk
    const iendChunk = createChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);

    const typeBuffer = Buffer.from(type);
    const crcInput = Buffer.concat([typeBuffer, data]);
    const crc = crc32(crcInput);

    const crcBuffer = Buffer.alloc(4);
    crcBuffer.writeUInt32BE(crc, 0);

    return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 implementation for PNG
function crc32(buffer) {
    let crc = 0xffffffff;
    const table = getCRC32Table();

    for (let i = 0; i < buffer.length; i++) {
        crc = table[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
    }

    return (crc ^ 0xffffffff) >>> 0;
}

let crc32Table = null;
function getCRC32Table() {
    if (crc32Table) return crc32Table;

    crc32Table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        }
        crc32Table[i] = c;
    }
    return crc32Table;
}

// Create icons directory if needed
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// Generate icons with Lexisolve brand colors (dark blue: #1e3a5f)
const r = 0x1e, g = 0x3a, b = 0x5f;

const sizes = [16, 48, 128];
sizes.forEach(size => {
    const png = createMinimalPNG(size, size, r, g, b);
    const filename = path.join(iconsDir, `icon${size}.png`);
    fs.writeFileSync(filename, png);
    console.log(`Created ${filename}`);
});

console.log('Done! PNG icons created.');