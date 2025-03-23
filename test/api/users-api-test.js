import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { birdwatchService } from "./birdwatch-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    birdwatchService.clearAuth();
    await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    await birdwatchService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await birdwatchService.createUser(testUsers[i]);
    }
    await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await birdwatchService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await birdwatchService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await birdwatchService.deleteAllUsers();
    await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    returnedUsers = await birdwatchService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await birdwatchService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await birdwatchService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await birdwatchService.deleteAllUsers();
    await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    try {
      const returnedUser = await birdwatchService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

