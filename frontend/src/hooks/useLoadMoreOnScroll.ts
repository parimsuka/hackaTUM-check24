import {useState} from "react";
import {ScrollParams} from "react-virtualized";


export const useLoadMoreOnScroll = (callback: () => void, pivot = 20) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  return (event: ScrollParams) => {
    setScrollTop(event.scrollTop);
    setScrollHeight(event.scrollHeight);

    if (scrollTop >= scrollHeight - event.clientHeight - pivot) {
      callback()
    }
  };
}
