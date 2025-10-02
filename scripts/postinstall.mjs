import { execSync } from 'node:child_process';

const command = 'npx shadcn-ui init -y';

try {
  execSync(command, {
    stdio: 'inherit',
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`Skipping shadcn-ui postinstall step: ${message}`);
}
