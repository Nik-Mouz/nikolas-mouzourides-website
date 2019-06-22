import { Selector } from "testcafe";

fixture`Navigation`
  .page`http://localhost:8000/`;

test("The navigation bar should display desktop components when on desktop viewport", async t => {
  await t.expect(Selector(".no-display-mobile").visible).ok();
});

test("The navigation bar should display mobile components when on mobile viewport", async t => {
  const mobileMenu = Selector("[data-acctest='mobile-menu']");
  const mobileDrawer = Selector("[data-acctest='mobile-drawer']");

  await t
    .resizeWindowToFitDevice('iPhone 6', { portraitOrientation: true })
    .expect(mobileMenu.visible).ok()
    .click(mobileMenu)
    .expect(mobileDrawer.visible).ok()
    .click(Selector("[data-acctest='drawer-close']"))
    .expect(mobileDrawer.exists).notOk();
});