#!/usr/bin/env node

const { execSync } = require('child_process');

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error('❌ Failed to get current branch name');
    process.exit(1);
  }
}

function validateBranchName(branchName) {
  // Define allowed branch name patterns
  const patterns = [
    /^feature\/.+$/,      // feature/xxx
    /^bugfix\/.+$/,       // bugfix/xxx
    /^hotfix\/.+$/,       // hotfix/xxx
    /^release\/.+$/,      // release/xxx
    /^(main|master|develop)$/  // main branches
  ];

  return patterns.some(pattern => pattern.test(branchName));
}

console.log('🔍 Running pre-push checks...\n');

// Check branch name
const currentBranch = getCurrentBranch();
console.log(`🌿 Current branch: ${currentBranch}`);

if (!validateBranchName(currentBranch)) {
  console.error('❌ Invalid branch name!');
  console.error('\nBranch names must follow one of these patterns:');
  console.error('  - feature/your-feature-name');
  console.error('  - bugfix/issue-description');
  console.error('  - hotfix/critical-fix');
  console.error('  - release/version-number');
  console.error('  - main, master, or develop');
  console.error(`\nYour branch: "${currentBranch}" does not match any pattern.\n`);
  process.exit(1);
}
console.log('✅ Branch name is valid!\n');

try {
  // Run TypeScript type checking
  console.log('📘 Type checking...');
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ Type check passed!\n');

  // Run ESLint
  console.log('🔎 Linting...');
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed!\n');

  console.log('🎉 All pre-push checks passed! Pushing to remote...');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Pre-push checks failed!');
  console.error('💡 Tip: Run "npm run lint:fix" to auto-fix some issues\n');
  process.exit(1);
}
