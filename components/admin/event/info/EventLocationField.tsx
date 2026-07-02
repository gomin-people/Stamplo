"use client";
import { memo, useCallback } from "react";
import { MapPin, Search } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useKakaoPostcodePopup, type Address } from "react-daum-postcode";
import { EventInfoSchema } from "@/types/schemas/adminEventInfoSchemas";
import { stripInvisibleChars } from "@/utils";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormState = z.infer<typeof EventInfoSchema>;

type Props = {
  disabled?: boolean;
};

const EventLocationField = memo(function EventLocationField({
  disabled,
}: Props) {
  const { control } = useFormContext<FormState>();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: "location" });
  const openPostcode = useKakaoPostcodePopup();

  const handleSearch = useCallback(() => {
    void openPostcode({
      onComplete: (data: Address) => {
        const roadAddress = data.roadAddress || data.jibunAddress;
        const prevDetail = field.value.startsWith(`${roadAddress} `)
          ? field.value.slice(roadAddress.length + 1)
          : "";
        field.onChange(
          prevDetail ? `${roadAddress} ${prevDetail}` : `${roadAddress} `
        );
      },
    });
  }, [openPostcode, field]);

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="location">
        주소 <span className="text-destructive">*</span>
      </FieldLabel>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="location"
            name="location"
            value={field.value}
            onChange={(e) =>
              field.onChange(stripInvisibleChars(e.target.value))
            }
            onBlur={() => field.onChange(field.value.trim())}
            placeholder="주소 검색 후 상세주소를 입력해주세요. (최대 100자)"
            className="pl-8"
            maxLength={100}
            aria-invalid={!!error}
            disabled={disabled}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleSearch}
          disabled={disabled}
        >
          <Search />
          주소 검색
        </Button>
      </div>
      <div className="h-3">
        <FieldError>{error?.message}</FieldError>
      </div>
    </Field>
  );
});

export default EventLocationField;
