import react from '@vitejs/plugin-react';
import Md5 from 'crypto-js/md5';
import { defineConfig } from 'vite';
import { compression, defineAlgorithm } from 'vite-plugin-compression2';
import svgr from 'vite-plugin-svgr';
import zlib from 'zlib';

export default defineConfig(({ mode }) => {
    return {
        publicDir: false,
        css: {
            modules: {
                generateScopedName: (name, filename, css) => {
                    // 在name的每个大写字母前加 - 然后把大写转成小写
                    name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
                    const hash = Md5(filename + css)
                        .toString()
                        .substring(0, 8);
                    return `${name}-${hash}`;
                },
            },
        },
        build: {
            lib: {
                entry: {
                    Test: './remote/test/index.tsx',
                },
                formats: ['es'],
                fileName: (format, entryName) => `${entryName}.js`,
            },
            target: ['es2022', 'firefox128', 'chrome111', 'safari16.4'],
            outDir: 'build_remote',
            assetsInlineLimit: 8192,
            sourcemap: false,
            chunkSizeWarningLimit: 1500,
            reportCompressedSize: true,
            rollupOptions: {
                external: ['react', 'react-dom', 'react/jsx-runtime'],
                output: {
                    compact: true,
                },
            },
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        },
        esbuild: {
            legalComments: 'none',
        },
        plugins: [
            react({
                jsxRuntime: 'classic',
            }),
            svgr(),
            compression({
                include: /\.*$/,
                exclude: /\.(png|jpg|jpeg|webp|mp3|ogg|webm)$/i,
                algorithms: [
                    defineAlgorithm('brotliCompress', {
                        params: {
                            [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
                            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
                        },
                    }),
                    defineAlgorithm('gzip', {
                        level: zlib.constants.Z_BEST_COMPRESSION,
                    }),
                ],
            }),
        ],
    };
});
