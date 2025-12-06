import { describe, expect, test } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { Comp } from '../../src/comp';
import { useImmer } from '../../src/hooks/useImmer';


describe('Comp component', () => {
  test('renders hi text', () => {
    const html = renderToStaticMarkup(<Comp />);
    expect(html).toContain('<div>hi, shasha</div>');
  });

  test('updates name via useImmer + useEffect', async () => {
    const container = document.createElement('div');
    const root = createRoot(container);

    await act(async () => {
      root.render(<Comp />);
    });

    expect(container.textContent).toContain('hi, shasha1');

    await act(async () => {
      root.unmount();
    });
  });
});


// hooks

type ImmerResult<T> = ReturnType<typeof useImmer<T>>;

const renderUseImmerHook = <T,>(initialValue: T) => {
  const result: { current: ImmerResult<T> } = {
    current: null as unknown as ImmerResult<T>,
  };

  function HookTester() {
    result.current = useImmer(initialValue);
    return null;
  }

  const container = document.createElement('div');
  const root = createRoot(container);

  act(() => {
    root.render(<HookTester />);
  });

  return {
    result,
    cleanup: () =>
      act(() => {
        root.unmount();
      }),
  };
};

describe('useImmer hook', () => {
  test('initializes state correctly', () => {
    const { result, cleanup } = renderUseImmerHook({ name: 'shasha' });
    expect(result.current[0]).toEqual({ name: 'shasha' });
    cleanup();
  });

  test('updates state through draft function', () => {
    const { result, cleanup } = renderUseImmerHook({ name: 'shasha' });
    act(() => {
      result.current[1]((draft) => {
        draft.name = 'updated';
      });
    });
    expect(result.current[0]).toEqual({ name: 'updated' });
    cleanup();
  });
});
