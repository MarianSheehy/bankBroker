import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { bankbrokerService } from "./bankbroker-service.js";
import { maggie, howth, testPlaces, testBanks, concerto, maggieCredentials } from "../fixtures.js";

suite("Bank API tests", () => {
  let user = null;
  let brayHarbour = null;

  setup(async () => {
    bankbrokerService.clearAuth();
    user = await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
    await bankbrokerService.deleteAllPlaces();
    await bankbrokerService.deleteAllBanks();
    await bankbrokerService.deleteAllUsers();
    user = await bankbrokerService.createUser(maggie);
    await bankbrokerService.authenticate(maggieCredentials);
    howth.userid = user._id;
    brayHarbour = await bankbrokerService.createPlace(bray);
  });

  teardown(async () => {});

  test("create bank", async () => {
    const returnedBank = await bankbrokerService.createBank(brayHarbour._id, concerto);
    assertSubset(concerto, returnedBank);
  });

  test("create Multiple banks", async () => {
    for (let i = 0; i < testBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await bankbrokerService.createBank(brayHarbour._id, testBanks[i]);
    }
    const returnedBanks = await bankbrokerService.getAllBanks();
    assert.equal(returnedBanks.length, testBanks.length);
    for (let i = 0; i < returnedBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const bank = await bankbrokerService.getBank(returnedBanks[i]._id);
      assertSubset(bank, returnedBanks[i]);
    }
  });

  test("Delete BankApi", async () => {
    for (let i = 0; i < testBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await bankbrokerService.createBank(brayHarbour._id, testBanks[i]);
    }
    let returnedBanks = await bankbrokerService.getAllBanks();
    assert.equal(returnedBanks.length, testBanks.length);
    for (let i = 0; i < returnedBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const bank = await bankbrokerService.deleteBank(returnedBanks[i]._id);
    }
    returnedBanks = await bankbrokerService.getAllBanks();
    assert.equal(returnedBanks.length, 0);
  });

  test("denormalised place", async () => {
    for (let i = 0; i < testBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await bankbrokerService.createBank(brayHarbour._id, testBanks[i]);
    }
    const returnedPlace = await bankbrokerService.getPlace(brayHarbour._id);
    assert.equal(returnedPlace.banks.length, testBanks.length);
    for (let i = 0; i < testBanks.length; i += 1) {
      assertSubset(testBanks[i], returnedPlace.banks[i]);
    }
  });
});