import { GameStatus } from '@/modules/pokemon/interfaces/game-status.enum';

describe('GameStatus Enum Interface', () => {
  test('should have a status of playing', () => {
    expect(GameStatus.playing).toBe('playing');
  });

  test('should have a status of won', () => {
    expect(GameStatus.won).toBe('won');
  });

  test('should have a status of lost', () => {
    expect(GameStatus.lost).toBe('lost');
  });
});
