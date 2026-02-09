import React from "react";
import Bank from "../bankCard/";
import Grid from "@mui/material/Grid";
import { BasebankListProps } from "../../types/interfaces";

const bankList: React.FC<BasebankListProps> = ({banks, action}) => {
  const bankCards = banks.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Bank key={m.id} bank={m} action={action}/>
    </Grid>
  ));
  return bankCards;
}

  export default bankList;
