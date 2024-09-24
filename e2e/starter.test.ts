import {expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('shoould show elements on login page', async () => {
    await expect(element(by.label('Welcome Back!'))).toBeVisible();
    await expect(element(by.id('GoogleSigninButton'))).toBeVisible();
  });

  it('should show elements on home page', async () => {
    await element(by.id('GoogleSigninButton')).tap();
    await expect(element(by.id('search-bar'))).toBeVisible();
    await expect(element(by.id('flash-list'))).toBeVisible();
  });

  it('should use search properly', async () => {
    await element(by.id('GoogleSigninButton')).tap();
    await element(by.id('search-bar')).typeText('popcat');
    await element(by.id('search-button')).tap();
    await expect(element(by.text('Popcat'))).toBeVisible();
    await expect(element(by.text('Coins have been updated'))).toBeVisible();
  });

  it('should remove a coin from the list', async () => {
    await element(by.id('GoogleSigninButton')).tap();
    await element(by.text('Bitcoin')).swipe('left');
    const deleteButtons = element(by.id('delete-button'));
    await deleteButtons.atIndex(0).tap();
    await expect(element(by.text('Bitcoin'))).not.toBeVisible();
  });
});
