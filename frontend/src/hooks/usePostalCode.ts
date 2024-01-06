import {useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";


export const usePostalCode = (): [string, boolean] => {
    const params = useSearchParams()
    const [postalCode] = useState(params?.get('postalCode') ?? '')
    const [codeChanged, setCodeChanged] = useState(false)

    useEffect(() => {
        if (postalCode !== localStorage.getItem('postalCode') && postalCode) {
            localStorage.setItem('postalCode', postalCode)
            setCodeChanged(true);

            setTimeout(() => setCodeChanged(false), 0)
        }
    }, []);

    return [postalCode, codeChanged];
}