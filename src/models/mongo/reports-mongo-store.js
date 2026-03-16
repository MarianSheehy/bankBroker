import { ReportsMongoose } from "./reports.js";

export const reportsMongoStore = {
  async find() {
    const reports = await ReportsMongoose.find().populate("user").populate("bank").lean();
    return reports;
  },

  async findBy(id) {
    const reports = await ReportsMongoose.find({ bank: id });
    return reports;
  },

  async add(report) {
    let newReport = new ReportsMongoose({ ...report });
    await newReport.save();
    newReport = await ReportsMongoose.findOne({ _id: newReport._id }).populate("bank").lean();
    return newReport;
  },

  async delete() {
    await ReportsMongoose.deleteMany({});
  },
};
