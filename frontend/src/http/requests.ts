import {AppResponse, CraftsmanResponse} from "@/types/utils";

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



export async function getCraftsmen (url: string) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/${url}`, {
    method:'GET',
  })
  const jsonData = await data.json() as AppResponse<CraftsmanResponse, boolean>
  if ("error" in jsonData) {
    throw new Error(`Request could not be completed. Please check the endpoint. Error ${jsonData.error}`)
  }
  return jsonData.data.craftsmen
}