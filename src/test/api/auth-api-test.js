import { assert } from "chai";
import { birdwatchService } from "./birdwatch-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    birdwatchService.clearAuth();
    await birdwatchService.createUser(maggie);
    await birdwatchService.authenticate(maggieCredentials);
    await birdwatchService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await birdwatchService.createUser(maggie);
    const response = await birdwatchService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await birdwatchService.createUser(maggie);
    const response = await birdwatchService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    birdwatchService.clearAuth();
    try {
      await birdwatchService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
