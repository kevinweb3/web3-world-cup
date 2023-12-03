// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ClaimReward extends ethereum.Event {
  get params(): ClaimReward__Params {
    return new ClaimReward__Params(this);
  }
}

export class ClaimReward__Params {
  _event: ClaimReward;

  constructor(event: ClaimReward) {
    this._event = event;
  }

  get _claimer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _amt(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Finialize extends ethereum.Event {
  get params(): Finialize__Params {
    return new Finialize__Params(this);
  }
}

export class Finialize__Params {
  _event: Finialize;

  constructor(event: Finialize) {
    this._event = event;
  }

  get _currRound(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get _country(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Play extends ethereum.Event {
  get params(): Play__Params {
    return new Play__Params(this);
  }
}

export class Play__Params {
  _event: Play;

  constructor(event: Play) {
    this._event = event;
  }

  get _currRound(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get _player(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _country(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

export class WorldCup extends ethereum.SmartContract {
  static bind(address: Address): WorldCup {
    return new WorldCup("WorldCup", address);
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  countries(param0: BigInt): string {
    let result = super.call("countries", "countries(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toString();
  }

  try_countries(param0: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("countries", "countries(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  countryToPlayers(param0: i32, param1: i32, param2: BigInt): Address {
    let result = super.call(
      "countryToPlayers",
      "countryToPlayers(uint8,uint8,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param1)),
        ethereum.Value.fromUnsignedBigInt(param2)
      ]
    );

    return result[0].toAddress();
  }

  try_countryToPlayers(
    param0: i32,
    param1: i32,
    param2: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "countryToPlayers",
      "countryToPlayers(uint8,uint8,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param1)),
        ethereum.Value.fromUnsignedBigInt(param2)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  currRound(): i32 {
    let result = super.call("currRound", "currRound():(uint8)", []);

    return result[0].toI32();
  }

  try_currRound(): ethereum.CallResult<i32> {
    let result = super.tryCall("currRound", "currRound():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  deadline(): BigInt {
    let result = super.call("deadline", "deadline():(uint256)", []);

    return result[0].toBigInt();
  }

  try_deadline(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("deadline", "deadline():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCountryPlayters(_round: i32, _country: i32): BigInt {
    let result = super.call(
      "getCountryPlayters",
      "getCountryPlayters(uint8,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_round)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_country))
      ]
    );

    return result[0].toBigInt();
  }

  try_getCountryPlayters(
    _round: i32,
    _country: i32
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCountryPlayters",
      "getCountryPlayters(uint8,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_round)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_country))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPlayerInfo(_round: i32, _player: Address, _country: i32): BigInt {
    let result = super.call(
      "getPlayerInfo",
      "getPlayerInfo(uint8,address,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_round)),
        ethereum.Value.fromAddress(_player),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_country))
      ]
    );

    return result[0].toBigInt();
  }

  try_getPlayerInfo(
    _round: i32,
    _player: Address,
    _country: i32
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPlayerInfo",
      "getPlayerInfo(uint8,address,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_round)),
        ethereum.Value.fromAddress(_player),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_country))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getVaultBalance(): BigInt {
    let result = super.call(
      "getVaultBalance",
      "getVaultBalance():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getVaultBalance(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getVaultBalance",
      "getVaultBalance():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lockedAmts(): BigInt {
    let result = super.call("lockedAmts", "lockedAmts():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lockedAmts(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lockedAmts", "lockedAmts():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  winnerVaults(param0: Address): BigInt {
    let result = super.call("winnerVaults", "winnerVaults(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_winnerVaults(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "winnerVaults",
      "winnerVaults(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _deadline(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClaimRewardCall extends ethereum.Call {
  get inputs(): ClaimRewardCall__Inputs {
    return new ClaimRewardCall__Inputs(this);
  }

  get outputs(): ClaimRewardCall__Outputs {
    return new ClaimRewardCall__Outputs(this);
  }
}

export class ClaimRewardCall__Inputs {
  _call: ClaimRewardCall;

  constructor(call: ClaimRewardCall) {
    this._call = call;
  }
}

export class ClaimRewardCall__Outputs {
  _call: ClaimRewardCall;

  constructor(call: ClaimRewardCall) {
    this._call = call;
  }
}

export class FinializeCall extends ethereum.Call {
  get inputs(): FinializeCall__Inputs {
    return new FinializeCall__Inputs(this);
  }

  get outputs(): FinializeCall__Outputs {
    return new FinializeCall__Outputs(this);
  }
}

export class FinializeCall__Inputs {
  _call: FinializeCall;

  constructor(call: FinializeCall) {
    this._call = call;
  }

  get _country(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class FinializeCall__Outputs {
  _call: FinializeCall;

  constructor(call: FinializeCall) {
    this._call = call;
  }
}

export class PalyCall extends ethereum.Call {
  get inputs(): PalyCall__Inputs {
    return new PalyCall__Inputs(this);
  }

  get outputs(): PalyCall__Outputs {
    return new PalyCall__Outputs(this);
  }
}

export class PalyCall__Inputs {
  _call: PalyCall;

  constructor(call: PalyCall) {
    this._call = call;
  }

  get _selected(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class PalyCall__Outputs {
  _call: PalyCall;

  constructor(call: PalyCall) {
    this._call = call;
  }
}