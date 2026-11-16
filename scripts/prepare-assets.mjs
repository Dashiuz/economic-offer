import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCE_IMAGES_DIR = path.join(ROOT, 'context-source', 'presentation_images');
const SOURCE_XLSX = path.join(ROOT, 'context-source', 'cotizacion_definitiva.xlsx');
const OUT_DIR = path.join(ROOT, 'public', 'images');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Minimal ZIP reader using Central Directory (no external dependencies).
 */
function readZipEntries(buffer) {
  let eocdOffset = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 65557); i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) throw new Error('Invalid ZIP: EOCD not found');

  const cdOffset = buffer.readUInt32LE(eocdOffset + 16);
  const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
  const entries = new Map();

  let ptr = cdOffset;
  for (let n = 0; n < totalEntries; n++) {
    if (buffer.readUInt32LE(ptr) !== 0x02014b50) break;
    const compressionMethod = buffer.readUInt16LE(ptr + 10);
    const compressedSize = buffer.readUInt32LE(ptr + 20);
    const fileNameLen = buffer.readUInt16LE(ptr + 28);
    const extraLen = buffer.readUInt16LE(ptr + 30);
    const commentLen = buffer.readUInt16LE(ptr + 32);
    const localHeaderOffset = buffer.readUInt32LE(ptr + 42);
    const name = buffer.subarray(ptr + 46, ptr + 46 + fileNameLen).toString('utf8');
    ptr += 46 + fileNameLen + extraLen + commentLen;

    const lhFileNameLen = buffer.readUInt16LE(localHeaderOffset + 26);
    const lhExtraLen = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + lhFileNameLen + lhExtraLen;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);

    let content;
    if (compressionMethod === 0) {
      content = compressed;
    } else if (compressionMethod === 8) {
      content = zlib.inflateRawSync(compressed);
    } else {
      continue;
    }
    entries.set(name, content);
  }
  return entries;
}

async function processSlideCrop(srcName, outRelPath, extractRect, maxWidth, quality = 82) {
  const srcPath = path.join(SOURCE_IMAGES_DIR, srcName);
  const outPath = path.join(OUT_DIR, outRelPath);
  ensureDir(path.dirname(outPath));

  let pipeline = sharp(srcPath);
  if (extractRect) {
    pipeline = pipeline.extract(extractRect);
  }
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await pipeline.webp({ quality, effort: 5 }).toFile(outPath);
  const stat = fs.statSync(outPath);
  return { outRelPath, kb: (stat.size / 1024).toFixed(1) };
}

