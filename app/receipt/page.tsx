"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function ReceiptForm() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    // Use a timeout to ensure the DOM updates before printing
    setTimeout(() => {
      window.print()
      setIsPrinting(false) // Revert back to editable mode after print dialog is closed
    }, 500)
  }

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div
        className={`w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg border border-gray-200 ${isPrinting ? "print:shadow-none print:border-none print:rounded-none" : ""}`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col items-center">
            {/* Placeholder for the logo/stamp */}
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold text-center text-sm">service MICROWAVE DENPASAR</span>
            </div>
            <div className="text-xs text-gray-700 text-center space-y-0.5">
              <p>Jl. Gn. Atena I No. 11 A, Padangsambian Klod,</p>
              <p>Kec. Denpasar Bar, Kota Denpasar, Bali - 80361</p>
              <p className="flex items-center justify-center gap-1">
                <PhoneIcon className="w-3 h-3" /> 085737655537
              </p>
              <p>BCA : 6485241331 CAHYONO</p>
              <p>BRI : 7629 0100 8554 537 CAHYONO</p>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center">
              <span className="font-medium w-12">Nama</span>
              <span className="mr-2">:</span>
              {isPrinting ? (
                <span className="flex-1 border-b border-dashed border-transparent">Dispenser</span>
              ) : (
                <Input
                  type="text"
                  className="flex-1 border-b border-dashed rounded-none px-0 py-0 h-auto"
                  defaultValue="Dispenser"
                />
              )}
            </div>
            <div className="flex items-center">
              <span className="font-medium w-12">Tipe</span>
              <span className="mr-2">:</span>
              {isPrinting ? (
                <span className="flex-1 border-b border-dashed border-transparent">Dispenser</span>
              ) : (
                <Input
                  type="text"
                  className="flex-1 border-b border-dashed rounded-none px-0 py-0 h-auto"
                  defaultValue="Dispenser"
                />
              )}
            </div>
            <div className="flex items-center">
              <span className="font-medium w-12">Tgl</span>
              <span className="mr-2">:</span>
              {isPrinting ? (
                <span className="flex-1 border-b border-dashed border-transparent">4 Agustus 2025</span>
              ) : (
                <Input
                  type="text"
                  className="flex-1 border-b border-dashed rounded-none px-0 py-0 h-auto"
                  defaultValue="4 Agustus 2025"
                />
              )}
            </div>
            <div className="col-span-2 text-right mt-4">
              <span className="font-bold text-lg">INVOICE : </span>
              {isPrinting ? (
                <span className="inline-block w-24 border-b border-dashed border-transparent text-lg font-bold text-right">
                  0994
                </span>
              ) : (
                <Input
                  type="text"
                  className="inline-block w-24 border-b border-dashed rounded-none px-0 py-0 h-auto text-lg font-bold text-right"
                  defaultValue="0994"
                />
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Table className="border border-blue-300 mb-8">
          <TableHeader className="bg-blue-200">
            <TableRow>
              <TableHead className="w-[50px] text-center border-r border-blue-300 text-black">NO</TableHead>
              <TableHead className="text-center border-r border-blue-300 text-black">PENGGANTI KOMPONEN</TableHead>
              <TableHead className="w-[120px] text-center border-r border-blue-300 text-black">HARGA BARANG</TableHead>
              <TableHead className="w-[100px] text-center border-r border-blue-300 text-black">SERVICE</TableHead>
              <TableHead className="w-[120px] text-center text-black">TOTAL PRICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center border-r border-blue-300 py-1">1</TableCell>
              <TableCell className="border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block">Tidak keluar air</span>
                ) : (
                  <Textarea
                    className="w-full border-none resize-none h-auto min-h-[30px] px-0 py-0"
                    defaultValue="Tidak keluar air"
                  />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right">200.000</span>
                ) : (
                  <Input
                    type="text"
                    className="w-full border-none text-right px-0 py-0 h-auto"
                    defaultValue="200.000"
                  />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
            <TableRow>
              <TableCell className="text-center border-r border-blue-300 py-1">2</TableCell>
              <TableCell className="border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block"></span>
                ) : (
                  <Textarea className="w-full border-none resize-none h-auto min-h-[30px] px-0 py-0" />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center border-r border-blue-300 py-1">3</TableCell>
              <TableCell className="border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block"></span>
                ) : (
                  <Textarea className="w-full border-none resize-none h-auto min-h-[30px] px-0 py-0" />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center border-r border-blue-300 py-1">4</TableCell>
              <TableCell className="border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block"></span>
                ) : (
                  <Textarea className="w-full border-none resize-none h-auto min-h-[30px] px-0 py-0" />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right border-r border-blue-300 py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
              <TableCell className="text-right py-1">
                {isPrinting ? (
                  <span className="w-full block text-right"></span>
                ) : (
                  <Input type="text" className="w-full border-none text-right px-0 py-0 h-auto" />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Footer Section */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col items-center relative">
            {/* Placeholder for the stamp */}
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-center text-sm absolute -top-16 left-1/2 -translate-x-1/2 opacity-70">
              GARANSI SERVICE 1 BULAN
            </div>
            <p className="text-sm text-gray-700 mt-16">Signature</p>
            <div className="w-32 border-b border-black mt-2"></div>
            {isPrinting ? (
              <span className="w-32 text-center block">Cahyono</span>
            ) : (
              <Input type="text" className="w-32 text-center border-none px-0 py-0 h-auto" defaultValue="Cahyono" />
            )}
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center mb-4">
              <span className="font-bold text-lg mr-4">Grand Total</span>
              <div className="border border-blue-300 p-2 w-40 text-right">
                {isPrinting ? (
                  <span className="w-full block text-right font-bold text-lg">200.000</span>
                ) : (
                  <Input
                    type="text"
                    className="w-full border-none text-right px-0 py-0 h-auto font-bold text-lg"
                    defaultValue="200.000"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center text-sm mt-4">
              <span className="mr-2">Received by</span>
              {isPrinting ? (
                <span className="w-40 border-b border-dashed border-transparent block"></span>
              ) : (
                <Input type="text" className="w-40 border-b border-dashed rounded-none px-0 py-0 h-auto" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8 no-print">
          <Button onClick={handlePrint}>Cetak Nota</Button>
        </div>
      </div>
    </div>
  )
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
  )
}
