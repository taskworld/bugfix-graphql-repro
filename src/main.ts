import { spawn } from 'child_process';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

bootstrap().then(
  () =>
    new Promise<void>((resolve, reject) => {
      const childProcess = spawn(
        'npx',
        [
          '--yes',
          `@apollo/rover subgraph introspect http://localhost:${PORT}/graphql`,
          '> ./schema.graphql',
        ],
        {
          shell: true,
          stdio: 'inherit',
          cwd: process.cwd(),
        },
      );

      childProcess.on('exit', (result) => {
        if (childProcess.exitCode !== null && childProcess.exitCode > 0) {
          return reject(new Error('GraphQL schema introspection failed'));
        }

        return resolve();
      });
    }),
);