async function main() {
  ensureDir(OUT_DIR);
  const results = [];

  // 1. Hero & Architectural Blueprint
  results.push(await processSlideCrop('2.png', 'hero-domus-facade.webp', null, 1800, 82));
  results.push(await processSlideCrop('3.png', 'blueprint-sotano.webp', null, 1600, 84));

  // 2. Before & After clean photo crops (trimming baked-in badges/borders)
  results.push(
    await processSlideCrop(
      '14.png',
      'before-after/fermax-before.webp',
      { left: 114, top: 492, width: 1670, height: 1170 },
      1100,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '14.png',
      'before-after/fermax-after.webp',
      { left: 2120, top: 492, width: 1058, height: 1170 },
      1000,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '15.png',
      'before-after/domicilios-before.webp',
      { left: 164, top: 342, width: 1628, height: 1226 },
      1200,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '15.png',
      'before-after/domicilios-after.webp',
      { left: 1806, top: 342, width: 1790, height: 1226 },
      1200,
      82
    )
  );

  // 3. Zone & Showcase clean photo crops
  results.push(
    await processSlideCrop(
      '4.png',
      'zones/porteria-entrada.webp',
      { left: 0, top: 0, width: 2545, height: 2054 },
      1200,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '5.png',
      'zones/porteria-salida.webp',
      { left: 32, top: 32, width: 1236, height: 1956 },
      1000,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '6.png',
      'zones/ascensores-lobby.webp',
      { left: 84, top: 1152, width: 1860, height: 854 },
      1200,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '7.png',
      'zones/ascensores-pasillo.webp',
      { left: 0, top: 0, width: 2180, height: 2054 },
      1200,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '8.png',
      'zones/parqueaderos-puerta-1.webp',
      { left: 60, top: 96, width: 1212, height: 1174 },
      900,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '8.png',
      'zones/parqueaderos-puerta-2.webp',
      { left: 1296, top: 96, width: 738, height: 1174 },
      800,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '9.png',
      'zones/sotano-puerta.webp',
      { left: 836, top: 0, width: 1924, height: 2054 },
      1200,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '10.png',
      'zones/vehicular-piso1.webp',
      { left: 224, top: 290, width: 818, height: 1008 },
      900,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '10.png',
      'zones/vehicular-sotano.webp',
      { left: 1720, top: 290, width: 1492, height: 1044 },
      1100,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '11.png',
      'zones/sotano-ascensores.webp',
      { left: 80, top: 48, width: 3440, height: 1320 },
      1400,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '12.png',
      'zones/salida-vehicular-sotano.webp',
      { left: 0, top: 206, width: 2460, height: 1506 },
      1200,
      82
    )
  );
  results.push(
    await processSlideCrop(
      '13.png',
      'zones/pedestal-modernizado.webp',
      { left: 110, top: 0, width: 1660, height: 2054 },
      1000,
      82
    )
  );

  // 4. Extract logo & product thumbnails from cotizacion_definitiva.xlsx
  const zipBuf = fs.readFileSync(SOURCE_XLSX);
  const entries = readZipEntries(zipBuf);

  const logoBuf = entries.get('xl/media/image8.png');
  if (logoBuf) {
    const logoOut = path.join(OUT_DIR, 'brand', 'ingexpertos-logo.webp');
    ensureDir(path.dirname(logoOut));
    await sharp(logoBuf)
      .resize({ width: 520, withoutEnlargement: true })
      .webp({ quality: 88, alphaQuality: 100 })
      .toFile(logoOut);
    results.push({
      outRelPath: 'brand/ingexpertos-logo.webp',
      kb: (fs.statSync(logoOut).size / 1024).toFixed(1),
    });
  }

  // Unique media files mapped to rows 10..36 in cotizacion_definitiva.xlsx
  const mediaFiles = [
    ['utp-cat5e', 'xl/media/image25.png'],
    ['utp-cat6', 'xl/media/image22.png'],
    ['boton-emergencia', 'xl/media/image11.png'],
    ['electroiman-600', 'xl/media/image18.png'],
    ['cable-neopreno', 'xl/media/image23.png'],
    ['ups-3kva', 'xl/media/image19.png'],
    ['boton-notouch', 'xl/media/image9.png'],
    ['camara-colorvu', 'xl/media/image24.png'],
    ['camara-lpr', 'xl/media/image15.png'],
    ['hdd-6tb', 'xl/media/image14.png'],
    ['terminal-facial', 'xl/media/image10.jpg'],
    ['licencia-hikcentral', 'xl/media/image5.png'],
    ['nvr-16ch', 'xl/media/image4.png'],
    ['protector-facial', 'xl/media/image6.png'],
    ['caja-paso', 'xl/media/image12.png'],
    ['mano-obra', 'xl/media/image20.png'],
    ['tuberia-emt', 'xl/media/image1.jpg'],
    ['tarjeta-esclusa', 'xl/media/image21.png'],
    ['brazo-hidraulico', 'xl/media/image17.png'],
    ['switch-poe', 'xl/media/image13.png'],
    ['monitor-32', 'xl/media/image3.png'],
    ['contacto-magnetico', 'xl/media/image2.jpg'],
    ['cable-duplex', 'xl/media/image16.png'],
    ['portatil-dell', 'xl/media/image7.png'],
  ];

  for (const [slug, zipPath] of mediaFiles) {
    const imgBuf = entries.get(zipPath);
    if (!imgBuf) continue;
    const outRel = `products/${slug}.webp`;
    const outPath = path.join(OUT_DIR, outRel);
    ensureDir(path.dirname(outPath));
    await sharp(imgBuf)
      .resize({ width: 280, height: 280, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 82, alphaQuality: 90 })
      .toFile(outPath);
    results.push({
      outRelPath: outRel,
      kb: (fs.statSync(outPath).size / 1024).toFixed(1),
    });
  }

  let totalKb = 0;
  for (const r of results) {
    totalKb += parseFloat(r.kb);
    console.log(`${r.outRelPath}: ${r.kb} KB`);
  }
  console.log(`\nTotal assets generated: ${results.length}, Total size: ${(totalKb / 1024).toFixed(2)} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
