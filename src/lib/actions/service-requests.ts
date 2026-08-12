"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { deviceDisplayName } from "@/lib/device-display";

async function nextPublicId() {
  const year = new Date().getFullYear();
  const count = await prisma.serviceRequest.count({
    where: { createdAt: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) } },
  });
  return `REQ-${year}-${String(count + 1).padStart(3, "0")}`;
}

export type SubmitRequestResult = { publicId: string; deviceName: string; serviceName: string };

/**
 * Creates a service request tied to a real, already-registered device.
 * Manufacturer/model/technology are read from the device record itself
 * (Scenario E) — the client never re-types them.
 */
export async function submitServiceRequestAction(formData: FormData): Promise<SubmitRequestResult> {
  const org = await getDemoOrganization();

  const deviceId = String(formData.get("deviceId") ?? "");
  const serviceSlug = String(formData.get("serviceSlug") ?? "");
  const serviceName = String(formData.get("serviceName") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const scheduledDateRaw = formData.get("scheduledDate");
  const usable = String(formData.get("usable") ?? "");

  if (!deviceId || !serviceSlug || !description) {
    throw new Error("Gerät, Service und Kurzbeschreibung sind erforderlich.");
  }

  const device = await prisma.device.findUnique({
    where: { id: deviceId },
    include: { manufacturer: true, deviceModel: true },
  });
  if (!device || device.organizationId !== org.id) {
    throw new Error("Gerät wurde nicht gefunden.");
  }

  const publicId = await nextPublicId();
  const fullDescription = usable
    ? `${description}\n\nGerät nutzbar: ${usable === "ja" ? "Ja, eingeschränkt" : "Nein, ausgefallen"}`
    : description;

  const request = await prisma.serviceRequest.create({
    data: {
      publicId,
      organizationId: org.id,
      deviceId: device.id,
      serviceSlug,
      serviceName,
      status: "erhalten",
      description: fullDescription,
      deviceSnapshotName: deviceDisplayName(device),
      scheduledDate: typeof scheduledDateRaw === "string" && scheduledDateRaw ? new Date(scheduledDateRaw) : null,
      lastUpdateNote: "Anfrage eingegangen, Rückmeldung folgt innerhalb von 1-2 Werktagen.",
    },
  });

  revalidatePath("/portal/serviceanfragen");
  revalidatePath("/portal");
  revalidatePath(`/portal/geraete/${device.id}`);

  return { publicId: request.publicId, deviceName: deviceDisplayName(device), serviceName };
}
