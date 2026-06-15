import { supabase } from "@/utils/supabase/server";
import { badRequest, serverError } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const BUCKET = "Stamply";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return badRequest("파일이 없습니다.");

  const widthParam = formData.get("width");
  const width = widthParam ? Number(widthParam) : undefined;

  const buffer = Buffer.from(await file.arrayBuffer());
  const compressed = await sharp(buffer)
    .resize(width ? { width, withoutEnlargement: true } : undefined)
    .webp({ quality: 80 })
    .toBuffer();

  const path = `events/${crypto.randomUUID()}.webp`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, compressed, {
      contentType: "image/webp",
      cacheControl: "31536000",
    });

  if (error) return serverError("이미지 업로드 실패", error);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: publicUrl, path });
}

export async function DELETE(req: NextRequest) {
  const body = (await req.json()) as { path?: string };

  if (!body.path) return badRequest("path가 없습니다.");

  const { error } = await supabase.storage.from(BUCKET).remove([body.path]);

  if (error) return serverError("이미지 삭제 실패", error);

  return NextResponse.json({ path: body.path });
}
