import { OpticalProgram.UIPage } from './app.po';

describe('optical-program.ui App', () => {
  let page: OpticalProgram.UIPage;

  beforeEach(() => {
    page = new OpticalProgram.UIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
