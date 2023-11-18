"use client"

const LoadMoreButton = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      className="bg-button-secondary  text-button-text rounded-[12px] w-[22.625rem] h-[4.5rem]"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default LoadMoreButton
