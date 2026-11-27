# Descarga las 49 imagenes del archivo Figma y actualiza sus JSON.
# Ejecutar desde la carpeta raiz del proyecto manu-front-destination-atlas.

$ErrorActionPreference = 'Stop'

$jsonDir = Join-Path (Get-Location) 'src\assets\fig'
$imageDir = Join-Path (Get-Location) 'public\images'

if (-not (Test-Path $jsonDir)) {
  throw "No encuentro '$jsonDir'. Ejecuta este script desde la raiz del proyecto."
}

New-Item -ItemType Directory -Force -Path $imageDir | Out-Null

$assets = @(
  @{ Name = 'inicio-rectangle.png';       Url = 'https://www.figma.com/api/mcp/asset/fb7c666d-5ee8-4f5a-bd48-a41b5c8be8d7.png' }
  @{ Name = 'inicio-rectangle-2.png';     Url = 'https://www.figma.com/api/mcp/asset/f306a57c-0799-4f30-85d0-b2d9203fe399.png' }
  @{ Name = 'inicio-rectangle-3.png';     Url = 'https://www.figma.com/api/mcp/asset/92738081-e9f7-4834-b74c-0556bccdab3c.png' }
  @{ Name = 'inicio-rectangle-4.png';     Url = 'https://www.figma.com/api/mcp/asset/f7946b08-ac23-450e-9855-7355fdfb30cb.png' }

  @{ Name = 'mapa-rectangle.png';         Url = 'https://www.figma.com/api/mcp/asset/32352b60-021e-49e8-9606-9c42a06c8337.png' }
  @{ Name = 'mapa-rectangle-2.png';       Url = 'https://www.figma.com/api/mcp/asset/b8a8939c-bcc5-4547-995d-b1bb0b8a8018.png' }
  @{ Name = 'mapa-rectangle-3.png';       Url = 'https://www.figma.com/api/mcp/asset/d75ad8de-787a-4988-8e76-86476b7b7714.png' }
  @{ Name = 'mapa-rectangle-4.png';       Url = 'https://www.figma.com/api/mcp/asset/ee8a1222-4030-4fff-a7a2-74cb040500af.png' }
  @{ Name = 'mapa-rectangle-5.png';       Url = 'https://www.figma.com/api/mcp/asset/032ebf35-4d5a-458c-873e-8a37b9ad9790.png' }
  @{ Name = 'mapa-rectangle-6.png';       Url = 'https://www.figma.com/api/mcp/asset/e165e4a8-21e8-4a31-a94e-963356294643.png' }
  @{ Name = 'mapa-rectangle-7.png';       Url = 'https://www.figma.com/api/mcp/asset/cbace9e5-defc-4ba4-b41e-18870b0b71ce.png' }
  @{ Name = 'mapa-rectangle-8.png';       Url = 'https://www.figma.com/api/mcp/asset/afb44316-fe17-41ae-aaef-909c04ea03a7.png' }
  @{ Name = 'mapa-image-44.png';          Url = 'https://www.figma.com/api/mcp/asset/388cac24-1daa-4ad7-86bc-bf38a03f5865.png' }
  @{ Name = 'mapa-image-44-2.png';        Url = 'https://www.figma.com/api/mcp/asset/3980209e-b8c3-48e7-ab6b-8589ff789627.png' }
  @{ Name = 'mapa-image-44-3.png';        Url = 'https://www.figma.com/api/mcp/asset/a3627fdc-cc24-49c1-9d6e-9b32f7c02558.png' }

  @{ Name = 'japon-rectangle.png';       Url = 'https://www.figma.com/api/mcp/asset/6081717e-723a-4bb2-8a80-fa1c9041a7dd.png' }
  @{ Name = 'japon-rectangle-2.png';      Url = 'https://www.figma.com/api/mcp/asset/55423050-441d-40fa-805e-44e4b0c08620.png' }
  @{ Name = 'japon-rectangle-3.png';      Url = 'https://www.figma.com/api/mcp/asset/3b3f6b64-f1dc-4a9e-9c17-6ca1c3f141f5.png' }
  @{ Name = 'japon-rectangle-4.png';      Url = 'https://www.figma.com/api/mcp/asset/7e66e431-8a06-4ba7-bd73-74a9c8c8bcf7.png' }
  @{ Name = 'japon-rectangle-5.png';      Url = 'https://www.figma.com/api/mcp/asset/dbd305cc-20e5-43f2-8b86-55dcb2a3dc49.png' }
  @{ Name = 'japon-rectangle-6.png';      Url = 'https://www.figma.com/api/mcp/asset/4aa0f2ae-8d94-46f0-9b14-dc30966f10b0.png' }

  @{ Name = 'barcelona-image-38.png';    Url = 'https://www.figma.com/api/mcp/asset/a6a05b5d-a0c6-46ae-b2d1-20333f19bfa5.png' }
  @{ Name = 'barcelona-image-39.png';    Url = 'https://www.figma.com/api/mcp/asset/4bd5b407-8eee-436e-9606-b46655355df0.png' }
  @{ Name = 'barcelona-image-41.png';    Url = 'https://www.figma.com/api/mcp/asset/0af98337-7c59-4ac0-ad5d-602a1ecd1b78.png' }
  @{ Name = 'barcelona-image-42.png';    Url = 'https://www.figma.com/api/mcp/asset/5a029a97-78e5-47c9-8db3-c42640ca306a.png' }
  @{ Name = 'barcelona-image-43.png';    Url = 'https://www.figma.com/api/mcp/asset/ee0940b0-e74e-4881-af4d-3588b3c5cc2f.png' }

  @{ Name = 'copenhagen-rectangle.png';  Url = 'https://www.figma.com/api/mcp/asset/b2fa56ae-beb1-41c8-8046-06f5724aed1d.png' }
  @{ Name = 'copenhagen-rectangle-2.png';Url = 'https://www.figma.com/api/mcp/asset/7f31f872-6bb3-48c0-be5b-40adf6cd6316.png' }
  @{ Name = 'abudhabi-rectangle.png';     Url = 'https://www.figma.com/api/mcp/asset/63c93965-bb20-4054-b8f9-db494bdcbcb0.png' }
  @{ Name = 'abudhabi-rectangle-2.png';   Url = 'https://www.figma.com/api/mcp/asset/1ea567bf-7e4e-4625-9634-0eb525217707.png' }
  @{ Name = 'newyork-rectangle.png';      Url = 'https://www.figma.com/api/mcp/asset/dce507da-34c5-41d6-8734-28d8fb3c8e4d.png' }
  @{ Name = 'mexico-rectangle.png';       Url = 'https://www.figma.com/api/mcp/asset/dd58fb22-e3e8-42c7-a5e7-fba473187f29.png' }
  @{ Name = 'mexico-rectangle-2.png';     Url = 'https://www.figma.com/api/mcp/asset/cde550bf-f329-4b1e-aa44-90d3466b9981.png' }

  @{ Name = 'otrosrumbos-rectangle.png';  Url = 'https://www.figma.com/api/mcp/asset/6387c936-0f4a-4a87-9be6-6329b902deea.png' }
  @{ Name = 'otrosrumbos-rectangle-2.png';Url = 'https://www.figma.com/api/mcp/asset/8b1cd5b7-fdd7-4d68-a44f-588e4a620c12.png' }
  @{ Name = 'otrosrumbos-rectangle-3.png';Url = 'https://www.figma.com/api/mcp/asset/8ec2e183-f388-4f76-9329-44b73ff03044.png' }
  @{ Name = 'otrosrumbos-rectangle-4.png';Url = 'https://www.figma.com/api/mcp/asset/329eb151-bff1-43cb-99f7-50d1b960d5a5.png' }
  @{ Name = 'otrosrumbos-rectangle-5.png';Url = 'https://www.figma.com/api/mcp/asset/9789820a-087f-4b13-853d-ce5d15e5872c.png' }
  @{ Name = 'otrosrumbos-rectangle-6.png';Url = 'https://www.figma.com/api/mcp/asset/95aee541-f853-4b6c-a139-109ff30c3870.png' }
  @{ Name = 'otrosrumbos-rectangle-7.png';Url = 'https://www.figma.com/api/mcp/asset/edf3be40-dff2-40b7-a639-9e6ff0f45e8b.png' }
  @{ Name = 'otrosrumbos-rectangle-8.png';Url = 'https://www.figma.com/api/mcp/asset/caf18d4d-b842-48bc-a08e-2384053c55e9.png' }
  @{ Name = 'otrosrumbos-rectangle-9.png';Url = 'https://www.figma.com/api/mcp/asset/586a5bec-cc00-44c0-a29d-e26b0b263340.png' }

  @{ Name = 'bariloche-rectangle.png';     Url = 'https://www.figma.com/api/mcp/asset/85479716-2b04-4171-a8e5-8096bc5f5083.png' }
  @{ Name = 'bariloche-rectangle-2.png';   Url = 'https://www.figma.com/api/mcp/asset/20a894d5-cca1-45d6-921a-392183d99c6e.png' }
  @{ Name = 'bariloche-rectangle-3.png';   Url = 'https://www.figma.com/api/mcp/asset/7fd0b7e5-094f-4e12-8346-087e827bff61.png' }
  @{ Name = 'bariloche-image-28.png';      Url = 'https://www.figma.com/api/mcp/asset/6c2337c3-520f-4c5a-a940-48e166a99588.png' }
  @{ Name = 'marabierto-rectangle.png';    Url = 'https://www.figma.com/api/mcp/asset/96f226f7-a6bd-4fd9-b4f6-dee7908d1ce1.png' }
  @{ Name = 'marabierto-rectangle-2.png';  Url = 'https://www.figma.com/api/mcp/asset/e1c4e424-d794-432e-9ade-52584d3eaa8a.png' }
  @{ Name = 'marabierto-image-44.png';     Url = 'https://www.figma.com/api/mcp/asset/39391714-c198-40f8-a5de-744a4e11a344.png' }
)

