import puppeteer from "puppeteer";
import fs from "fs"
import https from "https"
import fs2 from "fs/promises"

const openWebPage = async () => {
  await fs2.mkdir('nuevacarpet')

  const browser = await puppeteer.launch({
    headless: "new",
    slowMo: 200
  })
  const page = await browser.newPage()

  // await page.goto("https://getyarn.io/yarn-clip/ae220043-2f7d-431e-b61d-2c2eafde1fd6")
  await page.goto("https://getyarn.io/yarn-clip/51b18ef5-86b7-497e-98dc-37ed24769ac4")
  // await page.screenshot({ path: "example.png" })

  const data = await page.evaluate(() => {
    const phrase = document.querySelector('.fs12.tac.fwb.p05').innerText
    const video = document.querySelector('.dib.p.vat').href
    return {
      phrase,
      video
    }
  })

  https.get(data.video, res => {
    const stream = fs.createWriteStream('../../../Downloads/video.mp4')
    res.pipe(stream)
    stream.on('finish', () => {
      stream.close()
    })
  })

  await page.click('a[title="Next Clip"]')


  const data2 = await page.evaluate(() => {
    const phrase = document.querySelector('.fs12.tac.fwb.p05').innerText
    const video = document.querySelector('.dib.p.vat').href
    return {
      phrase,
      video
    }
  })

  https.get(data2.video, res => {
    const stream = fs.createWriteStream('video2.mp4')
    res.pipe(stream)
    stream.on('finish', () => {
      stream.close()
    })
  })

  console.log(data, data2)

  // await page.screenshot({ path: "example2.png" })

  await browser.close()

}

// openWebPage()


//download videos

const DonwloadVideo = async () => {

  const browser = await puppeteer.launch({
    headless: "new",
    slowMo: 200
  })
  const page = await browser.newPage()

  await page.goto("https://getyarn.io/yarn-clip/cb571ca4-f103-4697-95fa-b228751c1700", {
    waitUntil: 'networkidle2'
  })

  const download = await page.evaluate(() => {
    const video = document.querySelector('.dib.p.vat').href
    return video
  })

  https.get(download, res => {
    const stream = fs.createWriteStream('video.mp4')
    res.pipe(stream)
    stream.on('finish', () => {
      stream.close()
    })
  })

  console.log(download)

  await browser.close()
}

// DonwloadVideo()

const downloadscrap = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    slowMo: 200
  })
  const page = await browser.newPage()

  // await page.goto("https://getyarn.io/yarn-clip/ae220043-2f7d-431e-b61d-2c2eafde1fd6")
  await page.goto("https://getyarn.io/yarn-clip/51b18ef5-86b7-497e-98dc-37ed24769ac4")
  // await page.screenshot({ path: "example.png" })
  var namearray = []
  for (let i = 0; i < 5; i++) {
    const namevideo = `avatarshort${i}.mp4`
    const dataopjet = { videoname: "", phraase: "" }

    const data = await page.evaluate(() => {
      const phrase = document.querySelector('.fs12.tac.fwb.p05').innerText
      const video = document.querySelector('.dib.p.vat').href
      return {
        phrase,
        video
      }
    })

    https.get(data.video, res => {
      const stream = fs.createWriteStream(`../../../Downloads/${namevideo}`)
      res.pipe(stream)
      stream.on('finish', () => {
        stream.close()
      })
    })

    dataopjet.videoname = `[sound:${namevideo}]`
    dataopjet.phraase = data.phrase
    namearray.push(dataopjet)

    if (data) {
      await page.click('a[title="Next Clip"]')
    } else {
      break
    }
  }

  console.log(namearray)
  // fs.writeFile('datadeck.json', JSON.stringify(namearray))
  // // await page.screenshot({ path: "example2.png" })
  //
  await browser.close()

}

downloadscrap()






