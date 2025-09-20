const fs = require("fs");
const { withDangerousMod } = require("@expo/config-plugins");
const { Buffer } = require("buffer");

// CommonJS module, works with EAS prebuild
module.exports = function withGoogleServicesFile(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const base64 = process.env.GOOGLE_SERVICES_JSON_BASE64;
      if (!base64) throw new Error("Missing GOOGLE_SERVICES_JSON_BASE64 secret");

      // Node.js buffer
      const buffer = Buffer.from(base64, "base64");

      // Ensure android/app exists
      const path = "android/app/google-services.json";
      fs.mkdirSync("android/app", { recursive: true });
      fs.writeFileSync(path, buffer);

      console.log("✅ google-services.json written");
      return config;
    },
  ]);
};
