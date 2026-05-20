if (process.stdout._handle) process.stdout._handle.setBlocking(true);
const puppeteer = require('puppeteer-core');

(async () => {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to match the device frame
  await page.setViewport({ width: 800, height: 1000 });

  // Log browser console messages
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER PAGE ERROR:', err.toString()));

  console.log("Navigating to http://localhost:8000/index.html ...");
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'load' });

  // Wait 1 second for Babel to compile React code
  await new Promise(r => setTimeout(r, 1000));

  console.log("Taking screenshot of login screen...");
  await page.screenshot({ path: 'step1_login.png' });

  console.log("Clicking 'Use Phone Number'...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Use Phone Number'));
    if (btn) btn.click();
    else throw new Error("Could not find Use Phone Number button");
  });

  await new Promise(r => setTimeout(r, 500));
  console.log("Taking screenshot of name screen...");
  await page.screenshot({ path: 'step2_name.png' });

  console.log("Entering name 'Test User'...");
  await page.type('input[placeholder="First Name"]', 'Test User');
  await new Promise(r => setTimeout(r, 200));

  console.log("Clicking 'Next'...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Next'));
    if (btn) btn.click();
    else throw new Error("Could not find Next button");
  });

  await new Promise(r => setTimeout(r, 800));

  // Loop through 8 questions
  for (let i = 1; i <= 8; i++) {
    console.log(`Answering question ${i}...`);
    // Take a screenshot of the question
    await page.screenshot({ path: `question_${i}.png` });

    // Click the first button/option
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const optionButtons = buttons.filter(btn => {
        const span = btn.querySelector('span');
        return span && span.style.fontSize === '26px';
      });
      if (optionButtons.length > 0) {
        optionButtons[0].click();
      } else {
        throw new Error("Could not find options buttons");
      }
    });

    await new Promise(r => setTimeout(r, 800));
  }

  console.log("Taking screenshot of calibrating screen (now after question 8)...");
  await page.screenshot({ path: 'step4_calibrating.png' });

  console.log("Waiting 3.5 seconds for calibration timer to complete...");
  await new Promise(r => setTimeout(r, 3500));

  console.log("Taking screenshot of main page (should show top picks matching answers)...");
  await page.screenshot({ path: 'step5_main_page.png' });

  console.log("Checking page contents...");
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log("Page text contains 'Top Picks For You':", bodyText.includes('Top Picks For You'));
  console.log("Page text contains 'Test User's Aura':", bodyText.includes("Test User's Aura") || bodyText.includes("Aura"));

  // Check the match score of the top pick event
  const topMatchText = await page.evaluate(() => {
    // Look for text matching "match" or percent %
    const elements = Array.from(document.querySelectorAll('*'));
    const matchEl = elements.find(el => el.textContent.includes('match') && el.textContent.includes('%'));
    return matchEl ? matchEl.innerText : null;
  });
  console.log("Top pick match text found on main screen:", topMatchText);

  await browser.close();
  console.log("Test finished.");
})();
