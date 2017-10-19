import { AliceDc1Page } from './app.po';

describe('alice-dc1 App', function() {
  let page: AliceDc1Page;

  beforeEach(() => {
    page = new AliceDc1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
