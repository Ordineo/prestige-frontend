import { PrestigeFrontendPage } from './app.po';

describe('endorsement-frontend App', () => {
  let page: PrestigeFrontendPage;

  beforeEach(() => {
    page = new PrestigeFrontendPage();
  });

  it('should exist', () => {
    page.navigateTo();
    expect(page).toBeDefined();
  });

  // it('should display message saying app works', () => {
  //   page.navigateTo();
  //   expect(page.getParagraphText()).toEqual('app works!');
  // });
});
