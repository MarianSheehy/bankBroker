import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateBankPage";
import BankReview from "../components/bankReview";

const bankReviewPage: React.FC = () => {
  const { state : {bank, review } } = useLocation()
  return (
    <PageTemplate bank={bank}>
      <BankReview {...review} />
    </PageTemplate>
  );
};

export default bankReviewPage;
