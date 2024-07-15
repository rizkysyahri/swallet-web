"use client";

import * as React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useEditProfile from "@/hooks/api/profile/useEditProfile";
import { useCounterStore } from "@/stores/zustand/store";
import Image from "next/image";

const Account = () => {
  const {
    handleChange,
    handleSelectGender,
    isDirty,
    setIsDirty,
    formProfile,
    saveProfileUpdate,
  } = useEditProfile();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const profile = useCounterStore((state) => state.user);

  // for disabled buttons
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!formProfile.username && !formProfile.gender && !formProfile.avatar) {
        setIsDirty(false);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [
    formProfile.username,
    formProfile.gender,
    formProfile.avatar,
    setIsDirty,
  ]);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="bg-slate-50">
      <MaxWidthWrapper className="pt-10 pb-24 flex flex-col lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="flex gap-3">
          <div className="relative border border-slate-300 rounded-2xl w-44 h-44">
            <Image
              src="https://github.com/shadcn.png"
              alt="shadcn"
              className=" absolute z-10 rounded-2xl"
              width={176}
              height={176}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Button variant="blur" size="sm" onClick={handleIconClick}>
              Changes picture
              <Input type="file" className="hidden" ref={inputRef} />
            </Button>
            <Button variant="destructive" size="sm">
              Delete picture
            </Button>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-5 mt-8 items-center">
          <div>
            <Label>Profile name</Label>
            <Input
              name="username"
              onChange={handleChange}
              value={formProfile.username}
            />
          </div>
          <div className="mt-4 md:mt-0">
            <Label>Gender</Label>
            <Select
              value={formProfile.gender}
              onValueChange={(value) => handleSelectGender("gender", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laki">Laki-laki</SelectItem>
                <SelectItem value="perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 md:mt-0">
            <Label>Email</Label>
            <Input disabled name="email" value={profile?.user?.email} />
          </div>
        </div>
        <div className="mt-10">
          <Button
            variant="secondary"
            disabled={!isDirty}
            onClick={() => saveProfileUpdate(formProfile)}
          >
            Save changes
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Account;
