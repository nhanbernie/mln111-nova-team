import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionsProps {
  className?: string;
}

export default function ScrollSections({
  className = "",
}: ScrollSectionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);
  const imageWrapper1Ref = useRef<HTMLDivElement>(null);
  const imageWrapper2Ref = useRef<HTMLDivElement>(null);
  const imageWrapper3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !sectionPinRef.current) return;

    const sectionPin = sectionPinRef.current;
    const imageWrappers = [
      imageWrapper1Ref.current,
      imageWrapper2Ref.current,
      imageWrapper3Ref.current,
    ].filter(Boolean);

    // Set initial states
    gsap.set(sectionPin, { x: 0 });
    imageWrappers.forEach((wrapper) => {
      if (wrapper) {
        gsap.set(wrapper, { 
          opacity: 0.6, 
          scale: 0.95, 
          filter: "brightness(0.8)",
          rotationY: 0
        });
      }
    });

    // Main horizontal scroll animation
    const containerAnimation = gsap.to(sectionPin, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${sectionPin.offsetWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
      x: () => -(sectionPin.scrollWidth - window.innerWidth) + "px",
      ease: "none",
    });

    // Individual image animations with center trigger
    imageWrappers.forEach((imageWrapper) => {
      if (!imageWrapper) return;

      // Create a more precise center trigger
      ScrollTrigger.create({
        trigger: imageWrapper,
        start: "left 50%",
        end: "right 50%",
        containerAnimation: containerAnimation,
        onEnter: () => {
          gsap.to(imageWrapper, {
            opacity: 1,
            scale: 1.15,
            filter: "brightness(1.4)",
            rotationY: 0,
            duration: 0.7,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.to(imageWrapper, {
            opacity: 0.4,
            scale: 0.85,
            filter: "brightness(0.6)",
            rotationY: 0,
            duration: 0.7,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(imageWrapper, {
            opacity: 1,
            scale: 1.15,
            filter: "brightness(1.4)",
            rotationY: 0,
            duration: 0.7,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(imageWrapper, {
            opacity: 0.4,
            scale: 0.85,
            filter: "brightness(0.6)",
            rotationY: 0,
            duration: 0.7,
            ease: "power2.out"
          });
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* Section 4 - Horizontal Scroll */}
      <section
        ref={sectionRef}
        id="section_to-pin"
        className="min-h-screen bg-transparent flex justify-start items-center overflow-hidden relative z-40"
      >
        <div
          ref={sectionPinRef}
          id="section_pin"
          className="h-screen flex justify-start items-center py-32 px-12vw"
          style={{ willChange: 'transform' }}
        >
          <div className="min-w-777px px-6vw">
            <h1 className="m-0 font-dancing-script text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold leading-tight text-white drop-shadow-lg">
              Nova team
            </h1>
          </div>

          <div
            ref={imageWrapper1Ref}
            id="image_wrapper_1"
            className="min-w-60vw px-6vw relative"
            style={{
              willChange: 'transform, opacity, filter'
            }}
          >
            <img
              className="w-full h-auto object-cover object-center rounded-lg shadow-2xl"
              src="https://images.unsplash.com/photo-1516647768-31ff0cef8821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt="Team Member 1"
            />
          </div>

          <div
            ref={imageWrapper2Ref}
            id="image_wrapper_2"
            className="min-w-60vw px-6vw relative"
            style={{
              willChange: 'transform, opacity, filter'
            }}
          >
            <img
              className="w-full h-auto object-cover object-center rounded-lg shadow-2xl"
              src="https://images.unsplash.com/photo-1516648064-ee10acfa64db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=863&q=80"
              alt="Team Member 2"
            />
          </div>

          <div
            ref={imageWrapper3Ref}
            id="image_wrapper_3"
            className="min-w-60vw px-6vw relative"
            style={{
              willChange: 'transform, opacity, filter'
            }}
          >
            <img
              className="w-full h-auto object-cover object-center rounded-lg shadow-2xl"
              src="https://images.unsplash.com/photo-1516647072-a39e59e34b97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt="Team Member 3"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
