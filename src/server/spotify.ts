"use server";

import { env } from "@/env";
import { Redis } from "@upstash/redis";
import SpotifyWebApi from "spotify-web-api-node";

const TOKEN_KEY = "spotify_access_token";

const spotifyApi = new SpotifyWebApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
});

const redis = Redis.fromEnv();

async function getAccessToken() {
  try {
    const accessToken = await redis.get<string>(TOKEN_KEY);
    if (accessToken) {
      return accessToken;
    }

    const authData = await spotifyApi.clientCredentialsGrant();
    await redis.set(TOKEN_KEY, authData.body.access_token, { ex: authData.body.expires_in });

    console.log("Refreshed access token and stored in KV.");
    return authData.body.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
async function setAccessToken() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("Failed to retrieve access token from Spotify API.");
  }

  spotifyApi.setAccessToken(accessToken);
}

export async function getAlbum(albumId: string) {
  await setAccessToken();
  const albumData = await spotifyApi.getAlbum(albumId);
  return albumData.body;
}

export async function getAlbumTracks(albumId: string) {
  await setAccessToken();
  const albumData = await spotifyApi.getAlbumTracks(albumId);
  return albumData.body;
}

export async function searchAlbums(searchTerm: string) {
  await setAccessToken();
  const searchData = await spotifyApi.searchAlbums(searchTerm, { limit: 10 });
  return searchData.body.albums?.items ?? [];
}

export async function getArtist(artistId: string) {
  await setAccessToken();
  const artistData = await spotifyApi.getArtist(artistId);
  return artistData.body;
}

export async function getArtistAlbums(artistId: string) {
  await setAccessToken();
  const artistAlbumsData = await spotifyApi.getArtistAlbums(artistId, { limit: 10 });
  return artistAlbumsData.body.items;
}
