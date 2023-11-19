import {AppResponse, Craftsman, CraftsmanResponse} from "@/types/utils";

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



export async function getCraftsmen (url: string, postalCode: string, craftsmen?: Craftsman[]) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/${url}?postalCode=${postalCode}`, {
    method:'GET',
  })
  const jsonData = await data.json() as AppResponse<CraftsmanResponse, boolean>
  if ("error" in jsonData) {
    throw new Error(`Request could not be completed. Please check the endpoint. Error ${jsonData.error}`)
  }
  return [...(craftsmen ?? []), ...jsonData.data.craftsmen]
}


type UpdateCraftmanInfo = {
  maxDrivingDistance?: number;
  profilePictureScore?: number;
  profileDescriptionScore?: number;
}

export async function updateCraftman (url: string, { arg }: { arg: UpdateCraftmanInfo }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
    method:'PATCH',
    body:JSON.stringify(arg)
  })
  const jsonData = await data.json() as AppResponse<CraftsmanResponse, boolean>
  if ("error" in jsonData) {
    throw new Error(`Request could not be completed. Please check the endpoint. Error ${jsonData.error}`)
  }
  return jsonData.data.craftsmen
}
