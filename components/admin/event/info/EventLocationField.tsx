"use client";
import { memo, useCallback } from "react";
import { MapPin, Search, Link } from "lucide-react";
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
  locationUrlDisabled?: boolean;
};

const EventLocationField = memo(function EventLocationField({
  disabled,
  locationUrlDisabled,
}: Props) {
  const { control, setValue } = useFormContext<FormState>();
  const {
    field: roadField,
    fieldState: { error: roadError },
  } = useController({ control, name: "roadAddress" });
  const { field: detailField } = useController({
    control,
    name: "addressDetail",
  });
  const {
    field: urlField,
    fieldState: { error: urlError },
  } = useController({ control, name: "locationUrl" });
  const openPostcode = useKakaoPostcodePopup();

  const syncLocation = useCallback(
    (roadAddress: string, addressDetail: string) => {
      setValue(
        "location",
        addressDetail ? `${roadAddress} ${addressDetail}` : roadAddress,
        { shouldValidate: true, shouldDirty: true }
      );
    },
    [setValue]
  );

  const handleSearch = useCallback(() => {
    void openPostcode({
      onComplete: (data: Address) => {
        const roadAddress = data.roadAddress || data.jibunAddress;
        roadField.onChange(roadAddress);
        syncLocation(roadAddress, detailField.value);
      },
    });
  }, [openPostcode, roadField, detailField.value, syncLocation]);

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = stripInvisibleChars(e.target.value);
    detailField.onChange(value);
    syncLocation(roadField.value, value);
  };

  return (
    <>
      <Field data-invalid={!!roadError}>
        <FieldLabel htmlFor="roadAddress">
          주소 <span className="text-destructive">*</span>
        </FieldLabel>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="roadAddress"
              name="roadAddress"
              value={roadField.value}
              readOnly
              placeholder="주소 검색 버튼을 눌러 주소를 입력해주세요."
              className="cursor-pointer pl-8"
              aria-invalid={!!roadError}
              disabled={disabled}
              onClick={disabled ? undefined : handleSearch}
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
          <FieldError>{roadError?.message}</FieldError>
        </div>
      </Field>

      <Field>
        <FieldLabel htmlFor="addressDetail">상세주소</FieldLabel>
        <Input
          id="addressDetail"
          name="addressDetail"
          value={detailField.value}
          onChange={handleDetailChange}
          onBlur={() => detailField.onChange(detailField.value.trim())}
          placeholder="건물명, 동/호수 등 상세주소를 입력해주세요. (최대 80자)"
          maxLength={80}
          disabled={disabled}
        />
        <div className="h-3" />
      </Field>

      <Field data-invalid={!!urlError}>
        <FieldLabel htmlFor="locationUrl">지도 링크</FieldLabel>
        <div className="relative">
          <Link className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="locationUrl"
            name="locationUrl"
            value={urlField.value}
            onChange={(e) =>
              urlField.onChange(stripInvisibleChars(e.target.value))
            }
            onBlur={() => urlField.onChange(urlField.value.trim())}
            placeholder="https:// 로 시작하는 지도 링크를 입력해주세요. (최대 100자)"
            className="pl-8"
            maxLength={100}
            aria-invalid={!!urlError}
            disabled={locationUrlDisabled}
          />
        </div>
        <div className="h-3">
          <FieldError>{urlError?.message}</FieldError>
        </div>
      </Field>
    </>
  );
});

export default EventLocationField;
