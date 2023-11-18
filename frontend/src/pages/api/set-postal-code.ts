import { NextApiRequest, NextApiResponse } from 'next';

interface ApiRequest extends NextApiRequest {
  query: {
    postalCode: string;
  };
}

export default function handler(req: ApiRequest, res: NextApiResponse) {
  console.log(req.query.postalCode)
  res.status(200).send({})
}
