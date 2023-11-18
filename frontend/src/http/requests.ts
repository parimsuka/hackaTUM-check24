import {AppResponse} from "@/types/utils";

export async function sendPostalCode(postalCode:string){
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
      return await getResponse.json() as AppResponse;
    } else {
      throw new Error(getResponse.statusText);
    }
  }
  catch (error) {
  }
}
