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
  basePrice: number; // To calculate and display price for each variant
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
  // Find current selection costs
  const currentRamExtra =
    rams.find((r) => r.label === selectedRam)?.extraPrice || 0;
  const currentStorageExtra =
    storages.find((s) => s.label === selectedStorage)?.extraPrice || 0;

  return (
    <div className="space-y-6 py-4">
      {/* RAM Selection */}
      {rams.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              RAM Size:
            </h3>
            <span className="text-sm font-bold text-foreground">
              {selectedRam || "Select"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
            {rams
              .filter((r) => r.isAvailable)
              .map((ram) => {
                const isSelected = ram.label === selectedRam;
                // Price = Base + This RAM Cost + Current Storage Cost
                const price =
                  basePrice + (ram.extraPrice || 0) + currentStorageExtra;

                return (
                  <button
                    key={ram._id}
                    onClick={() => onRamSelect(ram)}
                    className={cn(
                      "flex flex-col items-start p-3 rounded-lg border-2 transition-all w-full",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50 bg-background",
                    )}
                  >
                    <span className="text-sm font-bold">{ram.label}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      ₹{price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Storage Selection */}
      {storages.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Storage:
            </h3>
            <span className="text-sm font-bold text-foreground">
              {selectedStorage || "Select"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
            {storages
              .filter((s) => s.isAvailable)
              .map((storage) => {
                const isSelected = storage.label === selectedStorage;
                // Price = Base + Current RAM Cost + This Storage Cost
                const price =
                  basePrice + currentRamExtra + (storage.extraPrice || 0);

                return (
                  <button
                    key={storage._id}
                    onClick={() => onStorageSelect(storage)}
                    className={cn(
                      "flex flex-col items-start p-3 rounded-lg border-2 transition-all w-full",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50 bg-background",
                    )}
                  >
                    <span className="text-sm font-bold">{storage.label}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      ₹{price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
