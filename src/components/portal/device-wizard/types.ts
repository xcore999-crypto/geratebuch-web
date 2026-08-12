export type WizardTechnology = {
  id: string;
  nameDe: string;
  nameEn: string;
  shortName: string | null;
  synonyms: string | null;
};

export type WizardCategory = {
  id: string;
  nameDe: string;
  nameEn: string;
  slug: string;
  icon: string;
  description: string | null;
  technologies: WizardTechnology[];
};

export type WizardManufacturer = {
  id: string;
  name: string;
};

export type WizardModel = {
  id: string;
  manufacturerId: string;
  modelName: string;
  technologies: { technologyId: string }[];
};

export type WizardLocation = {
  id: string;
  name: string;
};
