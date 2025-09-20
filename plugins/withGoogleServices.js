import { withDangerousMod } from "@expo/config-plugins";
import { Buffer } from "buffer";
import fs from "fs";

export default function withGoogleServicesFile(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const base64 = process.env.GOOGLE_SERVICES_JSON_BASE64;
      if (!base64)
        throw new Error("Missing GOOGLE_SERVICES_JSON_BASE64 secret");

      const buffer = Buffer.from(base64, "base64");
      const path = "android/app/google-services.json";

      fs.mkdirSync("android/app", { recursive: true });
      fs.writeFileSync(path, buffer);

      console.log("✅ google-services.json written");
      return config;
    },
  ]);
}
