import puppeteer from "puppeteer";
import { Downloader } from "./donwloader.js";
import { ConverterFile } from "./fileconvert.js";

//download videos

const downloadscrap = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    slowMo: 100,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://getyarn.io/yarn-clip/ca2d693f-259a-42fa-9214-72da5244815b",
  ); // <== pagina inicial de descarga
  var namearray = [];
  const datacsv = [];

  for (let i = 0; i < 40; i++) {
    // <== iteracion de data y salto a la siguiente pagina en un loop
    const dataopjet = { videolink: "", videonamedownload: "" };
    const dataopjet2 = { videoname: "", phraase: "" };

    await page.waitForSelector(".fs12.tac.fwb.p05");

    const data = await page.evaluate(() => {
      const phrase = document.querySelector(".fs12.tac.fwb.p05").innerText;
      const video = document.querySelector(".dib.p.vat").href;
      return {
        phrase,
        video,
      };
    });
    console.log(data.video);

    dataopjet.videonamedownload = `${data.video.slice(18, 58)}`;
    dataopjet2.videoname = `[sound:${data.video.slice(18, 58)}]`;
    dataopjet2.phraase = data.phrase;
    dataopjet.videolink = data.video;
    namearray.push(dataopjet);
    datacsv.push(dataopjet2);

    if (
      data.video ===
      "https://y.yarn.co/2d37aa09-9e69-4b20-9850-a0500098b591.mp4"
    ) {
      // <== esto detiene el loop si no hay una siguiente pagina
      console.log(
        "data has come to end the last video was ",
        dataopjet.videolink,
      );
      break;
    }
    await page.click('a[title="Next Clip"]');
  }

  console.log("data para descargar", namearray);
  console.log("data para crear csv", datacsv);
  await browser.close();

  console.log("comenzando descarga de videos");
  namearray.forEach((d) => {
    console.log(`descargando ${d.videonamedownload} `);
    Downloader(d.videolink, d.videonamedownload); // <== this download each video in loop. the code is in downloader.js
    timeout(3000);
  });

  ConverterFile(datacsv); // <== this convert a obj-json to csv, the code is on fileconvert.js
};

downloadscrap();

const timeout = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
