import ListItem from "@/components/listItem";
import {AppResponse, CraftsmanResponse} from "@/types/utils";


export async function  getCraftsmen() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/get-data`)
  const jsonData = await data.json() as AppResponse<CraftsmanResponse, boolean>
  if ("error" in jsonData) {
    throw new Error(`Request could not be completed. Please check the endpoint. Error ${jsonData.error}`)
  }
  return jsonData.data.craftsmen
}

export default async function Home() {
  const craftsmen = await getCraftsmen()
  return (
    <div className="flex bg-view-main min-h-full w-full">
      <div className="px-16 py-28 w-full">
        <h3 className="font-semibold mb-4">
                Hello citizen, from
            </h3>
        <h5 className="font-bold text-2xl">
              Rosenheim, Kapuzinerweg 4
            </h5>
        <div className="mt-16">
          <ul className="grid gap-y-10">
            {craftsmen.map((value, index) => {
              return (
                <ListItem
                  name={value.name}
                  key={index}
                  ranking={value.rankingScore}
                />
              )
            })}
          </ul>
        </div>
        <div style={{textAlignLast: "center"}} className="mt-[5.8rem]">
          <button
            className="bg-button-secondary  text-button-text rounded-[12px] w-[22.625rem] h-[4.5rem]">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}

