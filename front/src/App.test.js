import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/star', () => () => <div data-testid="star-field" />);
jest.mock('./components/SkillConstellation', () => () => (
  <div data-testid="skill-constellation">Constellation interactive</div>
));

test('renders the portfolio skills and credentials', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /compétences/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /codinGame — java/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /cfc suisse/i })).toBeInTheDocument();
});
