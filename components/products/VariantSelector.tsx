"use client";

import { cn } from "@/lib/utils";
import { Ram, Storage } from "@/lib/api/types/endpoints";

interface VariantSelectorProps {
  rams: Ram[];
  storages: Storage[];
  selectedRam?: string;
  selectedStorage?: string;
  onRamSelect: (ram: Ram) => void;
  onStorageSelect: (storage: Storage) => void;
  basePrice: number;
  initialPrice: number;
  productImage?: string;
  showRam?: boolean;
  showStorage?: boolean;
}

import Image from "next/image";

export const VariantSelector = ({
  rams,
  storages,
  selectedRam,
  selectedStorage,
  onRamSelect,
  onStorageSelect,
  basePrice,
  initialPrice,
  productImage,
  showRam = true,
  showStorage = true,
}: VariantSelectorProps) => {
  const currentRamExtra =
    rams.find((r) => r.label === selectedRam)?.extraPrice || 0;
  const currentStorageExtra =
    storages.find((s) => s.label === selectedStorage)?.extraPrice || 0;

  return (
    <div className="space-y-6 py-2">
      {/* RAM Section */}
      {showRam !== false && rams.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm">
            <span className="text-muted-foreground mr-1">
              Computer memory size:
            </span>
            <span className="font-bold">{selectedRam}</span>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            {rams
              .filter((r) => r.isAvailable)
              .map((ram) => {
                const isSelected = ram.label === selectedRam;
                const totalPrice =
                  basePrice + ram.extraPrice + currentStorageExtra;

                return (
                  <button
                    key={ram._id}
                    onClick={() => onRamSelect(ram)}
                    className={cn(
                      "min-w-[100px] p-2 text-left border rounded-md transition-all duration-200",
                      isSelected
                        ? "border-[#10BBE6] ring-1 ring-[#10BBE6] bg-[#10BBE6]/5 shadow-sm"
                        : "border-gray-200 hover:border-gray-400 bg-background",
                    )}
                  >
                    <div className="text-sm font-bold text-foreground">
                      {ram.label}
                    </div>
                    <div className="flex flex-col mt-0.5">
                      <span className="text-sm font-semibold text-foreground">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground line-through opacity-60">
                        ₹{Math.round(initialPrice).toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Storage Section - With Laptop Thumbnails */}
      {showStorage !== false && storages.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm">
            <span className="text-muted-foreground mr-1">Hard Disk Size:</span>
            <span className="font-bold">{selectedStorage}</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            {storages
              .filter((s) => s.isAvailable)
              .map((storage) => {
                const isSelected = storage.label === selectedStorage;
                const totalPrice =
                  basePrice + currentRamExtra + storage.extraPrice;

                return (
                  <button
                    key={storage._id}
                    onClick={() => onStorageSelect(storage)}
                    className={cn(
                      "group flex flex-col items-center p-2 border rounded-md transition-all duration-200 min-w-[80px]",
                      isSelected
                        ? "border-[#10BBE6] ring-1 ring-[#10BBE6] bg-[#10BBE6]/5 shadow-sm"
                        : "border-gray-200 hover:border-gray-400 bg-background",
                    )}
                  >
                    <div className="relative w-full aspect-video mb-1">
                      {productImage ? (
                        <Image
                          src="/images/laptop-icon.jpg"
                          alt={storage.label}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded">
                          <span className="text-[10px] text-muted-foreground text-center">
                            Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-foreground">
                      {storage.label}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
