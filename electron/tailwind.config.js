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
                xxs: "0.625rem"
            },
            borderWidth: {
                1: "1px"
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
    plugins: [flowbite.plugin()]
}
