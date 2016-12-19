import { BloodDonationXoverWebappPage } from './app.po';

describe('blood-donation-xover-webapp- App', function() {
  let page: BloodDonationXoverWebappPage;

  beforeEach(() => {
    page = new BloodDonationXoverWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
