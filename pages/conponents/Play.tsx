import { ethers } from 'ethers'
// import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import worldcup_abi from '../../artifacts/contracts/WorldCup.sol/WorldCup.json'
import { Input, Button } from 'antd'
import { SetStateAction, useState } from 'react'
import { parseEther, parseGwei } from 'viem'

// const App = () => <Input placeholder="Basic usage" />;

// export default App;

export function Play() {
  const [inputValue, setInputValue] = useState('0')

  const { config } = usePrepareContractWrite({
    address: '0x3ee1fa4d194c32428464b6725317fa0d3af380e8',
    abi: worldcup_abi.abi,
    functionName: 'claimReward',
    args: [inputValue],
    gasPrice: parseGwei('20'),
    value: parseEther('0.1'),
  })

  const { write, data } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const changeInput = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }

  return (
    <div className='w-full'>
      <Button
        type="primary"
        size='large'
        disabled={!write || isLoading}
        onClick={() => write?.()}
      >
        {isLoading ? 'Playing...' : 'Play'}
      </Button>
      <div className='py-5 border'>
        <Input onChange={changeInput} placeholder="country code: 0 ~ 4" size='large'/>
      </div>
      {isSuccess && (
        <div style={{ color: '#fff' }}>
          Successfully Played !
          <div>
            <a
              target="_blank"
              href={`https://goerli.etherscan.io/tx/${data?.hash}`}
              rel="noreferrer"
            >
              Etherscan
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
