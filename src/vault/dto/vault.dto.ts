export class CurrentValueDTO {
  value: any;
  createdAt: string;
  updatedAt: string;
}

export class VaultDTO {
  key?: string | null;
  value: any;
  createdAt: string;
  updatedAt: string;
}

export class HistoricVaultValueDTO {
  key: string;
  value: any;
  createdAt: string;
  updatedAt: string;
  previous: HistoricalValueDTO[];
}

class HistoricalValueDTO {
  version: number;
  value: any;
  createdAt: string;
  updatedAt: string;
}
