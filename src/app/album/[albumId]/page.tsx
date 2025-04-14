import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/_ui/tabs";
import { AlbumReviews } from "@/components/album-reviews";
import { AlbumTrack } from "@/components/album-track";
import { ReviewCard } from "@/components/review-card";
import { DatePrecision } from "@/enums";
import { getFullAlbum } from "@/server/actions";

interface AlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const albumId = (await params).albumId;
  const album = await getFullAlbum(albumId);

  return (
    <main className="mx-8 space-y-4">
      <section className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-8 md:text-start">
        <div className="flex-shrink-0">
          <Image src={album.image ?? ""} alt={album.name} width={300} height={300} className="rounded-md shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-3xl font-bold">{album.name}</h1>
            <div className="text-muted-foreground flex flex-col">
              <span className="text-lg font-medium md:text-base">
                {album.artists.map(({ name }) => name).join(", ")}
              </span>
              <span className="text-sm">
                {handleDatePrecision(album.releaseDate, album.datePrecision)} | {album.tracks.length} songs
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse gap-8 md:flex-row">
        <Tabs defaultValue="reviews" className="flex-1">
          <TabsList className="w-full">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews">
            <div className="space-y-4">
              <AlbumReviews albumId={albumId} />
            </div>
          </TabsContent>
          <TabsContent value="tracks">
            <div className="space-y-4">
              <ol className="divide-y">
                {album.tracks.map((track, index) => (
                  <AlbumTrack key={track.id} track={track} index={index + 1} />
                ))}
              </ol>
            </div>
          </TabsContent>
        </Tabs>
        <ReviewCard albumId={album.id} />
      </section>
    </main>
  );
}

function handleDatePrecision(releaseDate: string, releaseDatePrecision: DatePrecision) {
  const date = new Date(releaseDate);
  const options: Intl.DateTimeFormatOptions =
    releaseDatePrecision === DatePrecision.day
      ? { year: "numeric", month: "long", day: "numeric" }
      : releaseDatePrecision === DatePrecision.month
        ? { year: "numeric", month: "long" }
        : { year: "numeric" };

  return new Intl.DateTimeFormat("en", options).format(date);
}
