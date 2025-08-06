"use client";

import type React from "react";

import { useState } from "react";
import ReceiptInputFormComponent from "@/components/receipt-input-form";
import ReceiptPreviewComponent from "@/components/receipt-preview";

export interface ReceiptItem {
  no: number;
  komponen: string;
  hargaBarang: string;
  service: string;
  totalPrice: string;
}

export interface ReceiptData {
  nama: string;
  tipe: string;
  tgl: string;
  invoice: string;
  items: ReceiptItem[];
  signature: string;
  grandTotal: string;
  receivedBy: string;
}

export default function HomePage() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data: ReceiptData) => {
    setReceiptData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 print:p-0 bg-gray-100">
      {!showPreview && (
        <>
          <h1 className="text-2xl font-bold mb-8 text-gray-800">
            INPUT DATA NOTA
          </h1>
          <ReceiptInputFormComponent
            onSubmit={handleFormSubmit}
            initialData={receiptData || undefined}
          />
        </>
      )}

      {showPreview && receiptData && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 no-print">
            PRATINJAU NOTA
          </h1>
          <ReceiptPreviewComponent
            data={receiptData}
            onBackToForm={handleBackToForm}
          />
        </>
      )}
    </main>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.7.69a19 19 0 0 0 6 6l.69-.7a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
