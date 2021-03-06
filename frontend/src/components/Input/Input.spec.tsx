import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  beforeEach(() => {
    render(<Input data-testid="a" />);
  });

  test('Expect input to render', () => {
    const text = screen.getByTestId('a');
    fireEvent.change(text, { target: { value: 'demo' } });
    expect(text).toHaveDisplayValue('demo');
  });
});
