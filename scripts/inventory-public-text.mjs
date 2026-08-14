import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";

const root = "/home/ubuntu/workshop-creative-group/client/src";
const files = [
  "pages/Home.tsx", "pages/About.tsx", "pages/LargeFormat.tsx", "pages/GraphicDesign.tsx",
  "pages/PrintProcurement.tsx", "pages/RequestQuote.tsx", "pages/Contact.tsx", "pages/Gallery.tsx",
  "pages/Blog.tsx", "components/Navbar.tsx", "components/Footer.tsx", "components/QuoteBanner.tsx",
  "components/TestimonialSection.tsx",
];

function textOf(node) {
  const value = node.getText();
  return value.replace(/^['"`]|['"`]$/g, "").replace(/\\n/g, " ").trim();
}

const inventory = {};
for (const relativePath of files) {
  const source = await readFile(resolve(root, relativePath), "utf8");
  const sf = ts.createSourceFile(relativePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const items = [];
  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const text = node.getText().replace(/\s+/g, " ").trim();
      if (text.length >= 2 && /[A-Za-z]/.test(text)) items.push({ kind: "jsx", text });
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = textOf(node);
      if (text.length >= 3 && /[A-Za-z]/.test(text) && !text.startsWith("/") && !text.startsWith("#") && !text.includes("@/")) items.push({ kind: "literal", text });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  inventory[relativePath] = [...new Map(items.map((item) => [`${item.kind}:${item.text}`, item])).values()];
}
await writeFile("/home/ubuntu/workshop-creative-group/CONTENT_TEXT_INVENTORY.json", `${JSON.stringify(inventory, null, 2)}\n`);
console.log(JSON.stringify({ files: files.length, fields: Object.values(inventory).reduce((sum, items) => sum + items.length, 0), output: "CONTENT_TEXT_INVENTORY.json" }));
