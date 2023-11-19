import {NextApiRequest, NextApiResponse} from 'next';

interface ApiRequest extends NextApiRequest {
  query: {
    postalCode: string;
  };
}
export default function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.query.postalCode) {
    res.status(200).send({ type: 'success' });
  } else {
    res.status(400)
    res.send({ type: 'error', message: `Invalid postal code was sent` })
  }
}
