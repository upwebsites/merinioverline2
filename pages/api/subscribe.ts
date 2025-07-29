import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const filePath = path.join(process.cwd(), 'emails.txt');
    fs.appendFileSync(filePath, email + '\n');
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Impossibile salvare la mail: ' + String(err) });
  }
} 