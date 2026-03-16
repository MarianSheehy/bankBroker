import type { Report, ReportStore } from "../../types/report-types.js";
import { ReportMongoose } from "./report.js";

export const reportStore: ReportStore = {
  async find(): Promise<Report[]> {
    const reports = await ReportMongoose.find()
      .populate("donor")
      .populate("bank")
      .lean();

    return reports.map((report) => ({
      ...report,
      donor: typeof report.donor === "object" && report.donor !== null
        ? `${(report.donor as any).firstName} ${(report.donor as any).lastName}`
        : String(report.donor),
    })) as Report[];
  },

  async findBy(id: string): Promise<Report | null> {
    const report = await ReportMongoose.findOne({ bank: id });
    return report as Report | null;
  },

  async add(report: Partial<Report>): Promise<Report | null> {
    const newReport = new ReportMongoose({ ...report });
    await newReport.save();
    return newReport.toObject() as Report;
  },

  async delete(): Promise<void> {
    await ReportMongoose.deleteMany({});
  },
};
