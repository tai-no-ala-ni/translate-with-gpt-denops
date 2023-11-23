import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { input } from "https://deno.land/x/denops_std@v5.0.2/helper/input.ts";
import * as fs from "https://deno.land/std@0.207.0/fs/mod.ts";

export const getApiKey = async (denops: Denops) => {
  const home = Deno.env.get("HOME");
  const apiDir = home + "/.config/translateWithGpt";
  if (!fs.existsSync(apiDir)) await Deno.mkdir(apiDir);
  const apiKeyPath = home + "/.config/translateWithGpt/ApiKey";
  const encoder = new TextEncoder();
  if (!fs.existsSync(apiKeyPath))
    Deno.writeFileSync(apiKeyPath, encoder.encode(""));
  const decoder = new TextDecoder("utf-8");
  const fileContent = await Deno.readFile(apiKeyPath);
  const fileContentText = decoder.decode(fileContent);
  if (fileContentText.startsWith("sk-")) return fileContentText;
  const text = await denops.call("input", "Input OpenAI API Key: ");
  if (text.startsWith("sk-")) {
    await Deno.writeFile(apiKeyPath, encoder.encode(text));
  } else {
    console.error("Invalid API Key");
  }
};
