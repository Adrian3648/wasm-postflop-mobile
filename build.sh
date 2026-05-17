#!/usr/bin/env bash
set -euo pipefail

echo "==> Installing Rust nightly + rust-src"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain nightly --component rust-src
export PATH="$HOME/.cargo/bin:$PATH"

echo "==> Installing wasm-pack"
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
export PATH="$HOME/.wasm-pack:$PATH"

echo "==> Versions"
rustc --version
wasm-pack --version

echo "==> Building WASM modules"
npm run wasm

echo "==> Building frontend bundle"
npm run build

echo "==> Done"
ls -la dist/
