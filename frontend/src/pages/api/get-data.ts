import {NextApiRequest, NextApiResponse} from "next";
import {craftsmen} from "@/const/mock";


export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.send({ data: craftsmen, type: 'success' })
}
