import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body to get booking details
    const { service, dateTime } = await req.json();

    const dateTimeISO = dateTime + ".000Z";

    // Check if the service exists
    const serviceDetails = await db.service.findUnique({
      where: {
        name: service,
      },
    });

    if (!serviceDetails) {
      return new NextResponse("Service not found", { status: 404 });
    }

    // Stripe checkout session creation
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "USD",
            product_data: {
              name: serviceDetails.name,
              description: serviceDetails.description,
            },
            unit_amount: Math.round(serviceDetails.price! * 100),
          },
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking?canceled=1`,
      metadata: {
        userId: user.id,
        serviceId: serviceDetails.id,
        dateTime: dateTimeISO,
        price: serviceDetails.price,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[BOOKING_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
