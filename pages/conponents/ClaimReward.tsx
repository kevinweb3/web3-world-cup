import { ethers } from 'ethers'
import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'
import worldcup_abi from '../../artifacts/contracts/WorldCup.sol/WorldCup.json'

import { Button } from 'antd'

export function ClaimReward() {
  const { config } = usePrepareContractWrite({
    address: '0x3ee1fa4d194c32428464b6725317fa0d3af380e8',
    abi: worldcup_abi.abi,
    functionName: 'claimReward',
  })

  const { write, data } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div>
      <Button
        type="primary"
        size='large'
        disabled={!write || isLoading}
        onClick={() => write?.()}
      >
        {isLoading ? 'claimReward...' : 'claimReward'}
      </Button>
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
