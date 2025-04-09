"use server";

import { env } from "@/env";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
});

// const TOKEN_KEY = "spotify_access_token";
// const EXPIRY_KEY = "spotify_token_expiry";

// async function getAccessToken() {
//   let accessToken = await kv.get(TOKEN_KEY);
//   let expiry = await kv.get(EXPIRY_KEY);

//   if (accessToken && expiry && parseInt(expiry) > Date.now() + 60000) {
//     // Token is valid for at least 60 seconds
//     return accessToken;
//   }

//   // Token is expired or doesn't exist, refresh it
//   try {
//     const authData = await spotifyApi.clientCredentialsGrant();
//     accessToken = authData.body["access_token"];
//     const expiresInSeconds = authData.body["expires_in"];
//     const expiryTime = Date.now() + expiresInSeconds * 1000;

//     await kv.set(TOKEN_KEY, accessToken);
//     await kv.set(EXPIRY_KEY, expiryTime.toString());

//     console.log("Refreshed access token and stored in KV.");
//     return accessToken;
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     return null;
//   }
// }

// Store the access token and the expiry token in the vercel kv store
async function setAccessToken() {
  const authData = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(authData.body["access_token"]);
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
