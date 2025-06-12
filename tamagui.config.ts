import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

const config = createTamagui({
  shorthands,
  themes,
  tokens,
  fonts: {
    heading: {
      family: 'System',
      size: { 1: 20 },
      weight: { 1: '400' },
    },
    body: {
      family: 'System',
      size: { 1: 16 },
      weight: { 1: '400' },
    },
  },
});

export default config;