import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { getpos } from "https://deno.land/x/denops_std@v1.0.0/function/cursor.ts";
export const getSelectedText = async (denops: Denops) => {
  const [startBuf, startLnum, startCol, startOff] = await getpos(denops, "'<");
  const [endBuf, endLnum, endCol, endOff] = await getpos(denops, "'>");
  const lines = await denops.call("getline", startLnum, endLnum);
  //console.log(
  //  `startBuf: ${startBuf}, startLnum: ${startLnum}, startCol: ${startCol}, startOff: ${startOff}, endBuf: ${endBuf}, endLnum: ${endLnum}, endCol: ${endCol}, endOff: ${endOff}`
  //);
  if (lines.length === 0) throw new Error("No lines selected");
  if (lines.length === 1) return lines[0].slice(startCol - 1, endCol);
  lines[0] = lines[0].slice(startCol - 1);
  lines[lines.length - 1] = lines[lines.length - 1].slice(0, endCol);
  const text = lines.join("\n");
  return text;
};
