import { Button } from "antd";
import MainLayout from "layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="m-auto w-3/4">
        <div className="mb-8">App detail...รายละเอียดแอพลิเคชัน</div>
        <div className="flex gap-16">
          <Button className="w-full h-80 text-h3">FIRST MENU</Button>
          <Button className="w-full h-80 text-h3">SECOND MENU</Button>
        </div>
      </div>
    </MainLayout>
  );
}
