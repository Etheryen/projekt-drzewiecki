import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  // TODO: CUSTOM FONT, BG COLOR, TEXT COLOR

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
      <main className="flex min-h-screen flex-col scroll-smooth bg-[#373737] text-white supports-[height:100dvh]:min-h-[100dvh]">
        <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-6 px-4 py-16 lg:flex-row lg:gap-12">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Piotr Drzewiecki
          </h1>
          <Image
            src="/Piotr_Drzewiecki.jpg"
            alt="Piotr Drzewiecki"
            priority
            loading="eager"
            width={417}
            height={533}
            className="rounded-xl border-4 border-white"
          />
        </div>
        <HorizontalScroll />
      </main>
    </>
  );
}

function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  console.log(scrollYProgress.get());
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[8425px]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="sticky block">
          <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
            <Image
              src={"/timeline_beztla_light.png"}
              alt="Życie Piotra Drzewieckiego"
              className="h-full w-auto object-none"
              priority
              loading="eager"
              height={2000}
              width={8425}
            />
          </div>
        </motion.div>
      </div>
    </section>
    // <section ref={targetRef} className="relative h-[8425px]">
    //   <div className="sticky top-0 h-screen overflow-hidden">
    //     <motion.div style={{ x }} className="sticky block">
    //       <Image
    //         src={"/timeline.png"}
    //         alt="Życie Piotra Drzewieckiego"
    //         className="h-screen object-cover object-left"
    //         priority
    //         loading="eager"
    //         height={2000}
    //         width={8425}
    //       />
    //     </motion.div>
    //   </div>
    // </section>
  );
}
