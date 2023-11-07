import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "rooks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Piotr Drzewiecki - Projekt</title>
        <meta
          name="description"
          content="Projekt o Piotrze Drzewieckim (byłym prezydencie Warszawy)"
        />
      </Head>
      <main className="flex min-h-screen flex-col scroll-smooth bg-neutral-800 text-white supports-[height:100dvh]:min-h-[100dvh]">
        <div className="container mx-auto flex h-screen flex-col-reverse items-center justify-center gap-6 p-16 supports-[height:100dvh]:h-[100dvh] lg:flex-row xl:gap-12">
          <h1 className="text-5xl font-bold lg:text-[6rem]">
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
        <div className="container mx-auto flex h-screen flex-col items-center justify-center gap-6 p-16 supports-[height:100dvh]:h-[100dvh] lg:flex-row lg:gap-12">
          <p className="text-2xl sm:text-3xl xl:text-4xl">
            Piotr Drzewiecki po wejściu w skład Rady Regencyjnej Królestwa
            Polskiego 22 marca 1918 został wybrany przez Radę Miejską
            prezydentem stolicy. Funkcję tę sprawował do 28 listopada 1921. Był
            prezydentem bardzo pracowitym, obowiązkowym i ofiarnym; z własnych
            dochodów wypłacał nagrody pracownikom miejskim za dokonane przez
            nich usprawnienia w pracy. Umiał także dość skutecznie
            przeciwstawiać się nadmiernym żądaniom niemieckich okupantów. Jego
            zasługą było też przyłączenie do miasta obszarów podmiejskich, co
            stworzyło solidne podstawy rozwoju miasta w dobie II
            Rzeczypospolitej.
            <br />
            <br />
            Poniżej przedstawiamy na osi czasu bardziej prywatne i ukryte
            informacje, które przedstawiają również Drzewieckiego jako wybitnego
            polskiego inżyniera i technika z czasów 2 RP:
          </p>
        </div>
        <CalculateProportions />
      </main>
    </>
  );
}

const ACTUAL_IMAGE_WIDTH = 6500;
const ACTUAL_IMAGE_HEIGHT = 1059;

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
              src="/timeline_v2_beztla.png"
              alt="Życie Piotra Drzewieckiego"
              ref={imageRef}
              style={{ width: imageWidth }}
              quality={100}
              unoptimized
              className="h-screen supports-[height:100dvh]:h-[100dvh]"
              priority
              loading="eager"
              height={ACTUAL_IMAGE_HEIGHT}
              width={ACTUAL_IMAGE_WIDTH}
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
