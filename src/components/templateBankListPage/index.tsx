import React from "react";
import Header from "../headerbankList";
import Grid from "@mui/material/Grid";
import bankList from "../bankList";
import { BasebankProps} from "../../types/interfaces";

interface bankListPageTemplateProps {
  banks: BasebankProps[];
  title: string;
  action: (m: BasebankProps) => React.ReactNode;
}

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const bankListPageTemplate: React.FC<bankListPageTemplateProps> = ({ banks, title, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <bankList action={action} banks={banks}></bankList>
      </Grid>
    </Grid>
  );
}
export default bankListPageTemplate;