Write-Host "Se van a descargar $($assets.Count) imagenes de Figma..." -ForegroundColor Cyan
$ok = 0
$failed = @()
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($asset in $assets) {
  $destination = Join-Path $imageDir $asset.Name
  $jsonName = [System.IO.Path]::GetFileNameWithoutExtension($asset.Name) + '.json'
  $jsonPath = Join-Path $jsonDir $jsonName

  try {
    Write-Host "Descargando $($asset.Name)..."
    & curl.exe --fail --location --silent --show-error --retry 2 --output $destination $asset.Url
    if ($LASTEXITCODE -ne 0) {
      throw "curl.exe termino con codigo $LASTEXITCODE"
    }

    $downloaded = Get-Item $destination
    if ($downloaded.Length -lt 1000) {
      throw "El archivo descargado parece vacio o incompleto ($($downloaded.Length) bytes)."
    }

    if (-not (Test-Path $jsonPath)) {
      throw "No existe el JSON esperado: $jsonName"
    }

    $metadata = Get-Content -LiteralPath $jsonPath -Raw | ConvertFrom-Json
    $metadata.url = "/images/$($asset.Name)"
    $json = $metadata | ConvertTo-Json -Depth 20
    [System.IO.File]::WriteAllText($jsonPath, $json + [Environment]::NewLine, $utf8NoBom)

    $ok++
    Write-Host "  OK: vinculado a $jsonName" -ForegroundColor Green
  }
  catch {
    $failed += $asset.Name
    Write-Warning "No se pudo procesar $($asset.Name): $($_.Exception.Message)"
    if (Test-Path $destination) { Remove-Item -LiteralPath $destination -Force }
  }
}

Write-Host "`nResultado: $ok/$($assets.Count) imagenes descargadas y vinculadas." -ForegroundColor Cyan
if ($failed.Count -gt 0) {
  Write-Host 'Fallaron:' -ForegroundColor Red
  $failed | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  Write-Host 'Los enlaces temporales de Figma pueden vencer; si pasa, avisame y genero otros.'
  exit 1
}

Write-Host 'Listo. Ejecuta npm run dev para comprobar el sitio.' -ForegroundColor Green
