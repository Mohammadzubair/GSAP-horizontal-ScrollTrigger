import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalCards() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-gray-500",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const startingTextRevealRef = useRef<HTMLDivElement>(null);
  const endingTextRevealRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mainTrigger = gsap.to(scrollRef.current, {
      x: "-350vw",
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=5000",
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    const boxes = gsap.utils.toArray<HTMLDivElement>(".museum-box");

    boxes.forEach((box) => {
      const randomRotation = gsap.utils.random(-35, 35);
      const randomY = gsap.utils.random(-50, 50);
      const randomXOFFset = gsap.utils.random(-100, 100);

      gsap.to(box, {
        rotation: randomRotation,
        y: randomY,
        x: randomXOFFset,
        scrollTrigger: {
          trigger: box,
          containerAnimation: mainTrigger,
          start: "left 90%",
          end: "right center",
          scrub: true,
        },
      });
    });

    gsap.fromTo(
      endingTextRevealRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollRef.current,
          containerAnimation: mainTrigger,
          start: "72% center",
          end: "90% center",
          scrub: true,
        },
      },
    );

    gsap.fromTo(
      startingTextRevealRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollRef.current,
          containerAnimation: mainTrigger,
          start: "12% center",
          end: "30% center",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative h-screen w-full overflow-hidden bg-[#004d2c]"
    >
      {/* Starting Text Reveal */}
      <div
        ref={startingTextRevealRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-0"
      >
        <h2 className="text-[12vw] font-black text-[#10b981] leading-none text-center uppercase italic">
          Starting <br /> Text Reveals
        </h2>
        <div className="mt-10 px-6 py-3 border border-[#10b981] rounded-xl text-white uppercase text-lg font-bold tracking-widest cursor-pointer hover:bg-white hover:text-[#10b981] transition-all duration-300">
          View all Cards
        </div>
      </div>
      {/*  Horizontal Cards */}
      <div
        ref={scrollRef}
        className="relative z-10 h-full flex items-center pointer-events-none"
        style={{ width: "450vw", paddingLeft: "100vw" }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className={`museum-box ${color} w-80 h-112 mx-10 shink-0 rounded-xl shadow-[-_50px_100px_rgba(0,0,0,0.5)] border-10 border-white flex items-end p-6`}
          >
            <div className="w-full">
              <div className="h-3 w-20 bg-white/20 rouded mb-2" />
              <div className="h-6 w-ful bg-white/10 rouded " />
            </div>
          </div>
        ))}
      </div>
      {/* Ending Text Reveal */}
      <div
        ref={endingTextRevealRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-0"
      >
        <h2 className="text-[12vw] font-black text-[#10b981] leading-none text-center uppercase italic">
          Ending <br /> Text Reveals
        </h2>
        <div className="mt-10 px-6 py-3 border border-[#10b981] rounded-xl text-white uppercase text-lg font-bold tracking-widest cursor-pointer hover:bg-white hover:text-[#10b981] transition-all duration-300">
          View all Cards
        </div>
      </div>
    </section>
  );
}
