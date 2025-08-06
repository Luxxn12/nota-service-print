"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { ReceiptData, ReceiptItem } from "@/app/page";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale"; 

interface ReceiptInputFormProps {
  onSubmit: (data: ReceiptData) => void;
  initialData?: ReceiptData;
}

export default function ReceiptInputForm({
  onSubmit,
  initialData,
}: ReceiptInputFormProps) {
  const formatDateToID = useCallback((date: any): string => {
    const parsedDate = new Date(date);
    if (!parsedDate || isNaN(parsedDate.getTime())) return "";
    return format(parsedDate, "d MMMM yyyy", { locale: id });
  }, []);
  

  const generateInvoiceNumber = useCallback(() => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); 
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); 
    const day = now.getDate().toString().padStart(2, "0"); 
    const random = Math.floor(1000 + Math.random() * 9000); 
    return `${year}${month}${day}${random}`;
  }, []);

  const [nama, setNama] = useState(initialData?.nama || "");
  const [tipe, setTipe] = useState(initialData?.tipe || "");
  const [tgl, setTgl] = useState<Date | undefined>(
    initialData?.tgl ? new Date(initialData.tgl) : new Date()
  );
  const [invoice, setInvoice] = useState(
    initialData?.invoice || generateInvoiceNumber()
  );
  const [signature, setSignature] = useState(
    initialData?.signature || "Cahyono"
  );
  const [grandTotal, setGrandTotal] = useState(initialData?.grandTotal || "0");
  const [receivedBy, setReceivedBy] = useState(initialData?.receivedBy || "");

  const [items, setItems] = useState<ReceiptItem[]>(
    initialData?.items || [
      {
        no: 1,
        komponen: "",
        hargaBarang: "",
        service: "",
        totalPrice: "",
      },
      { no: 2, komponen: "", hargaBarang: "", service: "", totalPrice: "" },
      { no: 3, komponen: "", hargaBarang: "", service: "", totalPrice: "" },
      { no: 4, komponen: "", hargaBarang: "", service: "", totalPrice: "" },
      { no: 5, komponen: "", hargaBarang: "", service: "", totalPrice: "" },
    ]
  );

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const parseCurrency = (value: string): number => {
    const cleanedValue = value.replace(/[^0-9,-]+/g, "").replace(",", ".");
    return Number.parseFloat(cleanedValue) || 0;
  };

  const calculateItemTotalPrice = useCallback((item: ReceiptItem): string => {
    const hargaBarangNum = parseCurrency(item.hargaBarang);
    const serviceNum = parseCurrency(item.service);
    return (hargaBarangNum + serviceNum).toString();
  }, []);

  const calculateCurrentGrandTotal = useCallback(
    (currentItems: ReceiptItem[]): string => {
      let total = 0;
      currentItems.forEach((item) => {
        total += parseCurrency(item.totalPrice);
      });
      return total.toString();
    },
    []
  );

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setTipe(initialData.tipe);
      setTgl(initialData.tgl ? new Date(initialData.tgl) : undefined);
      setInvoice(initialData.invoice);
      setSignature(initialData.signature);
      setReceivedBy(initialData.receivedBy);

      const loadedItems = initialData.items.map((item) => ({
        ...item,
        hargaBarang: item.hargaBarang || "0",
        service: item.service || "0",
        totalPrice: calculateItemTotalPrice({
          ...item,
          hargaBarang: item.hargaBarang || "0",
          service: item.service || "0",
        }),
      }));
      setItems(loadedItems);
    } else {
      setTgl(new Date());
      setInvoice(generateInvoiceNumber());
    }
  }, [initialData, calculateItemTotalPrice, generateInvoiceNumber]);

  useEffect(() => {
    setGrandTotal(calculateCurrentGrandTotal(items));
  }, [items, calculateCurrentGrandTotal]);

  const handleItemChange = (
    index: number,
    field: keyof ReceiptItem,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "hargaBarang" || field === "service") {
      newItems[index].totalPrice = calculateItemTotalPrice(newItems[index]);
    }
    setItems(newItems); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nama,
      tipe,
      tgl: formatDateToID(tgl),
      invoice,
      items,
      signature,
      grandTotal,
      receivedBy,
    });
  };

  return (
    <Card className="w-full max-w-3xl border-gray-300 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label
                htmlFor="nama"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Nama Pelanggan
              </Label>
              <Input
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="tipe"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Tipe Perangkat
              </Label>
              <Input
                id="tipe"
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="tgl"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Tanggal Servis
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tgl && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tgl ? formatDateToID(tgl) : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={tgl}
                    onSelect={setTgl}
                    initialFocus
                    locale={id} 
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label
                htmlFor="invoice"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Nomor Invoice
              </Label>
              <Input
                id="invoice"
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
                readOnly
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Itemized Table Input */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Daftar Pengganti Komponen / Servis
            </Label>
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[40px_1fr_100px_100px_100px] gap-2 items-center"
              >
                <span className="text-sm font-medium text-gray-600">
                  #{item.no}
                </span>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Pengganti Komponen
                  </Label>
                  <Input
                    placeholder="Pengganti Komponen"
                    value={item.komponen}
                    onChange={(e) =>
                      handleItemChange(index, "komponen", e.target.value)
                    }
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Harga Barang
                  </Label>
                  <Input
                    placeholder="Harga Barang"
                    value={item.hargaBarang}
                    onChange={(e) =>
                      handleItemChange(index, "hargaBarang", e.target.value)
                    }
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Service
                  </Label>
                  <Input
                    placeholder="Service"
                    value={item.service}
                    onChange={(e) =>
                      handleItemChange(index, "service", e.target.value)
                    }
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Total Price
                  </Label>
                  <Input
                    placeholder="Total Price"
                    value={formatCurrency(parseCurrency(item.totalPrice))}
                    readOnly
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label
                htmlFor="signature"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Nama Penanggung Jawab
              </Label>
              <Input
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="grandTotal"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Grand Total (Rp)
              </Label>
              <Input
                id="grandTotal"
                value={formatCurrency(parseCurrency(grandTotal))}
                readOnly
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-2">
              <Label
                htmlFor="receivedBy"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Diterima Oleh (Nama Pelanggan)
              </Label>
              <Input
                id="receivedBy"
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            Lihat Pratinjau Nota
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
