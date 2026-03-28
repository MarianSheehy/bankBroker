import mongoose from "mongoose";

export interface PlaidItemRecord {
  userId: string;
  itemId: string;
  accessToken: string;
  institutionId?: string | null;
  institutionName?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const plaidItemSchema = new mongoose.Schema<PlaidItemRecord>(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    institutionId: { type: String, default: null },
    institutionName: { type: String, default: null },
  },
  { timestamps: true }
);

plaidItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export const PlaidItem =
  mongoose.models.PlaidItem ||
  mongoose.model<PlaidItemRecord>("PlaidItem", plaidItemSchema);

export async function upsertPlaidItem(params: {
  userId: string;
  itemId: string;
  accessToken: string;
  cursor: string | null;
  institutionName?: string;
}): Promise<PlaidItemRecord> {
  const { userId, itemId, accessToken, cursor = null, institutionName } = params;

  const doc = await PlaidItem.findOneAndUpdate(
    { userId, itemId },
    { userId, itemId, accessToken, cursor, institutionName },
    { returnDocument: "after", upsert: true }
  ).lean<PlaidItemRecord>();

  if (!doc) {
    throw new Error("Failed to upsert Plaid item");
  }
  return doc;
}

export async function findPlaidItemByUserAndItem(
  userId: string,
  itemId: string
): Promise<PlaidItemRecord | null> {
  return PlaidItem.findOne({ userId, itemId })
    .lean<PlaidItemRecord>()
    .exec();
}

export async function updatePlaidItemCursor(
  userId: string,
  itemId: string,
  cursor: string
): Promise<void> {
  await PlaidItem.updateOne(
    { userId, itemId }, // from Plaid /item/public_token/exchange response
    {
      $set: {
        userId,
        itemId,
        accessToken,
        institutionId: metadata?.institution?.institution_id || null,
        institutionName: metadata?.institution?.name || null,
      },
    },
    { upsert: true }
  );
}
