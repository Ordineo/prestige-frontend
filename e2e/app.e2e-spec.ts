import { PrestigeFrontendPage } from './app.po';

describe('prestige-frontend App', () => {
  let page: PrestigeFrontendPage;

  beforeEach(() => {
    page = new PrestigeFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
