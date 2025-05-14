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

// For potential Node.js/module usage, though not used in browser directly this way
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { outline2markdown, getLevel };
} 