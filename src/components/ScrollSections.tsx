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
            // filter: "brightness(1.4)", // Commented out to avoid glare
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
            // filter: "brightness(1.4)", // Commented out to avoid glare
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
        style={{
          backgroundImage: `url('/image.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
        
        {/* Source Attribution */}
        <div className="absolute bottom-4 right-4 text-white/40 text-xs z-20">
          Nguồn: tulieuvankien.dangcongsan.vn
        </div>
        
        <div
          ref={sectionPinRef}
          id="section_pin"
          className="h-screen flex justify-start items-center py-32 px-12vw relative z-20"
          style={{ willChange: 'transform' }}
        >
           <div className="min-w-777px px-6vw">
             <h1 className="m-0 font-xarrovv text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold leading-tight text-white drop-shadow-lg">
               Nhà nước và Cách mạng xã hội
             </h1>
             <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl">
               Khám phá sự vận động của lịch sử nhân loại qua lăng kính triết học Mác-Lênin
             </p>
           </div>

          <div
            ref={imageWrapper1Ref}
            id="image_wrapper_1"
            className="min-w-60vw px-6vw relative"
            style={{
              willChange: 'transform, opacity, filter'
            }}
          >
             <div className="w-full relative">
               {/* Nguồn gốc Nhà nước - Enhanced Style */}
               <div className="bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 relative overflow-hidden"
                    style={{
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}>
                 
                 {/* Decorative Elements */}
                 <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-400 rounded-full opacity-30"></div>
                 <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-orange-400 rounded-full opacity-30"></div>
                 
                 {/* Header */}
                 <div className="text-center mb-6 sm:mb-8">
                   <div className="text-center mb-4">
                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-xarrovv drop-shadow-lg">Nguồn gốc Nhà nước</h2>
                   </div>
                     <p className="text-sm sm:text-lg text-white/90 font-medium">Triết học Mác-Lênin</p>
                 </div>
                 
                 {/* Quote */}
                 <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 mb-6 sm:mb-8 shadow-lg relative">
                   <div className="absolute top-2 left-4 text-4xl text-white/30 opacity-50">"</div>
                   <div className="absolute bottom-2 right-4 text-4xl text-white/30 opacity-50">"</div>
                   <p className="text-sm sm:text-base lg:text-lg italic text-white leading-relaxed text-center relative z-10">
                     "Nhà nước không phải là hiện tượng vĩnh cửu, mà xuất hiện, tồn tại và biến đổi cùng với sự phân hóa giai cấp trong xã hội."
                   </p>
                 </div>
                 
                 {/* Key Points */}
                 <div className="grid grid-cols-3 gap-6">
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">1</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Sự xuất hiện</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Cùng với sự phân hóa giai cấp</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">2</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Bản chất</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Công cụ của giai cấp cầm quyền</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">3</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Vai trò</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Quản lý và điều hòa xã hội</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div
            ref={imageWrapper2Ref}
            id="image_wrapper_2"
            className="min-w-60vw px-6vw relative"
            style={{
              willChange: 'transform, opacity, filter'
            }}
          >
             <div className="w-full relative">
               {/* Cách mạng xã hội - Enhanced Style */}
               <div className="bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 relative overflow-hidden"
                    style={{
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}>
                 
                 {/* Decorative Elements */}
                 <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-400 rounded-full opacity-30"></div>
                 <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-orange-400 rounded-full opacity-30"></div>
                 
                 {/* Header */}
                 <div className="text-center mb-6 sm:mb-8">
                   <div className="text-center mb-4">
                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-xarrovv drop-shadow-lg">Cách mạng xã hội</h2>
                   </div>
                     <p className="text-sm sm:text-lg text-white/90 font-medium">Động lực thay đổi xã hội</p>
                 </div>
                 
                 {/* Quote */}
                 <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 mb-6 sm:mb-8 shadow-lg relative">
                   <div className="absolute top-2 left-4 text-4xl text-white/30 opacity-50">"</div>
                   <div className="absolute bottom-2 right-4 text-4xl text-white/30 opacity-50">"</div>
                   <p className="text-sm sm:text-base lg:text-lg italic text-white leading-relaxed text-center relative z-10">
                     "Cách mạng xã hội chính là động lực cơ bản thúc đẩy sự thay đổi của các hình thái kinh tế – xã hội, mở đường cho những quan hệ sản xuất tiến bộ thay thế quan hệ lỗi thời."
                   </p>
                 </div>
                 
                 {/* Key Points */}
                 <div className="grid grid-cols-3 gap-6">
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">1</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Động lực cơ bản</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Thúc đẩy thay đổi hình thái</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">2</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Quy luật tất yếu</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Mở đường cho quan hệ tiến bộ</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">3</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Tính chất</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Thay đổi căn bản xã hội</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div
            ref={imageWrapper3Ref}
            id="image_wrapper_3"
            className="min-w-60vw px-6vw relative"
            style={{
              willChange: 'transform, opacity, filter'
            }}
          >
             <div className="w-full relative">
               {/* Vai trò lãnh đạo - Enhanced Style */}
               <div className="bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 relative overflow-hidden"
                    style={{
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}>
                 
                 {/* Decorative Elements */}
                 <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-400 rounded-full opacity-30"></div>
                 <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-orange-400 rounded-full opacity-30"></div>
                 
                 {/* Header */}
                 <div className="text-center mb-6 sm:mb-8">
                   <div className="text-center mb-4">
                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-xarrovv drop-shadow-lg">Vai trò lãnh đạo</h2>
                   </div>
                     <p className="text-sm sm:text-lg text-white/90 font-medium">Giai cấp công nhân và Đảng</p>
                 </div>
                 
                 {/* Quote */}
                 <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 mb-6 sm:mb-8 shadow-lg relative">
                   <div className="absolute top-2 left-4 text-4xl text-white/30 opacity-50">"</div>
                   <div className="absolute bottom-2 right-4 text-4xl text-white/30 opacity-50">"</div>
                   <p className="text-sm sm:text-base lg:text-lg italic text-white leading-relaxed text-center relative z-10">
                     "Qua đó, chương học giúp chúng ta nhận thức sâu sắc hơn về vai trò lãnh đạo của giai cấp công nhân và Đảng Cộng sản trong sự nghiệp xây dựng và bảo vệ Tổ quốc xã hội chủ nghĩa ở Việt Nam hiện nay."
                   </p>
                 </div>
                 
                 {/* Key Points */}
                 <div className="grid grid-cols-3 gap-6">
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">1</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Giai cấp công nhân</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Lực lượng lãnh đạo cách mạng</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">2</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Đảng Cộng sản</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Đội tiên phong của giai cấp</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg border border-amber-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                       <span className="text-lg font-bold text-white relative z-10">3</span>
                     </div>
                     <h3 className="font-bold text-white text-xs sm:text-sm mb-2">Xây dựng Tổ quốc</h3>
                     <p className="text-white/80 text-xs sm:text-xs">Bảo vệ chủ nghĩa xã hội</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
