import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

export default defineConfig({
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },

    server: {
        port: 3001,   // 👈 ADD THIS
        host: true
    },

    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: [],
    },

    optimizeDeps: {
        include: [
            '@ckeditor/ckeditor5-build-classic',
            '@mui/material',
            '@mui/x-date-pickers',
            '@emotion/react',
            '@emotion/styled',
            'dayjs'
        ],
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-tsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\\.*\.js$/ },
                            async (args) => ({
                                loader: 'tsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },

    plugins: [svgr(), react()],
});