import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  let email = req.body?.email;
  if (!email && typeof req.body === 'string') {
    try {
      email = JSON.parse(req.body).email;
    } catch {
      email = undefined;
    }
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Email non valida' });
  }

  try {
    await prisma.email.create({ data: { email } });
    return res.status(200).json({ success: true });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email già registrata' });
    }
    return res.status(500).json({ error: 'Impossibile salvare la mail: ' + String(err) });
  }
} 