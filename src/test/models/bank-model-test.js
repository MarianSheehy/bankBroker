<<<<<<< HEAD
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlaces, testBanks, bray, howth, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Bank Model tests", () => {

  let brayList = null;

  setup(async () => {
    db.init("mongo");
    await db.placeStore.deleteAllPlaces();
    await db.bankStore.deleteAllBanks();
    brayList = await db.placeStore.addPlace(bray);
    for (let i = 0; i < testBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testBanks[i] = await db.bankStore.addBank(brayList._id, testBanks[i]);
    }
  });

  test("create single bank", async () => {
    const howthList = await db.placeStore.addPlace(howth);
    const bank = await db.bankStore.addBank(howthList._id, concerto)
    assert.isNotNull(bank._id);
    assertSubset (concerto, bank);
  });

  test("create multiple bankApi", async () => {
    const banks = await db.placeStore.getPlaceById(brayList._id);
    assert.equal(testBanks.length, testBanks.length)
  });

  test("delete all bankApi", async () => {
    const banks = await db.bankStore.getAllBanks();
    assert.equal(testBanks.length, banks.length);
    await db.bankStore.deleteAllBanks();
    const newBanks = await db.bankStore.getAllBanks();
    assert.equal(0, newBanks.length);
  });

  test("get a bank - success", async () => {
    const howthList = await db.placeStore.addPlace(howth);
    const bank = await db.bankStore.addBank(howthList._id, concerto)
    const newBank = await db.bankStore.getBankById(bank._id);
    assertSubset (concerto, newBank);
  });

  test("delete One Bank - success", async () => {
    const id = testBanks[0]._id;
    await db.bankStore.deleteBank(id);
    const banks = await db.bankStore.getAllBanks();
    assert.equal(banks.length, testPlaces.length - 1);
    const deletedBank = await db.bankStore.getBankById(id);
    assert.isNull(deletedBank);
  });

  test("get a place - bad params", async () => {
    assert.isNull(await db.bankStore.getBankById(""));
    assert.isNull(await db.bankStore.getBankById());
  });

  test("delete One User - fail", async () => {
    await db.bankStore.deleteBank("bad-id");
    const banks = await db.bankStore.getAllBanks();
    assert.equal(banks.length, testPlaces.length);
  });
=======
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlaces, testBanks, bray, howth, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Bank Model tests", () => {

  let brayList = null;

  setup(async () => {
    db.init("mongo");
    await db.placeStore.deleteAllPlaces();
    await db.bankStore.deleteAllBanks();
    brayList = await db.placeStore.addPlace(bray);
    for (let i = 0; i < testBanks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testBanks[i] = await db.bankStore.addBank(brayList._id, testBanks[i]);
    }
  });

  test("create single bank", async () => {
    const howthList = await db.placeStore.addPlace(howth);
    const bank = await db.bankStore.addBank(howthList._id, concerto)
    assert.isNotNull(bank._id);
    assertSubset (concerto, bank);
  });

  test("create multiple bankApi", async () => {
    const banks = await db.placeStore.getPlaceById(brayList._id);
    assert.equal(testBanks.length, testBanks.length)
  });

  test("delete all bankApi", async () => {
    const banks = await db.bankStore.getAllBanks();
    assert.equal(testBanks.length, banks.length);
    await db.bankStore.deleteAllBanks();
    const newBanks = await db.bankStore.getAllBanks();
    assert.equal(0, newBanks.length);
  });

  test("get a bank - success", async () => {
    const howthList = await db.placeStore.addPlace(howth);
    const bank = await db.bankStore.addBank(howthList._id, concerto)
    const newBank = await db.bankStore.getBankById(bank._id);
    assertSubset (concerto, newBank);
  });

  test("delete One Bank - success", async () => {
    const id = testBanks[0]._id;
    await db.bankStore.deleteBank(id);
    const banks = await db.bankStore.getAllBanks();
    assert.equal(banks.length, testPlaces.length - 1);
    const deletedBank = await db.bankStore.getBankById(id);
    assert.isNull(deletedBank);
  });

  test("get a place - bad params", async () => {
    assert.isNull(await db.bankStore.getBankById(""));
    assert.isNull(await db.bankStore.getBankById());
  });

  test("delete One User - fail", async () => {
    await db.bankStore.deleteBank("bad-id");
    const banks = await db.bankStore.getAllBanks();
    assert.equal(banks.length, testPlaces.length);
  });
>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
});