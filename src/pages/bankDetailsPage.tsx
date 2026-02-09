import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import BankDetails from "../components/bankDetails";
import PageTemplate from "../components/templateBankPage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { BankDetailsProps } from "../types/interfaces";

const bankDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: bank, error, isLoading, isError } = useQuery<BankDetailsProps, Error>(
    ["bank", id],
    ()=> getbank(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {bank ? (
        <>
        <PageTemplate bank={bank}> 
          <BankDetails {...bank} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for bank details</p>
    )}
    </>
  );
};

export default bankDetailsPage;






function getbank(_arg0: string): BankDetailsProps | Promise<BankDetailsProps> {
  throw new Error("Function not implemented.");
}

