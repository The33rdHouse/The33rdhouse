import Database from 'better-sqlite3';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const db = new Database('.data/sqlite.db');

// Create output directory
const outputDir = '/home/ubuntu/curriculum-export';
mkdirSync(outputDir, { recursive: true });

// Get all weeks
const weeks = db.prepare('SELECT * FROM inner_circle_weeks ORDER BY monthNumber, weekNumber').all();

console.log(`📚 Exporting ${weeks.length} curriculum weeks...\n`);

// Group by month
const monthGroups = {};
weeks.forEach(week => {
  if (!monthGroups[week.monthNumber]) {
    monthGroups[week.monthNumber] = [];
  }
  monthGroups[week.monthNumber].push(week);
});

// Export each month
Object.keys(monthGroups).forEach(monthNum => {
  const monthWeeks = monthGroups[monthNum];
  const monthDir = join(outputDir, `month-${monthNum.padStart(2, '0')}`);
  mkdirSync(monthDir, { recursive: true });
  
  console.log(`📅 Month ${monthNum}:`);
  
  monthWeeks.forEach(week => {
    const weekFile = join(monthDir, `week-${week.weekNumber}-${week.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`);
    
    const content = `# Week ${week.weekNumber}: ${week.title}
## ${week.subtitle}

**Month ${week.monthNumber} • Week ${week.weekNumber}**

---

## Video Teaching Script

${week.videoScript || 'Content to be added'}

---

## Somatic Practice

${week.somaticPractice || 'Content to be added'}

---

## Daily Homework

${week.dailyHomework || 'Content to be added'}

---

## Engagement Questions

${week.engagementQuestions || 'Content to be added'}
`;
    
    writeFileSync(weekFile, content);
    console.log(`  ✅ Week ${week.weekNumber}: ${week.title}`);
  });
});

console.log(`\n✨ Export complete! Files saved to: ${outputDir}`);

db.close();
