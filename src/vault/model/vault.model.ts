import { randomUUID } from 'crypto';
import { HistoricVaultValueDTO, VaultDTO } from '../dto';
import * as _ from 'lodash';

export class VaultValue {
  key?: string | null;
  current: any;
  history: HistoricalValue[];
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.current = null;
    this.history = [];
  }

  setValue(value: any) {
    const lastVersion = this.history ? this.history.length : 0;
    if (this.current) {
      if (!_.isEqual(this.current, value))
        this.history.push({
          version: lastVersion + 1,
          value: this.current,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        } as HistoricalValue);
      this.current = value;
    } else {
      this.current = value;
      this.createdAt = new Date().toJSON();
    }
    this.updatedAt = new Date().toJSON();
  }

  static fromDTO(dto: VaultDTO) {
    const result = new this();
    result.key = randomUUID();
    result.setValue(dto.value);
    return result;
  }

  toJson() {
    return JSON.stringify({
      current: this.current,
      history: this.history,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromJson(key: string, jsonVault: any) {
    jsonVault = JSON.parse(jsonVault) as VaultValue;
    const result = new VaultValue();
    result.current = jsonVault.current;
    result.history = jsonVault.history;
    result.createdAt = jsonVault.createdAt;
    result.updatedAt = jsonVault.updatedAt;
    result.key = key;
    return result;
  }

  toVaultDTO(): VaultDTO {
    return {
      key: this.key,
      value: this.current,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as VaultDTO;
  }

  getCurrentValue() {
    return this.current
      ? {
          value: this.current,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        }
      : null;
  }

  toCompleteVaultDTO(): HistoricVaultValueDTO {
    return {
      key: this.key,
      value: this.current,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      previous: this.history,
    } as HistoricVaultValueDTO;
  }
}

class HistoricalValue {
  version: number;
  value: any;
  createdAt: string;
  updatedAt: string;
}
