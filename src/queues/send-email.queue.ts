import Queue from 'bull';
import { sendSelicAlertEmail } from '../services/send-email.service';

interface EmailJob {
  selic: string;
  email: string;
}

export const emailQueue = new Queue<EmailJob>('send-email', {
  redis: { host: 'localhost', port: 6379 },
});

emailQueue.process(async (job) => {
  const { selic, email } = job.data;

  console.log(`[Fila: SendEmail] Enviando email para ${email} com Selic: ${selic}`);

  await sendSelicAlertEmail(selic, email);
});
