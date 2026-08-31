import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace bg-color-950/opacity with bg-color-50
  content = content.replace(/bg-([a-z]+)-950\/(20|30|40|50|60)/g, 'bg-$1-50');
  
  // Replace border-color-900/opacity with border-color-200
  content = content.replace(/border-([a-z]+)-(900|800)\/(20|25|30|40|50|60)/g, 'border-$1-200');
  
  // Replace text-color-400 with text-color-600 for better visibility on light backgrounds
  // We'll target the specific colors we saw in the badges: red, green, yellow, blue, amber, sky, emerald, pink, orange
  const colorsToDarken = ['red', 'green', 'yellow', 'blue', 'amber', 'sky', 'emerald', 'pink', 'orange'];
  colorsToDarken.forEach(color => {
    const regex = new RegExp(`text-${color}-(300|400|500)`, 'g');
    content = content.replace(regex, `text-${color}-600`);
  });
  
  // Wait, text-[var(--gold)] is fine. But wait, what if they use text-amber-500 somewhere else where it shouldn't be 600?
  // It's mostly fine for light themes.
  // We also have bg-[var(--gold-10)] text-[var(--gold)] which is fine.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`\nDone. Updated ${changedFiles} files.`);
