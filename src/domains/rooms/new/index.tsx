import { imageSchema } from "@/components/forms/edit-image-form/schema";
import { RoomAmenitiesForm } from "@/components/forms/room-amenities-form";
import { roomAmenitiesSchema } from "@/components/forms/room-amenities-form/schema";
import { RoomBathroomForm } from "@/components/forms/room-bathroom-form";
import { roomBathroomSchema } from "@/components/forms/room-bathroom-form/schema";
import { roomEquipmentSchema } from "@/components/forms/room-equipment-form/schema";
import { RoomGeneralForm } from "@/components/forms/room-general-form";
import { roomGeneralSchema } from "@/components/forms/room-general-form/schema";
import { RoomKitchenEquipmentForm } from "@/components/forms/room-kitchen-equipment-form";
import { roomKitchenEquipmentSchema } from "@/components/forms/room-kitchen-equipment-form/schema";
import { RoomPostingRulesForm } from "@/components/forms/room-posting-rules-form";
import { postingRulesSchema } from "@/components/forms/room-posting-rules-form/schema";
import { RoomViewFromWindowForm } from "@/components/forms/room-view-from-window-form";
import { roomViewFromWindowSchema } from "@/components/forms/room-view-from-window-form/schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { usePrompt } from "@/hooks/use-prompt";
import { nestedForm } from "@/utils/nested-from";
import { yupResolver } from "@hookform/resolvers/yup";
import { FocusModal, ProgressStatus, ProgressTabs } from "@medusajs/ui";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { object } from "yup";
enum Tab {
  GENERAL = "general",
  BATHROOM = "bathroom",
  AMENITIES = "amenities",
  VIEW_FROM_WINDOW = "viewFromWindow",
  EQUIPMENT = "equipment",
  KITCHEN_EQUIPMENT = "kitchenEquipment",
  POSTING_RULES = "postingRules",
  MEDIA = "media",
}
type StepStatus = {
  [key in Tab]: ProgressStatus;
};
const roomNewSchema = object({
  general: roomGeneralSchema,
  bathroom: roomBathroomSchema,
  amenities: roomAmenitiesSchema,
  viewFromWindow: roomViewFromWindowSchema,
  equipment: roomEquipmentSchema,
  kitchenEquipment: roomKitchenEquipmentSchema,
  postingRules: postingRulesSchema,
  images: imageSchema,
});

