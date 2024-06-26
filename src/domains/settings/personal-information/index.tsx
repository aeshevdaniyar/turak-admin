import { Section } from "@/components/molecules/section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const PersonalInformationPage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="w-full">
        <div className="mb-8">
          <Link to="/a/settings">
            <Button variant={"outline"}>
              <ChevronLeft />
              Вернуться назад в настройки
            </Button>
          </Link>
        </div>

        <Section
          title="Персональная информация"
          description="Управляйте своим профилем"
        ></Section>
      </div>
    </div>
  );
};
