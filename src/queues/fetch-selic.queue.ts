import Queue from 'bull';
import { fetchSelicValue } from '../services/fetch-selic.service';
import { emailQueue } from './send-email.queue';

interface FetchSelicJob {
  email: string;
}

export const fetchSelicQueue = new Queue<FetchSelicJob>('fetch-selic', {
  redis: { host: 'localhost', port: 6379 },
});

fetchSelicQueue.process(async (job) => {
  const { email } = job.data;

  console.log(`[Fila: FetchSelic] Buscando Selic para ${email}...`);

  const selic = await fetchSelicValue();

  console.log(`[Fila: FetchSelic] Valor encontrado: ${selic}`);

  // Adiciona na fila de envio
  await emailQueue.add({ selic, email });
});
