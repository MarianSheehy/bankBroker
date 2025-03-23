import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlaces, testBirds, bray, howth, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Bird Model tests", () => {

  let brayList = null;

  setup(async () => {
    db.init("mongo");
    await db.placeStore.deleteAllPlaces();
    await db.birdStore.deleteAllBirds();
    brayList = await db.placeStore.addPlace(bray);
    for (let i = 0; i < testBirds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testBirds[i] = await db.birdStore.addBird(brayList._id, testBirds[i]);
    }
  });

  test("create single bird", async () => {
    const howthList = await db.placeStore.addPlace(howth);
    const bird = await db.birdStore.addBird(howthList._id, concerto)
    assert.isNotNull(bird._id);
    assertSubset (concerto, bird);
  });

  test("create multiple birdApi", async () => {
    const birds = await db.placeStore.getPlaceById(brayList._id);
    assert.equal(testBirds.length, testBirds.length)
  });

  test("delete all birdApi", async () => {
    const birds = await db.birdStore.getAllBirds();
    assert.equal(testBirds.length, birds.length);
    await db.birdStore.deleteAllBirds();
    const newBirds = await db.birdStore.getAllBirds();
    assert.equal(0, newBirds.length);
  });

  test("get a bird - success", async () => {
    const howthList = await db.placeStore.addPlace(howth);
    const bird = await db.birdStore.addBird(howthList._id, concerto)
    const newBird = await db.birdStore.getBirdById(bird._id);
    assertSubset (concerto, newBird);
  });

  test("delete One Bird - success", async () => {
    const id = testBirds[0]._id;
    await db.birdStore.deleteBird(id);
    const birds = await db.birdStore.getAllBirds();
    assert.equal(birds.length, testPlaces.length - 1);
    const deletedBird = await db.birdStore.getBirdById(id);
    assert.isNull(deletedBird);
  });

  test("get a place - bad params", async () => {
    assert.isNull(await db.birdStore.getBirdById(""));
    assert.isNull(await db.birdStore.getBirdById());
  });

  test("delete One User - fail", async () => {
    await db.birdStore.deleteBird("bad-id");
    const birds = await db.birdStore.getAllBirds();
    assert.equal(birds.length, testPlaces.length);
  });
});