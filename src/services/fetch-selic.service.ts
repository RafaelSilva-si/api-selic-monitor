import puppeteer from 'puppeteer';

export async function fetchSelicValue(): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox'], // necessário Para o Docker
  });

  // Indica que vai executar uma nova pagina do browser
  const page = await browser.newPage();

  // Exemplo de página que contém o valor da Selic
  await page.goto('https://www.bcb.gov.br/');

  const selicValue = await page.evaluate(() => {
    // Bloco de referência onde se encontra os valores das taxas
    const blocos = Array.from(document.querySelectorAll('div.d-flex.align-items-center.justify-content-center'));
    
    // Percorre todos esses blocos e pesquisam por qual tem o texto Meta Selic
    for (const bloco of blocos) {
    const texto = (bloco as HTMLElement).innerText.toLowerCase();
      if (texto.includes('meta selic')) {
        const percentual = bloco.querySelector('.percentual');
        return percentual?.textContent?.trim() || null;
      }
    }

    return null;
  });

  await browser.close();

  if (!selicValue) {
    throw new Error('Não foi possível obter o valor da Selic');
  }

  return selicValue;
}
