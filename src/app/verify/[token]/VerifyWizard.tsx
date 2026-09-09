"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheckBig,
  CircleUserRound,
  ExternalLink,
  IdCard,
  Image as ImageIcon,
  Info,
  Loader2,
  Smartphone,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import {
  IdCardBackArt,
  IdCardFrontArt,
} from "@/components/verify/illustrations";

type Step =
  | "intro"
  | "idType"
  | "uploadMethod"
  | "qr"
  | "front"
  | "back"
  | "liveness"
  | "verifying"
  | "done";

const LANGUAGES = ["EN", "AR", "FR"];

function Footer() {
  return (
    <div className="flex justify-center pb-8 pt-6">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-[13px] text-gray-500 shadow-sm ring-1 ring-white">
        <span className="font-bold text-brand-700">DK</span>
        Powered by{" "}
        <span className="inline-flex items-center gap-1 font-medium text-brand-600">
          Document KYC <ExternalLink className="h-3 w-3" />
        </span>
      </span>
    </div>
  );
}

function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  return (
    <div className="absolute right-5 top-5 z-20">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
      >
        {lang} <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-20 animate-pop-in overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-[12px] text-gray-700 transition hover:bg-gray-50"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className="absolute left-6 top-6 rounded-xl bg-gray-100 p-2.5 text-gray-600 transition hover:bg-gray-200"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 text-white shadow-lg shadow-brand-900/20">
      {children}
    </div>
  );
}

/** Live camera preview with a graceful fallback when access is denied. */
function CameraFeed({ onReady }: { onReady: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setError(true));

    const timer = setTimeout(onReady, 3200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [onReady]);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-800 text-gray-300">
        <CircleUserRound className="h-16 w-16" strokeWidth={1} />
        <p className="text-[12px]">Camera preview unavailable</p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="h-full w-full object-cover"
    />
  );
}

