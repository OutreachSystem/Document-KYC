"use client";

import { Modal } from "@/components/ui/Modal";
import { serviceOptions } from "@/lib/data/customers";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] text-gray-600">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-brand-500";

export function AddClientModal({
  variant,
  onClose,
}: {
  variant: "cloud" | "onprem" | null;
  onClose: () => void;
}) {
  const isOnPrem = variant === "onprem";

  return (
    <Modal
      open={variant !== null}
      onClose={onClose}
      showClose
      className="max-w-2xl"
    >
      <div className="max-h-[85vh] overflow-y-auto px-8 py-7">
        <h2 className="text-center text-[15px] font-bold text-gray-900">
          Create A New {isOnPrem ? "On-Prem" : "Cloud"} Client
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-center text-[10px] leading-relaxed text-gray-500">
          Enter the information below to create a new{" "}
          {isOnPrem ? "on-premises" : "cloud"} client account with access to our
          services.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Name">
            <input className={inputClass} placeholder="Enter company name" />
          </Field>
          <Field label="Logo">
            <input
              type="file"
              className="w-full rounded-md border border-dashed border-gray-300 px-3 py-1.5 text-[10px] text-gray-500 file:mr-2 file:rounded file:border-0 file:bg-gray-100 file:px-2 file:py-1 file:text-[10px]"
            />
          </Field>

          <Field label="Email">
            <input className={inputClass} placeholder="Enter email address" />
          </Field>
          <Field label="Billing Email">
            <input className={inputClass} placeholder="Enter billing email" />
          </Field>

          <Field label="First Name">
            <input className={inputClass} placeholder="Enter first name" />
          </Field>
          <Field label="Last Name">
            <input className={inputClass} placeholder="Enter last name" />
          </Field>

          <Field label="Account Type">
            <select className={inputClass} defaultValue="">
              <option value="" disabled>
                Choose Account Type
              </option>
              <option>Sandbox</option>
              <option>Live</option>
            </select>
          </Field>
          <Field label="Domain">
            <input className={inputClass} placeholder="example.com" />
          </Field>

          <Field label="License Expiry">
            <input type="date" className={inputClass} />
          </Field>
          {isOnPrem && (
            <Field label="Server Region">
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Choose region
                </option>
                <option>Amman DC</option>
                <option>Riyadh DC</option>
                <option>Dubai DC</option>
              </select>
            </Field>
          )}
        </div>

        <h3 className="mt-7 text-[13px] font-bold text-gray-900">
          Services Configuration
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2.5 text-[10px] text-gray-700 transition hover:border-brand-300 hover:bg-brand-50/40"
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 accent-[var(--brand-600)]"
              />
              {service}
            </label>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-200 px-6 py-2 text-[12px] text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-brand-800 px-6 py-2 text-[12px] font-medium text-white transition hover:bg-brand-900"
          >
            Create Client
          </button>
        </div>
      </div>
    </Modal>
  );
}
