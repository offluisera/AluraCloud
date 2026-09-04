"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ServiceCardGraphic from "@/components/services/ServiceCardGraphic";

export interface ServiceItem {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  standby?: boolean;
  items: string[];
}

export const HoverExpandServices = ({
  services,
  className,
}: {
  services: ServiceItem[];
  className?: string;
}) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-[1400px] mx-auto", className)}
    >
      <div className="flex w-full items-stretch justify-center gap-2 lg:gap-4 h-[600px]">
        {services.map((service, index) => {
          const isActive = activeItem === index;
          return (
            <motion.div
              key={index}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-3xl",
                "bg-gradient-to-br from-[rgba(0,223,129,0.03)] to-transparent",
                "border border-white/5",
                "shadow-[inset_0_0_0_1px_rgba(0,223,129,0.05)]",
                "transition-colors duration-300",
                isActive ? "border-[rgba(0,223,129,0.3)] shadow-[inset_0_0_0_1px_rgba(0,223,129,0.2),_0_10px_30px_rgba(0,0,0,0.5)]" : ""
              )}
              initial={false}
              animate={{
                width: isActive ? "100%" : "8%",
                flexGrow: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={() => setActiveItem(index)}
              onHoverStart={() => setActiveItem(index)}
            >
              {/* Number Overlay (Visible when collapsed) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-start pt-8"
                  >
                    <span className="text-[var(--text-xl)] font-display text-white/30 font-bold rotate-90 origin-center translate-y-8">{service.num}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Content (Visible when active) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10 w-full"
                  >
                    {/* Top Row: Icon & Number */}
                    <div className="flex items-start justify-between w-full">
                      <div className="p-3 md:p-4 rounded-2xl bg-[rgba(0,223,129,0.1)] border border-[rgba(0,223,129,0.2)] text-[var(--color-caribbean-green)] shadow-[0_0_20px_rgba(0,223,129,0.15)]">
                        {service.icon}
                      </div>
                      <span className="font-display text-[80px] md:text-[140px] leading-none text-white/[0.03] font-bold tracking-tighter">
                        {service.num}
                      </span>
                    </div>
                    
                    {/* Bottom Row: Text & List */}
                    <div className="max-w-3xl mb-4">
                      <h3 className="text-2xl md:text-5xl font-display font-bold text-white mb-4 flex items-center gap-4 tracking-tight">
                          {service.title}
                          {service.standby && (
                            <span className="text-xs font-bold text-[var(--bg-deep)] bg-[var(--color-caribbean-green)] px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(0,223,129,0.4)]">
                              Em Breve
                            </span>
                          )}
                        </h3>
                        
                        <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl font-light">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          {service.items.map((item, idx) => (
                            <div key={idx} className={cn(
                              "flex items-center gap-3",
                              service.standby ? "text-white/30 italic" : "text-white/80"
                            )}>
                              <div className="w-2 h-2 rounded-full bg-[var(--color-caribbean-green)] shadow-[0_0_8px_rgba(0,223,129,0.8)]"></div>
                              <span className="text-sm md:text-base font-medium tracking-wide">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
