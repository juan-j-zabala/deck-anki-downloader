import puppeteer from "puppeteer";
import { Downloader } from "./donwloader.js"
import { ConverterFile } from "./fileconvert.js";

//download videos

const downloadscrap = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    slowMo: 100
  })
  const page = await browser.newPage()

  // await page.goto("https://getyarn.io/yarn-clip/ae220043-2f7d-431e-b61d-2c2eafde1fd6")
  await page.goto("https://getyarn.io/yarn-clip/174f484b-4fdd-4491-ac98-ea2e11c833b0")// <== pagina inicial de descarga
  var namearray = []
  const datacsv = []

  for (let i = 0; i < 15; i++) { // <== iteracion de data y salto a la siguiente pagina en un loop
    const namevideo = `avengersshorts${i}.mp4`
    const dataopjet = { videolink: "", videonamedownload: "" }
    const dataopjet2 = { videoname: "", phraase: "", }

    const data = await page.evaluate(() => {
      const phrase = document.querySelector('.fs12.tac.fwb.p05').innerText
      const video = document.querySelector('.dib.p.vat').href
      return {
        phrase,
        video
      }
    })
    console.log(data.video)

    dataopjet.videonamedownload = namevideo
    dataopjet2.videoname = `[sound:${namevideo}]`
    dataopjet2.phraase = data.phrase
    dataopjet.videolink = data.video
    namearray.push(dataopjet)
    datacsv.push(dataopjet2)

    if (await page.click('a[title="Next Clip"]')// <== esto detiene el loop si no hay una siguiente pagina
    ) {
      await page.click('a[title="Next Clip"]')
    } else {
      console.log("data has come to end the last video was ", dataopjet.videolink)
      break
    }
  }

  // console.log("data para descargar", namearray)
  // console.log("data para crear csv", datacsv)
  await browser.close()

  console.log("comenzando descarga de videos")
  namearray.forEach((d) => {
    console.log(`descargando ${d.videonamedownload}`)
    Downloader(d.videolink, d.videonamedownload)// <== this download each video in loop. the code is in downloader.js
  })

  ConverterFile(datacsv)// <== this convert a obj-json to csv, the code is on fileconvert.js
}

downloadscrap()






