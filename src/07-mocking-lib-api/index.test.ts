import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let createSpy: jest.SpyInstance;
  let getSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    createSpy = jest.spyOn(axios, 'create');
    getSpy = jest.spyOn(axios.Axios.prototype, 'get');
    jest.runOnlyPendingTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('todos/1');

    expect(createSpy).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('todos/1');

    expect(getSpy).toHaveBeenCalledWith('todos/1');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('todos/1');

    expect(result).toStrictEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false
    });
  });
});
