import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/_ui/tabs";
import { AlbumTrack } from "@/components/album-track";
import { DatePrecision } from "@/enums";
import { getFullAlbum } from "@/server/actions";
import { Clock } from "lucide-react";

interface AlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const album = await getFullAlbum((await params).albumId);

  return (
    <main className="m-4 space-y-4">
      <section className="flex flex-col gap-8 md:flex-row">
        <div className="flex-shrink-0">
          <Image src={album.image ?? ""} alt={album.name} width={300} height={300} className="rounded-md shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-4xl font-bold">{album.name}</h1>
            <div className="text-muted-foreground flex flex-col">
              <span className="font-medium">{album.artists.map(({ name }) => name).join(", ")}</span>
              <span>
                {handleDatePrecision(album.releaseDate, album.datePrecision)} | {album.tracks.length} songs
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Tabs defaultValue="reviews">
          <TabsList className="min-w-1/2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews"></TabsContent>
          <TabsContent value="tracks">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tracks</h2>
              <div>
                <div className="text-muted-foreground flex items-center justify-between border-b px-3 py-2 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center">#</div>
                    <div>Title</div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="size-4" />
                  </div>
                </div>
                <ol className="divide-y">
                  {album.tracks.map((track, index) => (
                    <AlbumTrack key={track.id} track={track} index={index + 1} />
                  ))}
                </ol>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

function handleDatePrecision(releaseDate: string, releaseDatePrecision: DatePrecision) {
  const unformattedDate = new Date(releaseDate);
  switch (releaseDatePrecision) {
    case DatePrecision.day:
      return new Intl.DateTimeFormat("EN", { year: "numeric", month: "long", day: "numeric" }).format(unformattedDate);
    case DatePrecision.month:
      return new Intl.DateTimeFormat("EN", { year: "numeric", month: "long" }).format(unformattedDate);
    case DatePrecision.year:
    default:
      return new Intl.DateTimeFormat("EN", { year: "numeric" }).format(unformattedDate);
  }
}
