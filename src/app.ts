import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { fetchSelicValue } from './services/fetch-selic.service';
import { sendSelicAlertEmail } from './services/send-email.service';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const teste = await fetchSelicValue()
  console.log(teste)
  res.json({ message: 'API Selic Monitor com TypeScript 🎯' });
});

app.post('/selic/notify', async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email é obrigatório' });
  }

  try {
    const selic = await fetchSelicValue();
    await sendSelicAlertEmail(selic, email);
    res.status(200).json({ success: true, selic });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;