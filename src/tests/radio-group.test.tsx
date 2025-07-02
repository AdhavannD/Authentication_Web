import { render, screen } from '@testing-library/react';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

describe('RadioGroup', () => {
  it('renders radio items', () => {
    render(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioGroupItem value="a" id="a" />
        <RadioGroupItem value="b" id="b" />
      </RadioGroup>
    );
    // Check that there are 2 radio buttons rendered
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
  });
});
