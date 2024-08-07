import { NestedForm } from "@/utils/nested-from";
import { PostingRulesType } from "./schema";
import { FC } from "react";
import { FormCard } from "@/components/atoms/form-card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { AgeSelect } from "@/components/molecules/age-select";
import { ObjectFormCard } from "../types";

export interface RoomPostingRulesFormProps extends ObjectFormCard {
  form: NestedForm<PostingRulesType>;
}

export const RoomPostingRulesForm: FC<RoomPostingRulesFormProps> = ({
  form,
  noBorder,
  noTitle,
}) => {
  const { control, path, watch } = form;
  const possibleWithChildren = watch(path("possibleWithChildren"));

  return (
    <FormCard
      title="Правила размещения"
      description="Правила проживания можно будет всегда настроить после публикации
              объявления на странице «Настройки бронирования»."
      noBorder={noBorder}
      noTitle={noTitle}
    >
      <FormField
        control={control}
        name={path("possibleWithChildren")}
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <FormLabel>можно с детьми</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {possibleWithChildren && (
        <FormField
          control={control}
          name={path("childsAge")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>возраст</FormLabel>
              <FormControl>
                <AgeSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={control}
        name={path("petsAllowed")}
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <FormLabel>можно с животными</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={path("smokingAllowed")}
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <FormLabel>курение разрешено</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={path("partiesAllowed")}
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <FormLabel>вечеринки разрешены</FormLabel>
            <div className="flex flex-col">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </FormCard>
  );
};
