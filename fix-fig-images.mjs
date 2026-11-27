import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const metadataDir = path.join(root, "src", "assets", "fig");
const sourceDir = path.resolve(process.argv[2] ?? "imagenes-originales");
const outputDir = path.join(root, "public", "images");

const extensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

/**
 * Lee el ancho y alto (en px) directamente de la cabecera de un PNG
 * sin necesidad de instalar librerías externas.
 */
async function getPngDimensions(filePath) {
  if (path.extname(filePath).toLowerCase() !== ".png") return null;
  const fh = await fs.open(filePath, "r");
  try {
    const buf = Buffer.alloc(24);
    const { bytesRead } = await fh.read(buf, 0, 24, 0);
    if (bytesRead < 24) return null;
    // Firma PNG: 89 50 4E 47
    if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
      return null;
    }
    return {
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
    };
  } finally {
    await fh.close();
  }
}

async function getImages(dir) {
  const result = [];

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...(await getImages(fullPath)));
    } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
      const stat = await fs.stat(fullPath);
      const dims = await getPngDimensions(fullPath);
      const buffer = await fs.readFile(fullPath);
      const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");

      result.push({
        path: fullPath,
        name: entry.name,
        size: stat.size,
        width: dims?.width ?? null,
        height: dims?.height ?? null,
        sha256,
        used: false,
      });
    }
  }

  return result;
}

async function main() {
  const jsonFiles = (await fs.readdir(metadataDir)).filter((file) =>
    file.endsWith(".json")
  );

  const images = await getImages(sourceDir);
  await fs.mkdir(outputDir, { recursive: true });

  // Mostrar estructura del primer JSON para depuración
  if (jsonFiles.length > 0) {
    const sample = JSON.parse(
      await fs.readFile(path.join(metadataDir, jsonFiles[0]), "utf8")
    );
    console.log("Claves detectadas en tus JSON:", Object.keys(sample), "\n");
  }

  let linked = 0;
  const reportRows = [];

  for (const file of jsonFiles) {
    const jsonPath = path.join(metadataDir, file);
    const metadata = JSON.parse(await fs.readFile(jsonPath, "utf8"));

    const expectedName = path.basename(
      metadata.original_filename ?? metadata.filename ?? file.replace(".json", ".png")
    );
    const expectedSize = Number(metadata.size ?? 0);
    const expectedW = Number(metadata.width ?? 0);
    const expectedH = Number(metadata.height ?? 0);

    const available = images.filter((img) => !img.used);
    let match = null;
    let method = "";

    // 1. Coincidencia por hash (si existe)
    if (metadata.sha256 || metadata.hash) {
      const targetHash = metadata.sha256 ?? metadata.hash;
      match = available.find((img) => img.sha256 === targetHash);
      if (match) method = "Hash exacto";
    }

    // 2. Coincidencia por tamaño exacto en bytes
    if (!match && expectedSize > 0) {
      const exactSizeMatches = available.filter((img) => img.size === expectedSize);
      if (exactSizeMatches.length === 1) {
        match = exactSizeMatches[0];
        method = "Bytes exactos";
      }
    }

    // 3. Coincidencia por dimensiones exactas (width x height) + peso más cercano
    if (!match && expectedW > 0 && expectedH > 0) {
      const dimMatches = available
        .filter((img) => img.width === expectedW && img.height === expectedH)
        .sort(
          (a, b) =>
            Math.abs(a.size - expectedSize) - Math.abs(b.size - expectedSize)
        );

      if (dimMatches.length > 0) {
        match = dimMatches[0];
        method = `Dimensiones (${expectedW}x${expectedH}) + peso cercano`;
      }
    }

    // 4. Último recurso: peso más cercano (si hay expectedSize)
    if (!match && expectedSize > 0 && available.length > 0) {
      const byClosestSize = [...available].sort(
        (a, b) =>
          Math.abs(a.size - expectedSize) - Math.abs(b.size - expectedSize)
      );
      match = byClosestSize[0];
      const diffPct = ((Math.abs(match.size - expectedSize) / expectedSize) * 100).toFixed(1);
      method = `Proximidad de peso (dif: ${diffPct}%)`;
    }

    if (!match) {
      console.log(`NO IDENTIFICADA: ${expectedName}`);
      reportRows.push({ file, expectedName, downloaded: "NINGUNA", method: "Sin coincidencia", url: "" });
      continue;
    }

    match.used = true;
    const destination = path.join(outputDir, expectedName);
    await fs.copyFile(match.path, destination);

    metadata.url = `/images/${expectedName}`;
    await fs.writeFile(jsonPath, JSON.stringify(metadata, null, 2));

    linked++;
    console.log(`OK [${method}]: ${match.name} -> ${expectedName}`);
    reportRows.push({
      file,
      expectedName,
      downloaded: `${match.name} (${match.width}x${match.height}, ${match.size} B)`,
      method,
      url: `./public/images/${expectedName}`,
    });
  }

  // Generar reporte visual HTML para revisar en el navegador
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Reporte de imágenes</title>
<style>body{font-family:sans-serif;padding:20px}table{border-collapse:collapse;width:100%}
td,th{border:1px solid #ccc;padding:8px;text-align:left}img{max-height:80px;background:#eee}</style>
</head><body><h2>Imágenes vinculadas: ${linked}/${jsonFiles.length}</h2><table>
<tr><th>Preview</th><th>JSON</th><th>Nombre final</th><th>Archivo origen</th><th>Método</th></tr>
${reportRows
  .map(
    (r) =>
      `<tr><td>${r.url ? `<img src="${r.url}">` : "-"}</td><td>${r.file}</td><td><b>${r.expectedName}</b></td><td>${r.downloaded}</td><td>${r.method}</td></tr>`
  )
  .join("")}
</table></body></html>`;

  await fs.writeFile(path.join(root, "verificacion-imagenes.html"), html);
  console.log(`\nImágenes vinculadas: ${linked}/${jsonFiles.length}`);
  console.log(`Abre "verificacion-imagenes.html" en tu navegador para confirmar visualmente.`);
}

main().catch(console.error);