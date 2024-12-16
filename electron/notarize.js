// https://ramielcreations.com/macos-github-app-build

const { notarize } = require("@electron/notarize")

exports.default = async function notarizing(context) {
    const appName = context.packager.appInfo.productFilename
    const { electronPlatformName, appOutDir } = context
    // We skip notarization if the process is not running on MacOS and
    // if the enviroment variable SKIP_NOTARIZE is set to `true`
    // This is useful for local testing where notarization is useless
    if (electronPlatformName !== "darwin" || process.env.SKIP_NOTARIZE === "true") {
        console.log(`  • Skipping notarization`)
        return
    }

    // THIS MUST BE THE SAME AS THE `appId` property
    // in your electron builder configuration
    const appId = "com.exifoo.app"

    const appPath = `${appOutDir}/${appName}.app`
    const { MAC_API_KEY_ID, MAC_API_KEY_ISSUER_ID } = process.env
    const MAC_API_KEY_PATH = `~/private_keys/AuthKey_${MAC_API_KEY_ID}.p8`

    console.log(`  • Notarizing ${appPath}`)

    return await notarize({
        tool: "notarytool",
        appBundleId: appId,
        appPath,
        appleApiKey: MAC_API_KEY_PATH,
        appleApiKeyId: MAC_API_KEY_ID,
        appleApiIssuer: MAC_API_KEY_ISSUER_ID
    })
}
