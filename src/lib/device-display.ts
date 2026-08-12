type DeviceLike = {
  manufacturer?: { name: string } | null;
  deviceModel?: { modelName: string } | null;
  customManufacturer?: string | null;
  customModel?: string | null;
};

export function deviceManufacturerName(device: DeviceLike): string {
  return device.manufacturer?.name ?? device.customManufacturer ?? "Unbekannter Hersteller";
}

export function deviceModelName(device: DeviceLike): string | null {
  return device.deviceModel?.modelName ?? device.customModel ?? null;
}

export function deviceDisplayName(device: DeviceLike): string {
  const manufacturer = deviceManufacturerName(device);
  const model = deviceModelName(device);
  return model ? `${manufacturer} ${model}` : manufacturer;
}
