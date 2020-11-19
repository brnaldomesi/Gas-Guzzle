import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const compileReq = await fetch(`http://${req.headers.host}/api/internal/compile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: req.body.code }),
  })
  const compileResult = await compileReq.json()

  const execReq = await fetch(`http://${req.headers.host}/api/internal/vm-execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: compileResult.A.evm.bytecode.object }),
  })
  const execResult = await execReq.json()

  res.status(200).json(execResult)
}
