import { validURL } from './urlChecker';

test('It should be a function', () => {
  expect(typeof validURL).toBe("function");
});

