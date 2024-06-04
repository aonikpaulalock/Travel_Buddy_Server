import { Server } from "http";
import app from "./app";
const port = 4000;

const main = async () => {
  const server: Server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()