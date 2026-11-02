import { Suspense } from "react";
import { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { OrderConfirmationDetails } from "@/components/commerce/OrderConfirmationDetails";

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export function generateStaticParams() {
  return [
    { orderId: "demo" },
    { orderId: "confirmed" },
    { orderId: "sample-order" },
    { orderId: "CC-2026-TEST" },
  ];
}

export async function generateMetadata({ params }: OrderConfirmationPageProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order ${orderId} Confirmed | Craftchirp Gallery`,
    description: "Thank you for acquiring a 1-of-1 original artwork from Craftchirp.",
  };
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-offwhite text-[#2d2a26]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Success Banner */}
        <div className="text-center space-y-4 mb-16">
          <div className="w-16 h-16 rounded-full bg-brand-olive/15 text-brand-olive flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={36} />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-terracotta block">
            Acquisition Confirmed • Test Order
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2d2a26]">
            Welcome to the Sanctuary
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-sans max-w-lg mx-auto">
            Thank you for collecting an original work by Rachana Agarwal. Your order <span className="font-mono font-bold text-brand-clay">{orderId}</span> has been confirmed.
          </p>
        </div>

        {/* Dynamic Order Details & Archival Certificate via Client Suspense */}
        <Suspense fallback={<div className="py-20 text-center text-xs text-gray-400">Loading order verification...</div>}>
          <OrderConfirmationDetails orderId={orderId} />
        </Suspense>

      </div>
    </div>
  );
}
