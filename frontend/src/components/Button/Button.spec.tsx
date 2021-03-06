import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  beforeEach(() => {
    render(<Button>abc</Button>);
  });

  test('Expect button to render', () => {
    const text = screen.getByText(/abc/i);
    expect(text).toBeInTheDocument();
  });
});
