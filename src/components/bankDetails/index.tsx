import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { BankDetailsProps } from "../../types/interfaces";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
    avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const bankDetails: React.FC<BankDetailsProps> = (bank) => {

    const [] = useState(false); // New

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {bank.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {bank.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${bank.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${bank.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${bank.vote_average} (${bank.vote_count})`}
                />
                <Chip label={`Released: ${bank.release_date}`} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Countries" sx={styles.chipLabel} color="primary" />
                </li>
                {bank.production_countries.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
        </>
    );
};
export default bankDetails;
