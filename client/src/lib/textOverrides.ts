export type EditableTextField = {
  fieldKey: string;
  label: string;
  value: string;
  kind: "text" | "placeholder" | "alt" | "aria-label" | "title";
};

type TextOverride = { fieldKey: string; value: string };

const IGNORED_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"]);

function elementPath(element: Element, root: Document | Element = document): string {
  if (element instanceof HTMLElement && element.dataset.contentKey) return `[data-content-key="${CSS.escape(element.dataset.contentKey)}"]`;
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current !== (root instanceof Document ? root.documentElement : root)) {
    if (current.id) { parts.unshift(`#${CSS.escape(current.id)}`); break; }
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) break;
    const siblings: Element[] = Array.from(parent.children).filter((sibling: Element) => sibling.tagName === current!.tagName);
    const suffix = siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(current) + 1})` : "";
    parts.unshift(`${current.tagName.toLowerCase()}${suffix}`);
    current = parent;
  }
  return parts.join(" > ");
}

function textNodes(element: Element): Text[] {
  return Array.from(element.childNodes).filter((node): node is Text => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()));
}

export function scanEditableText(rootDocument: Document): EditableTextField[] {
  const root = rootDocument.querySelector("#root") || rootDocument.body;
  const fields: EditableTextField[] = [];
  const walker = rootDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.nodeType !== 3) continue;
    const textNode = node as Text;
    const parent = textNode.parentElement;
    const value = textNode.textContent?.replace(/\s+/g, " ").trim() || "";
    if (!parent || !value || value.length < 2 || IGNORED_TAGS.has(parent.tagName)) continue;
    const siblings = textNodes(parent);
    const index = siblings.indexOf(textNode);
    if (index < 0) continue;
    const path = elementPath(parent, rootDocument);
    fields.push({ fieldKey: `text|${encodeURIComponent(path)}|${index}`, label: `${parent.tagName.toLowerCase()} — ${value.slice(0, 76)}`, value, kind: "text" });
  }
  const attributes: Array<[EditableTextField["kind"], string]> = [["placeholder", "placeholder"], ["alt", "alt"], ["aria-label", "aria-label"], ["title", "title"]];
  for (const [kind, attribute] of attributes) {
    root.querySelectorAll(`[${attribute}]`).forEach((element) => {
      const value = element.getAttribute(attribute)?.trim() || "";
      if (!value) return;
      const path = elementPath(element, rootDocument);
      fields.push({ fieldKey: `attr|${encodeURIComponent(path)}|${attribute}`, label: `${attribute} — ${value.slice(0, 76)}`, value, kind });
    });
  }
  return fields.sort((a, b) => a.fieldKey.localeCompare(b.fieldKey));
}

export function applyTextOverrides(rootDocument: Document, overrides: TextOverride[]) {
  const root = rootDocument.querySelector("#root") || rootDocument.body;
  for (const override of overrides) {
    const [kind, encodedPath, tail] = override.fieldKey.split("|", 3);
    const path = encodedPath ? decodeURIComponent(encodedPath) : "";
    if (!kind || !path || tail === undefined) continue;
    let element: Element | null = null;
    try { element = rootDocument.querySelector(path); } catch { continue; }
    if (!element || !root.contains(element)) continue;
    if (kind === "text") {
      const index = Number(tail);
      const node = textNodes(element)[index];
      if (node && node.textContent !== override.value) node.textContent = override.value;
    } else if (kind === "attr") {
      if (element.getAttribute(tail) !== override.value) element.setAttribute(tail, override.value);
    }
  }
}
