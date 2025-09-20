import fs from "fs";
import { Buffer } from "buffer"; 

// Get the Base64 secret from EAS
const content = process.env.GOOGLE_SERVICES_JSON_BASE64;
if (!content) throw new Error("Missing secret GOOGLE_SERVICES_JSON_BASE64");

// Decode Base64 to buffer
const buffer = Buffer.from(content, "base64");

// Create folder and write file
fs.mkdirSync("android/app", { recursive: true });
fs.writeFileSync("android/app/google-services.json", buffer);

console.log("✅ google-services.json written for EAS build");
