import type { NextApiRequest, NextApiResponse } from 'next'
import solc from 'solc'
import 'solc/soljson-v0.6.12+commit.27d51765'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: req.body.code,
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  res.status(200).json(output.contracts['test.sol'])
}
