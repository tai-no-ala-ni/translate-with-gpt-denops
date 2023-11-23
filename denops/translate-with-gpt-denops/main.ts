import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v5.0.2/helper/execute.ts";
import { getApiKey } from "./lib/apikey.ts";
import { getSelectedText } from "./lib/getSelectedText.ts";

export async function main(denops: Denops): Promise<void> {
  // ...
  denops.dispatcher = {
    async translate(): Promise<string> {
      const text =
        "以下の文章を日本語に翻訳してください: " +
        (await getSelectedText(denops));
      const apiKey = await getApiKey(denops);
      const baseURL = "https://api.openai.com/v1/chat/completions";
      const body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
      };

      const res = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data.choices[0].message.content.replace(/\n/g, ""));
    },
  };
  await execute(
    denops,
    `command! -range Translate call denops#request('${denops.name}','translate',[])`
  );
}
