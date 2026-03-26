"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  FileText,
  LocateFixed,
  Mail,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Stepper, { Step } from "@/components/ui/stepper";

type CvGateCopy = {
  trigger: string;
  title: string;
  description: string;
  steps: readonly [string, string, string];
  email: string;
  location: string;
  reason: string;
  send: string;
  unlockTitle: string;
  unlockDescription: string;
  fallbackTitle: string;
  fallbackDescription: string;
  note: string;
};

export default function CvDownloadGate({
  copy,
}: {
  copy: CvGateCopy;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<"api" | "mailto">("api");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setRequestSubmitted(false);
      setSubmissionMode("api");
      setErrorMessage("");
      setLocationMessage("");
    }
  }, [isOpen]);

  const canProceed =
    (currentStep === 1 && email.trim().length > 0) ||
    (currentStep === 2 && location.trim().length > 0) ||
    (currentStep === 3 && reason.trim().length > 0);

  const handleUseCurrentLocation = async () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationMessage("Location access is not supported in this browser.");
      return;
    }

    setIsLocating(true);
    setLocationMessage("");

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const lat = Number(position.coords.latitude.toFixed(6));
      const lng = Number(position.coords.longitude.toFixed(6));
      setLocationCoords({ lat, lng });

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = (await response.json()) as {
          display_name?: string;
          address?: {
            city?: string;
            town?: string;
            state?: string;
            country?: string;
          };
        };

        const compactLocation = [
          data.address?.city || data.address?.town,
          data.address?.state,
          data.address?.country,
        ]
          .filter(Boolean)
          .join(", ");

        setLocation(compactLocation || data.display_name || `${lat}, ${lng}`);
        setLocationMessage("Location detected from your device.");
      } catch {
        setLocation(`${lat}, ${lng}`);
        setLocationMessage("Coordinates added. Reverse lookup was unavailable.");
      }
    } catch {
      setLocationMessage("Location access was denied or unavailable.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleFinalStepCompleted = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cv-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          location,
          reason,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        fallback?: "mailto";
        approverEmail?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send request.");
      }

      if (data.fallback === "mailto") {
        setSubmissionMode("mailto");
        const subject = encodeURIComponent("CV download request");
        const body = encodeURIComponent(
          `CV Download Request\n\nEmail: ${email}\nLocation: ${location}\nReason: ${reason}\n\nPlease review and verify this request.`
        );

        window.location.href = `mailto:${data.approverEmail || "pengseangsim210@gmail.com"}?subject=${subject}&body=${body}`;
      } else {
        setSubmissionMode("api");
      }

      setRequestSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send request."
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cv-gate">
      <Button
        type="button"
        variant="outline"
        className="h-13 rounded-full px-7"
        onClick={() => setIsOpen(true)}
      >
        <FileText className="h-4 w-4" />
        {copy.trigger}
      </Button>

      {!isOpen ? null : (
        <div className="cv-modal" role="dialog" aria-modal="true" aria-label={copy.title}>
          <button
            type="button"
            className="cv-modal-backdrop"
            aria-label="Close modal"
            onClick={() => setIsOpen(false)}
          />

          <div className="cv-modal-card">
            <div className="cv-modal-header">
              <div className="cv-gate-icon">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="cv-gate-title">{copy.title}</h3>
                <p className="cv-gate-description">{copy.description}</p>
              </div>
              <button
                type="button"
                className="cv-modal-close"
                aria-label="Close modal"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="cv-gate-success">
                <div>
                  <p className="cv-gate-success-title">
                    {submissionMode === "mailto" ? copy.fallbackTitle : copy.unlockTitle}
                  </p>
                  <p className="cv-gate-success-description">
                    {submissionMode === "mailto"
                      ? copy.fallbackDescription
                      : copy.unlockDescription}
                  </p>
                </div>
              </div>
            ) : (
              <Stepper
                initialStep={1}
                onStepChange={(step) => setCurrentStep(step)}
                onFinalStepCompleted={handleFinalStepCompleted}
                completedContent={null}
                nextButtonText="Next"
                completeButtonText={isSubmitting ? "Sending..." : copy.send}
                backButtonText="Back"
                nextButtonProps={{ disabled: !canProceed || isSubmitting }}
                stepCircleContainerClassName="cv-stepper-shell"
              >
                <Step>
                  <div className="cv-step-content">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Mail className="h-4 w-4 text-[var(--accent-strong)]" />
                        {copy.email}
                      </span>
                      <input
                        type="email"
                        className="input-shell"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </label>
                  </div>
                </Step>

                <Step>
                  <div className="cv-step-content">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <MapPin className="h-4 w-4 text-[var(--accent-strong)]" />
                        {copy.location}
                      </span>
                      <input
                        className="input-shell"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder={copy.location}
                        required
                      />
                    </label>
                    <div className="cv-location-actions">
                      <button
                        type="button"
                        className="cv-location-action"
                        onClick={handleUseCurrentLocation}
                        disabled={isLocating}
                      >
                        <LocateFixed className="h-4 w-4" />
                        {isLocating ? "Detecting..." : "Use current location"}
                      </button>

                      {locationCoords ? (
                        <a
                          href={`https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="cv-location-link"
                        >
                          <MapPin className="h-4 w-4" />
                          Open map
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                    {locationMessage ? (
                      <p className="cv-location-message">{locationMessage}</p>
                    ) : null}
                  </div>
                </Step>

                <Step>
                  <div className="cv-step-content">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-foreground">
                        {copy.reason}
                      </span>
                      <textarea
                        className="input-shell min-h-32 resize-none"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        placeholder={copy.reason}
                        required
                      />
                    </label>
                    <p className="cv-gate-note mt-4">{copy.note}</p>
                    {errorMessage ? <p className="cv-gate-error">{errorMessage}</p> : null}
                  </div>
                </Step>
              </Stepper>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
