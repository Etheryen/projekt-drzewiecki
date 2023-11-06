import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "rooks";

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
        <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-6 px-4 py-16 supports-[height:100dvh]:h-[100dvh] lg:flex-row lg:gap-12">
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
        <CalculateProportions />
      </main>
    </>
  );
}

const ACTUAL_IMAGE_WIDTH = 26000;
const ACTUAL_IMAGE_HEIGHT = 4237;

function CalculateProportions() {
  const { innerHeight, innerWidth } = useWindowSize();
  const [imageWidth, setImageWidth] = useState<number | null>(null);

  useEffect(() => {
    if (innerHeight) {
      setImageWidth((innerHeight * ACTUAL_IMAGE_WIDTH) / ACTUAL_IMAGE_HEIGHT);
    }
  }, [innerHeight]);

  if (!imageWidth || !innerWidth) return null;

  return <HorizontalScroll imageWidth={imageWidth} innerWidth={innerWidth} />;
}

interface HorizontalScrollProps {
  imageWidth: number;
  innerWidth: number;
}

function HorizontalScroll({ imageWidth, innerWidth }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0", `-${imageWidth - innerWidth}px`],
  );
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <section
      ref={targetRef}
      style={{ height: imageWidth }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden supports-[height:100dvh]:h-[100dvh]">
        <motion.div style={{ x }} className="sticky">
          <div
            style={{ width: imageWidth }}
            className="relative h-screen supports-[height:100dvh]:h-[100dvh]"
          >
            <Image
              src="/timeline_beztla_light.png"
              alt="Życie Piotra Drzewieckiego"
              ref={imageRef}
              style={{ width: imageWidth }}
              quality={100}
              unoptimized
              className="h-screen supports-[height:100dvh]:h-[100dvh]"
              priority
              loading="eager"
              height={ACTUAL_IMAGE_HEIGHT / 4}
              width={ACTUAL_IMAGE_WIDTH / 4}
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
