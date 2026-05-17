# WASM Postflop Móvil + Presets GTOwizard

Fork de [b-inary/wasm-postflop](https://github.com/b-inary/wasm-postflop) con:
- **UI responsive móvil** (sidebar horizontal en móvil, vertical en desktop)
- **Presets GTOwizard MTT ChipEV** precargados: RFI (5 posiciones × 3 stacks) y BB Call vs cada opener
- **Auto-build con GitHub Actions** (no necesitas Rust local)

## Deploy a Cloudflare Pages (recomendado, ~10 min)

### 1. Sube este código a un repo de GitHub
- Crea cuenta gratis en https://github.com/ si no la tienes
- Click **+** → New repository → ponle nombre (ej: `mi-wasm-postflop`)
- En la página del repo nuevo, click **uploading an existing file**
- Arrastra TODOS los archivos de este ZIP (puedes seleccionar carpetas)
- Click **Commit changes**

GitHub Actions ejecutará el build automáticamente (ver pestaña **Actions** del repo).

### 2. Conecta Cloudflare Pages
- Ve a https://pages.cloudflare.com/ (cuenta gratis)
- Click **Create a project** → **Connect to Git** → autoriza GitHub
- Selecciona tu repo
- **Framework preset**: None
- **Build command**: `npm run wasm && npm run build`
- **Build output directory**: `dist`
- **Environment variables** → añade `RUSTUP_TOOLCHAIN=nightly` y `NODE_VERSION=20`
- Click **Save and Deploy**

En ~5-10 minutos tendrás tu sitio en `https://TU-REPO.pages.dev`.

## Alternativa: Build local

Si tienes Rust + Node instalados:

```bash
# Setup Rust nightly
rustup install nightly
rustup +nightly component add rust-src
rustup target add wasm32-unknown-unknown
cargo install wasm-pack

# Build
npm install
npm run wasm
npm run build
```

Luego sube `dist/` a Netlify Drop, Surge, o cualquier hosting estático.

## Cambios vs el original

- `src/components/PresetLoader.vue` — Nuevo componente con dropdown de presets
- `src/preset-ranges.ts` — Datos de los rangos (auto-generados desde GTOwizard)
- `src/components/RangeEditor.vue` — Importa PresetLoader
- `src/components/App.vue` — Layout responsive (flex-col en móvil, flex-row en desktop)
- `src/components/SideBar.vue` — Sidebar horizontal en móvil
- `public/_headers` — Headers COOP/COEP requeridos para SharedArrayBuffer
- `.github/workflows/build.yml` — Auto-build con GitHub Actions

El motor (Rust + WASM) y la lógica original no se han modificado — sigue siendo el mismo solver multi-street de calidad WASM Postflop.

## Licencia
AGPL-3.0 (igual que el repo original)
