"use client"
import ListItem from "@/components/listItem";
import {getCraftsmen,updateCraftman} from "@/http/requests";
import Navbar from "@/components/nav-bar";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {AutoSizer, List, ScrollParams} from "react-virtualized"
import {redirect, useSearchParams} from "next/navigation";
import {Craftsman} from "@/types/utils";
import {useLoadMoreOnScroll} from "@/hooks/useLoadMoreOnScroll";
import {useEffect} from "react";
import {router} from "next/client";

export default function Home() {
  const params = useSearchParams()
  const postalCode = params?.get('postalCode')
  const { data, error, mutate, isLoading  } = useSWR('api/get-data', (url): Promise<Craftsman[]> => getCraftsmen(url, postalCode ?? '', data));
  const { trigger  } = useSWRMutation('/search' , updateCraftman);
  const rowHeight = 120
  const loadMoreData = async () => {
    await mutate()
  }
  const onScroll = useLoadMoreOnScroll(() => loadMoreData())

  useEffect(() => {
    if (!postalCode) {
      redirect('/error')
    }
  }, []);

  if (error || isLoading) {
    return null
  }

  return (
    <div className="flex bg-view-main min-h-full w-full">
      <div className="px-16 py-12 w-full">
        <Navbar greetings="Hello citizen, from München" message="Meet local expertise"/>
        <div className="mt-16 flex-1 h-[70vh]">
          <AutoSizer >
            {
              (({ width, height }) => (
                <List
                 onScroll={onScroll}
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

