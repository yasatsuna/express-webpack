import adder from '../adder.js'
describe('Adder', () => {
  test('adds two numbers', () => {
    expect(adder(5, 3)).toEqual(8)
  })
})