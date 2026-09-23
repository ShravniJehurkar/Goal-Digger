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
    // Store consent in sessionStorage
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-semibold gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Age Verification Required
          </DialogTitle>
          <DialogDescription>
            Before using our career guidance tool, please confirm your age and
            consent.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="bg-orange-50 p-4 rounded-md text-orange-800 text-sm">
            <p>
              This tool uses your personal preferences and background to provide
              career recommendations. We want to ensure you're old enough to use
              our service.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="age18"
                checked={age18Plus}
                onCheckedChange={(checked) => {
                  setAge18Plus(checked as boolean);
                  if (checked) {
                    setGuardianConsent(false);
                  }
                }}
              />
              <label
                htmlFor="age18"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that I am 18 years of age or older
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="guardian"
                checked={guardianConsent}
                onCheckedChange={(checked) => {
                  setGuardianConsent(checked as boolean);
                  if (checked) {
                    setAge18Plus(false);
                  }
                }}
              />
              <label
                htmlFor="guardian"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I am under 18 but have guardian consent to use this service
              </label>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I understand and agree that this tool will collect my responses
                to provide personalized career recommendations. My data is
                processed in accordance with the privacy policy.
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button
            type="submit"
            disabled={!canSubmit}
            onClick={handleConsent}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