export function VerifyWizard() {
  const [step, setStep] = useState<Step>("intro");
  const [docType, setDocType] = useState<"id" | "passport">("id");
  const [frontFile, setFrontFile] = useState<string | null>(null);
  const [backFile, setBackFile] = useState<string | null>(null);

  useEffect(() => {
    if (step !== "verifying") return;
    const timer = setTimeout(() => setStep("done"), 2600);
    return () => clearTimeout(timer);
  }, [step]);

  const goToLiveness = () => setStep("liveness");

  return (
    <div className="relative flex min-h-screen flex-col">
      {step !== "intro" && step !== "verifying" && <LanguagePicker />}

      <div className="flex flex-1 items-center justify-center px-4 py-8">
        {/* ---------- Intro ---------- */}
        {step === "intro" && (
          <div className="relative w-full max-w-[860px] animate-pop-in rounded-3xl bg-white/90 px-8 py-10 shadow-xl ring-1 ring-white sm:px-14 sm:py-12">
            <StepIcon>
              <CircleCheckBig className="h-7 w-7" />
            </StepIcon>

            <h1 className="mt-6 text-center text-[30px] font-bold leading-tight text-gray-900">
              Let&apos;s Start the{" "}
              <span className="text-brand-700">Identification Process</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-center text-[15px] leading-relaxed text-gray-600">
              Please prepare your personal identification documents and get ready
              for a secure verification process
            </p>

            <div className="mt-7 rounded-2xl bg-sky-50/70 px-6 py-6 ring-1 ring-sky-100">
              <h2 className="text-center text-[17px] font-bold text-gray-900">
                Before Starting, Please Prepare:
              </h2>

              <ul className="mt-5 space-y-5">
                {[
                  {
                    icon: <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />,
                    bg: "bg-emerald-100",
                    title: "Government Document",
                    body: "Prepare a valid government-issued ID (passport, driver's license, or national ID)",
                  },
                  {
                    icon: <Camera className="h-4 w-4 text-sky-600" />,
                    bg: "bg-sky-100",
                    title: "Camera Access",
                    body: "Ensure your device's camera is active and working properly",
                  },
                  {
                    icon: <CircleUserRound className="h-4 w-4 text-fuchsia-600" />,
                    bg: "bg-fuchsia-100",
                    title: "Selfie Ready",
                    body: "Get ready to take a clear selfie with your document for verification",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.bg}`}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-gray-900">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[14px] text-gray-600">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex gap-4 rounded-2xl bg-sky-50/50 px-6 py-5 ring-1 ring-sky-100">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100">
                <Info className="h-4 w-4 text-sky-600" />
              </span>
              <div>
                <p className="text-[15px] font-bold text-gray-900">
                  Privacy &amp; Security
                </p>
                <p className="mt-0.5 text-[14px] leading-relaxed text-gray-600">
                  We use an automated system to identify documents securely. Your
                  information is encrypted and protected. For more information,
                  please review our{" "}
                  <a href="#" className="font-bold text-sky-700 underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setStep("idType")}
                className="inline-flex items-center gap-3 rounded-full bg-brand-900 px-9 py-4 text-[15px] font-medium text-white shadow-xl shadow-brand-900/30 transition hover:bg-brand-800"
              >
                Start Identification Session
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------- Select ID type ---------- */}
        {step === "idType" && (
          <div className="relative w-full max-w-[680px] animate-pop-in rounded-3xl bg-white/95 px-8 py-10 shadow-xl ring-1 ring-white sm:px-12">
            <BackButton onClick={() => setStep("intro")} />

            <StepIcon>
              <IdCard className="h-7 w-7" />
            </StepIcon>

            <h1 className="mt-6 text-center text-[34px] font-bold text-gray-900">
              Select <span className="text-brand-700">ID Type</span>
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-center text-[15px] text-gray-600">
              Choose the type of government-issued photo ID you&apos;d like to
              use for verification
            </p>

            <div className="mt-8 space-y-4">
              {(
                [
                  {
                    id: "id" as const,
                    icon: <IdCard className="h-6 w-6" />,
                    title: "ID Document",
                    body: "National ID.",
                    bg: "from-sky-50 to-white",
                  },
                  {
                    id: "passport" as const,
                    icon: <Upload className="h-6 w-6" />,
                    title: "Passport",
                    body: "International passport for global verification",
                    bg: "from-fuchsia-50 to-white",
                  },
                ]
              ).map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setDocType(option.id);
                    setStep("uploadMethod");
                  }}
                  className={`flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r ${option.bg} px-5 py-5 text-left ring-2 ring-brand-800/90 transition hover:shadow-lg`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-800 text-white">
                    {option.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[17px] font-bold text-gray-900">
                      {option.title}
                    </span>
                    <span className="block text-[14px] text-gray-600">
                      {option.body}
                    </span>
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>

            <div className="mt-7 flex gap-3 rounded-2xl bg-amber-50 px-5 py-4 ring-1 ring-amber-100">
              <CircleAlert className="h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <p className="text-[13px] font-semibold text-gray-800">
                  Important
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-gray-600">
                  Make sure your ID is valid, clearly visible, and not expired.
                  The document should be in good condition with all text
                  readable.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Upload method ---------- */}
        {step === "uploadMethod" && (
          <div className="relative w-full max-w-[520px] animate-pop-in rounded-3xl bg-white/95 px-7 py-9 shadow-xl ring-1 ring-white">
            <BackButton onClick={() => setStep("idType")} />

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white shadow-lg shadow-brand-900/20">
              <UploadCloud className="h-6 w-6" />
            </div>

            <h1 className="mt-4 text-center text-[24px] font-bold text-gray-900">
              Choose <span className="text-brand-700">Upload Method</span>
            </h1>
            <p className="mt-1.5 text-center text-[13px] text-gray-600">
              Select how you&apos;d like to capture your ID document
            </p>

            <div className="mt-6 space-y-3">
              {(
                [
                  {
                    id: "mobile" as const,
                    icon: <Smartphone className="h-5 w-5" />,
                    title: "Continue on Mobile",
                    body: "Use your mobile device to scan a QR code and continue the process",
                    bg: "from-emerald-50 to-white",
                  },
                  {
                    id: "camera" as const,
                    icon: <Camera className="h-5 w-5" />,
                    title: "Take a Photo",
                    body: "Use your device camera to capture your ID document",
                    bg: "from-sky-50 to-white",
                  },
                  {
                    id: "file" as const,
                    icon: <UploadCloud className="h-5 w-5" />,
                    title: "Upload a File",
                    body: "Select an existing photo from your device gallery",
                    bg: "from-rose-50 to-white",
                  },
                ]
              ).map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setStep(option.id === "mobile" ? "qr" : "front")
                  }
                  className={`flex w-full items-center gap-3.5 rounded-2xl bg-gradient-to-r ${option.bg} px-4 py-4 text-left ring-2 ring-brand-800/80 transition hover:shadow-md`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-white">
                    {option.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-bold text-gray-900">
                      {option.title}
                    </span>
                    <span className="block text-[11px] text-gray-600">
                      {option.body}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------- QR handoff ---------- */}
        {step === "qr" && (
          <div className="relative w-full max-w-[460px] animate-pop-in rounded-3xl bg-white/95 px-8 py-10 text-center shadow-xl ring-1 ring-white">
            <BackButton onClick={() => setStep("uploadMethod")} />

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white">
              <Smartphone className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-[22px] font-bold text-gray-900">
              Continue on <span className="text-brand-700">Mobile</span>
            </h1>
            <p className="mt-1.5 text-[13px] text-gray-600">
              Scan this QR code with your phone camera to continue the session.
            </p>

            <div className="mx-auto mt-6 grid h-44 w-44 grid-cols-9 gap-0.5 rounded-xl bg-white p-3 ring-1 ring-gray-200">
              {Array.from({ length: 81 }, (_, i) => {
                // Deterministic pattern so the QR placeholder never flickers.
                const on = (i * 7 + (i % 5) * 3) % 4 !== 0;
                const corner =
                  (i % 9 < 3 && i < 27) ||
                  (i % 9 > 5 && i < 27) ||
                  (i % 9 < 3 && i > 53);
                return (
                  <span
                    key={i}
                    className={`rounded-[1px] ${
                      corner || on ? "bg-gray-900" : "bg-transparent"
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={() => setStep("front")}
              className="mt-6 rounded-full bg-brand-900 px-7 py-3 text-[13px] font-medium text-white transition hover:bg-brand-800"
            >
              Continue on this device instead
            </button>
          </div>
        )}

        {/* ---------- Upload front / back ---------- */}
        {(step === "front" || step === "back") && (
          <div className="relative w-full max-w-[520px] animate-pop-in rounded-3xl bg-white/95 px-7 py-9 shadow-xl ring-1 ring-white">
            <BackButton
              onClick={() =>
                setStep(step === "front" ? "uploadMethod" : "front")
              }
            />

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white shadow-lg shadow-brand-900/20">
              <ImageIcon className="h-6 w-6" />
            </div>

            <h1 className="mt-4 text-center text-[24px] font-bold text-gray-900">
              Upload{" "}
              <span className="text-brand-700">
                {step === "front" ? "Front of Document" : "Back of Document"}
              </span>
            </h1>
            <p className="mt-1.5 text-center text-[13px] text-gray-600">
              {step === "front"
                ? `Step 1 of ${docType === "id" ? 2 : 1} - Upload the front side of your identity document`
                : "Step 2 of 2 - Upload the back side of your document."}
            </p>

            <div className="mt-5 flex justify-center">
              {step === "front" ? (
                <IdCardFrontArt className="h-[110px] w-[180px] rounded-lg shadow-md" />
              ) : (
                <IdCardBackArt className="h-[110px] w-[180px] rounded-lg shadow-md" />
              )}
            </div>

            <div className="mt-5 flex gap-2.5 rounded-2xl bg-sky-50/70 px-4 py-3 ring-1 ring-sky-100">
              <Info className="h-3.5 w-3.5 shrink-0 text-sky-500" />
              <div>
                <p className="text-[11px] font-semibold text-gray-800">
                  Upload Requirements
                </p>
                <p className="text-[11px] text-gray-600">
                  Upload a color image of the entire document. Screenshots are
                  not allowed. JPG, JPEG or PNG format only.
                </p>
              </div>
            </div>

            <label
              className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl px-6 py-7 text-center ring-2 transition ${
                step === "front"
                  ? "bg-sky-50/40 ring-sky-200 hover:bg-sky-50"
                  : "bg-fuchsia-50/40 ring-brand-700 hover:bg-fuchsia-50"
              }`}
            >
              <UploadCloud className="h-7 w-7 text-brand-700" />
              <span className="mt-2 text-[14px] font-bold text-gray-900">
                Choose File to Upload
              </span>
              <span className="mt-0.5 text-[11px] text-gray-500">
                Click here to select an image file
              </span>

              {((step === "front" && frontFile) ||
                (step === "back" && backFile)) && (
                <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
                  {step === "front" ? frontFile : backFile}
                </span>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const name = e.target.files?.[0]?.name ?? "document.jpg";
                  if (step === "front") {
                    setFrontFile(name);
                    setTimeout(
                      () => setStep(docType === "id" ? "back" : "liveness"),
                      550,
                    );
                  } else {
                    setBackFile(name);
                    setTimeout(goToLiveness, 550);
                  }
                }}
              />
            </label>

            <button
              onClick={() =>
                step === "front"
                  ? setStep(docType === "id" ? "back" : "liveness")
                  : goToLiveness()
              }
              className="mx-auto mt-4 block text-[11px] text-gray-400 underline transition hover:text-brand-600"
            >
              Skip and continue (demo)
            </button>
          </div>
        )}

        {/* ---------- Liveness ---------- */}
        {step === "liveness" && (
          <div className="relative w-full max-w-[520px] animate-pop-in">
            <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
              <div className="aspect-[4/3] w-full">
                <CameraFeed onReady={() => setStep("verifying")} />
              </div>

              <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded bg-teal-600 px-3 py-1.5 text-[17px] font-medium text-white">
                Move back
              </span>

              <button
                onClick={() => setStep("uploadMethod")}
                aria-label="Cancel liveness check"
                className="absolute right-4 top-4 rounded bg-white p-1 text-teal-700 ring-1 ring-teal-500 transition hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------- Verifying ---------- */}
        {step === "verifying" && (
          <div className="relative w-full max-w-[420px] animate-pop-in">
            <div className="relative rounded-lg bg-white shadow-xl">
              <div className="flex items-center justify-center gap-2 px-6 py-4">
                <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                <span className="text-[14px] text-gray-700">Verifying...</span>
              </div>
              <button
                aria-label="Cancel"
                className="absolute right-3 top-3 rounded border border-teal-500 bg-white p-1 text-teal-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="h-52" />
            </div>
          </div>
        )}

        {/* ---------- Done ---------- */}
        {step === "done" && (
          <div className="w-full max-w-[420px] animate-pop-in rounded-3xl bg-white/95 px-8 py-9 text-center shadow-xl ring-1 ring-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white shadow-lg shadow-brand-900/20">
              <CircleCheckBig className="h-6 w-6" />
            </div>

            <h1 className="mt-4 text-[24px] font-bold text-gray-900">
              Thank <span className="text-brand-700">You!</span>
            </h1>
            <p className="mt-1 text-[14px] font-bold text-gray-800">
              Registration <span className="text-brand-700">Successful</span>
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
              Your verification process has been completed successfully. You can
              now proceed with your account.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
              <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
              <span className="text-[12px] font-bold text-gray-800">
                Verification Complete
              </span>
            </div>
          </div>
        )}
      </div>

      {step !== "verifying" && step !== "done" && <Footer />}
      {step === "verifying" && <Footer />}
    </div>
  );
}
