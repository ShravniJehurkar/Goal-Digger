import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentModalProps {
  isOpen: boolean;
  onConsent: () => void;
  onClose: () => void;
}

export default function ConsentModal({
  isOpen,
  onConsent,
  onClose,
}: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [age18Plus, setAge18Plus] = useState(false);

  const handleConsent = () => {
    sessionStorage.setItem("userConsent", "true");
    onConsent();
  };

  const canSubmit = agreed && (age18Plus || guardianConsent);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="
          sm:max-w-lg
          rounded-2xl
          border border-violet-200
          bg-white
          p-6
          text-slate-900
          shadow-2xl
        "
      >
        <DialogHeader className="space-y-3 text-left">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </span>
            Age Verification Required
          </DialogTitle>

          <DialogDescription className="text-sm leading-6 text-slate-600">
            Before using our career guidance tool, please confirm your age and
            consent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-900">
            <p>
              This tool uses your personal preferences and background to provide
              career recommendations. We want to ensure you're old enough to use
              our service.
            </p>
          </div>

          <div className="space-y-4">
            <label
              htmlFor="age18"
              className="flex cursor-pointer items-start gap-3"
            >
              <Checkbox
                id="age18"
                checked={age18Plus}
                onCheckedChange={(checked) => {
                  const value = checked === true;
                  setAge18Plus(value);

                  if (value) {
                    setGuardianConsent(false);
                  }
                }}
                className="mt-0.5"
              />

              <span className="text-sm leading-5 text-slate-700">
                I confirm that I am 18 years of age or older.
              </span>
            </label>

            <label
              htmlFor="guardian"
              className="flex cursor-pointer items-start gap-3"
            >
              <Checkbox
                id="guardian"
                checked={guardianConsent}
                onCheckedChange={(checked) => {
                  const value = checked === true;
                  setGuardianConsent(value);

                  if (value) {
                    setAge18Plus(false);
                  }
                }}
                className="mt-0.5"
              />

              <span className="text-sm leading-5 text-slate-700">
                I am under 18 but have guardian consent to use this service.
              </span>
            </label>

            <label
              htmlFor="terms"
              className="flex cursor-pointer items-start gap-3 border-t border-slate-100 pt-4"
            >
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => {
                  setAgreed(checked === true);
                }}
                className="mt-0.5"
              />

              <span className="text-sm leading-5 text-slate-700">
                I understand and agree that this tool will collect my responses
                to provide personalized career recommendations. My data is
                processed in accordance with the privacy policy.
              </span>
            </label>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button
            type="button"
            disabled={!canSubmit}
            onClick={handleConsent}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-indigo-600
              text-white
              shadow-md
              transition-all
              hover:from-violet-700
              hover:to-indigo-700
              disabled:cursor-not-allowed
              disabled:opacity-40
              sm:w-auto
            "
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}