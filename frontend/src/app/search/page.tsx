"use client"
import ListItem from "@/components/listItem";
import {getCraftsmen} from "@/http/requests";
import LoadMoreButton from "@/components/load-more-button";
import Navbar from "@/components/nav-bar";
import useSWR from "swr";
import {AutoSizer, List} from "react-virtualized"

export default function Home() {
  const { data, error, mutate, isLoading  } = useSWR('/api/get-data', getCraftsmen)
  const rowHeight = 120
  const loadMoreData = async () => {
    await mutate()
  }

  if (error || isLoading) {
    return null
  }


  return (
    <div className="flex bg-view-main min-h-full w-full">
      <div className="px-16 py-12 w-full">
        <Navbar greetings="Hello citizen, from Rosenheim" message="Meet local expertise"/>
        <div className="mt-16 flex-1 h-[70vh]">
          <AutoSizer>
            {
              (({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={rowHeight}
                  rowRenderer={(props) => <ListItem data={data![props.index]} {...props} key={props.key} />}
                  rowCount={data?.length ?? 0}
                  overscanRowCount={3}
                />
              ))
            }
          </AutoSizer>
        </div>
      </div>
    </div>
  )
}

