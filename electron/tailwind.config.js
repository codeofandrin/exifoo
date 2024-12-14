import flowbite from "flowbite-react/tailwind"
import defaultTheme from "tailwindcss/defaultTheme"
import exifooTheme from "./theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/renderer/index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: exifooTheme.colors,
            fontSize: {
                xxs: "0.625rem",
                code: "0.8rem",
                "3.5xl": "2.05rem"
            },
            backdropBlur: {
                xs: "2px"
            },
            width: {
                4.5: "1.125rem"
            },
            height: {
                4.5: "1.125rem"
            }
        },
        screens: {
            xs: "360px",
            ...defaultTheme.screens
        },
        fontFamily: {
            logo: ["Space Grotesk"]
        }
    },
    plugins: [flowbite.plugin(), require("tailwindcss-motion")]
}
