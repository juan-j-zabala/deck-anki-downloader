import fs from "fs";
import https from "https"

export const Downloader = (data, namevideo) => {
  https.get(data, res => {
    const stream = fs.createWriteStream(`../../../.local/share/Anki2/User 1/collection.media/${namevideo}`)
    res.pipe(stream)
    stream.on('finish', () => {
      stream.close()
    })
  })

}
