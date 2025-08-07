"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReceiptData } from "@/app/page";
import PhoneIcon from "@/components/phone-icon";
import Image from "next/image";
import { Landmark, MapPin } from "lucide-react";

interface ReceiptPreviewProps {
  data: ReceiptData;
  onBackToForm: () => void;
}

export default function ReceiptPreview({
  data,
  onBackToForm,
}: ReceiptPreviewProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const formatCurrency = (value: string): string => {
    const numValue = Number.parseFloat(value) || 0;

    if (numValue === 0) return "";

    return numValue.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };


  return (
    <div className="flex justify-center p-4 sm:p-6 bg-gray-100 min-h-screen print:min-h-0 print:h-auto print:p-0 print:bg-white">
      <div
        className={`
          w-full max-w-4xl bg-white p-6 sm:p-8 shadow-lg rounded-lg border border-gray-200 flex flex-col 
          ${
            isPrinting
              ? "print:w-[148.5mm] print:h-[105mm] print:p-[4mm] print:shadow-none print:border-none print:rounded-none print:flex-shrink-0"
              : ""
          }
        `}
      >
        {/* Header Section */}
        <div className="flex gap-2 overflow-x-auto">
          <div className="flex w-[80%] gap-2  items-center ">
            {/* Refined Logo/Stamp Placeholder */}
            <Image
              src="/logo.png"
              alt="Refined Logo"
              width={100}
              height={100}
              className="w-28 h-28 print:w-20 print:h-20"
            />
            <div className="text-xs sm:text-sm print:text-[0.45rem] text-gray-700 space-y-1 print:space-y-0.5 mt-2 print:mt-1">
              <div className="flex  gap-2">
                <MapPin className="w-5 h-5 print:w-3 print:h-3 text-blue-900" />
                <div className="print:text-[10px]">
                  <p>Jl. Gn. Atena I No. 11 A, Padangsambian Klod,</p>
                  <p>Kec. Denpasar Bar, Kota Denpasar, Bali - 80361</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ">
                <PhoneIcon className="w-5 h-5 print:w-3 print:h-3 text-blue-900" />{" "}
                <p className=" print:text-[10px]">085737655537</p>
              </div>
              <div className="flex items-center gap-2 ">
                <Landmark className="w-5 h-5 print:w-3 print:h-3 text-blue-900" />{" "}
                <p className=" mt-1 print:text-[10px]">
                  BCA : 6485241331 CAHYONO
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <Landmark className="w-5 h-5 print:w-3 print:h-3 text-blue-900" />{" "}
                <p className=" print:text-[10px]">
                  BRI : 7629 0100 8554 537 CAHYONO
                </p>
              </div>
            </div>
          </div>

          <div className="print:w-[40%]">
            <div className="grid grid-cols-1  gap-x-2 gap-y-1 text-sm sm:text-base print:text-[10px] text-gray-800">
              <div className="flex items-center">
                <span className="font-medium  print:w-10">Nama</span>
                <span className="mr-1">:</span>
                <span className="flex-1  border-gray-400 pb-0.5">
                  {data.nama}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium  print:w-10">Tipe</span>
                <span className="mr-1">:</span>
                <span className="flex-1  border-gray-400 pb-0.5">
                  {data.tipe}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium  print:w-10">Tgl</span>
                <span className="mr-1">:</span>
                <span className="flex-1  border-gray-400 pb-0.5">
                  {data.tgl}
                </span>
              </div>
            </div>
            <div className="col-span-2  print:mt-0">
              <span className="font-bold text-xl print:text-[12px] mr-3 print:mr-2 text-blue-700">
                INVOICE :{" "}
              </span>
              <span className="inline-block w-24 print:w-16  border-gray-400 text-xl print:text-[12px] font-bold text-right">
                {data.invoice}
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-md overflow-hidden border border-blue-300 mb-4 mt-4 print:mb-3">
          <Table className="text-sm print:text-[0.6rem] bg-white w-full">
            <TableHeader className="bg-blue-500">
              <TableRow className="border-blue-300">
                <TableHead className="w-[30px] print:w-[20px] text-center border-r border-blue-300 text-white font-semibold py-2 print:py-1">
                  NO
                </TableHead>
                <TableHead className="text-center border-r border-blue-300 text-white font-semibold py-2 print:py-1">
                  PENGGANTI KOMPONEN
                </TableHead>
                <TableHead className="w-[100px] print:w-[60px] text-center border-r border-blue-300 text-white font-semibold py-2 print:py-1">
                  HARGA BARANG
                </TableHead>
                <TableHead className="w-[80px] print:w-[50px] text-center border-r border-blue-300 text-white font-semibold py-2 print:py-1">
                  SERVICE
                </TableHead>
                <TableHead className="w-[100px] print:w-[60px] text-center text-white font-semibold py-2 print:py-1">
                  TOTAL PRICE
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="rounded-2xl">
              {data.items.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-blue-100 hover:bg-blue-50"
                >
                  <TableCell className="text-center border-r border-blue-100 py-1 print:py-0.5">
                    {item.no}
                  </TableCell>
                  <TableCell className="border-r border-blue-100 py-1 print:py-0.5">
                    {item.komponen}
                  </TableCell>
                  <TableCell className="text-right border-r border-blue-100 py-1 print:py-0.5">
                    {formatCurrency(item.hargaBarang)}
                  </TableCell>
                  <TableCell className="text-right border-r border-blue-100 py-1 print:py-0.5">
                    {formatCurrency(item.service)}
                  </TableCell>
                  <TableCell className="text-right py-1 print:py-0.5">
                    {formatCurrency(item.totalPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between">
          <div className="flex justify-start w-1/2 gap-10">
            <div className="flex flex-col   items-center relative text-sm print:text-[0.6rem]">
              {/* Refined Stamp Placeholder */}
              <p className="text-gray-700 mt-20  font-medium">Signature</p>
              <Image
                src="/TTD.png"
                alt="ttd"
                width={200}
                height={200}
                className="w-40 h-4w-40 print:w-25 print:h-25 absolute top-0 left-1/2 -translate-x-1/2 opacity-90 z-20"
              />
              <div className="w-32 print:w-24 border-b border-gray-600 mt-2 print:mt-1"></div>
              <span className="w-32 print:w-24 text-center block font-semibold text-gray-800">
                {data.signature}
              </span>
            </div>
            <div className="flex flex-col   items-center relative text-sm print:text-[0.6rem]">
              {/* Refined Stamp Placeholder */}
              <p className="text-gray-700 mt-20  font-medium">Received by</p>
              <div className="w-32 print:w-24 border-b border-gray-600 mt-2 print:mt-1"></div>
              <span className="w-32 print:w-24 text-center block font-semibold text-gray-800">
                {data.receivedBy}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end text-sm print:text-[0.6rem] text-gray-800 ">
            <div className="flex items-center mb-3 print:mb-2 gap-3">
              <span className="font-bold text-xl border-1 p-2 print:p-2 print:w-fit  rounded-sm border-blue-500 print:text-[12px]  text-blue-700">
                Grand Total :
              </span>
              <div className="border-1 border-blue-500 rounded-sm p-2 print:p-2 w-36 print:w-fit text-right bg-blue-50">
                <span className="w-full block text-right font-bold text-xl print:text-[12px] text-black">
                  {Number(data.grandTotal) === 0
                    ? "Rp. 0"
                    : formatCurrency(data.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex gap-4 justify-center no-print z-50">
          <Button
            onClick={onBackToForm}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
          >
            Kembali ke Form
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Cetak Nota
          </Button>
        </div>
      </div>
    </div>
  );
}
