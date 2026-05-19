import { describe, expect, test } from 'vitest';
import { bbaMock, ecosystemMock } from '../src/data/mock';

describe('mock data exports', () => {
  test('exports Axodus ecosystem and BBA data', () => {
    expect(ecosystemMock.overview).toBeDefined();
    expect(bbaMock.summary.nucleus).toBe('Blockchain Business & Advertising');
  });
});
