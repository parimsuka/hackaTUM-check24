export async function getPostalCode(postalCode:string){
    try {
        const getResponse = await fetch(
            `api/set-postal-code?postalCode=${postalCode}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
        );
        if (getResponse.status === 200) {
            return await getResponse.json();
        } else {
            throw new Error(getResponse.statusText);
        }

    }
    catch (error) {
    }
}
