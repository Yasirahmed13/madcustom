"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GalleryGrid, PAGE_SIZE, ShowMoreRow } from "./GalleryGrid";

/*
 * The lightbox only exists once someone opens it, so its code is fetched on
 * first use rather than shipped with the page. ssr:false because it is a modal
 * that never renders on the server.
 */
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), {
  ssr: false,
});

/**
 * The gallery on a /services/[slug] page: the same grid and lightbox as the
 * homepage, over one fixed service, with no filter chips.
 *
 * "Book <service> →" in the lightbox goes to the booking form on the homepage
 * with the service preselected, since there is no form on this page.
 */
export function ServiceGallery({ ids, slug }: { ids: readonly number[]; slug: string }) {
  const router = useRouter();
  const [shown, setShown] = useState(PAGE_SIZE);
  const [index, setIndex] = useState<number | null>(null);

  const page = useMemo(() => ids.slice(0, shown), [ids, shown]);

  return (
    <>
      <GalleryGrid ids={page} onOpen={setIndex} />

      <ShowMoreRow
        shown={page.length}
        total={ids.length}
        onMore={() => setShown((current) => current + PAGE_SIZE)}
      />

      {index !== null ? (
        <Lightbox
          ids={ids}
          index={index}
          onClose={() => setIndex(null)}
          onShow={setIndex}
          onBook={() => {
            setIndex(null);
            router.push(`/?service=${slug}#book`);
          }}
        />
      ) : null}
    </>
  );
}
