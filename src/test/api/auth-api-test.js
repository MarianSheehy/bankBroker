import { assert } from "chai";
import { bankbrokerService } from "./bankbroker-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    bankbrokerService.clearAuth();
    await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
    await bankbrokerService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await bankbrokerService.createUser(maggie);
    const response = await bankbrokerService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await bankbrokerService.createUser(maggie);
    const response = await bankbrokerService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    bankbrokerService.clearAuth();
    try {
      await bankbrokerService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
