import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PhotoLightboxProps {
  open: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectName: string;
}

const PhotoLightbox = ({ open, onClose, images, currentIndex, onIndexChange, projectName }: PhotoLightboxProps) => {
  const goNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const goPrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, goNext, goPrev]);

  if (images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-navy border-steel/10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-steel/10">
          <div>
            <h3 className="font-heading text-primary-foreground font-semibold text-lg uppercase">{projectName}</h3>
            <p className="text-steel text-xs mt-0.5">{currentIndex + 1} of {images.length}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-steel/10 flex items-center justify-center text-steel hover:text-primary-foreground hover:bg-steel/20 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex items-center justify-center p-4"
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-navy-card to-navy relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-steel/40 font-heading text-xl uppercase tracking-wider">{images[currentIndex]?.alt}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy/80 backdrop-blur-sm border border-steel/10 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy/80 backdrop-blur-sm border border-steel/10 flex items-center justify-center text-steel hover:text-orange hover:border-orange/30 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="px-6 py-4 border-t border-steel/10 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => onIndexChange(i)}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentIndex ? "border-orange" : "border-steel/10 opacity-50 hover:opacity-80"
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-navy-card to-navy" />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoLightbox;
