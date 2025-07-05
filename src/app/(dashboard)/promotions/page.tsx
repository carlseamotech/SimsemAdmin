"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/common/header";
import PromotionFormPage from "@/app/(dashboard)/promotions/components/promotion-form";
import ManagePromotionsPage from "@/app/(dashboard)/promotions/components/manage-promotions-table";
import { PromoCode } from "@/models/promo-code";

const PromotionsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("promotions");
  const [promoToEdit, setPromoToEdit] = useState<PromoCode | null>(null);

  const handleEdit = (promo: PromoCode) => {
    setPromoToEdit(promo);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setPromoToEdit(null);
    setShowForm(true);
  };

  return (
    <>
      <Header title={!showForm ? "Promotions" : undefined} />

      {!showForm ? (
        <div className="flex-1 py-6 px-8 ">
          <div className=" rounded-xl ">
            <div className="flex items-center justify-between border-none">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-auto rounded-none "
              >
                <TabsList className="grid w-full grid-cols-3 p-0 h-full  bg-transparent ">
                  <TabsTrigger
                    value="promotions"
                    className=" data-[state=active]:bg-[#FFFFFF] data-[state=active]:shadow-none font-bold  rounded-none rounded-t-2xl p-4 bg-[#ECECED] data-[state=active]:text-[#0E356C] text-[23px] text-[#707070]"
                  >
                    Manage Promotions
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                className="bg-[#FB8B24] hover:bg-orange-400  text-white text-[15px] cursor-pointer rounded-full"
                onClick={handleAddNew}
              >
                Add new Promotion Code
              </Button>
            </div>

            <div className="bg-white  drop-shadow-md rounded-b-2xl rounded-tr-2xl px-16 py-4">
              <div className="flex items-center justify-between py-6 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent border-none"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <ManagePromotionsPage
                searchTerm={searchTerm}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <PromotionFormPage
            setShowForm={setShowForm}
            promoToEdit={promoToEdit}
          />
        </>
      )}
    </>
  );
};

export default PromotionsPage;
