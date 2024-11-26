import { PhosphorIcons } from "../components/phosphorIcon";

export interface IStoredWasteMaterials {
  id: number;
  volume: number;
}

export interface IWasteMaterial {
  id: number;
  name: string;
  phosphorIcon: keyof typeof PhosphorIcons;
}
