"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

const WORKFLOWS = [
  "Id verification + Liveness + AML",
  "Id verification + Liveness",
  "Id verification only",
  "Liveness only",
  "Id verification + Liveness + AML + NFC",
];

function randomToken() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < 24; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function AddVerificationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "link">("form");
  const [workflow, setWorkflow] = useState(WORKFLOWS[0]);
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  const close = () => {
    onClose();
    // Reset after the closing animation so the user doesn't see it flip back.
    setTimeout(() => {
      setStep("form");
      setCopied(false);
    }, 200);
  };

  const handleCreate = () => {
    setToken(randomToken());
    setStep("link");
  };

  const verifyUrl = token
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${token}`
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl);
    } catch {
      // Clipboard can be blocked in some browsers; the demo still shows feedback.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      showClose={step === "link"}
      className={step === "form" ? "max-w-xl" : "max-w-lg"}
    >
      {step === "form" ? (
        <div className="px-9 py-8">
          <h2 className="text-center text-[26px] font-bold text-gray-900">
            Create a new profile request
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
            Enter the information below to be able to create a new user
            identification request The user first and last name may be modified
            during the identification process, but the request identification
            code will not change
          </p>

          <label className="mt-6 block text-[15px] text-gray-700">
            Workflow
          </label>
          <select
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-[15px] text-gray-800 outline-none focus:border-brand-500"
          >
            {WORKFLOWS.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={close}
              className="rounded-md bg-rose-600 px-6 py-2.5 text-[15px] font-medium text-white transition hover:bg-rose-700"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="rounded-md bg-brand-700 px-7 py-2.5 text-[15px] font-medium text-white transition hover:bg-brand-800"
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="px-10 py-14 text-center">
          <p className="text-[19px] text-gray-800">
            Click the button below to start the verification process
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`/verify/${token}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-brand-800 px-6 py-3 text-[15px] font-medium text-white transition hover:bg-brand-900"
            >
              <ExternalLink className="h-4 w-4" />
              Start Verification
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-6 py-3 text-[15px] text-gray-700 transition hover:bg-gray-50"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <p className="mt-6 truncate text-[11px] text-gray-400">{verifyUrl}</p>
        </div>
      )}
    </Modal>
  );
}
