import { Button, FloatButton } from "antd";
import MainLayout from "layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="m-auto w-3/4 py-8">
        <div className="text-accent mb-8">
          App detail...รายละเอียดแอพลิเคชัน
        </div>
        <div className="flex gap-8 sm:gap-16">
          <Button className="text-h3 h-80 w-full rounded-xl shadow-sm">
            FIRST MENU
          </Button>
          <Button className="text-h3 h-80 w-full rounded-xl shadow-sm">
            SECOND MENU
          </Button>
        </div>
      </div>
      <FloatButton.BackTop visibilityHeight={0} />
    </MainLayout>
  );
}
