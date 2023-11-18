import ListItem from "@/components/listItem";

export default function Home() {
  const craftmen = [
    {
      id: "0",
      name: "Omar",
      ranking: 460,
      address: "8320,rosenheim"
    },
    {
      id: "1",
      name: "Ahmed",
      ranking: 212,
      address: "8320, berlin"
    },
    {
      id: "2",
      name: "parim",
      ranking: 300,
      address: "8320,swag"

    }
  ];
  return (
    <div className="flex bg-view-main min-h-full w-full">
      <div className="px-16 py-28 w-full">
        <h3 className="font-semibold mb-4">
                Hello citizen, from
            </h3>
        <h5 className="font-bold text-2xl">
              Rosenheim, Kapuzinerweg 4
            </h5>
        <div className="pl-8 mt-16">
          <ul className="grid gap-y-20">
            {craftmen.map((value, index) => {
              return (
                <ListItem
                  name={value.name}
                  address={value.address}
                  key={index}
                  ranking={value.ranking}
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

