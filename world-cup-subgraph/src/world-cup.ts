import {
  ClaimReward as ClaimRewardEvent,
  Finialize as FinializeEvent,
  Play as PlayEvent
} from "../generated/WorldCup/WorldCup"
import { ClaimReward, Finialize, Play } from "../generated/schema"

export function handleClaimReward(event: ClaimRewardEvent): void {
  let entity = new ClaimReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._claimer = event.params._claimer
  entity._amt = event.params._amt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFinialize(event: FinializeEvent): void {
  let entity = new Finialize(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._currRound = event.params._currRound
  entity._country = event.params._country

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlay(event: PlayEvent): void {
  let entity = new Play(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._currRound = event.params._currRound
  entity._player = event.params._player
  entity._country = event.params._country

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
