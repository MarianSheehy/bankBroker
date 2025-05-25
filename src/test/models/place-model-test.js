import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlaces, howth } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.placeStore.deleteAllPlaces();
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(testPlaces[i]);
    }
  });

  test("create a place", async () => {
    const place = await db.placeStore.addPlace(howth);
    assertSubset(howth, place);
    assert.isDefined(place._id);
  });

  test("delete all places", async () => {
    let returnedPlaces = await db.placeStore.getAllPlaces();
    assert.equal(returnedPlaces.length, 3);
    await db.placeStore.deleteAllPlaces();
    returnedPlaces = await db.placeStore.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("get a place - success", async () => {
    const place = await db.placeStore.addPlace(howth);
    const returnedPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset(howth, place);
  });

  test("delete One Playist - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlaceById(id);
    const returnedPlaces = await db.placeStore.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a place - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete One Place - fail", async () => {
    await db.placeStore.deletePlaceById("bad-id");
    const allPlaces = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, allPlaces.length);
  });
});