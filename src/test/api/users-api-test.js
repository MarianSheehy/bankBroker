import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { bankbrokerService } from "./bankbroker-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    bankbrokerService.clearAuth();
    await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
    await bankbrokerService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await bankbrokerService.createUser(testUsers[i]);
    }
    await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await bankbrokerService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await bankbrokerService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await bankbrokerService.deleteAllUsers();
    await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
    returnedUsers = await bankbrokerService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await bankbrokerService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await bankbrokerService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await bankbrokerService.deleteAllUsers();
    await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
    try {
      const returnedUser = await bankbrokerService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

