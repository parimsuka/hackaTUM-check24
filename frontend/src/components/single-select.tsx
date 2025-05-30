
import { useState, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import LocationInput from "@/components/location-input";
import GeoLocation from '@/assets/geo-location.svg'

type Option = {
  value: string;
  label: string;
};

type SingleSelectProps = {
  options: Option[];
  label: string;
  onChange: (option: Option) => void;
};


type Props = {
  options: Option[];
  label: string;
  onChange: (option: Option) => void;
};

export default function SingleSelect({ options, label, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const filtered = query === ""
    ? options
    : options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  return (
    <div className="w-72 relative">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <LocationInput
        onFocus={() => setIsOpen(true)}
        value={query}
        className={['bg-gray-400', 'text-text-main', 'placeholder:text-text-main']}
        setValue={post => setQuery(post)}
        placeholder={'Enter your post index'}
        leftIcon={<GeoLocation className={''} />}
      />
      {/*<input*/}
      {/*  onFocus={() => setIsOpen(true)}*/}
      {/*  onChange={(e) => setQuery(e.target.value)}*/}
      {/*  value={query}*/}
      {/*  placeholder="Search..."*/}
      {/*  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"*/}
      {/*/>*/}

      {isOpen && (
        <div
          ref={parentRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg min-w-[332px]"
          style={{ maxHeight: "240px" }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
            onBlur={() => setIsOpen(false)}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const option = filtered[virtualRow.index];
              return (
                <div
                  key={option.value}
                  className={`absolute top-0 left-0 right-0 px-4 py-2 text-sm cursor-pointer ${
                    selected?.value === option.value
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    setQuery(option.label);
                    onChange(option);
                  }}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