export const NewRooms = () => {
  const { toast } = useToast();

  const prompt = usePrompt();
  const form = useForm({
    resolver: yupResolver(roomNewSchema),
  });

  const {
    formState: { isDirty },
    reset,
  } = form;

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>(Tab.GENERAL);
  const [status, setStatus] = useState<StepStatus>({
    [Tab.GENERAL]: "not-started",
    [Tab.BATHROOM]: "not-started",
    [Tab.AMENITIES]: "not-started",
    [Tab.VIEW_FROM_WINDOW]: "not-started",
    [Tab.EQUIPMENT]: "not-started",
    [Tab.KITCHEN_EQUIPMENT]: "not-started",
    [Tab.POSTING_RULES]: "not-started",
    [Tab.MEDIA]: "not-started",
  });
  const backButtonText = useMemo(() => {
    switch (tab) {
      case Tab.GENERAL:
        return "Отмена";
      default:
        return "Назад";
    }
  }, [tab]);
  const nextButtonText = useMemo(() => {
    switch (tab) {
      case Tab.MEDIA:
        return "Создать комнату";
      default:
        return "Продолжить";
    }
  }, [tab]);
  const onCloseModal = useCallback(() => {
    setOpen(false);
    setTab(Tab.GENERAL);
    setStatus({
      [Tab.GENERAL]: "not-started",
      [Tab.AMENITIES]: "not-started",
      [Tab.BATHROOM]: "not-started",
      [Tab.EQUIPMENT]: "not-started",
      [Tab.KITCHEN_EQUIPMENT]: "not-started",
      [Tab.POSTING_RULES]: "not-started",
      [Tab.VIEW_FROM_WINDOW]: "not-started",
      [Tab.MEDIA]: "not-started",
    });
    reset();
  }, [reset]);
  const onModalStateChange = useCallback(
    async (open: boolean) => {
      if (!open && isDirty) {
        const response = await prompt({
          title: "Вы уверены?",
          description:
            "У вас есть несохраненные изменения. Вы уверены, что хотите выйти?",
          cancelText: "Отмена",
          confirmText: "Закрыть",
        });
        if (!response) {
          setOpen(true);
          return;
        }
        onCloseModal();
      }
      setOpen(open);
    },
    [isDirty, onCloseModal, prompt]
  );
  return (
    <FocusModal open={open} onOpenChange={onModalStateChange}>
      <FocusModal.Trigger>
        <Button className="gap-2">
          <Plus />
          Добавить комнаты
        </Button>
      </FocusModal.Trigger>

      <ProgressTabs>
        <FocusModal.Content className="z-50">
          <FocusModal.Header className="flex w-full items-center justify-start">
            <ScrollArea className="border-ui-border-base -my-2 ml-2 min-w-0 w-full border-l">
              <ProgressTabs.List>
                <ProgressTabs.Trigger
                  className="w-full min-w-0 max-w-[200px]"
                  value={Tab.GENERAL}
                >
                  1
                </ProgressTabs.Trigger>
                <ProgressTabs.Trigger
                  className="w-full min-w-0 max-w-[200px]"
                  value={Tab.BATHROOM}
                >
                  2
                </ProgressTabs.Trigger>
                <ProgressTabs.Trigger
                  className="w-full min-w-0 max-w-[200px]"
                  value={Tab.AMENITIES}
                >
                  3
                </ProgressTabs.Trigger>
                <ProgressTabs.Trigger
                  className="w-full min-w-0 max-w-[200px]"
                  value={Tab.EQUIPMENT}
                >
                  4
                </ProgressTabs.Trigger>
              </ProgressTabs.List>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </FocusModal.Header>
          <FocusModal.Body className="flex h-full w-full flex-col items-center overflow-y-auto py-6 px-3">
            <Form {...form}>
              <ProgressTabs.Content
                value={Tab.GENERAL}
                className="h-full w-full"
              >
                <RoomGeneralForm form={nestedForm(form, "general")} />
              </ProgressTabs.Content>
              <ProgressTabs.Content
                value={Tab.BATHROOM}
                className="h-full w-full"
              >
                <RoomBathroomForm form={nestedForm(form, "bathroom")} />
              </ProgressTabs.Content>
              <ProgressTabs.Content
                value={Tab.AMENITIES}
                className="h-full w-full"
              >
                <RoomAmenitiesForm form={nestedForm(form, "amenities")} />
              </ProgressTabs.Content>
              <ProgressTabs.Content
                value={Tab.VIEW_FROM_WINDOW}
                className="h-full w-full"
              >
                <RoomViewFromWindowForm
                  form={nestedForm(form, "viewFromWindow")}
                />
              </ProgressTabs.Content>
              <ProgressTabs.Content
                value={Tab.VIEW_FROM_WINDOW}
                className="h-full w-full"
              >
                <RoomViewFromWindowForm
                  form={nestedForm(form, "viewFromWindow")}
                />
              </ProgressTabs.Content>
              <ProgressTabs.Content
                value={Tab.KITCHEN_EQUIPMENT}
                className="h-full w-full"
              >
                <RoomKitchenEquipmentForm
                  form={nestedForm(form, "kitchenEquipment")}
                />
              </ProgressTabs.Content>
              <ProgressTabs.Content
                value={Tab.POSTING_RULES}
                className="h-full w-full"
              >
                <RoomPostingRulesForm form={nestedForm(form, "postingRules")} />
              </ProgressTabs.Content>
            </Form>
          </FocusModal.Body>
        </FocusModal.Content>
      </ProgressTabs>
    </FocusModal>
  );
};
