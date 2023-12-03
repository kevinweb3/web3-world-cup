import { ethers } from 'ethers'
import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,

} from 'wagmi'
import worldcup_abi from '../../artifacts/contracts/WorldCup.sol/WorldCup.json'
import { Input, Button } from 'antd'

export function Finalize() {
  const [value, setValue] = React.useState('')
  const { config } = usePrepareContractWrite({
    address: '0x3ee1fa4d194c32428464b6725317fa0d3af380e8',
    abi: worldcup_abi.abi,
    functionName: 'finialize',
    args: [value],
  })

  const { write, data } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const changeValue = (e: { target: { value: React.SetStateAction<string> } }) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <Button
        type="primary"
        size='large'
        disabled={!write || isLoading}
        onClick={() => write?.()}
      >
        {isLoading ? 'Finalize...' : 'Finalize'}
      </Button>
      <div className='py-5'>
        <Input onChange={changeValue} placeholder="country code: 0 ~ 4" size='large'/>
      </div>
      {isSuccess && (
        <div style={{ color: '#fff' }}>
          Successfully Played !
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
              Etherscan
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
