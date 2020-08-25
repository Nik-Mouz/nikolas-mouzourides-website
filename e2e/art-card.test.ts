import { Selector } from "testcafe";

fixture`Art cards`
  .page`http://localhost:8000/`;

test("Art cards should be visible", async t => {
  await t
    .navigateTo("/art")
    .expect(Selector("[data-acctest='content-card']").count).gt(3);
});
