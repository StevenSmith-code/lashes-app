import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const serviceId = session?.metadata?.serviceId;
  const dateTime = session?.metadata?.dateTime;
  const price = session?.metadata?.price;

  if (event.type === "checkout.session.completed") {
    if (!userId || !serviceId || !dateTime) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    try {
      const dateTimeObject = new Date(dateTime);

      await db.purchase.create({
        data: {
          serviceId: serviceId,
          userId: userId,
          price: parseInt(price!),
        },
      });

      await db.appointment.create({
        data: {
          userId: userId,
          serviceId: serviceId,
          dateTime: dateTimeObject,
        },
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
