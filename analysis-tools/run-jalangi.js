const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// File to analyze (relative to project root)
const fileToAnalyze = process.argv[2] || 'app.js';
const timestamp = new Date().toISOString().replace(/:/g, '-');
const outputFile = path.join(__dirname, `output/jalangi-output-${timestamp}.txt`);

// Check if Jalangi2 is installed
const jalangiPath = path.join(__dirname, 'jalangi2');

// Force re-clone if jalangi.js is missing
const jalangiMainPath = path.join(jalangiPath, 'src/js/commands/jalangi.js');
if (!fs.existsSync(jalangiPath) || !fs.existsSync(jalangiMainPath)) {
  console.log('Installing/reinstalling Jalangi2...');
  
  // Remove existing directory if it exists but is incomplete
  if (fs.existsSync(jalangiPath)) {
    console.log('Removing incomplete Jalangi2 installation...');
    execSync(`rm -rf "${jalangiPath}"`);
  }
  
  console.log('Cloning Jalangi2 repository...');
  execSync(`git clone https://github.com/Samsung/jalangi2.git "${jalangiPath}"`);
  
  console.log('Installing Jalangi2 dependencies...');
  execSync('npm install', { cwd: jalangiPath });
}

// Verify Jalangi2 installation
console.log('Verifying Jalangi2 installation...');
if (!fs.existsSync(jalangiMainPath)) {
  const errorMsg = 'Jalangi2 installation failed: Main script not found';
  console.error(errorMsg);
  fs.writeFileSync(outputFile, errorMsg);
  process.exit(1);
}

// Create a simple test file for verification
const testFilePath = path.join(__dirname, 'test-file.js');
fs.writeFileSync(testFilePath, 'console.log("Hello Jalangi2");');

// First test with a simple file to verify Jalangi2 works
try {
  console.log('Testing Jalangi2 with a simple file...');
  const testCommand = `node "${jalangiMainPath}" --inlineIID --inlineSource "${testFilePath}"`;
  execSync(testCommand, { encoding: 'utf8' });
  console.log('Jalangi2 basic test successful!');
  fs.unlinkSync(testFilePath); // Clean up test file
} catch (error) {
  console.error('Jalangi2 basic test failed:', error.message);
  if (error.stdout) console.log('Test output:', error.stdout);
  if (error.stderr) console.error('Test error:', error.stderr);
  fs.writeFileSync(outputFile, `Basic test failed:\n${error.message}\n\n${error.stderr || ''}`);
  process.exit(1);
}

// Run the analysis
console.log(`Analyzing ${fileToAnalyze} with Jalangi2...`);
try {
  const command = `node "${jalangiMainPath}" --inlineIID --inlineSource ` +
    `--analysis "${path.join(jalangiPath, 'src/js/sample_analyses/ChainedAnalyses.js')}" ` +
    `--analysis "${path.join(jalangiPath, 'src/js/sample_analyses/dlint/Utils.js')}" ` +
    `--analysis "${path.join(jalangiPath, 'src/js/sample_analyses/dlint/CheckNaN.js')}" ` +
    `--analysis "${path.join(jalangiPath, 'src/js/sample_analyses/dlint/ConcatUndefinedToString.js')}" ` +
    `"${fileToAnalyze}"`;
  
  console.log(`Running command: ${command}`);
  const output = execSync(command, { encoding: 'utf8' });
  console.log(output);
  
  // Save the output to a file
  fs.writeFileSync(outputFile, output);
  console.log(`Output saved to ${outputFile}`);
} catch (error) {
  console.error('Error running Jalangi2:', error.message);
  if (error.stdout) console.log('Command output:', error.stdout);
  if (error.stderr) console.error('Command error:', error.stderr);
  
  // Save any output even if there was an error
  if (error.stdout || error.stderr) {
    const errorOutput = `ERROR:\n${error.message}\n\nSTDOUT:\n${error.stdout || 'None'}\n\nSTDERR:\n${error.stderr || 'None'}`;
    fs.writeFileSync(outputFile, errorOutput);
    console.log(`Error output saved to ${outputFile}`);
  }
}