import { defineConfig } from './lib';
import { buildConfig } from './config';

const config = buildConfig();

export default defineConfig(config);
