import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { fetchSelicQueue } from './queues/fetch-selic.queue';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.json({ message: 'API Selic Monitor com TypeScript 🎯' });
});

app.post('/selic/notify', async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email é obrigatório' });
  }

  try {
    await fetchSelicQueue.add({ email });

    res.status(202).json({
      success: true,
      message: 'Processo iniciado: buscando a Selic e enviando o e-mail.',
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;