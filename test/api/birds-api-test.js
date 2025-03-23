import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { birdwatchService } from "./birdwatch-service.js";
import { maggie, howth, testPlaces, testBirds, concerto, maggieCredentials } from "../fixtures.js";

suite("Bird API tests", () => {
  let user = null;
  let brayHarbour = null;

  setup(async () => {
    birdwatchService.clearAuth();
    user = await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    await birdwatchService.deleteAllPlaces();
    await birdwatchService.deleteAllBirds();
    await birdwatchService.deleteAllUsers();
    user = await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    howth.userid = user._id;
    brayHarbour = await birdwatchService.createPlace(bray);
  });

  teardown(async () => {});

  test("create bird", async () => {
    const returnedBird = await birdwatchService.createBird(brayHarbour._id, concerto);
    assertSubset(concerto, returnedBird);
  });

  test("create Multiple birds", async () => {
    for (let i = 0; i < testBirds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await birdwatchService.createBird(brayHarbour._id, testBirds[i]);
    }
    const returnedBirds = await birdwatchService.getAllBirds();
    assert.equal(returnedBirds.length, testBirds.length);
    for (let i = 0; i < returnedBirds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const bird = await birdwatchService.getBird(returnedBirds[i]._id);
      assertSubset(bird, returnedBirds[i]);
    }
  });

  test("Delete BirdApi", async () => {
    for (let i = 0; i < testBirds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await birdwatchService.createBird(brayHarbour._id, testBirds[i]);
    }
    let returnedBirds = await birdwatchService.getAllBirds();
    assert.equal(returnedBirds.length, testBirds.length);
    for (let i = 0; i < returnedBirds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const bird = await birdwatchService.deleteBird(returnedBirds[i]._id);
    }
    returnedBirds = await birdwatchService.getAllBirds();
    assert.equal(returnedBirds.length, 0);
  });

  test("denormalised place", async () => {
    for (let i = 0; i < testBirds.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await birdwatchService.createBird(brayHarbour._id, testBirds[i]);
    }
    const returnedPlace = await birdwatchService.getPlace(brayHarbour._id);
    assert.equal(returnedPlace.birds.length, testBirds.length);
    for (let i = 0; i < testBirds.length; i += 1) {
      assertSubset(testBirds[i], returnedPlace.birds[i]);
    }
  });
});