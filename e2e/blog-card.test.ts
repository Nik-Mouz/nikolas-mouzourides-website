import { Selector } from "testcafe";

fixture`Blog cards`
  .page`http://localhost:8000/`;

test("Blog cards should be less than or equal to 3 on the home page", async t => {
  await t.expect(Selector("[data-acctest='blog-card']").count).eql(3);
});

test("Blog cards should be equal to the amount of blogs written", async t => {
  await t
    .navigateTo("/blog")
    .expect(Selector("[data-acctest='blog-card']").count).gt(3);
});
