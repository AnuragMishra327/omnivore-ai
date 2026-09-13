const fs = require("fs");
const path = require("path");

function retrieve(query) {
  const knowledgePath = path.join(__dirname, "knowledge");

  const files = fs.readdirSync(knowledgePath);

  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2);

  const results = [];

  files.forEach(file => {
    if (!file.endsWith(".txt")) {
      return;
    }

    const filePath = path.join(knowledgePath, file);
    const content = fs.readFileSync(filePath, "utf-8");

    let score = 0;

    words.forEach(word => {
      if (content.toLowerCase().includes(word)) {
        score++;
      }
    });

    if (score > 0) {
      results.push({
        file,
        content,
        score
      });
    }
  });

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 3);
}

module.exports = retrieve;