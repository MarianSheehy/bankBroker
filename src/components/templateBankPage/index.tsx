import React from "react";
import BankHeader from "../headerBank";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { BankImage, BankDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplateBankPageProps {
    bank: BankDetailsProps;
    children: React.ReactElement;
}


const TemplateBankPage: React.FC<TemplateBankPageProps> = ({bank, children}) => {
    const { data, error, isLoading, isError } = useQuery<BankImage[], Error>(
        ["images", bank.id],
        () => getbankImages(bank.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as BankImage[];

    return (
        <>
            <BankHeader {...bank} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: BankImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateBankPage;
function getbankImages(_id: number): BankImage[] | Promise<BankImage[]> {
    throw new Error("Function not implemented.");
}

