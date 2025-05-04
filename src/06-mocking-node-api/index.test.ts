import fs from 'node:fs';
import path from 'node:path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  let timeoutSpy: jest.SpyInstance;
  let callback: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout');
    callback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, 1000);

    expect(timeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let intervalSpy: jest.SpyInstance;
  let callback: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    intervalSpy = jest.spyOn(global, 'setInterval');
    callback = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, 1000);

    expect(intervalSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  let existsSyncSpy: jest.SpyInstance;
  let readFileSpy: jest.SpyInstance;
  let joinSpy: jest.SpyInstance;

  beforeEach(() => {
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    readFileSpy = jest.spyOn(fs.promises, 'readFile');
    joinSpy = jest.spyOn(path, 'join');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('file.txt');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    existsSyncSpy.mockReturnValue(false);
    const result = await readFileAsynchronously('nonExistingFile.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    existsSyncSpy.mockResolvedValue(true);
    readFileSpy.mockResolvedValue(Buffer.from('file content'));
    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('file content');
  });
});
