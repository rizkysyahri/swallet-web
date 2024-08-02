"use client";

import * as React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateCategory from "@/hooks/api/category/createCategory";
import useDeleteCategoryById from "@/hooks/api/category/deleteCategoryById";
import useGetCategory from "@/hooks/api/category/useGetCategory";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { inputCategory, setIsInputCategory, saveCategory } =
    useCreateCategory();
  const { categories } = useGetCategory();
  const { deleteCategory } = useDeleteCategoryById();
  const [selectedCategory, setIsSelectedCategory] = React.useState<Set<string>>(
    new Set()
  );
  const router = useRouter();

  const handleCheckboxCategoryChange = (categoryId: string) => {
    setIsSelectedCategory((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(categoryId)) {
        newSelected.delete(categoryId);
      } else {
        newSelected.add(categoryId);
      }

      return newSelected;
    });
  };

  return (
    <div className="pt-14">
      <MaxWidthWrapper>
        <div className="flex flex-col">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-6 h-6" onClick={() => router.back()} />
            <h1 className="text-gray-600 text-2xl font-bold">
              Pengaturan Kategori
            </h1>
          </div>

          <div className="pt-10">
            <h3 className="font-semibold text-base">Buat kategori</h3>
            <div className="pt-4">
              <Label>Nama</Label>
              <div className="flex items-center space-x-4">
                <Input
                  className="w-full lg:w-[300px]"
                  placeholder="Nama kategori baru"
                  onChange={(e) => setIsInputCategory({ name: e.target.value })}
                />

                <div className="bg-black rounded-md">
                  <Button
                    variant="neu"
                    onClick={() => saveCategory(inputCategory)}
                  >
                    Buat kategori
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <div className="flex items-center">
                <h3 className="font-semibold text-base mr-20 ">Kategori</h3>
                {selectedCategory.size > 0 && (
                  <Button variant="link" className="text-red-500 text-sm" onClick={() => {
                    selectedCategory.forEach((id) => {
                      deleteCategory(id)
                    })
                  }}>
                    Hapus kategori
                  </Button>
                )}
              </div>

              <div className="flex flex-col pt-7 gap-5">
                {categories?.map((category) => (
                  <div className="flex items-center gap-6" key={category.id}>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      checked={selectedCategory.has(category.id)}
                      onCheckedChange={() =>
                        handleCheckboxCategoryChange(category.id)
                      }
                    />
                    <div>
                      <h3>{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
