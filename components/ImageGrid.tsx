import { IRecord } from "@/lib/api";
import React from "react";
import clsx from "clsx";
import { FadeIn } from "react-lazyload-fadein";
import AppLink from "@/components/Link";

type ImageProps = {
  src: string;
  width: number;
  style?: React.CSSProperties;
};

export const Image = ({ src, width = 300, style = {} }: ImageProps) => (
  <img
    src={`https://api.finna.fi${src}&w=${width}`}
    className="w-auto rouded-xl overflow-hidden"
    alt="Esikatselukuva"
    style={style}
  />
);

type GridItemProps = {
  key: string;
  placeholder: boolean;
  children: React.ReactNode;
};

const GridItem = ({ key, placeholder, children }: GridItemProps) => (
  <li
    key={key}
    className={clsx(
      "px-1 mt-2 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group",
      !placeholder && "cursor-pointer"
    )}
  >
    {children}
  </li>
);

const GridImageItem = ({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title?: string;
}) => (
  <div style={{ backgroundColor: "rgb(21, 30, 50)" }}>
    <div className="flex. rounded-sm aspect-w-5 aspect-h-4 h-full">
      <FadeIn
        duration={300}
        offset={100}
        render={(onload) => (
          <div className="overflow-hidden h-full">
            {imageUrl && (
              <img
                className="object-none object-center h-full"
                src={`https://api.finna.fi${imageUrl}&w=300`}
                alt="Esikatselukuva"
                onLoad={onload}
              />
            )}
          </div>
        )}
      />
    </div>
    <div className="py-2 px-3 text-center text-gray-200 truncate text-center text-xs overflow-ellipsis group-hover:text-white">
      {title ? (
        <div className="self-end">{title}</div>
      ) : (
        <div className="self-end">&nbsp;</div>
      )}
    </div>
  </div>
);

type ResultGridProps = {
  records: IRecord[];
  placeholder?: boolean;
};

export const ResultGrid = ({
  records,
  placeholder = false,
}: ResultGridProps) => {
  const items: IRecord[] = placeholder
    ? Array.from(Array(8)).map((_) => {
      const rec: IRecord = { id: "", title: "", buildings: [] };
      return rec;
    })
    : records;

  if (!items) {
    return null;
  }

  return (
    <div>
      <ul className="flex flex-row flex-wrap overflow-hidden.">
        {items.map((rec: IRecord, idx: number) => (
          <GridItem key={`record-${idx}`} placeholder={placeholder}>
            {!placeholder && (
              <AppLink
                key={`link-${idx}`}
                href={`/view?id=${encodeURIComponent(rec.id)}`}
              >
                <a className="flex flex-col">
                  <GridImageItem
                    imageUrl={(rec?.images && rec.images[0]) || undefined}
                    title={rec.title}
                  />
                </a>
              </AppLink>
            )}
            {placeholder && (
              <div>
                <GridImageItem />
              </div>
            )}
          </GridItem>
        ))}
      </ul>
    </div>
  );
};
