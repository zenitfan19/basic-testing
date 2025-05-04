import { getBankAccount, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);

    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);

    expect(() => account.withdraw(1200)).toThrow(
      'Insufficient funds: cannot withdraw more than 1000',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    const secondAccount = getBankAccount(500);

    expect(() => account.transfer(1200, secondAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 1000',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);

    expect(() => account.transfer(1200, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(500);

    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(500);

    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const account = getBankAccount(1000);
    const secondAccount = getBankAccount(500);

    account.transfer(200, secondAccount);

    expect(secondAccount.getBalance()).toBe(700);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(1000);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(2000);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(2000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
