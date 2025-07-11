import { sentryVitePlugin } from "@sentry/vite-plugin"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import packageJson from "./package.json"

const s = JSON.stringify

export default defineConfig({
    main: {
        build: {
            lib: {
                entry: "src/main-process/main.ts"
            },
            outDir: "out/main-process",
            sourcemap: true
        },
        plugins: [
            externalizeDepsPlugin(),
            sentryVitePlugin({
                org: "puncher1",
                project: "exifoo-electron"
            })
        ],
        define: {
            __RELEASE_REPO__: s("https://github.com/codeofandrin/exifoo-releases")
        }
    },

    preload: {
        build: {
            lib: {
                entry: "src/main-process/preload.ts"
            },
            outDir: "out/main-process",
            emptyOutDir: false,
            sourcemap: true
        },
        plugins: [
            externalizeDepsPlugin(),
            sentryVitePlugin({
                org: "puncher1",
                project: "exifoo-electron"
            })
        ]
    },

    renderer: {
        build: {
            sourcemap: true
        },
        plugins: [
            react(),
            svgr({
                svgrOptions: {
                    // svgr options
                }
            }),
            sentryVitePlugin({
                org: "puncher1",
                project: "exifoo-electron"
            })
        ],
        define: {
            __APP_NAME__: s(packageJson.name),
            __APP_DESC__: s(packageJson.description),
            __APP_VERSION__: s(packageJson.version),
            __APP_AUTHOR__: packageJson.author,
            __RELEASE_REPO__: s("https://github.com/codeofandrin/exifoo-releases")
        }
    }
})
