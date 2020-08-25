import { Selector } from "testcafe";

fixture`Blog cards`
  .page`http://localhost:8000/`;

test("Blog cards should be less than or equal to 3 on the home page", async t => {
  await t.expect(Selector("[data-acctest='content-card']").count).eql(3);
});

test("Blog cards should be visible", async t => {
  await t
    .navigateTo("/blog")
    .expect(Selector("[data-acctest='content-card']").count).gt(3);
});
