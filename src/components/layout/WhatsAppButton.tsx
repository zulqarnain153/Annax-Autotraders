"use client";

import { motion } from "framer-motion";
import { business } from "@/lib/business";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.94-.26-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5h-.56c-.2 0-.51.07-.78.36-.26.29-1.02.99-1.02 2.42s1.04 2.81 1.19 3c.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.13-.26-.2-.55-.34zM12.04 2C6.5 2 2 6.48 2 12c0 1.85.5 3.6 1.4 5.1L2 22l5.05-1.32A9.96 9.96 0 0 0 12.04 22C17.5 22 22 17.52 22 12S17.5 2 12.04 2zm0 18.13c-1.67 0-3.24-.46-4.58-1.27l-.33-.2-3 .78.8-2.92-.21-.3A8.15 8.15 0 0 1 3.86 12c0-4.5 3.68-8.15 8.18-8.15S20.22 7.5 20.22 12s-3.68 8.13-8.18 8.13z" />
  </svg>
);

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi Annax Auto Traders, I'd like to ask about a vehicle."
  );

  return (
    <motion.a
      href={`https://wa.me/${business.contact.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
