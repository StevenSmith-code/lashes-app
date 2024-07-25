import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { clerkClient } from '@clerk/nextjs/server';

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
  const date = session?.metadata?.date;
  const price = session?.metadata?.price;
  const user = await clerkClient.users.getUser(userId!);

  if (event.type === "checkout.session.completed") {
    if (!userId || !serviceId || !date) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    try {
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
          dateTime: date,
          price: parseInt(price!),
          name: `${user.firstName} ${user.lastName}`,
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
