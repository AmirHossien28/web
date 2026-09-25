import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';

// Works both in ESM (".ts" config bundled as ESM) and CJS config loading.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': projectRoot,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // The dev server is reachable through a proxied preview host (not localhost),
      // so the Host-header allowlist must stay open for previews/tunnels.
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      // Build output folders are never watched: rebuilding them would otherwise
      // trigger a full page reload loop in the preview.
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : { ignored: ['**/dist/**', '**/dist-*/**', '**/docs/**', '**/standalone/**', '**/.git/**'] },
    },
  };
});
