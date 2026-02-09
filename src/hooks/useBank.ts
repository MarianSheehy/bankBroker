import { useEffect, useState } from "react";
import { bankDetailsProps } from '../types/interfaces';

const usebank = (id: string) => {
    const [bank, setbank] = useState<bankDetailsProps>();
    useEffect(() => {
        getbank(id).then(bank => {
            setbank(bank);
        });
    }, [id]);
    return [bank, setbank] as const;
};

export default usebank
