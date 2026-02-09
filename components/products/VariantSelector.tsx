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
}

export const VariantSelector = ({
  rams,
  storages,
  selectedRam,
  selectedStorage,
  onRamSelect,
  onStorageSelect,
  basePrice,
}: VariantSelectorProps) => {
  const currentRamExtra =
    rams.find((r) => r.label === selectedRam)?.extraPrice || 0;

  return (
    <div className="space-y-8 py-4">
      {/* RAM */}
      {rams.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm">
            Computer memory size:
            <span className="ml-1 font-bold">{selectedRam}</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            {rams
              .filter((r) => r.isAvailable)
              .map((ram) => {
                const isSelected = ram.label === selectedRam;
                const price = basePrice + ram.extraPrice;
                const oldPrice = price + 3000;

                return (
                  <button
                    key={ram._id}
                    onClick={() => onRamSelect(ram)}
                    className={cn(
                      "w-[140px] border rounded-md p-3 text-left",
                      isSelected ? "border-blue-600 border-2" : "border-border",
                    )}
                  >
                    <div className="text-sm font-semibold">{ram.label}</div>

                    <div className="text-sm font-bold mt-1">
                      ₹{price.toLocaleString()}
                    </div>

                    <div className="text-xs text-muted-foreground line-through">
                      ₹{oldPrice.toLocaleString()}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Storage (same visual system) */}
      {storages.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm">
            Hard Disk Size:
            <span className="ml-1 font-bold">{selectedStorage}</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            {storages
              .filter((s) => s.isAvailable)
              .map((storage) => {
                const isSelected = storage.label === selectedStorage;
                const price = basePrice + currentRamExtra + storage.extraPrice;

                return (
                  <button
                    key={storage._id}
                    onClick={() => onStorageSelect(storage)}
                    className={cn(
                      "w-[140px] border rounded-md p-3 text-left",
                      isSelected ? "border-blue-600 border-2" : "border-border",
                    )}
                  >
                    <div className="text-sm font-semibold">{storage.label}</div>

                    <div className="text-sm font-bold mt-1">
                      ₹{price.toLocaleString()}
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
