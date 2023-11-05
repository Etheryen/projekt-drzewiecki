import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Piotr Drzewiecki - Projekt</title>
        <meta
          name="description"
          content="Projekt o Piotrze Drzewieckim (byłym prezydencie Warszawy)"
        />
        {/* TODO: favicon zmienić */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center scroll-smooth bg-neutral-800">
        <div className="container flex flex-col items-center justify-center  gap-6 px-4 py-16 lg:flex-row lg:gap-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Piotr Drzewiecki
          </h1>
          <Image
            src="/Piotr_Drzewiecki.jpg"
            alt="Piotr Drzewiecki"
            priority
            width={417}
            height={533}
            className="rounded-xl border-4 border-white"
          />
        </div>
      </main>
    </>
  );
}
