import { Selector } from "testcafe";

fixture`Navigation`
  .page`http://localhost:8000/`;

test("The navigation bar should display desktop components when on desktop viewport", async t => {
  await t.expect(Selector(".no-display-mobile").visible).ok();
});

test("The navigation bar should display mobile components when on mobile viewport", async t => {
  await t
    .resizeWindow(375, 667)
    .wait(500)
    .expect(Selector("[data-acctest='mobile-menu']").visible).ok()
    .click(Selector("[data-acctest='mobile-menu']"))
    .expect(Selector("[data-acctest='mobile-drawer']").visible).ok()
    .click(Selector("[data-acctest='drawer-close']"))
    .expect(Selector("[data-acctest='mobile-drawer']").exists).notOk();
});