// src/models/mongo/plaid-transaction-store.ts
import mongoose from "mongoose";

export interface PlaidTransactionRecord {
  userId: string;
  itemId: string;
  accountId: string;
  transactionId: string;
  amount: number;
  isoCurrencyCode?: string | null;
  date: string;
  name: string;
  merchantName?: string | null;
  pending: boolean;
  raw: any;
  createdAt: Date;
  updatedAt: Date;
}

const plaidTransactionSchema = new mongoose.Schema<PlaidTransactionRecord>(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    accountId: { type: String, required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    isoCurrencyCode: { type: String, default: null },
    date: { type: String, required: true },
    name: { type: String, required: true },
    merchantName: { type: String, default: null },
    pending: { type: Boolean, required: true },
    raw: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true } // createdAt, updatedAt [web:159][web:168]
);

// Unique per user/item/transaction
plaidTransactionSchema.index(
  { userId: 1, itemId: 1, transactionId: 1 },
  { unique: true }
);

export const PlaidTransaction =
  mongoose.models.PlaidTransaction ||
  mongoose.model<PlaidTransactionRecord>(
    "PlaidTransaction",
    plaidTransactionSchema
  );

export async function upsertPlaidTransactions(
  userId: string,
  itemId: string,
  transactions: any[]
): Promise<void> {
  if (!transactions.length) return;

  const now = new Date();

  const bulkOps = transactions.map((t) => ({
    updateOne: {
      filter: { userId, itemId, transactionId: t.transaction_id },
      update: {
        $set: {
          userId,
          itemId,
          accountId: t.account_id,
          transactionId: t.transaction_id,
          amount: t.amount,
          isoCurrencyCode: t.iso_currency_code ?? null,
          date: t.date,
          name: t.name,
          merchantName: t.merchant_name ?? null,
          pending: t.pending,
          raw: t,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      upsert: true,
    },
  }));

  await PlaidTransaction.bulkWrite(bulkOps, { ordered: false });
}

export async function markPlaidTransactionsRemoved(
  userId: string,
  itemId: string,
  removed: { transaction_id: string }[]
): Promise<void> {
  if (!removed.length) return;

  const ids = removed.map((r) => r.transaction_id);

  await PlaidTransaction.updateMany(
    { userId, itemId, transactionId: { $in: ids } },
    {
      $set: {
        pending: false,
        updatedAt: new Date(),
      },
    }
  ).exec();
}
