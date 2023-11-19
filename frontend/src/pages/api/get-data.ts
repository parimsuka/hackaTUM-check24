import {NextApiRequest, NextApiResponse} from "next";
import {craftsmen} from "@/const/mock";

let repeat = 1;
export default function handler(_: NextApiRequest, res: NextApiResponse) {
  ++repeat;
  res.send({ data: { craftsmen: craftsmen.craftsmen.flatMap(i => Array(repeat).fill(i))}, type: 'success' })
}
