import { Webhook } from 'svix';

import { Request, Response } from 'express';
import prisma from '../../config/db';
import { clerkClient, WebhookEvent } from '@clerk/clerk-sdk-node';

const handleClerkWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occurred -- no svix headers' });
  }

  // Get the body
  const payload = req.body;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ error: 'Error occurred' });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;



  // Handle the webhook
  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'session.created':
        await handleSessionCreated(evt.data);
        break;
      case 'session.removed':
        await handleSessionRemove(evt.data)
      default:
        console.log(`Unhandled webhook type: ${eventType}`);
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).json({ error: 'Error handling webhook' });
  }

  res.json({ received: true });
};


async function handleSessionRemove(userData: any) {
  try {
    await clerkClient.sessions.revokeSession(userData.id);
    console.log('Session revocation done');
  } catch (error) {
    console.error('Error revoking session:', error);
    // Optionally, you can add more specific error handling based on the type of error
    if (error instanceof Error && error.message.includes('Session not found')) {
      console.error('Session not found:', error);
    } else if (error instanceof Error && error.message.includes('Invalid session token')) {
      console.error('Invalid session token:', error);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

async function handleUserCreated(userData: any) {
  const { id, email_addresses, username } = userData;
  const primaryEmail = email_addresses.find((email: any) => email.id === userData.primary_email_address_id);

  if (primaryEmail) {
    try {
      const user = await prisma.user.create({
        data: {
          email: primaryEmail.email_address,
          oauthId: id,
          username: username || primaryEmail.email_address.split('@')[0],
          companies:{
            create:{
              description:', we strive to create solutions that are both effective and sustainable. We leverage cutting-edge technology and industry best practices to deliver [key benefits] to our clients. Our goal is to build long-term partnerships based on trust, transparency, and mutual success.',
              image:'https://i.ibb.co.com/sJdc8jd/18363.jpg',
              title:'default Company'
            }
          }
        }
      });
     
    } catch (error) {
      
      throw error;
    }
  }
}

async function handleUserUpdated(userData: any) {
  const { id, email_addresses, username } = userData;
  const primaryEmail = email_addresses.find((email: any) => email.id === userData.primary_email_address_id);

  if (primaryEmail) {
    try {
      const user = await prisma.user.update({
        where: { oauthId: id },
        data: {
          email: primaryEmail.email_address,
          username: username || primaryEmail.email_address.split('@')[0],
        }
      });
      console.log('User updated:', user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

async function handleSessionCreated(sessionData: any) {
  // You can implement session-specific logic here if needed
  console.log('Session created:', sessionData);
}

export default handleClerkWebhook;