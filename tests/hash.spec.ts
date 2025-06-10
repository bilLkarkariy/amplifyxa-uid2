/* eslint-disable import/extensions */
import { hash } from '../src/hash';

describe('hash()', () => {
  const salt = 'somesalt';

  it('is deterministic ignoring case/space', () => {
    expect(hash(' A@b.com ', salt)).toBe(hash('a@B.COM', salt));
  });

  it('differs with salt', () => {
    expect(hash('x@y.z', 's1')).not.toBe(hash('x@y.z', 's2'));
  });
});
