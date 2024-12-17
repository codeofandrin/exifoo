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
            outDir: "out/main-process"
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        build: {
            lib: {
                entry: "src/main-process/preload.ts"
            },
            outDir: "out/main-process",
            emptyOutDir: false
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        plugins: [
            react(),
            svgr({
                svgrOptions: {
                    // svgr options
                }
            })
        ],
        define: {
            __APP_NAME__: s(packageJson.name),
            __APP_DESC__: s(packageJson.description),
            __APP_VERSION__: s(packageJson.version),
            __APP_AUTHOR__: packageJson.author
        }
    }
})
