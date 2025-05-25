import { EventEmitter } from "events";
import { assert } from "chai";
import { birdwatchService } from "./birdwatch-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, howth, testPlaces } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Place API tests", () => {
  let user = null;

  setup(async () => {
    birdwatchService.clearAuth();
    user = await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    await birdwatchService.deleteAllPlaces();
    await birdwatchService.deleteAllUsers();
    user = await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    howth.userid = user._id;
  });

  teardown(async () => {});

  test("create place", async () => {
    const returnedPlace = await birdwatchService.createPlace(howth);
    assert.isNotNull(returnedPlace);
    assertSubset(howth, returnedPlace);
  });

  test("delete a place", async () => {
    const place = await birdwatchService.createPlace(howth);
    const response = await birdwatchService.deletePlace(place._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlace = await birdwatchService.getPlace(place.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Place with this id", "Incorrect Response Message");
    }
  });

  test("create multiple places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      testPlaces[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await birdwatchService.createPlace(testPlaces[i]);
    }
    let returnedLists = await birdwatchService.getAllPlaces();
    assert.equal(returnedLists.length, testPlaces.length);
    await birdwatchService.deleteAllPlaces();
    returnedLists = await birdwatchService.getAllPlaces();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant place", async () => {
    try {
      const response = await birdwatchService.deletePlace("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Place with this id", "Incorrect Response Message");
    }
  });
});