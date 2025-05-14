function getLevel(line) {
  // 支持 tab 或 2/4 空格缩进
  const match = line.match(/^(\s*)-/);
  if (!match) return -1; // Return -1 or throw error if not a list item
  const space = match[1] || '';
  // 1 层级 = 4 空格或 1 tab. Calculate based on 4 spaces per indent level.
  // Tabs are counted as 1 indent level directly after replacing them.
  const fourSpacesPerTab = '    ';
  const spaceNormalized = space.replace(/\t/g, fourSpacesPerTab);
  return Math.floor(spaceNormalized.length / fourSpacesPerTab.length);
}

function outline2markdown(text, headerCount = 2, headerOffset = 0) {
  const lines = text.replace(/\r/g, '').split('\n').filter(l => l.trim() !== '');
  const result = [];

  for (const line of lines) {
    let content = line.replace(/^\s*-\s*/, '').trim();
    if (!content && line.trim() === '-') { // Handle empty list items if needed, or filter them earlier
        content = ''; 
    }

    const outlineLevel = getLevel(line); // 0-indexed: 0 for root, 1 for first indent, etc.

    if (outlineLevel === -1) { // Not a valid list item line, skip or handle as plain text
        result.push(line); // Or some other handling
        continue;
    }

    if (outlineLevel < headerCount) {
      // This item becomes a header
      let calculatedHeaderLevel = (outlineLevel + 1) + headerOffset; // outlineLevel is 0-indexed, +1 for H1, H2..
      
      // Clamp header level between 1 (H1) and 6 (H6)
      calculatedHeaderLevel = Math.max(1, Math.min(6, calculatedHeaderLevel));
      
      result.push(`${'#'.repeat(calculatedHeaderLevel)} ${content}`);
    } else {
      // This item becomes a list item
      // Indentation is relative to how many levels deeper it is than the last header-converted level
      const listIndentLevel = outlineLevel - headerCount;
      result.push(`${'    '.repeat(listIndentLevel)}- ${content}`);
    }
  }
  return result.join('\n');
}

function outline2markdownAuto(text, headerOffset = 1) {
  const rawLines = text.replace(/\r/g, '').split('\n');
  const items = [];
  let idCounter = 0;

  // 1. Parse into items with level and content
  for (const line of rawLines) {
    if (line.trim() === '') continue;
    const level = getLevel(line);
    if (level === -1 && line.trim() !== '') { // Non-list item line
        items.push({ id: idCounter++, level: -1, content: line.trim(), originalLine: line, L2childrenCount: 0, L2childHasL3children: false });
        continue;
    }
    if (level === -1) continue; // Skip if getLevel returns -1 for blank/invalid lines handled by trim

    const content = line.replace(/^\s*-\s*/, '').trim();
    items.push({ id: idCounter++, level, content, originalLine: line, L2childrenCount: 0, L2childHasL3children: false });
  }

  // 2. Pre-calculate children info for L1 items (potential H3s)
  for (let i = 0; i < items.length; i++) {
    if (items[i].level === 1) { // Only L1 items need this specific check for demotion
      let l2ChildrenCount = 0;
      let l2ChildHasL3Children = false;
      for (let j = i + 1; j < items.length; j++) {
        if (items[j].level <= items[i].level) break; // No longer a child
        if (items[j].level === items[i].level + 1) { // Direct L2 child
          l2ChildrenCount++;
          // Check if this L2 child has L3 children
          for (let k = j + 1; k < items.length; k++) {
            if (items[k].level <= items[j].level) break;
            if (items[k].level === items[j].level + 1) { // L3 child found
              l2ChildHasL3Children = true;
              break;
            }
          }
        }
        if (l2ChildHasL3Children) break; // Optimization: if one L2 child has L3, that's enough
      }
      items[i].L2childrenCount = l2ChildrenCount;
      items[i].L2childHasL3children = l2ChildHasL3Children;
    }
  }

  // 3. Build Markdown
  const outputLines = [];
  const parentHeaderOutlineLevelStack = [-1]; // Base for L0 items

  for (const currentItem of items) {
    const { level, content, L2childrenCount, L2childHasL3children, originalLine } = currentItem;

    if (level === -1) { // Handle non-list item lines passed through
        outputLines.push(originalLine);
        continue;
    }

    // Pop stack to find current parent header level for indentation
    while (level <= parentHeaderOutlineLevelStack[parentHeaderOutlineLevelStack.length - 1]) {
      parentHeaderOutlineLevelStack.pop();
    }
    const currentParentHeaderOutlineLevel = parentHeaderOutlineLevelStack[parentHeaderOutlineLevelStack.length - 1];

    if (level === 0) {
      let hl = (0 + 1) + headerOffset;
      hl = Math.max(1, Math.min(6, hl));
      outputLines.push(`${'#'.repeat(hl)} ${content}`);
      parentHeaderOutlineLevelStack.push(0);
    } else if (level === 1) {
      const isDemoted = (L2childrenCount === 0) || (L2childrenCount === 1 && !L2childHasL3children);
      if (!isDemoted) {
        let hl = (1 + 1) + headerOffset;
        hl = Math.max(1, Math.min(6, hl));
        outputLines.push(`${'#'.repeat(hl)} ${content}`);
        parentHeaderOutlineLevelStack.push(1); // This L1 item is a header
      } else {
        const indent = Math.max(0, level - (currentParentHeaderOutlineLevel + 1));
        outputLines.push(`${'    '.repeat(indent)}- ${content}`);
      }
    } else { // level >= 2
      const indent = Math.max(0, level - (currentParentHeaderOutlineLevel + 1));
      outputLines.push(`${'    '.repeat(indent)}- ${content}`);
    }
  }
  return outputLines.join('\n');
}

// For potential Node.js/module usage, though not used in browser directly this way
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { outline2markdown, getLevel, outline2markdownAuto };
} 