import HomeFeed from "./components/HomeFeed";

export default async function Page() {
  return (
    /* @ts-expect-error Server Component */
    <HomeFeed />
  );
}
