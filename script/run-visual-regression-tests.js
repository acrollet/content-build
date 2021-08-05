const { spawn } = require('child_process');

const previewServer = spawn('node script/template-server.js', [], {
  shell: true,
  stdio: 'inherit',
});
const child = spawn(
  'cypress run --config-file config/cypress.json --spec src/site/layouts/tests/visual_regression_testing/*spec.js --env updateSnapshots=true',
  [],
  { shell: true, stdio: 'inherit' },
);

child.on('exit', code => {
  previewServer.kill();
  process.exit(code);
});

// When we ^C out of the parent Node script, also interrupt the child
process.on('SIGINT', () => {
  child.kill('SIGINT');
  previewServer.kill('SIGINT');
});
