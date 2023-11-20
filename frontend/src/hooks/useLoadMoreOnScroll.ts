import {useState} from "react";
import {ScrollParams} from "react-virtualized";


export const useLoadMoreOnScroll = (callback: () => void, pivot = 6) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  const onScroll = (event: ScrollParams) => {
    setScrollTop(event.scrollTop);
    setScrollHeight(event.scrollHeight);

    if (scrollTop >= scrollHeight - event.clientHeight - pivot) {
      callback()
    }
  };


  return onScroll;
}
