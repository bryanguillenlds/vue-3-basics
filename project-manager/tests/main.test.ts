vi.mock('@/router', () => ({
  default: 'router'
}));

vi.mock('pinia', async (originalImport) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const module: any = await originalImport();

  return {
    ...module,
    createPinia: vi.fn().mockReturnValue('pinia')
  };
});

describe('main', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vue = require('vue');

  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createApp = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy
  });

  vue.createApp = createApp;

  test('should initialize with pinia and router', async () => {
    // When Javascript imports and runs the line to import Vue, it notices we already
    // have a vue module in the cache and uses that instead.
    await import('@/main');

    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');
    expect(useSpy).toHaveBeenCalledWith('router');
  });
});
