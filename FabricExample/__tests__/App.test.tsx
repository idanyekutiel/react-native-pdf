/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../PDFExample';

jest.mock('react-native-pdf', () => 'Pdf');

afterEach(() => jest.restoreAllMocks());

test('renders correctly', async () => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue({
    blob: async () => new Blob(),
  } as Response);
  jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:synthetic-pdf');
  jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
  });
  expect(renderer.toJSON()).not.toBeNull();
  await ReactTestRenderer.act(async () => renderer.unmount());
});
