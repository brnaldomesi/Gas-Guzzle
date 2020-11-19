import { NextApiRequest, NextApiResponse } from 'next'
import { BN } from 'ethereumjs-util'
import Common from '@ethereumjs/common'
import VM from '@ethereumjs/vm'

const common = new Common({ chain: 'mainnet' })
const vm = new VM({ common })

export default (req: NextApiRequest, res: NextApiResponse) => {
  vm.runCode({
    code: Buffer.from(req.body.code, 'hex'),
    gasLimit: new BN(0xffffffff),
  })
    .then((results: any) => {
      // console.log(`Returned: ${results.returnValue.toString('hex')}`)
      // console.log(`gasUsed : ${results.gasUsed.toString()}`)
      res.status(200).json({ results })
    })
    .catch((error: any) => {
      res.status(400).json({ error: error.toString() })
    })
}
