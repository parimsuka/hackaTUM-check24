"use client"
import ListItem from "@/components/listItem";
import {getCraftsmen} from "@/http/requests";
import LoadMoreButton from "@/components/load-more-button";
import Navbar from "@/components/nav-bar";
import useSWR from "swr";

export default function Home() {
  const { data, error, mutate, isLoading  } = useSWR('/api/get-data', getCraftsmen)
  const loadMoreData = async () => {
    await mutate()
  }

  if (error || isLoading) {
    return null
  }

  return (
    <div className="flex bg-view-main min-h-full w-full">
      <div className="px-16 py-28 w-full">
        <Navbar greetings="Hello citizen, from Rosenheim" message="Meet local expertise"/>
        <div className="mt-16">
          <ul className="grid gap-y-10">
            {data?.map((value, index) => {
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
          <LoadMoreButton text={'Load More'} onClick={loadMoreData} />
        </div>
      </div>
    </div>
  )
}

